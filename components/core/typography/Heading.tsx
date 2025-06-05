import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import type { JSX } from "react/jsx-runtime" // Import JSX to declare the variable

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span"
}

export function Heading({ level, children, className, as }: HeadingProps) {
  const baseClasses = "font-semibold tracking-tight"

  const levelClasses = {
    1: "text-3xl md:text-4xl",
    2: "text-2xl md:text-3xl",
    3: "text-xl md:text-2xl",
    4: "text-lg md:text-xl",
    5: "text-base md:text-lg",
    6: "text-sm md:text-base",
  }

  // Use the 'as' prop if provided, otherwise default to the heading level
  const Component = as || (`h${level}` as keyof JSX.IntrinsicElements)

  return <Component className={cn(baseClasses, levelClasses[level], className)}>{children}</Component>
}
