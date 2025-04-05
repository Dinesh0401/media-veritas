
import * as React from "react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Check } from "lucide-react"

interface MultiStepFormProgressProps {
  steps: string[]
  currentStep: number
  className?: string
}

export function MultiStepFormProgress({ 
  steps, 
  currentStep, 
  className 
}: MultiStepFormProgressProps) {
  const progressPercentage = ((currentStep) / (steps.length)) * 100
  
  return (
    <div className={cn("w-full space-y-4", className)}>
      <Progress 
        value={progressPercentage} 
        className="h-2 transition-all duration-300" 
      />
      
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isActive = index === currentStep
          
          return (
            <div 
              key={index}
              className={cn(
                "flex flex-col items-center space-y-2 transition-all",
                (isCompleted || isActive) ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div 
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all",
                  isCompleted ? "bg-primary border-primary" : "",
                  isActive ? "border-primary" : "border-muted-foreground/30"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <span className={cn(
                    "text-sm font-medium",
                    isActive ? "text-primary" : "text-muted-foreground/70"
                  )}>
                    {index + 1}
                  </span>
                )}
              </div>
              <span className={cn(
                "text-xs text-center max-w-[80px] truncate",
                (isCompleted || isActive) ? "font-medium" : "font-normal"
              )}>
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
