
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SubmitterInfoProps {
  email?: string;
}

export function SubmitterInfo({ email }: SubmitterInfoProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback>
          {email?.substring(0, 2).toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">{email}</p>
        <p className="text-sm text-muted-foreground">Verified Reporter</p>
      </div>
    </div>
  );
}
