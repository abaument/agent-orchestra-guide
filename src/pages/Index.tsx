import React, { useEffect, useRef, useState } from "react"
import ReactPlayer from "react-player"

import { Button } from "@/components/ui/button"
import ProgressBar from "@/components/ProgressBar"
import AskMeAnything from "@/components/AskMeAnything"
import AgentCard from "@/components/AgentCard"
import NetworkAnimation from "@/components/NetworkAnimation"
import AIBadge from "@/components/AIBadge"
import {
  BarChart,
  Code,
  MessageSquare,
  Play,
  Search,
  Shield,
} from "lucide-react"

/**
 * Titres des sections. L'ordre doit correspondre au DOM pour le snap‑scroll.
 */
const SECTIONS = [
  "Hero",
  "Qu'est‑ce qu'un système multi‑agents ?",
  "Architectures & Protocoles",
  "Cas d'usage",
  "Concevoir son propre SMA",
  "Gouvernance & Éthique",
  "Conclusion",
] as const

const Index: React.FC = () => {
  // ----------------------------------------------------------- state & refs
  const [currentSection, setCurrentSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<Array<HTMLElement | null>>([])

  // ----------------------------------------------------------- scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const { scrollY } = window
      const winH = window.innerHeight
      let active = 0

      sectionRefs.current.forEach((sec, i) => {
        if (!sec) return
        const top = sec.offsetTop
        const bottom = top + sec.offsetHeight
        if (scrollY >= top - winH / 3 && scrollY < bottom - winH / 3) active = i
      })

      setCurrentSection(active)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" })
  }

  // ---------------------------------------------------------------- return
  return (
    <div ref={containerRef} className="snap-container">
      {/* Progress bar */}
      <ProgressBar
        sections={[...SECTIONS]}
        currentSection={currentSection}
        onSectionChange={scrollToSection}
      />

      {/* ---------------------------------------------------- Hero */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="snap-section flex items-center justify-center bg-gradient-to-br from-white to-blue-50"
      >
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <header className="text-center">
            <h1
              className="animate-fade-in mb-4 text-4xl font-bold text-gray-900 md:text-6xl"
              style={{ animationDelay: "0.1s" }}
            >
              Les multi‑agents&nbsp;IA
            </h1>
            <p
              className="animate-fade-in mb-8 text-xl text-gray-700 md:text-2xl"
              style={{ animationDelay: "0.3s" }}
            >
              Orchestrer l'intelligence collective des machines
            </p>
            {/* hero video placeholder */}
            <div
              className="animate-fade-in relative mx-auto mb-12 h-64 w-full max-w-3xl overflow-hidden rounded-lg shadow-lg md:h-80"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900/30">
                <Button className="flex items-center gap-2 bg-electric-blue text-white hover:bg-electric-dark">
                  <Play size={16} />
                  Regarder la vidéo d'introduction
                </Button>
              </div>
              <div className="absolute inset-0">
              <NetworkAnimation highlightColor="#FF5E5B" interval={1500}>
                <video
                  src="/AIexplenation.mp4"
                  autoPlay
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
              </NetworkAnimation>

              </div>
            </div>
            {/* CTA */}
            <div
              className="animate-fade-in flex flex-wrap justify-center gap-4"
              style={{ animationDelay: "0.7s" }}
            >
              <Button className="bg-electric-blue hover:bg-electric-dark" onClick={() => scrollToSection(1)}>
                Explorer le guide
              </Button>
              <Button variant="outline" className="border-electric-blue text-electric-blue hover:bg-electric-blue/10">
                Télécharger en PDF
              </Button>
            </div>
          </header>
        </div>
      </section>

      {/* ---------------------------------------------------- Section 1 */}
      <section ref={(el) => (sectionRefs.current[1] = el)} className="snap-section flex items-center bg-white">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Qu'est‑ce qu'un système multi‑agents&nbsp;?</h2>
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* left */}
            <div>
              <p className="mb-4 text-lg">
                Un système multi‑agents (SMA) est un ensemble d'entités autonomes intelligentes, appelées agents, qui interagissent
                dans un environnement partagé pour résoudre des problèmes complexes qu'un seul agent ne pourrait pas résoudre seul.
              </p>
              <div className="mb-4 rounded-lg bg-gray-100 p-4">
                <h3 className="mb-2 font-semibold">TL;DR</h3>
                <p>
                  Les SMA sont des réseaux d'IA collaboratives qui résolvent ensemble des problèmes complexes par communication et coordination.
                </p>
                <AIBadge />
              </div>
              <p className="text-lg">
                Chaque agent possède une vision partielle de l'environnement et dispose de capacités de perception, de décision et d'action. La force des SMA réside dans leur capacité à faire émerger des comportements collectifs sophistiqués à partir d'interactions entre agents relativement simples.
              </p>
            </div>
            {/* right */}
            <div className="grid grid-cols-2 gap-4">
              <AgentCard
                title="Agent Perceptif"
                description="Capture et traite les données de l'environnement"
                icon={<Search className="text-electric-blue" size={24} />}
                details="L'agent perceptif utilise des capteurs virtuels ou physiques pour observer son environnement. Il peut s'agir d'une caméra, de capteurs acoustiques ou d'API. Ces informations sont ensuite structurées et transmises aux autres agents."
              />
              <AgentCard
                title="Agent Communicant"
                description="Assure l'échange d'informations entre agents"
                icon={<MessageSquare className="text-electric-blue" size={24} />}
                details="Implémente des protocoles (p. ex. FIPA ACL) pour partager l'information, gérer la sérialisation et le routage des messages."
              />
              <AgentCard
                title="Agent Analytique"
                description="Traite les données pour en extraire du sens"
                icon={<BarChart className="text-electric-blue" size={24} />}
                details="Utilise apprentissage automatique et analyses pour détecter tendances et anomalies et générer des insights."
              />
              <AgentCard
                title="Agent Sécurité"
                description="Protège le système et ses données"
                icon={<Shield className="text-electric-blue" size={24} />}
                details="Surveille les échanges, détecte les comportements malveillants et applique chiffrement, authentification et contrôle d'accès."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Section 2 */}
      <section ref={(el) => (sectionRefs.current[2] = el)} className="snap-section flex items-center bg-gray-100">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Architectures & Protocoles</h2>

          {/* Architectures */}
          <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">Types d'architectures</h3>
            <div className="mb-4 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Hiérarchique",
                  text: "Organisation pyramidale avec contrôle centralisé, idéale pour une coordination stricte.",
                },
                {
                  title: "Peer‑to‑Peer",
                  text: "Réseau d'agents égaux communiquant directement, favorisant robustesse et adaptabilité.",
                },
                {
                  title: "Market‑Based",
                  text: "Agents échangent des services via enchères/négociations pour optimiser les ressources.",
                },
              ].map((card) => (
                <div key={card.title} className="rounded-lg bg-gray-50 p-4">
                  <h4 className="mb-2 font-semibold text-electric-blue">{card.title}</h4>
                  <p className="text-sm">{card.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Protocoles */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">Protocoles de communication</h3>
            <h4 className="mb-2 font-medium">Contract Net Protocol (CNP)</h4>
            <div className="mb-6 overflow-x-auto rounded-lg bg-gray-50 p-4 font-mono text-sm">
              <pre>{`# Exemple de Contract Net Protocol en pseudo‑code Python
class Agent:
    def __init__(self, agent_id):
        self.id = agent_id
        self.tasks = []

    def announce_task(self, task):
        bids = []
        for agent in network.get_agents():
            if agent.id != self.id:
                bid = agent.bid_for_task(task)
                if bid:
                    bids.append((agent, bid))
        if bids:
            winner = min(bids, key=lambda x: x[1])
            winner[0].assign_task(task)
            return True
        return False
`}</pre>
            </div>
            <AIBadge />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Section 3 */}
      <section ref={(el) => (sectionRefs.current[3] = el)} className="snap-section flex items-center bg-white">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Cas d'usage</h2>

          <div className="grid gap-8 md:grid-cols-2">
            {/* supply chain */}
            <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold">Chaîne d'approvisionnement intelligente</h3>
              <p className="mb-4">
                Les SMA optimisent la chaîne d'approvisionnement : prévision de la demande, routes dynamiques, adaptation aux perturbations, négociations fournisseurs…
              </p>
              <Button variant="outline" className="w-full border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white">
                Voir la démo
              </Button>
            </div>
            {/* trading */}
            <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold">Systèmes de trading algorithmique</h3>
              <p className="mb-4">
                Dans la finance, les SMA orchestrent analyse, détection d'anomalies, exécution et gestion des risques pour un trading plus sûr et plus rapide.
              </p>
              <Button variant="outline" className="w-full border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white">
                Voir la démo
              </Button>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-electric-blue/10 p-6">
            <h3 className="mb-3 text-xl font-semibold">Témoignage</h3>
            <blockquote className="italic">
              « Notre SMA logistique a réduit les coûts de 23 % et amélioré la fiabilité des livraisons de 17 %. »
            </blockquote>
            <p className="mt-3 font-semibold">— Directrice des opérations, Groupe Logistique International</p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Section 4 */}
      <section ref={(el) => (sectionRefs.current[4] = el)} className="snap-section flex items-center bg-gray-100">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Concevoir son propre SMA</h2>
          {/* étapes */}
          <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">Étapes clés de conception</h3>
            {[
              "Analyse des besoins et objectifs",
              "Définition des agents",
              "Conception de l'environnement",
              "Protocoles d'interaction",
              "Implémentation et tests",
            ].map((step, i) => (
              <div key={step} className="flex items-start gap-4 rounded-lg border border-gray-200 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-electric-blue font-bold text-white">{i + 1}</div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">{step}</span>
                </p>
              </div>
            ))}
          </div>
          {/* frameworks */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">Frameworks et outils recommandés</h3>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
              {[
                "JADE",
                "SPADE",
                "Mesa",
                "LangChain",
                "AutoGen",
                "CrewAI",
              ].map((fw) => (
                <div key={fw} className="text-center rounded-lg border border-gray-200 p-4">
                  <Code className="mx-auto mb-2 text-electric-blue" />
                  <h4 className="font-medium">{fw}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Section 5 */}
      <section ref={(el) => (sectionRefs.current[5] = el)} className="snap-section flex items-center bg-white">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Gouvernance, sécurité & éthique</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* gouvernance */}
            <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold">Principes de gouvernance</h3>
              {[
                "Transparence",
                "Responsabilité",
                "Contrôle humain",
                "Audit et traçabilité",
              ].map((p) => (
                <p key={p} className="mb-2 text-sm text-gray-600">
                  <span className="font-medium">{p}</span>
                </p>
              ))}
            </div>
            {/* risques */}
            <div className="rounded-xl bg-gray-50 p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold">Risques & mesures de sécurité</h3>
              {[
                "Attaques adversariales",
                "Confiance et réputation",
                "Confidentialité des données",
                "Comportements émergents",
              ].map((r) => (
                <p key={r} className="mb-2 text-sm text-gray-600">
                  <span className="font-medium">{r}</span>
                </p>
              ))}
            </div>
          </div>
          {/* standards */}
          <div className="mt-8 rounded-xl bg-electric-blue/10 p-6">
            <h3 className="mb-4 text-xl font-semibold">Standards et normes</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    {[
                      "Standard",
                      "Organisation",
                      "Focus",
                    ].map((h) => (
                      <th key={h} className="border-b-2 border-electric-blue/20 p-2 text-left">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["FIPA", "IEEE", "Interopérabilité des agents"],
                    ["ISO/IEC 24617-2", "ISO/IEC", "Annotation sémantique de dialogue"],
                    ["IEEE P7007", "IEEE", "Transparence ontologique"],
                    ["IEEE P7008", "IEEE", "Nudging éthique des agents autonomes"],
                  ].map(([s, o, f]) => (
                    <tr key={s}>
                      <td className="border-b border-gray-200 p-2">{s}</td>
                      <td className="border-b border-gray-200 p-2">{o}</td>
                      <td className="border-b border-gray-200 p-2">{f}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- Section 6 */}
      <section ref={(el) => (sectionRefs.current[6] = el)} className="snap-section flex items-center bg-gradient-to-br from-gray-100 to-white">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Conclusion</h2>
          <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">L'avenir des systèmes multi-agents</h3>
            <p className="mb-4">
              Les SMA ouvriront la voie à des IA collaboratives capables de résoudre des problèmes complexes dans des environnements dynamiques.
            </p>
            <p className="mb-4">
              Leur évolution intègre apprentissage, adaptation et raisonnement avancés, transformant secteurs logistique, santé, finance, etc.
            </p>
            <p>
              Orchestrer efficacement ces intelligences collectives est un défi majeur mais prometteur.
            </p>
            <AIBadge />
          </div>
          <div className="rounded-xl bg-electric-blue p-6 text-white shadow-lg">
            <h3 className="mb-4 text-xl font-semibold">Prêt à créer votre système multi-agents&nbsp;?</h3>
            <p className="mb-6">
              Rejoignez notre communauté d'experts et accédez à des ressources exclusives pour développer vos propres SMA.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <Button variant="secondary" className="w-full">
                Télécharger le guide complet (PDF)
              </Button>
              <Button variant="secondary" className="w-full">
                Discussion avec un expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating ask‑me‑anything */}
      <AskMeAnything />
    </div>
  )
}

export default Index
