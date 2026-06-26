import * as React from "react"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:opacity-50 disabled:pointer-events-none"
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 hover:bg-gray-100 text-slate-900",
  }
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
  }
  return (
    <button
      ref={ref}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className || ""}`}
      {...props}
    />
  )
})
Button.displayName = "Button"
export { Button }