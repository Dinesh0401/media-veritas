
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { stringify as encodeQueryString } from "https://deno.land/x/querystring@v1.0.2/mod.js";
import * as pdfMake from "https://esm.sh/pdfmake@0.2.7";
import { qrcode } from "https://deno.land/x/qrcode@v2.0.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function to generate a verification code
function generateVerificationCode(reportId: string): string {
  // Generate a code based on report ID to make it deterministic
  // In a real app, this would be random and stored in the database
  const reportIdChars = reportId.split('');
  const reportIdSum = reportIdChars.reduce((sum, char) => sum + char.charCodeAt(0), 0);
  
  // Generate a deterministic but seemingly random code
  const validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  
  // First character is special - used for verification logic
  const validFirstChars = ["A", "B", "C", "D", "E", "F"];
  const firstCharIndex = reportIdSum % validFirstChars.length;
  code += validFirstChars[firstCharIndex];
  
  // Generate remaining 15 characters
  for (let i = 1; i < 16; i++) {
    const charIndex = (reportIdSum * (i + 1)) % validChars.length;
    code += validChars[charIndex];
  }
  
  // Format as XXXX-XXXX-XXXX-XXXX
  return code.match(/.{1,4}/g)?.join('-') || code;
}

// Function to format date in a readable format
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  }).format(date);
}

// Function to generate QR code as data URL
async function generateQRCode(data: string): Promise<string> {
  try {
    const qrCodeImage = await qrcode(data, { size: 200 });
    return qrCodeImage;
  } catch (error) {
    console.error("Failed to generate QR code:", error);
    throw new Error("Failed to generate QR code");
  }
}

