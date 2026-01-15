import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "motion/react";
interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  isComplete?: boolean;
  onStepClick?: (step: number) => void;
}
const StepIndicator = ({ steps, currentStep, isComplete, onStepClick }: StepIndicatorProps) => {
  return (
    <div className="  w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepComplete = isComplete || index < currentStep;
          const isActive = !isComplete && index === currentStep;
          const isClickable = index < currentStep && onStepClick && !isComplete;
          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <motion.button
                type="button"
                disabled={!isComplete}
                whileHover={isClickable ? { scale: 1.05 } : {}}
                whileTap={isClickable ? { scale: 0.95 } : {}}
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium text-sm transition-all duration-300",
                  stepComplete && "bg-foreground border-foreground text-background",
                  !stepComplete && !isActive && "border-muted-foreground/30 text-muted-foreground bg-background",
                  isClickable && "cursor-pointer hover:opacity-80"

                )}
              >
                {stepComplete ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check className="w-5 h-5" strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <span>{index + 1}</span>
                )}

              </motion.button>
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-3 bg-border overflow-hidden">
                  <motion.div
                    className="h-full bg-foreground"
                    initial={{ width: "0%" }}
                    animate={{ width: index < currentStep || isComplete ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                </div>
              )}
            </div>
          )

        })}

      </div>
    </div>
  )
}

export default StepIndicator