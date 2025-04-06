
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
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Get the request body
    const body = await req.json();
    const { reportId, verificationCode } = body;

    if (!reportId) {
      throw new Error("Report ID is required");
    }

    if (!verificationCode) {
      throw new Error("Verification code is required");
    }
    
    // Log the verification attempt for debugging
    console.log(`Verifying report ${reportId} with code ${verificationCode}`);

    // Get the report from the database to confirm it exists
    const { data: report, error } = await supabase
      .from("reports")
      .select("id, title, status, confidence_score, description, content_type, created_at, user_id")
      .eq("id", reportId)
      .single();

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    if (!report) {
      throw new Error("Report not found");
    }

    // In a production system, we would query a verification_codes table
    // to check if the code matches and hasn't expired
    
    // Check if the code format is valid (4 blocks of 4 characters separated by dashes)
    const codeFormatRegex = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    const isFormatValid = codeFormatRegex.test(verificationCode);
    
    if (!isFormatValid) {
      console.log(`Invalid code format: ${verificationCode}`);
      return new Response(
        JSON.stringify({
          success: true,
          verified: false,
          message: "Invalid verification code format",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }
    
    // Mock verification logic using a deterministic approach based on reportId
    // In a real app, this would be a lookup against stored verification codes
    const reportIdSum = [...reportId].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const firstChar = verificationCode.charAt(0);
    
    // Demo validation: codes starting with specific characters are considered valid
    // based on a simple hash of the report ID
    const validFirstChars = ["A", "B", "C", "D", "E", "F"];
    const expectedFirstCharIndex = reportIdSum % validFirstChars.length;
    const expectedFirstChar = validFirstChars[expectedFirstCharIndex];
    
    const isValid = firstChar === expectedFirstChar;
    
    // Log the verification result
    console.log(`Verification result for report ${reportId}: ${isValid ? 'Valid' : 'Invalid'}`);
    console.log(`Expected first char: ${expectedFirstChar}, Got: ${firstChar}`);

    // If verification is successful and this is a real app, we might update the report status
    if (isValid) {
      // In a real app: Update report verification status
      console.log(`Report ${reportId} successfully verified`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        verified: isValid,
        report: isValid ? {
          ...report,
          verifiedAt: new Date().toISOString()
        } : null,
        message: isValid 
          ? "Report verification successful" 
          : "Invalid verification code",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in verify-report function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "An error occurred during verification" 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
