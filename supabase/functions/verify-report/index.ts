
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

    // In a real implementation, we would verify the code against what's stored in the database
    // For now, we'll simulate this process with a mock verification
    
    // Get the report from the database to confirm it exists
    const { data: report, error } = await supabase
      .from("reports")
      .select("id, title, status, confidence_score")
      .eq("id", reportId)
      .single();

    if (error) {
      throw error;
    }

    if (!report) {
      throw new Error("Report not found");
    }

    // Mock verification logic - in a real app, compare with stored codes
    // For now, we'll consider codes that start with certain letters as valid for demo purposes
    const firstChar = verificationCode.charAt(0);
    const isValid = ['A', 'B', 'C', 'D', 'E', 'F'].includes(firstChar);

    return new Response(
      JSON.stringify({
        success: true,
        verified: isValid,
        report: isValid ? report : null,
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
