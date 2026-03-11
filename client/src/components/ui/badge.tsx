import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border border-white/20 bg-gradient-to-r from-deep-indigo to-dark-violet text-white",
        secondary:
          "border border-white/10 bg-cosmic-700/50 text-cosmic-100 backdrop-blur-glass",
        destructive:
          "border border-red-500/20 bg-destructive/20 text-red-300",
        outline: 
          "border border-white/20 bg-transparent text-white hover:bg-white/5",
        success:
          "border border-emerald-500/20 bg-emerald-500/20 text-emerald-300",
        warning:
          "border border-yellow-500/20 bg-yellow-500/20 text-yellow-300",
        glass:
          "glass border-white/10 text-white",
        gold:
          "border border-sacred-gold/30 bg-sacred-gold/10 text-sacred-gold",
        violet:
          "border border-luminous-violet/30 bg-luminous-violet/10 text-luminous-violet",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
