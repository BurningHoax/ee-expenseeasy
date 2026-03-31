"use client";

import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-blue-500/50",
        primary:
          "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl hover:shadow-blue-500/50 active:scale-95",
        secondary:
          "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 active:scale-95",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 active:scale-95 shadow-lg hover:shadow-red-500/50",
        outline:
          "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 active:scale-95",
        ghost: "hover:bg-gray-100 dark:hover:bg-gray-900 active:scale-95",
        success:
          "bg-green-600 text-white hover:bg-green-700 active:scale-95 shadow-lg hover:shadow-green-500/50",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4 py-2",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "success";
  size?: "sm" | "default" | "lg" | "icon";
  animated?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      animated = false,
      ...props
    },
    ref,
  ) => {
    const animationClass = animated ? "hover:translate-y-[-2px]" : "";
    return (
      <button
        className={cn(
          buttonVariants({ variant, size }),
          animationClass,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