// Function to generate PDF document
async function generatePDF(report: any, verificationCode: string): Promise<Uint8Array> {
  try {
    // Generate QR code with verification URL and code
    const verificationUrl = `https://fakenik.gov.in/verify?id=${report.id}&code=${verificationCode}`;
    const qrCodeDataUrl = await generateQRCode(verificationUrl);
    
    const confidenceLevel = report.confidence_score >= 80 ? "High" 
                          : report.confidence_score >= 60 ? "Medium" 
                          : "Low";
    
    const confidenceColor = report.confidence_score >= 80 ? '#FF3B30' 
                          : report.confidence_score >= 60 ? '#FF9500' 
                          : '#34C759';
                          
    const currentDate = new Date();
    
    // Define the document definition for PDF
    const documentDefinition = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      header: {
        margin: [40, 20, 40, 0],
        columns: [
          {
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAyCAYAAACqNX6+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0MzUyLCAyMDIwLzAxLzMwLTE1OjUwOjM4ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjItMDktMjBUMTA6MTU6MzMrMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTA5LTIwVDEwOjIwOjM2KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTA5LTIwVDEwOjIwOjM2KzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM0ZWZkOGQ0LTk4ZTAt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',
            width: 50,
          },
          {
            text: 'FAKENIK',
            alignment: 'left',
            margin: [10, 20, 0, 0],
            fontSize: 20,
            bold: true,
            color: '#001F3F',
          },
          {
            text: 'OFFICIAL REPORT STATEMENT',
            alignment: 'right',
            fontSize: 14,
            margin: [0, 23, 0, 0],
            color: '#001F3F',
          }
        ]
      },
      footer: {
        columns: [
          { 
            text: 'FAKENIK - Fighting Digital Deception', 
            alignment: 'center',
            fontSize: 10,
            margin: [0, 0, 0, 10],
            color: '#001F3F' 
          }
        ]
      },
      content: [
        {
          columns: [
            {
              width: '*',
              stack: [
                { 
                  text: 'VERIFICATION DOCUMENT', 
                  fontSize: 16, 
                  bold: true,
                  color: '#001F3F',
                  margin: [0, 0, 0, 10] 
                },
                {
                  canvas: [
                    {
                      type: 'line',
                      x1: 0, y1: 5,
                      x2: 250, y2: 5,
                      lineWidth: 3,
                      lineColor: '#001F3F'
                    }
                  ]
                },
                { 
                  text: `Report ID: ${report.id}`,
                  margin: [0, 15, 0, 5] 
                },
                { 
                  text: `Generated: ${formatDate(currentDate)}`,
                  margin: [0, 0, 0, 15] 
                },
                { 
                  text: 'REPORT INFORMATION',
                  bold: true,
                  fontSize: 14,
                  margin: [0, 0, 0, 10],
                  color: '#001F3F'
                },
                { 
                  text: `Title: ${report.title}`,
                  margin: [0, 0, 0, 5] 
                },
                { 
                  text: `Status: ${report.status.toUpperCase()}`,
                  margin: [0, 0, 0, 5] 
                },
                { 
                  text: `Content Type: ${report.content_type || 'Not specified'}`,
                  margin: [0, 0, 0, 5] 
                },
                { 
                  text: `Submission Date: ${formatDate(new Date(report.created_at))}`,
                  margin: [0, 0, 0, 15] 
                },
                { 
                  text: 'AI ANALYSIS',
                  bold: true,
                  fontSize: 14,
                  color: '#001F3F',
                  margin: [0, 0, 0, 10] 
                },
                { 
                  text: `Manipulation confidence score: ${report.confidence_score}%`,
                  margin: [0, 0, 0, 5] 
                },
                { 
                  text: `Confidence level: ${confidenceLevel}`,
                  color: confidenceColor,
                  bold: true,
                  margin: [0, 0, 0, 5] 
                },
                { 
                  text: report.description || 'No description provided.',
                  margin: [0, 10, 0, 15] 
                }
              ]
            },
            {
              width: 200,
              stack: [
                {
                  image: qrCodeDataUrl,
                  width: 150,
                  alignment: 'center',
                  margin: [0, 0, 0, 10]
                },
                {
                  text: 'Verification QR Code',
                  alignment: 'center',
                  fontSize: 10,
                  margin: [0, 0, 0, 10]
                },
                {
                  text: verificationCode,
                  alignment: 'center',
                  bold: true,
                  fontSize: 12,
                  margin: [0, 0, 0, 20]
                },
                {
                  text: 'Scan the QR code or visit fakenik.gov.in/verify and enter the verification code to confirm this report\'s authenticity.',
                  alignment: 'center',
                  fontSize: 10,
                  margin: [0, 0, 0, 10]
                }
              ]
            }
          ]
        },
        {
          text: 'STATEMENT OF AUTHENTICITY',
          bold: true,
          fontSize: 14,
          margin: [0, 15, 0, 10],
          color: '#001F3F'
        },
        {
          text: 'This document certifies that the reported content has been analyzed by the FakeNik platform and its findings are recorded in the Indian Digital Media Trust Registry. This verification statement can be used as a reference for official purposes.',
          margin: [0, 0, 0, 10]
        },
        {
          text: 'DISCLAIMER: This document is valid subject to online verification through the QR code or verification code provided above.',
          fontSize: 10,
          italics: true,
          margin: [0, 10, 0, 0]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      }
    };

    // Generate the PDF
    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    
    // Get the PDF as buffer
    return new Promise<Uint8Array>((resolve, reject) => {
      try {
        // @ts-ignore - pdfMake types are not available
        pdfDocGenerator.getBuffer((buffer) => {
          resolve(new Uint8Array(buffer));
        });
      } catch (error) {
        reject(error);
      }
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Get the request body
    const body = await req.json();
    const { reportId } = body;
    
    if (!reportId) {
      throw new Error("Report ID is required");
    }
    
    console.log(`Generating PDF for report ${reportId}`);
    
    // Get the report from the database to confirm it exists
    const { data: report, error } = await supabase
      .from("reports")
      .select("id, title, status, confidence_score, description, content_type, created_at")
      .eq("id", reportId)
      .maybeSingle(); // Use maybeSingle instead of single to prevent error if no row is found
    
    if (error) {
      console.error("Database error:", error);
      throw error;
    }
    
    if (!report) {
      console.error(`Report with ID ${reportId} not found`);
      throw new Error(`Report with ID ${reportId} not found`);
    }

    // Generate a verification code for this report
    const verificationCode = generateVerificationCode(reportId);
    
    console.log(`Generated verification code ${verificationCode} for report ${reportId}`);
    
    // Generate the actual PDF
    const pdfBuffer = await generatePDF(report, verificationCode);
    
    // Return the PDF as a response
    return new Response(pdfBuffer, {
      headers: { 
        ...corsHeaders,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="report-${reportId}.pdf"`
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error in generate-report-pdf function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "An error occurred while generating the PDF" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
