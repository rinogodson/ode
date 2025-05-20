import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const retroButtonVariants = cva(
  "relative inline-flex items-center justify-center w-24 border-2 border-transparent rounded-[2px] bg-[#010101] shadow-[1px_1px_1px_rgba(255,255,255,0.6)]",
  {
    variants: {
      variant: {
        default: [
          "text-white",
          "[--bg-color:theme(colors.orange.500)]",
          "[--bg-color-active:theme(colors.orange.600)]",
          "[--shadow-light:theme(colors.orange.300)]",
          "[--shadow-dark:theme(colors.orange.700)]",
        ],
        darkGray: [
          "text-white",
          "[--bg-color:theme(colors.neutral.700)]",
          "[--bg-color-active:theme(colors.neutral.800)]",
          "[--shadow-light:theme(colors.neutral.400)]",
          "[--shadow-dark:theme(colors.neutral.900)]",
        ],
        white: [
          "text-black",
          "[--bg-color:theme(colors.neutral.200)]",
          "[--bg-color-active:theme(colors.neutral.300)]",
          "[--shadow-light:theme(colors.white)]",
          "[--shadow-dark:theme(colors.neutral.500)]",
        ],
        lightGray: [
          "text-white",
          "[--bg-color:theme(colors.neutral.400)]",
          "[--bg-color-active:theme(colors.neutral.500)]",
          "[--shadow-light:theme(colors.neutral.200)]",
          "[--shadow-dark:theme(colors.neutral.600)]",
        ],
        gray: [
          "text-white",
          "[--bg-color:theme(colors.neutral.600)]",
          "[--bg-color-active:theme(colors.neutral.700)]",
          "[--shadow-light:theme(colors.neutral.400)]",
          "[--shadow-dark:theme(colors.neutral.800)]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const retroButtonInnerVariants = cva(
  [
    "inline-block w-full rounded-[9px] px-3 py-2",
    "uppercase tracking-wider text-center",
    "bg-[var(--bg-color)] transition-all duration-200",
    "shadow-[inset_1px_1px_1px_var(--shadow-light),inset_-1px_-1px_1px_var(--shadow-dark),2px_2px_4px_#000]",
    "active:scale-[0.98] active:bg-[var(--bg-color-active)]",
    "active:shadow-[inset_0_0_4px_#000,inset_1px_1px_1px_transparent,inset_-1px_-1px_1px_transparent,2px_2px_4px_transparent]",
  ]
)

export interface RetroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof retroButtonVariants> {
  children: React.ReactNode
}

const RetroButton = React.forwardRef<HTMLButtonElement, RetroButtonProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <button
        className={cn(retroButtonVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        <span className={retroButtonInnerVariants()}>{children}</span>
      </button>
    )
  }
)
RetroButton.displayName = "RetroButton"

export { RetroButton }