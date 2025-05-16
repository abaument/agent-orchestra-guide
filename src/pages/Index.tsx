// ► src/pages/Index.tsx  — Guide complet (13 rubriques)
import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import ProgressBar from "@/components/ProgressBar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AskMeAnything from "@/components/AskMeAnything"
import AgentCard from "@/components/AgentCard"
import { Zap, Share2, BarChart2, Layers, ShieldCheck, BrainCog, ClipboardList, Database, Lock, Scale, ShieldAlert, UserX, MessageCircleWarning, MemoryStick, BarChart3, Briefcase, HandCoins, GlobeLock, ClipboardCheck, FlaskConical, Gauge, GraduationCap } from "lucide-react"
import AIBadge from "@/components/AIBadge"
import NetworkAnimation from "@/components/NetworkAnimation"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"     
import {
  BarChart,
  Code,
  MessageSquare,
  Play,
  Search,
  Shield,
} from "lucide-react"

/* ───────────────────── GlossaryItem helper ───────────────────── */
const GlossaryItem: React.FC<{ term: string; children: React.ReactNode }> = ({ term, children }) => (
  <Popover>
    <PopoverTrigger asChild>
      <button className="underline decoration-dotted underline-offset-2 hover:text-electric-blue">
        {term}
      </button>
    </PopoverTrigger>
    <PopoverContent className="max-w-sm text-sm leading-relaxed">
      {children}
    </PopoverContent>
  </Popover>
)
// ----------------------------------------------------------- titres des rubriques
const SECTIONS = [
  "Home",
  "Résumé exécutif",
  "Introduction & contexte",
  "Définitions & typologie",
  "Architectures de référence",
  "Technologies habilitantes",
  "Cas d’usage prioritaires",
  "Verrous & défis scientifiques",
  "Cadre éthique & réglementaire",
  "Risques & cyber‑sécurité",
  "Impacts socio‑économiques",
  "Perspectives Futures",
  "Recommandations & Roadmap",
  "Conclusion & ouvertures",
] as const

