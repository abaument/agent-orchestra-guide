// ► src/pages/Index.tsx  — Guide complet (13 rubriques)
import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import ProgressBar from "@/components/ProgressBar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import AskMeAnything from "@/components/AskMeAnything"
import AgentCard from "@/components/AgentCard"
import { Zap, Share2, BarChart2, Layers, ShieldCheck, BrainCog } from "lucide-react"
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
          <h2 className="text-3xl font-bold">
            Résumé exécutif
          </h2>

          {/* — Résumé exécutif — */}
          <div className="space-y-4">
            <h3 className="font-semibold text-electric-blue">Résumé exécutif</h3>
            <p className="text-sm leading-relaxed">
              Entre 2023 et 2025, les agents basés sur des modèles de langage (LLM)
              sont passés d’outils isolés à des <strong>systèmes multi‑agents collaboratifs</strong>.
              Cette évolution ouvre la voie à une coordination efficace,
              une prise de décision distribuée et une automatisation avancée.
              Des acteurs majeurs –  Accenture, notamment –  déploient déjà ces systèmes,
              annonçant une adoption massive dans les prochaines années 
              <span className="italic text-xs">(WSJ)</span>.
            </p>
          </div>
        </div>
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-6">
          <p>
            Entre 2023 et 2025, les agents LLM ont évolué d'outils isolés vers des <strong>systèmes multi‑agents collaboratifs</strong>.
            Des acteurs majeurs comme Accenture et Google expérimentent déjà ces orchestrations à grande échelle.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Mettre en place un <strong>pilotage dédié</strong> et des KPI centrés sur la coopération.</li>
            <li>Lancer des <strong>POC</strong> ciblés (copilote métier, simulation, robotique).</li>
            <li>Former les équipes aux <strong>architectures MAS & LangGraph</strong>.</li>
          </ul>
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
      <section ref={(el) => (sectionRefs.current[8] = el)} className="snap-section bg-white py-12">
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-6">
          <h2 className="text-3xl font-bold">Cadre éthique & réglementaire</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>EU AI Act</li>
            <li>ISO/IEC 42001</li>
            <li>IEEE P3394</li>
            <li>Data Act</li>
            <li>Privacy / RGPD</li>
          </ul>
        </div>
      </section>

      {/* ───────── 9. Risques & cyber‑sécurité */}
      <section ref={(el) => (sectionRefs.current[9] = el)} className="snap-section bg-gray-50 py-12">
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-6">
          <h2 className="text-3xl font-bold">Risques & cyber‑sécurité</h2>
          <p>Les SMA LLM exposent des vulnérabilités telles que prompt‑injection croisée ou fuites de mémoire partagée. Des incidents récents soulignent la nécessité d'une défense multi‑agent.</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Attaques sybil</li>
            <li>Prompt‑injection croisée</li>
            <li>Fuite de mémoire partagée</li>
          </ul>
        </div>
      </section>

      {/* ───────── 10. Impacts socio‑économiques */}
      <section ref={(el) => (sectionRefs.current[10] = el)} className="snap-section bg-white py-12">
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-6">
          <h2 className="text-3xl font-bold">Impacts socio‑économiques</h2>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Productivité — +20‑30 % sur tâches cognitives répétitives</li>
            <li>Emplois — transformation des métiers, nouveaux rôles</li>
            <li>Redistribution de valeur — concentration vs modèles open‑source</li>
            <li>Souveraineté numérique — maîtrise des technologies clés</li>
          </ul>
        </div>
      </section>

      {/* ───────── 11. Perspectives futures (2025‑2030) */}
      <section ref={(el) => (sectionRefs.current[11] = el)} className="snap-section bg-gray-50 py-12">
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-6">
          <h2 className="text-3xl font-bold">Perspectives futures (2025‑2030)</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm">
            <li>Agents plus autonomes et spécialisés (auto‑objectifs, auto‑apprentissage).</li>
            <li>Intégration des agents physiques — convergence IA‑robotique.</li>
            <li>Gouvernance des intelligences collectives à grande échelle.</li>
            <li>Redéfinition des emplois et de la productivité.</li>
          </ol>
        </div>
      </section>

      {/* ───────── 12. REco& roadmap */}
      <section ref={(el) => (sectionRefs.current[11] = el)} className="snap-section bg-gray-50 py-12">
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-6">
          <h2 className="text-3xl font-bold">Recommandations & roadmap</h2>
          <ol className="list-decimal pl-6 space-y-2 text-sm">
            <li>Pilotage : Mise en place de structures de gouvernance claires.</li>
            <li>POC : Développement de preuves de concept pour tester les applications.</li>
            <li>KPI : Définition d'indicateurs de performance pertinents.</li>
            <li>Formation : Renforcement des compétences des équipes.(arXiv)</li>
          </ol>
        </div>
      </section>

      {/* ───────── 13. Conclusion & ouvertures */}
      <section ref={(el) => (sectionRefs.current[13] = el)} className="snap-section bg-white py-12">
        <div className="container mx-auto max-w-5xl px-4 md:px-6 space-y-6">
          <h2 className="text-3xl font-bold">Conclusion & ouvertures</h2>
          <p>Les SMA basés sur des LLM représentent une avancée majeure. Leur développement exige un équilibre entre performances techniques, exigences éthiques et cadre réglementaire.</p>
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
