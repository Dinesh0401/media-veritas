
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
    // For demo purposes, we'll use a simple validation
    
    // Mock verification logic - in a real app, compare with stored codes
    // For now, we'll consider codes that start with certain letters as valid for demo purposes
    const firstChar = verificationCode.charAt(0);
    const isValid = ['A', 'B', 'C', 'D', 'E', 'F'].includes(firstChar);
    
    // Check if the code format is valid (4 blocks of 4 characters separated by dashes)
    const codeFormatRegex = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    const isFormatValid = codeFormatRegex.test(verificationCode);
    
    const verified = isValid && isFormatValid;
    
    // Log the verification result
    console.log(`Verification result for report ${reportId}: ${verified ? 'Valid' : 'Invalid'}`);

    // If verification is successful and this is a real app, we might update the report status
    if (verified) {
      // In a real app: Update report verification status
      console.log(`Report ${reportId} successfully verified`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        verified: verified,
        report: verified ? {
          ...report,
          verifiedAt: new Date().toISOString()
        } : null,
        message: verified 
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
