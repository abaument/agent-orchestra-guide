import { useEffect, useRef } from "react"
import type { FC, ReactNode } from "react"

type NetworkAnimationProps = {
  /**  
   * Élément(s) à superposer au‑dessus du SVG  
   * (par ex. une vidéo, un titre, etc.).  
   */
  children?: ReactNode
  /**  
   * Couleur de mise en surbrillance des arêtes (défaut : #3A86FF).  
   */
  highlightColor?: string
  /**  
   * Intervalle (ms) entre deux rafales d’animation (défaut : 1 000).  
   */
  interval?: number
}

const NetworkAnimation: FC<NetworkAnimationProps> = ({
  children,
  highlightColor = "#3A86FF",
  interval = 1000,
}) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const id = setInterval(() => {
      const svg = svgRef.current
      if (!svg) return

      svg.querySelectorAll("path").forEach((path) => {
        if (Math.random() > 0.7) {
          path.setAttribute("stroke", highlightColor)
          path.setAttribute("stroke-width", "2")

          // retour à la couleur d'origine après 700 ms
          setTimeout(() => {
            path.setAttribute("stroke", "#ADB5BD")
            path.setAttribute("stroke-width", "1")
          }, 700)
        }
      })
    }, interval)

    return () => clearInterval(id)
  }, [highlightColor, interval])

  return (
    <div className="relative h-full w-full">
      {/* SVG animé */}
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* Nodes */}
        <circle cx="400" cy="300" r="30" fill={highlightColor} />
        <circle cx="250" cy="200" r="25" fill={highlightColor} opacity="0.8" />
        <circle cx="550" cy="200" r="25" fill={highlightColor} opacity="0.8" />
        {/* … autres nœuds … */}

        {/* Connections */}
        <path d="M400 300 L250 200" stroke="#ADB5BD" strokeWidth="1" />
        <path d="M400 300 L550 200" stroke="#ADB5BD" strokeWidth="1" />
        {/* … autres arêtes … */}
      </svg>

      {/* Contenu superposé (optionnel) */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  )
}

export default NetworkAnimation