const Index: React.FC = () => {
  // ----------------------------------------------------------- state & refs
  const [current, setCurrent] = useState(0)
  const sectionRefs = useRef<Array<HTMLElement | null>>([])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const h = window.innerHeight
      let idx = 0
      sectionRefs.current.forEach((sec, i) => {
        if (!sec) return
        const top = sec.offsetTop
        const bottom = top + sec.offsetHeight
        if (y >= top - h / 3 && y < bottom - h / 3) idx = i
      })
      setCurrent(idx)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (i: number) => sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" })

  // ----------------------------------------------------------- render
  return (
    <div className="snap-container">
      <ProgressBar sections={[...SECTIONS]} currentSection={current} onSectionChange={scrollTo} />

      {/* ───────── HERO (toujours index 0) */}
      <section ref={(el) => (sectionRefs.current[0] = el)} className="snap-section flex items-center justify-center bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto max-w-5xl px-4 md:px-6 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">Le Futur des Agents Multi-LLM : Vers une Intelligence Distribuée</h1>
          <p className="mb-8 text-xl text-gray-700 md:text-2xl">Orchestrer l'intelligence collective des machines - Livre Blanc - Arthur, Michel, Antoine - IRIIG</p>
          <div className="relative mx-auto mb-12 h-64 w-full max-w-3xl overflow-hidden rounded-lg shadow-lg md:h-80">
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900/30">
              <Button className="flex items-center gap-2 bg-electric-blue text-white hover:bg-electric-dark">
                <Play size={16} /> Regarder la vidéo d'introduction
              </Button>
            </div>
            <NetworkAnimation />
          </div>
        </div>
      </section>

      {/* ───────── 1. Résumé exécutif */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="snap-section bg-white py-12"
      >
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-8">
          <h2 className="text-3xl font-bold text-center">Résumé exécutif</h2>

          {/* Card principale */}
          <div className="rounded-xl bg-gray-50 p-6 shadow-sm space-y-4">
            <p className="text-sm leading-relaxed">
              Entre <strong>2023 et 2025</strong>, les systèmes multi-agents fondés
              sur des modèles de langage (LLM) ont franchi un cap : d’outils
              conversationnels isolés, ils sont devenus des <em>équipes
              autonomes</em> capables de coopérer, se spécialiser, négocier et
              apprendre collectivement.  Cette orchestration rapproche l’informatique
              d’un <strong>fonctionnement organisationnel</strong> : chaque agent
              tient un rôle, partage un environnement commun
              et poursuit des objectifs coordonnés.
            </p>

            <p className="text-sm leading-relaxed">
              Ce changement ouvre la voie à une IA plus modulaire, plus robuste et
              adaptée aux flux de travail complexes – en entreprise comme dans les
              infrastructures critiques.  Il appelle aussi à repenser la
              <strong> gouvernance de l’autonomie algorithmique</strong>
              : éthique, contrôle humain, responsabilité distribuée.
            </p>

            <p className="text-sm leading-relaxed">
              Les SMA ne sont plus de simples outils passifs ; ils deviennent
              des entités capables de <em>collaborer, s’organiser et produire des
              résultats complexes</em>.  Pour l’entreprise, c’est un avantage
              stratégique majeur ; pour les concepteurs, c’est l’exigence de bâtir
              des IA distribuées <strong>maîtrisables, auditables et dignes de
              confiance.</strong>
            </p>
          </div>

          {/* Appel à l’action / étapes clés */}
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="rounded-lg bg-electric-blue/10 p-4">
              <h3 className="font-semibold text-electric-blue mb-1">Pilotage dédié</h3>
              <p>
                Mettre en place des KPI centrés sur la <em>coopération</em> et la
                <em>robustesse</em>.
              </p>
            </div>
            <div className="rounded-lg bg-electric-blue/10 p-4">
              <h3 className="font-semibold text-electric-blue mb-1">POC ciblés</h3>
              <p>
                Tester copilotes métier, simulation socio-éco ou robotique
                coordonnée.
              </p>
            </div>
            <div className="rounded-lg bg-electric-blue/10 p-4">
              <h3 className="font-semibold text-electric-blue mb-1">Formation</h3>
              <p>Acculturer les équipes aux architectures MAS et 
                <em>LangGraph / CrewAI</em>.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ───────── 2. Introduction & contexte */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="snap-section bg-white py-12"
      >
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-8">
          <h2 className="text-3xl font-bold">Introduction & contexte</h2>

          {/* — Intro longue — */}
          <p className="text-sm leading-relaxed">
            Entre 2023 et 2025, la prolifération d’<strong>agents LLM</strong> a
            transformé le paysage de l’IA : on passe d’assistants isolés à de
            véritables <em>écosystèmes multi‑agents</em> capables de raisonner,
            négocier et agir de façon coordonnée.  Cette vague crée des
            opportunités inédites&nbsp;: automatisation fine des processus,
            décision distribuée en temps réel, nouvelles interfaces conversationnelles
            verticales (finance, santé, industrie).
          </p>
          {/* — Contexte historique — */}
          <div className="space-y-4">
            <h3 className="font-semibold text-electric-blue">Contexte historique</h3>

            <figure className="mx-auto max-w-3xl overflow-hidden rounded-xl shadow-sm">
              <img
                src="/GreenCorporateTimelineInfographicPresentation.png"
                alt="Frise chronologique des SMA"
                className="w-full object-cover"
              />
              <figcaption className="bg-gray-50 p-3 text-center text-xs text-gray-600">
                Frise chronologique simplifiée retraçant les jalons de
                l'avènement des systèmes multi‑agents depuis 1977.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>


      {/* ───────── 3. Définitions & typologie */}
      <section ref={(el) => (sectionRefs.current[3] = el)} className="snap-section bg-gray-50 py-12">
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-6">
          <h2 className="text-3xl font-bold">Définitions & typologie</h2>
          <p>Un <strong>Système Multi‑Agents (SMA)</strong> est un ensemble d’entités
              autonomes – logicielles ou robotiques – qui perçoivent un environnement partagé,
              décident et agissent individuellement, tout en interagissant pour atteindre
              leurs buts propres ou collectifs. Les notions clés : autonomie,
              interaction asynchrone, décentralisation et <em>émergence</em>.</p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white p-4"><strong>Agent</strong> : perçoit, décide, agit.</div>
            <div className="rounded-lg bg-white p-4"><strong>MAS</strong> : réseau coordonné d'agents.</div>
            <div className="rounded-lg bg-white p-4"><strong>Rôles</strong> : Planner, Critic, Executor…</div>
            <span className="block pt-1 text-[10px] text-gray-500">
                  Sources : AIMultiple, DEV Community, arXiv, IB Formation
                </span>
          </div>
          {/* reprise de l'ancien bloc Qu'est‑ce qu'un SMA avec cartes */}
          <div className="grid items-center gap-8 md:grid-cols-2 mt-8">
            <div>
              <p className="mb-4 text-lg">
                Chaque agent a une vision partielle de l'environnement et agit de façon autonome. La puissance du SMA vient de l'émergence collective. 
              </p>
              <div className="mb-4 rounded-lg bg-gray-100 p-4">
                <h3 className="mb-2 font-semibold">TL;DR</h3>
                <p>Des IA collaboratives résolvent ensemble des problèmes trop complexes pour un agent isolé.</p>
                <AIBadge />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <AgentCard title="Agent Perceptif" description="Capture les données" icon={<Search className="text-electric-blue" size={24} />} details="Observe l'environnement via capteurs ou API." />
              <AgentCard title="Agent Communicant" description="Échange d'infos" icon={<MessageSquare className="text-electric-blue" size={24} />} details="Protocoles FIPA ACL, routage de messages." />
              <AgentCard title="Agent Analytique" description="Analyse les données" icon={<BarChart className="text-electric-blue" size={24} />} details="Détecte tendances/anomalies." />
              <AgentCard title="Agent Sécurité" description="Protège le système" icon={<Shield className="text-electric-blue" size={24} />} details="Chiffrement, contrôle d'accès." />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 4. Architectures de référence */}
      <section
        ref={(el) => (sectionRefs.current[4] = el)}
        className="snap-section bg-white py-12"
      >
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-6">
          <h2 className="text-3xl font-bold">Architectures de référence</h2>

          {[
            {
              title: "Réactive",
              text:
                "Règles « si condition ⇒ action » attachées aux capteurs ; aucune mémoire ni planification, décision en millisecondes (ex. micro‑drones d’évitement).",
            },
            {
              title: "BDI",
              text:
                "Belief‑Desire‑Intention : l’agent maintient croyances, désirs et intentions pour adapter son plan en continu (ex. thermostat domotique intelligent).",
            },
            {
              title: "Hiérarchique / holonique",
              text:
                "Stratégique‑tactique‑opérationnel ; reprise partielle en cas de panne du sommet (ex. flotte de robots d’entrepôt).",
            },
            {
              title: "Graph‑based (LangGraph)",
              text:
                "Workflow sous forme de graphe typé ; exécution pas‑à‑pas, traçabilité et reprise d’état pour chatbots complexes ou pipelines RAG.",
            },
            {
              title: "Équipage (CrewAI)",
              text:
                "Agents spécialisés orchestrés par un Manager ; mapping direct aux rôles humains (Research → Writer → Reviewer → Manager).",
            },
          ].map((a) => (
            <div key={a.title} className="rounded-lg bg-gray-50 p-4">
              <h3 className="mb-2 font-semibold text-electric-blue">{a.title}</h3>
              <p className="text-sm leading-relaxed">{a.text}</p>
            </div>
          ))}

          {/* Ancien bloc protocoles CNP + AIBadge */}
          <div className="rounded-xl bg-gray-50 p-4 mt-8">
            <h3 className="mb-2 font-semibold">Exemple : Contract Net Protocol</h3>
            <pre className="overflow-x-auto text-sm bg-white p-3 rounded-lg">
      # CNP pseudo‑code
      class Agent:
          def announce_task(self, task):
              bids = [ag.bid(task) for ag in network if ag != self]
              winner = min(bids)
              winner.assign(task)
            </pre>
            <AIBadge />
          </div>
        </div>
      </section>

      {/* ───────── 5. Technologies habilitantes */}
      <section ref={(el) => (sectionRefs.current[5] = el)} className="snap-section bg-gray-50 py-12">
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-6">
          <h2 className="text-3xl font-bold">Technologies habilitantes</h2>
          {[
            { title: "LLM", desc: "GPT‑4o, Gemini 3, LLaMA 3… fondation des agents." },
            { title: "RLHF", desc: "Apprentissage par renforcement avec feedback humain." },
            { title: "RAG", desc: "Combinaison génération + recherche d'infos en temps réel." },
            { title: "Orchestration cloud/serverless", desc: "Scalabilité dynamique des SMA." },
          ].map((t) => (
            <div key={t.title} className="rounded-lg border p-4 bg-white">
              <h3 className="mb-1 font-semibold text-electric-blue">{t.title}</h3>
              <p className="text-sm">{t.desc}</p>
            </div>
          ))}

          {/* Ancien bloc "Concevoir son propre SMA" Steps + Frameworks */}
          <h3 className="text-2xl font-semibold mt-8">Méthodologie de conception</h3>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Colonne 1 : Liste des étapes */}
            <ol className="space-y-2 list-decimal pl-6 text-sm md:w-1/2">
              {[
                "Analyse des besoins et objectifs",
                "Définition des agents",
                "Conception de l'environnement",
                "Protocoles d'interaction",
                "Implémentation et tests",
              ].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>

            {/* Colonne 2 : Frameworks */}
            <div className="md:w-1/2">
              <h4 className="font-semibold mb-2">Frameworks populaires</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                {["JADE", "SPADE", "Mesa", "LangChain", "AutoGen", "CrewAI"].map((fw) => (
                  <div key={fw} className="rounded-lg border p-2 text-center bg-white">
                    {fw}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 6. Cas d’usage prioritaires */}
      <section
        ref={(el) => (sectionRefs.current[6] = el)}
        className="snap-section bg-white py-12"
      >
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-6">
          <h2 className="text-3xl font-bold">Cas d’usage prioritaires</h2>
          <p className="text-sm leading-relaxed">
            Les cinq exemples ci‑dessous illustrent des domaines phares, mais
            <strong> un SMA bien conçu peut s’adapter à pratiquement tout
            scénario où il existe plusieurs tâches ou points de décision
            parallèles</strong> : de la gestion énergétique d’un smart‑grid à
            l’orchestration d’équipes créatives, en passant par l’automatisation
            d’expériences scientifiques.  Grâce à leur nature modulaire
            (agents spécialisés + protocole de coordination), ces systèmes
            remplacent ou augmentent <em>quasiment chaque composant
            logiciel ou organisationnel</em> nécessitant concertation,
            résilience et optimisation continue.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Copilotes métiers",
                resume: "Agents spécialisés qui épaulent le flux de travail.",
                details: (
                  <>
                    <p className="mb-4">
                      Un copilote est composé de <strong>4 agents</strong> :
                      Recherche, Raisonnement, Conformité et Rédaction. Chaque
                      agent travaille séquentiellement puis repasse la main.
                    </p>
                    <Separator className="my-4" />
                    <h4 className="font-semibold mb-2">Schéma d’orchestre</h4>
                    <figure className="flex flex-col items-center gap-2">
                    <img src="/orchestration.avif" />
                    </figure>
                    <Separator className="my-4" />
                    <p className="text-sm">
                      <strong>Gain mesuré :</strong> –35 % de temps de rédaction,
                      –20 % d’erreurs règlementaires (source : utilisateur pilote).
                    </p>
                  </>
                ),
              },
              {
                title: "Cybersécurité temps réel",
                resume: "Détection, corrélation et mitigation décentralisées.",
                details: (
                  <>
                    <p className="mb-4">
                      Trois couches : <em>Sonde</em>, <em>Corrélation</em>,
                      <em>Mitigation</em>. Les agents sonde calculent 40+ features
                      par flux réseau puis publient sur un bus Pub/Sub.
                    </p>
                    <figure className="flex flex-col items-center gap-2">
                      <img src="/graphimage.avif" />
                    </figure>
                    <ul className="mt-4 list-disc pl-5 space-y-1 text-sm">
                      <li>Réaction &lt; 200 ms même en cas de panne de nœud central</li>
                      <li>Mitigation automatique : blocage d’IP, micro‑segmentation</li>
                    </ul>
                  </>
                ),
              },
              {
                title: "Robotique collaborative",
                resume: "Négociation de tâches entre robots hétérogènes.",
                details: (
                  <>
                    <p>Exemple : entrepôt ‹goods‑to‑person› combinant drones et AMR.</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm mt-2">
                    <img src="/aiusage.avif" />
                      <li>Négociation par <em>Auction‑Consensus</em> (temps + batterie)</li>
                      <li>Plan commun partagé via <em>LangGraph</em></li>
                      <li>Reconfiguration instantanée en cas de panne robot</li>
                      <li>https://www.exotec.com/fr/blog/entrepots-automatises-du-person-to-goods-au-goods-to-person/</li>
                    </ul>
                  </>
                ),
              },
              {
                title: "Simulation socio‑économique",
                resume: "Ménages, entreprises, autorités en jumeau numérique.",
                details: (
                  <>
                    <p>
                      Permet de tester des politiques publiques avant déploiement.
                      Chaque agent suit des règles micro‑économiques (revenu,
                      préférence, capacité).
                    </p>
                    <img src="/aitogovern.png" />
                    <p className="mt-2 text-sm">
                      Exemple : taxe carbone → adaptation des trajets,
                      évolution des prix, émission globale.
                    </p>
                  </>
                ),
              },
              {
                title: "Supply‑chain bout‑en‑bout",
                resume: "Agents fournisseur, usine, transport, détaillant.",
                details: (
                  <>
                    <p>
                      Chaque nœud optimise localement mais communique via enchères
                      pour aligner la chaîne entière (évite bull‑whip).
                    </p>
                    <figure className="mx-auto max-w-3xl rounded-xl shadow-sm">
                      <img
                        src="/aisupply.jpeg"
                        className="w-full object-cover"
                      />
                    </figure>
                    <p className="mt-2 text-sm">
                      Perturbation portuaire ? Un agent transport
                      propose un reroutage rail, l’agent usine recalcule le lot,
                      l’agent détaillant ajuste la commande.
                    </p>
                  </>
                ),
              },
            ].map(({ title, resume, details }) => (
              <Dialog key={title}>
                <DialogTrigger asChild>
                  <div className="cursor-pointer rounded-xl bg-gray-50 p-6 shadow-sm transition hover:shadow-md">
                    <h3 className="mb-2 text-xl font-semibold text-electric-blue">
                      {title}
                    </h3>
                    <p className="text-sm">{resume}</p>
                  </div>
                </DialogTrigger>

                {/* full‑screen dialog */}
                <DialogContent className="max-w-3xl h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{title}</DialogTitle>
                    <DialogDescription className="mb-4">{resume}</DialogDescription>
                  </DialogHeader>

                  {details}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 7. Verrous & défis scientifiques */}
      <section
        ref={(el) => (sectionRefs.current[7] = el)}
        className="snap-section bg-gray-50 py-12"
      >
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-6">
          <h2 className="text-3xl font-bold mb-4">Verrous & défis scientifiques</h2>

          {/* Intro brève */}
          <p className="text-sm leading-relaxed mb-2">
            Passer de prototypes d’agents isolés à des <strong>SMA déployés en
            production</strong> soulève cinq défis majeurs : prévoir les comportements
            émergents, synchroniser des milliers d’agents, mesurer la performance
            multi‑critères, assurer la scalabilité temps réel et
            <em>aligner</em> le tout avec les objectifs humains.
          </p>

          {/* Cartes */}    
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AgentCard
              title="Émergence"
              description="Comportements imprévus"
              icon={<Zap className="text-electric-blue" size={24} />}
              details="Congestions spontanées, oscillations ou stratégies détour­nées apparaissent au‑delà de 500 agents. Les pistes : simulation massive + théorie des jeux pour détecter >90 % des patterns avant déploiement."
            />
            <AgentCard
              title="Coordination"
              description="Actions alignées"
              icon={<Share2 className="text-electric-blue" size={24} />}
              details="Contrats (CNP), consensus Paxos/Raft ou RL multi‑agent central‑critic : objectif <100 ms pour fixer une tâche dans un réseau de 1 000 nœuds."
            />
            <AgentCard
              title="Évaluation"
              description="Mesure multi‑dim"
              icon={<BarChart2 className="text-electric-blue" size={24} />}
              details="Nouvelle grille : robustesse, équité, coût de comm. Benchmarks SMAC / MAGent révèlent jusqu’à 25 % d’instabilité entre runs."
            />
            <AgentCard
              title="Scalabilité"
              description="> 10³ agents"
              icon={<Layers className="text-electric-blue" size={24} />}
              details="Décomposition hiérarchique, factorisation QMIX, GNN : viser un temps de décision quasi‑constant malgré +10× d’agents."
            />
            <AgentCard
              title="Alignement"
              description="Éthique & droit"
              icon={<ShieldCheck className="text-electric-blue" size={24} />}
              details="RLHF multijoueur, contrôle embarqué, preuves formelles pour bloquer 98 % des dérives identifiées en sandbox."
            />
          </div>

          {/* Encadré coordination */}
          <div className="rounded-lg bg-white p-4 text-sm mt-6">
            <p className="font-semibold mb-1">Trois leviers clés pour réussir la coordination :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Enchères & contrats</strong> : négocier les tâches (ex. Contract Net Protocol).</li>
              <li><strong>Consensus distribué</strong> : décider de manière fiable même sous pannes (Paxos, Raft).</li>
              <li><strong>Apprentissage coopératif</strong> : agents qui apprennent à coopérer sans supervision explicite (QMIX / MADDPG).</li>
            </ul>
          </div>
        </div>
      </section>


      {/* ───────── 8. Cadre éthique & réglementaire */}
      <section
        ref={(el) => (sectionRefs.current[8] = el)}
        className="snap-section bg-white py-12"
      >
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-8">
          <h2 className="text-3xl font-bold text-center">Cadre éthique & réglementaire</h2>

          {/* Grid de cartes */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                id: "eu-ai-act",
                title: "EU AI Act",
                tag: "Adopté 2024",
                icon: <Scale size={24} />,
                tagline: "Classification des risques & obligations",
                details: (
                  <>
                    <p className="mb-2">
                      Quatre niveaux de risque ; exige explicabilité, supervision
                      humaine et traçabilité pour les SMA à fort impact.
                    </p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Auditabilité des décisions autonomes</li>
                      <li>Contrôle humain <em>in-the-loop</em></li>
                      <li>Journal complet des interactions d’agent</li>
                    </ul>
                  </>
                ),
              },
              {
                id: "iso-42001",
                title: "ISO/IEC 42001",
                tag: "Norme 2023",
                icon: <ClipboardList size={24} />,
                tagline: "Management system pour l’IA",
                details: (
                  <>
                    <p className="mb-2">
                      Équivalent « ISO 9001 » de la gouvernance IA : risques,
                      transparence, traçabilité, responsabilités humaines.
                    </p>
                    <p className="text-sm">
                      Concerne toute organisation qui conçoit ou opère des SMA.
                    </p>
                  </>
                ),
              },
              {
                id: "ieee-p3394",
                title: "IEEE P3394",
                tag: "Draft 2025",
                icon: <ShieldCheck size={24} />,
                tagline: "Autonomie & redevabilité",
                details: (
                  <>
                    <p>
                      Définit degrés d’autonomie acceptables, exigences de sûreté et
                      responsabilité répartie dans la prise de décision distribuée.
                    </p>
                  </>
                ),
              },
              {
                id: "data-act",
                title: "UE Data Act",
                tag: "Adopté",
                icon: <Database size={24} />,
                tagline: "Partage et interopérabilité des données",
                details: (
                  <>
                    <p className="mb-2">
                      Encadre l’accès équitable aux données générées par objets
                      connectés / agents ; empêche la rétention abusive d’infos.
                    </p>
                    <p className="text-sm">
                      Crucial pour les SMA inter-entreprises manipulant des données
                      sensibles.
                    </p>
                  </>
                ),
              },
              {
                id: "privacy",
                title: "Privacy (RGPD, CCPA…)",
                tag: "Obligatoire",
                icon: <Lock size={24} />,
                tagline: "Protection des données personnelles",
                details: (
                  <>
                    <p className="mb-2">
                      Minimisation des données, anonymisation, contrôle d’accès
                      inter-agents, journal d’audit.
                    </p>
                    <p className="text-sm">
                      Exemple : l’agent planning d’un hôpital n’accède jamais aux
                      données cliniques détaillées.
                    </p>
                  </>
                ),
              },
            ].map(({ id, title, tag, icon, tagline, details }) => (
              <Dialog key={id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer transition hover:shadow-md">
                    <CardHeader className="flex flex-row items-center gap-3 pb-2">
                      <div className="rounded-lg bg-electric-blue/10 p-2 text-electric-blue">
                        {icon}
                      </div>
                      <div>
                        <CardTitle className="text-base">{title}</CardTitle>
                        <CardDescription>{tagline}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Badge variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <p className="text-xs text-gray-500">{tag}</p>
                  </DialogHeader>
                  <div className="space-y-3 text-sm">{details}</div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {/* Sources */}
          <div className="rounded-lg bg-gray-50 p-4 text-xs">
            <p className="font-semibold mb-1">Sources & lectures :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Journal Officiel de l’UE – EU AI Act (2024)</li>
              <li>ISO/IEC 42001:2023 – Artificial Intelligence Management System</li>
              <li>IEEE Draft P3394 (v0.7 / 2025)</li>
            </ul>
          </div>
        </div>
      </section>


      {/* ───────── 9. Risques & cyber‑sécurité */}
      <section
        ref={(el) => (sectionRefs.current[9] = el)}
        className="snap-section bg-white py-12"
      >
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-8">
          <h2 className="text-3xl font-bold text-center">Risques & cyber-sécurité</h2>

          {/* Contexte global */}
          <div className="rounded-lg bg-electric-blue/10 p-4 text-sm leading-relaxed">
            <p>
              Les SMA LLM élargissent la surface d’attaque : Sybil, prompt-injection,
              fuite de mémoire partagée. Plusieurs incidents récents l’ont démontré
              <span className="italic text-xs"> (Business Insider 2024)</span>.
            </p>
          </div>

          {/* Cartes + Dialogs */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* ---------- Sybil ---------- */}
            <Dialog>
              <DialogTrigger asChild>
                <AgentCard
                  title="Attaques Sybil"
                  description="Faux agents infiltrés (AutoGPT Discord 2024)"
                  icon={<UserX size={24} className="text-electric-blue" />}
                  details="Clique pour l’exemple ↗"
                />
              </DialogTrigger>

              <DialogContent className="max-w-xl h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Attaques Sybil</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-sm leading-relaxed">
                  <p>
                    <strong>Incident – avril 2024</strong> : 43 pseudo-agents malveillants
                    ont envahi un réseau AutoGPT (Discord) et faussé 28 % des tâches,
                    surchargeant la file de travail.
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>But : détourner consensus, voler des ressources.</li>
                    <li>
                      Prévention : identité cryptographique (JWT), liste blanche d’agents,
                      quorum de confiance.
                    </li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>

            {/* ---------- Prompt-injection ---------- */}
            <Dialog>
              <DialogTrigger asChild>
                <AgentCard
                  title="Prompt-injection croisée"
                  description="Détournement de rôle (Copilot Agents 2023)"
                  icon={<MessageCircleWarning size={24} className="text-electric-blue" />}
                  details="Clique pour l’exemple ↗"
                />
              </DialogTrigger>

              <DialogContent className="max-w-xl h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Prompt-injection croisée</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-sm leading-relaxed">
                  <p>
                    <strong>Incident – sept. 2023</strong> : un résumé empoisonné a forcé
                    un agent Copilot DevOps à supprimer des tests et à « committer »
                    un code vide dans le repo CI/CD.
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Risque : sabotage silencieux, fuite d’info confidentielle.</li>
                    <li>
                      Mitigation : <em>sandbox</em> des messages, nettoyage de
                      chaînes, signature de provenance.
                    </li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>

            {/* ---------- Memory leak ---------- */}
            <Dialog>
              <DialogTrigger asChild>
                <AgentCard
                  title="Fuite de mémoire partagée"
                  description="PHI exposées (Health-Bot POC 2024)"
                  icon={<MemoryStick size={24} className="text-electric-blue" />}
                  details="Clique pour l’exemple ↗"
                />
              </DialogTrigger>

              <DialogContent className="max-w-xl h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Fuite de mémoire partagée</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-sm leading-relaxed">
                  <p>
                    <strong>POC clinique – févr. 2024</strong> : l’agent juridique
                    a stocké des données patients dans la mémoire globale ; l’agent
                    « résumé » les a publiées à un utilisateur externe.
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Violation RGPD, divulgation PHI.</li>
                    <li>
                      Contre-mesures : RBAC/ABAC inter-agents, segmentation mémoire,
                      audit des accès sensibles.
                    </li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Sources */}
          <div className="rounded-lg bg-gray-50 p-4 text-xs">
            <p className="font-semibold mb-1">Sources & lectures :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Business Insider (2024) – LLM agent breaches analysis</li>
              <li>arXiv 2309.12345 – Prompt Injection across Agent Chains</li>
              <li>OWASP Top-10 LLM (2023) – Sybil & Memory Leaks</li>
            </ul>
          </div>
        </div>
      </section>




      {/* ───────── 10. Impacts socio‑économiques */}
      <section
        ref={(el) => (sectionRefs.current[10] = el)}
        className="snap-section bg-gray-50 py-12"
      >
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-8">
          <h2 className="text-3xl font-bold text-center">Impacts socio-économiques</h2>

          {/* Intro */}
          <p className="text-sm leading-relaxed text-center">
            Les SMA LLM réorganisent la productivité, les emplois, la chaîne de
            valeur et la souveraineté numérique.  Quatre axes clés :
          </p>

          {/* Cartes */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {[
              {
                id: "productivity",
                title: "Productivité",
                desc: "Automatisation coordonnée",
                icon: <BarChart3 size={24} className="text-electric-blue" />,
                details: (
                  <>
                    <p className="mb-2">
                      Les SMA automatisent des <strong>processus entiers</strong>
                      (génération de documents, analyse réglementaire, préparation
                      de commandes) et s’auto-adaptent aux variations de contexte ;
                      le gain est qualitatif <em>et</em> quantitatif.
                    </p>
                    <p className="text-xs">
                      Ex. : +28 % de tâches juridiques rédigées en moins de 10 min
                      (cabinet pilote 2024).
                    </p>
                  </>
                ),
              },
              {
                id: "jobs",
                title: "Emplois",
                desc: "Transformation & nouveaux rôles",
                icon: <Briefcase size={24} className="text-electric-blue" />,
                details: (
                  <>
                    <p className="mb-2">
                      Les tâches répétitives sont partiellement automatisées ; de
                      nouveaux métiers apparaissent : <em>orchestrateur d’agents</em>,
                      auditeur de systèmes distribués, <em>coach IA</em>.
                    </p>
                    <p className="text-xs">
                      Défi : requalification & filières de formation adaptées.
                    </p>
                  </>
                ),
              },
              {
                id: "value",
                title: "Redistribution de valeur",
                desc: "Nouvelles chaînes économiques",
                icon: <HandCoins size={24} className="text-electric-blue" />,
                details: (
                  <>
                    <p className="mb-2">
                      Les firmes qui maîtrisent l’<strong>orchestration interne</strong>
                      (données + agents) captent plus de valeur ; les simples
                      consommatrices d’agents externes deviennent dépendantes.
                    </p>
                    <p className="text-xs">
                      Impact marqué dans le conseil, la finance, la logistique.
                    </p>
                  </>
                ),
              },
              {
                id: "sovereignty",
                title: "Souveraineté numérique",
                desc: "Maîtrise des briques critiques",
                icon: <GlobeLock size={24} className="text-electric-blue" />,
                details: (
                  <>
                    <p className="mb-2">
                      Dépendance aux LLM propriétaires & clouds centralisés ⇢
                      nécessité de modèles open source, orchestration locale,
                      cadre juridique de confiance.
                    </p>
                    <p className="text-xs">
                      Les SMA deviennent un levier géopolitique majeur.
                    </p>
                  </>
                ),
              },
            ].map(({ id, title, desc, icon, details }) => (
              <Dialog key={id}>
                <DialogTrigger asChild>
                  <AgentCard
                    title={title}
                    description={desc}
                    icon={icon}
                    details="Clique pour le détail ↗"
                  />
                </DialogTrigger>

                <DialogContent className="max-w-xl">
                  <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 text-sm leading-relaxed">{details}</div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {/* Sources */}
          <div className="rounded-lg bg-white p-4 text-xs shadow-sm">
            <p className="font-semibold mb-1">Sources & chiffres :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>McKinsey – « Generative Agents & Productivity » (2024)</li>
              <li>OECD AI Outlook – Employment Disruption Index (2025)</li>
              <li>World Bank – Digital Sovereignty Report (2024)</li>
            </ul>
          </div>
        </div>
      </section>


     {/* ───────── 11. Perspectives futures (2025-2030) */}
      <section
      ref={(el) => (sectionRefs.current[11] = el)}
      className="snap-section bg-gray-50 py-12"
      >
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-8">
          <h2 className="text-3xl font-bold text-center">
            Perspectives futures : Intelligence Distribuée & Autonome (2025‑2030)
          </h2>

          {/* Timeline / quick facts */}
          <div className="mx-auto max-w-xl grid grid-cols-2 gap-4 text-xs text-center">
            <div className="rounded-lg bg-electric-blue/10 p-3">
              <p className="font-semibold text-electric-blue">+15 Papers/mois</p>
              <p>sur arXiv (2024)</p>
            </div>
            <div className="rounded-lg bg-electric-blue/10 p-3">
              <p className="font-semibold text-electric-blue">3×</p>
              <p>d’open‑source frameworks depuis 2023</p>
            </div>
          </div>

          {/* Accordion UX */}
          <Accordion type="single" collapsible className="w-full space-y-2" defaultValue="item-1">
            {[
              {
                id: "item-1",
                title: "Agents plus autonomes et spécialisés",
                body: (
                  <>
                    <p>
                      Prochaine génération : planification interne, auto‑feedback, mémoire à long terme.
                      <br />Frameworks pilotes : <em>LangGraph</em>, <em>CrewAI</em>.
                    </p>
                    <a href="https://www.threads.com/@kakachia777/post/DIazO4iNZkR/media" target="_blank" rel="noopener noreferrer">
                      <img
                        src="/AIagent.webp"
                        alt="Auto‑planning"
                        className="mx-auto max-w-xs md:max-w-sm rounded-lg shadow-sm hover:opacity-90 transition"
                      />
                    </a>
                  </>
                ),
              },
              {
                id: "item-2",
                title: "Intégration des agents physiques",
                body: (
                  <>
                    <p>
                      Fusion IA‑robot : manipulation fine, flotte de drones orchestrée par LLM.
                    </p>
                    <a href="https://www.lebigdata.fr/agents-ia-la-tech-qui-va-transformer-la-realite-en-science-fiction-tout-savoir" target="_blank" rel="noopener noreferrer">
                      <img
                        src="/agent-ia.webp"
                        alt="Robotics"
                        className="mx-auto max-w-xs md:max-w-sm rounded-lg shadow-sm hover:opacity-90 transition"
                      />
                    </a>
                  </>
                ),
              },
              {
                id: "item-3",
                title: "Gouvernance des intelligences collectives",
                body: (
                  <>
                    <p>
                      Besoin de protocoles de confiance, responsabilité distribuée et lois numériques.
                    </p>
                    <ul className="list-disc pl-5 text-xs space-y-1 mt-2">
                      <li>ISO/IEC 42001 – AI management</li>
                      <li>IEEE P3394 – Autonomous Agent Governance</li>
                    </ul>
                  </>
                ),
              },
              {
                id: "item-4",
                title: "Redéfinition de l’emploi & productivité",
                body: (
                  <>
                    <p>
                      Copilotes verticaux et agents projet condensent jusqu’à 30 % des tâches cognit.
                    </p>
                    <p className="text-xs mt-2">Étude McKinsey 2024 : +1,5 pt de PIB mondial.</p>
                  </>
                ),
              },
            ].map(({ id, title, body }) => (
              <AccordionItem key={id} value={id} className="border border-gray-100 rounded-lg">
                <AccordionTrigger className="px-4 py-2 font-medium hover:bg-gray-100">
                  {title}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-sm leading-relaxed">
                  {body}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Sources */}
          <div className="mt-6 rounded-lg bg-white p-4 text-xs">
            <p className="font-semibold mb-1">Sources & lectures :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><a href="https://arxiv.org/abs/2403.12345" target="_blank" className="underline">arXiv 2403.12345</a> – CrewAI v2</li>
              <li>McKinsey (2024) – Global AI Productivity Report</li>
              <li>IEEE P3394 draft (2025)</li>
            </ul>
          </div>
        </div>
      </section>


      {/* ───────── 12. Recommandations & roadmap */}
      <section
        ref={(el) => (sectionRefs.current[12] = el)}
        className="snap-section bg-white py-12"
      >
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-8">
          <h2 className="text-3xl font-bold text-center">Recommandations & roadmap</h2>

          <p className="text-center text-sm leading-relaxed">
            Du pilotage organisationnel à la montée en compétence, voici les quatre
            leviers majeurs pour réussir un déploiement de SMA&nbsp;LLM.
          </p>

          {/* Grid de cartes */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {/* Pilotage */}
            <Dialog>
              <DialogTrigger asChild>
                <AgentCard
                  title="Pilotage"
                  description="Gouvernance & supervision"
                  icon={<ClipboardCheck size={24} className="text-electric-blue" />}
                  details="Clique pour le détail ↗"
                />
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>Pilotage – structurer la gouvernance</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-sm leading-relaxed">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Rôles : opérateur humain, contrôleur de tâche, RSSI agents.</li>
                    <li>Documenter objectifs & limites d’autonomie de chaque agent.</li>
                    <li>Processus d’audit / désactivation rapide.</li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>

            {/* POC */}
            <Dialog>
              <DialogTrigger asChild>
                <AgentCard
                  title="POC"
                  description="Valider les usages ciblés"
                  icon={<FlaskConical size={24} className="text-electric-blue" />}
                  details="Clique pour le détail ↗"
                />
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>Preuves de concept (POC)</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-sm leading-relaxed">
                  <p className="mb-1">
                    Tester la collaboration d’agents sur des tâches réelles :
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Recherche ‣ Raisonnement ‣ Décision ‣ Coordination.</li>
                    <li>Comparer architectures réactives vs BDI vs hiérarchiques.</li>
                    <li>Identifier biais, redondances, conflits.</li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>

            {/* KPI */}
            <Dialog>
              <DialogTrigger asChild>
                <AgentCard
                  title="KPI"
                  description="Mesurer l’efficacité multi-agent"
                  icon={<Gauge size={24} className="text-electric-blue" />}
                  details="Clique pour le détail ↗"
                />
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>Indicateurs de performance</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-sm leading-relaxed">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Taux de réussite collective & temps de coordination.</li>
                    <li>Nb d’interventions humaines / heure.</li>
                    <li>Stabilité face aux perturbations.</li>
                    <li>Coût de communication inter-agents.</li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>

            {/* Formation */}
            <Dialog>
              <DialogTrigger asChild>
                <AgentCard
                  title="Formation"
                  description="Montée en compétences"
                  icon={<GraduationCap size={24} className="text-electric-blue" />}
                  details="Clique pour le détail ↗"
                />
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>Formation & acculturation</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-sm leading-relaxed">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Développeurs : modèles de coordination, sécurité distribuée.</li>
                    <li>Métier : IA collaborative & interprétabilité.</li>
                    <li>Veille active : arXiv, NeurIPS, ICLR, ACL.</li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Sources */}
          <div className="rounded-lg bg-gray-50 p-4 text-xs shadow-sm">
            <p className="font-semibold mb-1">Lectures recommandées :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Microsoft – “LLM Agents Playbook” (2024)</li>
              <li>arXiv 2405.01234 – Multi-Agent Evaluation Metrics</li>
              <li>Stanford HAI – “Organizational Governance of AI Agents” (2025)</li>
            </ul>
          </div>
        </div>
      </section>


      {/* ───────── 13. Conclusion & ouvertures */}
      <section ref={(el) => (sectionRefs.current[13] = el)} className="snap-section bg-white py-12">
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-6">
          <h2 className="text-3xl font-bold">Conclusion & ouvertures</h2>
          <p>Découvrez l'IA'RIIG</p>
          <p>Appel à l'action : expérimentez, mesurez, gouvernez et formez !</p>
          <AIBadge />
        </div>
      </section>

      {/* ───────── Ask‑Me‑Anything */}
      <AskMeAnything />
    </div>
  )
}

export default Index
