
import { CheckCircle, Clock } from "lucide-react";

interface VerificationStatusProps {
  status: string;
}

export function VerificationStatus({ status }: VerificationStatusProps) {
  return (
    <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
      {status === "resolved" ? (
        <>
          <div className="bg-green-100 p-2 rounded-full mb-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-center mb-1 font-medium">Verified by Indian Government</p>
          <p className="text-xs text-muted-foreground text-center">
            This report has been verified and action has been taken
          </p>
        </>
      ) : (
        <>
          <div className="bg-yellow-100 p-2 rounded-full mb-3">
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-center mb-1 font-medium">Pending Verification</p>
          <p className="text-xs text-muted-foreground text-center">
            This report is awaiting official verification
          </p>
        </>
      )}
    </div>
  );
}
