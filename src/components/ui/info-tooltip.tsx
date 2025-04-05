
import * as React from "react"
import { Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface InfoTooltipProps {
  content: React.ReactNode
  className?: string
  iconClassName?: string
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}

export function InfoTooltip({
  content,
  className,
  iconClassName,
  side = "top",
  align = "center",
}: InfoTooltipProps) {
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger className={cn("inline-flex items-center ml-1.5 cursor-help", className)}>
        <Info className={cn("h-4 w-4 text-muted-foreground", iconClassName)} />
      </TooltipTrigger>
      <TooltipContent 
        side={side} 
        align={align}
        className="max-w-xs text-sm"
      >
        {content}
      </TooltipContent>
    </Tooltip>
  )
}
