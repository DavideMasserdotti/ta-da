"use client"
import { useTheme } from "next-themes"
import { LineShadowText } from "@/components/ui/line-shadow-text"
export default function Logo() {
  const theme = useTheme()
  const shadowColor = theme.resolvedTheme === "dark" ? "white" : "black"
  return (
    <h1 className="text-5xl leading-none font-semibold tracking-tighter text-balance sm:text-6xl md:text-7xl lg:text-8xl">
      Ta - 
      <LineShadowText className="italic text-blue-500" shadowColor={shadowColor}>
        Da
      </LineShadowText>
    </h1>
  )
}
