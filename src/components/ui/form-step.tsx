
import * as React from "react"
import { Check, CircleHelp } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FormStepProps {
  title: string
  description?: string
  icon?: React.ReactNode
  active?: boolean
  completed?: boolean
  disabled?: boolean
  children?: React.ReactNode
  isLastStep?: boolean
  className?: string
}

const FormStep = React.forwardRef<HTMLDivElement, FormStepProps>(
  ({ 
    title, 
    description, 
    icon, 
    active = false, 
    completed = false, 
    disabled = false,
    children,
    isLastStep = false,
    className
  }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn(
          "relative",
          !isLastStep && "after:absolute after:left-[1.70rem] after:top-[3.5rem] after:h-full after:w-0.5 after:bg-muted",
          className
        )}
      >
        <div className="flex items-start gap-4 pb-8">
          <div className="relative flex items-center justify-center">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors",
              active && "border-primary bg-primary/10",
              completed && "border-green-500 bg-green-500/10",
              !active && !completed && "border-muted-foreground/20 bg-background",
              disabled && "opacity-50"
            )}>
              {completed ? (
                <Check className="h-6 w-6 text-green-500" />
              ) : icon ? (
                icon
              ) : (
                <CircleHelp className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <h3 className={cn(
              "text-lg font-medium",
              active && "text-primary",
              completed && "text-green-500",
              disabled && "text-muted-foreground/70"
            )}>
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>
        
        {active && children && (
          <div className="pl-16 mb-8">
            {children}
          </div>
        )}
      </div>
    )
  }
)

FormStep.displayName = "FormStep"

export { FormStep }
