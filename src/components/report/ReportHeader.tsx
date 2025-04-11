
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ReportHeader() {
  const navigate = useNavigate();
  
  return (
    <div className="mb-6">
      <Button variant="outline" onClick={() => navigate("/track")}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Reports
      </Button>
    </div>
  );
}
