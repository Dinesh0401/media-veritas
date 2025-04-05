
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
    
    // Get the authorization header from the request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing Authorization header");
    }

    // Create a Supabase client with the Auth header
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    // Get the request body
    const body = await req.json();
    const { reportId } = body;

    if (!reportId) {
      throw new Error("Report ID is required");
    }

    // Get the report from the database
    const { data: report, error } = await supabaseClient
      .from("reports")
      .select("*, users(full_name)")
      .eq("id", reportId)
      .single();

    if (error) {
      throw error;
    }

    if (!report) {
      throw new Error("Report not found");
    }

    // Generate a unique verification code - more complex than the previous one
    const verificationCode = generateVerificationCode();
    
    // In a real implementation, we would generate the actual PDF here
    // For now, we're creating a more detailed mock response
    const reportData = {
      reportId: report.id,
      title: report.title,
      userName: report.users?.full_name || "Anonymous",
      confidenceScore: report.confidence_score,
      status: report.status,
      description: report.description,
      contentType: report.content_type,
      createdAt: report.created_at,
      updatedAt: report.updated_at,
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=fakenik-report-${report.id}`,
      pdfUrl: `https://fakenik.gov.in/reports/${report.id}/verification`,
      verificationCode: verificationCode,
      mediaUrl: report.media_url,
      sourceUrl: report.source_url,
    };

    // Store the verification code in the database for later verification
    // This would be implemented in a real application
    // await storeVerificationCode(report.id, verificationCode);

    // Log the generated report for debugging
    console.log("Generated report:", JSON.stringify(reportData, null, 2));

    return new Response(
      JSON.stringify({
        success: true,
        message: "PDF generated successfully",
        data: reportData,
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

/**
 * Generates a complex verification code combining letters and numbers
 * @returns {string} A verification code
 */
function generateVerificationCode(): string {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing characters like O, 0, 1, I
  let code = '';
  
  // Generate 4 blocks of 4 characters separated by dashes
  for (let block = 0; block < 4; block++) {
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    
    if (block < 3) {
      code += '-';
    }
  }
  
  return code;
}
