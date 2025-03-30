
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

    // In a real implementation, we would generate the PDF here
    // This is just a mock response
    const mockPdfResponse = {
      success: true,
      message: "PDF generated successfully",
      data: {
        reportId: report.id,
        title: report.title,
        userName: report.users?.full_name || "Anonymous",
        confidenceScore: report.confidence_score,
        status: report.status,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=fakenik-report-${report.id}`,
        pdfUrl: `https://fakenik.gov.in/reports/${report.id}/verification`,
        verificationCode: Math.random().toString(36).substring(2, 10).toUpperCase(),
      },
    };

    return new Response(JSON.stringify(mockPdfResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
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
