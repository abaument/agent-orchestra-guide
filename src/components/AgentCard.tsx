import { forwardRef, useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import AIBadge from "./AIBadge"

interface AgentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon: React.ReactNode
  details: React.ReactNode | string
}

/**
 * forwardRef est indispensable pour que <DialogTrigger asChild> puisse
 * injecter sa réf sur la carte. Toute la carte devient ainsi un vrai bouton
 * déclencheur de dialogue.
 */
const AgentCard = forwardRef<HTMLDivElement, AgentCardProps>(
  ({ title, description, icon, details, className = "", ...rest }, ref) => {
    const [open, setOpen] = useState(false)

    return (
      <Card
        ref={ref}
        {...rest}
        className={`relative overflow-hidden cursor-pointer transition-shadow duration-300 ${
          open ? "shadow-lg shadow-electric-blue/30" : "hover:shadow-md"
        } ${className}`}
      >
        {/* Accent bar */}
        <span
          className={`absolute inset-x-0 top-0 h-1.5 bg-electric-blue transition-transform ${
            open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
        />

        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-electric-blue/10 p-3 text-electric-blue">
              {icon}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg leading-tight">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <CardContent className="pt-0 text-sm text-gray-700">
                <div className="mb-3 whitespace-pre-line">{details}</div>
                <AIBadge />
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>

        <CardFooter className="pt-2">
          <Button
            variant="ghost"
            className="w-full justify-center gap-2 text-electric-blue hover:bg-electric-blue/10"
            onClick={(e) => {
              e.stopPropagation() // n’empêche pas l’ouverture du Dialog
              setOpen((o) => !o)
            }}
          >
            {open ? (
              <>
                Masquer <ChevronUp size={16} />
              </>
            ) : (
              <>
                Détails <ChevronDown size={16} />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    )
  },
)
AgentCard.displayName = "AgentCard"

export default AgentCard
