
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
      .select("id, title, status, confidence_score, description, content_type")
      .eq("id", reportId)
      .single();
    
    if (error) {
      console.error("Database error:", error);
      throw error;
    }
    
    if (!report) {
      throw new Error("Report not found");
    }

    // Generate a verification code for this report
    const verificationCode = generateVerificationCode(reportId);
    
    console.log(`Generated verification code ${verificationCode} for report ${reportId}`);
    
    // In a real implementation, we would:
    // 1. Generate an actual PDF document
    // 2. Store the document in storage
    // 3. Save the verification code in the database
    // 4. Create a downloadable URL for the PDF
    
    // For now, we'll just return a mock success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Report PDF generated successfully",
        data: {
          reportId: reportId,
          title: report.title,
          generatedAt: new Date().toISOString(),
          // In a real app, this would be a URL to the PDF
          pdfUrl: `https://example.com/reports/${reportId}.pdf`, 
        },
        verificationCode: verificationCode
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
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
