
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, MessageSquare, Search, Shield, BarChart, Code } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
import AskMeAnything from '@/components/AskMeAnything';
import AgentCard from '@/components/AgentCard';
import NetworkAnimation from '@/components/NetworkAnimation';
import AIBadge from '@/components/AIBadge';

const SECTIONS = [
  "Hero",
  "Qu'est-ce qu'un système multi-agents ?",
  "Architectures & Protocoles",
  "Cas d'usage",
  "Concevoir son propre SMA",
  "Gouvernance & Éthique", 
  "Conclusion"
];

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Determine which section is currently in view
      let currentIndex = 0;
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop - windowHeight / 3 && scrollPosition < sectionBottom - windowHeight / 3) {
          currentIndex = index;
        }
      });
      
      setCurrentSection(currentIndex);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionChange = (index: number) => {
    const section = sectionRefs.current[index];
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div ref={containerRef} className="snap-container">
      {/* Progress Bar */}
      <ProgressBar 
        sections={SECTIONS} 
        currentSection={currentSection} 
        onSectionChange={handleSectionChange} 
      />
      
      {/* Hero Section */}
      <div
        ref={el => sectionRefs.current[0] = el}
        className="snap-section bg-gradient-to-br from-white to-blue-50 flex items-center justify-center"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 animate-fade-in" style={{animationDelay: '0.1s'}}>
              Les multi-agents IA
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-700 animate-fade-in" style={{animationDelay: '0.3s'}}>
              Orchestrer l'intelligence collective des machines
            </p>
            <div className="relative mb-12 w-full max-w-3xl mx-auto h-64 md:h-80 rounded-lg overflow-hidden shadow-lg animate-fade-in" style={{animationDelay: '0.5s'}}>
              <div className="absolute inset-0 bg-gray-900/30 flex items-center justify-center z-10">
                <Button className="bg-electric-blue hover:bg-electric-dark text-white flex items-center gap-2">
                  <Play size={16} />
                  Regarder la vidéo d'introduction
                </Button>
              </div>
              <div className="absolute inset-0">
                <NetworkAnimation />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{animationDelay: '0.7s'}}>
              <Button onClick={() => handleSectionChange(1)} variant="default" className="bg-electric-blue hover:bg-electric-dark">
                Explorer le guide
              </Button>
              <Button variant="outline" className="border-electric-blue text-electric-blue hover:bg-electric-blue/10">
                Télécharger en PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Qu'est-ce qu'un système multi-agents? */}
      <div
        ref={el => sectionRefs.current[1] = el}
        className="snap-section bg-white flex items-center"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Qu'est-ce qu'un système multi-agents ?</h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-4">
                Un système multi-agents (SMA) est un ensemble d'entités autonomes intelligentes, appelées agents, qui interagissent dans un environnement partagé pour résoudre des problèmes complexes qu'un seul agent ne pourrait pas résoudre seul.
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2">TL;DR</h3>
                <p>
                  Les systèmes multi-agents sont des réseaux d'IA collaboratives qui résolvent ensemble des problèmes complexes par communication et coordination.
                </p>
                <AIBadge />
              </div>
              <p className="text-lg">
                Chaque agent possède une vision partielle de l'environnement et dispose de capacités de perception, de décision et d'action. La force des SMA réside dans leur capacité à faire émerger des comportements collectifs sophistiqués à partir d'interactions entre agents relativement simples.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <AgentCard 
                title="Agent Perceptif" 
                description="Capture et traite les données de l'environnement"
                icon={<Search className="text-electric-blue" size={24} />}
                details="L'agent perceptif utilise des capteurs virtuels ou physiques pour observer son environnement. Il peut s'agir d'une caméra, de capteurs acoustiques, ou d'API permettant d'accéder à des données. Ces informations sont ensuite structurées et transmises aux autres agents."
              />
              <AgentCard 
                title="Agent Communicant" 
                description="Assure l'échange d'informations entre agents"
                icon={<MessageSquare className="text-electric-blue" size={24} />}
                details="L'agent communicant implémente des protocoles d'échange standardisés (comme FIPA ACL) pour permettre le partage d'informations. Il gère la sérialisation des messages, leur routage et leur interprétation sémantique."
              />
              <AgentCard 
                title="Agent Analytique" 
                description="Traite les données pour en extraire du sens"
                icon={<BarChart className="text-electric-blue" size={24} />}
                details="L'agent analytique utilise des algorithmes d'apprentissage automatique et de traitement de données pour analyser les informations reçues. Il peut identifier des tendances, détecter des anomalies et générer des insights pour aider à la prise de décision."
              />
              <AgentCard 
                title="Agent Sécurité" 
                description="Protège le système et ses données"
                icon={<Shield className="text-electric-blue" size={24} />}
                details="L'agent de sécurité surveille les échanges et les actions pour détecter les comportements malveillants. Il implémente des mécanismes de chiffrement, d'authentification et de contrôle d'accès pour protéger l'intégrité du système multi-agents."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Architectures & Protocoles */}
      <div
        ref={el => sectionRefs.current[2] = el}
        className="snap-section bg-gray-100 flex items-center"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Architectures & Protocoles</h2>
          
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h3 className="text-xl font-semibold mb-4">Types d'architectures</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-electric-blue mb-2">Hiérarchique</h4>
                <p className="text-sm">
                  Organisation pyramidale avec des niveaux de contrôle et de subordination clairement définis, idéale pour des tâches nécessitant une coordination centralisée.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-electric-blue mb-2">Peer-to-Peer</h4>
                <p className="text-sm">
                  Réseau d'agents égaux communiquant directement entre eux sans contrôleur central, favorisant la robustesse et l'adaptabilité.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-electric-blue mb-2">Market-Based</h4>
                <p className="text-sm">
                  Système économique virtuel où les agents échangent des services via enchères ou négociations, optimisant l'allocation des ressources.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Protocols de communication</h3>
            <div className="mb-6">
              <h4 className="font-medium mb-2">Contract Net Protocol (CNP)</h4>
              <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`# Exemple de Contract Net Protocol en pseudo-code Python
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
        
    def bid_for_task(self, task):
        # Calcul du coût d'exécution de la tâche
        cost = self.calculate_cost(task)
        if self.can_execute(task):
            return cost
        return None
        
    def assign_task(self, task):
        self.tasks.append(task)
        self.execute_task(task)
`}</pre>
              </div>
            </div>
            <AIBadge />
          </div>
        </div>
      </div>

      {/* Section 3: Cas d'usage */}
      <div
        ref={el => sectionRefs.current[3] = el}
        className="snap-section bg-white flex items-center"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Cas d'usage</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Chaîne d'approvisionnement intelligente</h3>
              <p className="mb-4">
                Les systèmes multi-agents révolutionnent la gestion des chaînes d'approvisionnement en optimisant chaque étape du processus:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Prévision de la demande avec précision</li>
                <li>Optimisation des routes de livraison en temps réel</li>
                <li>Adaptation automatique aux perturbations</li>
                <li>Négociation autonome avec fournisseurs</li>
              </ul>
              <Button variant="outline" className="w-full border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white">
                Voir la démo
              </Button>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Systèmes de trading algorithmique</h3>
              <p className="mb-4">
                Dans le secteur financier, les SMA permettent de créer des écosystèmes de trading sophistiqués où différents agents spécialisés collaborent:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Agents d'analyse technique et fondamentale</li>
                <li>Agents de détection d'anomalies de marché</li>
                <li>Agents d'exécution optimisant les transactions</li>
                <li>Agents de gestion des risques</li>
              </ul>
              <Button variant="outline" className="w-full border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white">
                Voir la démo
              </Button>
            </div>
          </div>
          
          <div className="mt-8 bg-electric-blue/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Témoignage</h3>
            <blockquote className="italic">
              "L'implémentation d'un système multi-agents pour notre plateforme logistique a permis de réduire nos coûts opérationnels de 23% tout en améliorant la fiabilité des livraisons de 17%. La capacité du système à s'adapter en temps réel aux perturbations a transformé notre chaîne d'approvisionnement."
            </blockquote>
            <p className="mt-3 font-semibold">— Directrice des Opérations, Groupe Logistique International</p>
          </div>
        </div>
      </div>

      {/* Section 4: Concevoir son propre SMA */}
      <div
        ref={el => sectionRefs.current[4] = el}
        className="snap-section bg-gray-100 flex items-center"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Concevoir son propre SMA</h2>
          
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h3 className="text-xl font-semibold mb-4">Étapes clés de conception</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="bg-electric-blue rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shrink-0">1</div>
                <div>
                  <h4 className="font-semibold">Analyse des besoins et objectifs</h4>
                  <p className="text-sm text-gray-600">Identifiez clairement le problème à résoudre et les contraintes du système (performance, évolutivité, sécurité).</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="bg-electric-blue rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shrink-0">2</div>
                <div>
                  <h4 className="font-semibold">Définition des agents</h4>
                  <p className="text-sm text-gray-600">Spécifiez les types d'agents nécessaires, leurs rôles, capacités, objectifs et modèles comportementaux.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="bg-electric-blue rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shrink-0">3</div>
                <div>
                  <h4 className="font-semibold">Conception de l'environnement</h4>
                  <p className="text-sm text-gray-600">Modélisez l'environnement dans lequel les agents évoluent, incluant les ressources disponibles et les contraintes.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="bg-electric-blue rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shrink-0">4</div>
                <div>
                  <h4 className="font-semibold">Protocoles d'interaction</h4>
                  <p className="text-sm text-gray-600">Définissez comment les agents communiquent, collaborent et coordonnent leurs actions.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="bg-electric-blue rounded-full w-8 h-8 flex items-center justify-center text-white font-bold shrink-0">5</div>
                <div>
                  <h4 className="font-semibold">Implémentation et tests</h4>
                  <p className="text-sm text-gray-600">Développez un prototype, simulez le comportement du système et ajustez progressivement.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Frameworks et outils recommandés</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg text-center">
                <Code className="mx-auto mb-2 text-electric-blue" />
                <h4 className="font-medium">JADE</h4>
                <p className="text-xs text-gray-600">Framework Java pour systèmes multi-agents</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg text-center">
                <Code className="mx-auto mb-2 text-electric-blue" />
                <h4 className="font-medium">SPADE</h4>
                <p className="text-xs text-gray-600">Smart Python Agent Development Environment</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg text-center">
                <Code className="mx-auto mb-2 text-electric-blue" />
                <h4 className="font-medium">Mesa</h4>
                <p className="text-xs text-gray-600">Framework Python pour modélisation à base d'agents</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg text-center">
                <Code className="mx-auto mb-2 text-electric-blue" />
                <h4 className="font-medium">LangChain</h4>
                <p className="text-xs text-gray-600">Orchestration d'agents basés sur des LLMs</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg text-center">
                <Code className="mx-auto mb-2 text-electric-blue" />
                <h4 className="font-medium">AutoGen</h4>
                <p className="text-xs text-gray-600">Framework pour agents conversationnels multi-LLMs</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg text-center">
                <Code className="mx-auto mb-2 text-electric-blue" />
                <h4 className="font-medium">CrewAI</h4>
                <p className="text-xs text-gray-600">Orchestration d'équipes d'agents spécialisés</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: Gouvernance, sécurité et éthique */}
      <div
        ref={el => sectionRefs.current[5] = el}
        className="snap-section bg-white flex items-center"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Gouvernance, sécurité & éthique</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Principes de gouvernance</h3>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <span className="font-medium">Transparence</span>
                  <p className="text-sm text-gray-600">Capacité à expliquer les décisions et actions des agents.</p>
                </li>
                <li>
                  <span className="font-medium">Responsabilité</span>
                  <p className="text-sm text-gray-600">Attribution claire de la responsabilité des actions et décisions.</p>
                </li>
                <li>
                  <span className="font-medium">Contrôle humain</span>
                  <p className="text-sm text-gray-600">Supervision et capacité d'intervention humaine sur le système.</p>
                </li>
                <li>
                  <span className="font-medium">Audit et traçabilité</span>
                  <p className="text-sm text-gray-600">Enregistrement des actions pour analyse et vérification.</p>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Risques et mesures de sécurité</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">Attaques adversariales</h4>
                  <p className="text-sm text-gray-600">Implémentation de mécanismes de détection d'anomalies et validation multi-agents des décisions critiques.</p>
                </div>
                <div>
                  <h4 className="font-medium">Confiance et réputation</h4>
                  <p className="text-sm text-gray-600">Systèmes de notation entre agents pour évaluer la fiabilité des informations et services.</p>
                </div>
                <div>
                  <h4 className="font-medium">Confidentialité des données</h4>
                  <p className="text-sm text-gray-600">Chiffrement des communications et mécanismes de calcul préservant la confidentialité.</p>
                </div>
                <div>
                  <h4 className="font-medium">Comportements émergents</h4>
                  <p className="text-sm text-gray-600">Surveillance des comportements inattendus et garde-fous pour limiter les actions potentiellement nuisibles.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-electric-blue/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Standards et normes</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2 border-b-2 border-electric-blue/20">Standard</th>
                    <th className="text-left p-2 border-b-2 border-electric-blue/20">Organisation</th>
                    <th className="text-left p-2 border-b-2 border-electric-blue/20">Focus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border-b border-gray-200">FIPA</td>
                    <td className="p-2 border-b border-gray-200">IEEE</td>
                    <td className="p-2 border-b border-gray-200">Interopérabilité des agents</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-gray-200">ISO/IEC 24617-2</td>
                    <td className="p-2 border-b border-gray-200">ISO/IEC</td>
                    <td className="p-2 border-b border-gray-200">Annotation sémantique de dialogue</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-gray-200">IEEE P7007</td>
                    <td className="p-2 border-b border-gray-200">IEEE</td>
                    <td className="p-2 border-b border-gray-200">Transparence ontologique</td>
                  </tr>
                  <tr>
                    <td className="p-2">IEEE P7008</td>
                    <td className="p-2">IEEE</td>
                    <td className="p-2">Nudging éthique des agents autonomes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Section 6: Conclusion & CTA */}
      <div
        ref={el => sectionRefs.current[6] = el}
        className="snap-section bg-gradient-to-br from-gray-100 to-white flex items-center"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Conclusion</h2>
          
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h3 className="text-xl font-semibold mb-4">L'avenir des systèmes multi-agents</h3>
            <p className="mb-4">
              Les systèmes multi-agents représentent une approche fondamentale pour développer des intelligences artificielles collaboratives capables de résoudre des problèmes complexes dans des environnements dynamiques et incertains.
            </p>
            <p className="mb-4">
              À mesure que les technologies d'IA continueront d'évoluer, les SMA deviendront de plus en plus sophistiqués, intégrant des capacités d'apprentissage, d'adaptation et de raisonnement avancées.
            </p>
            <p>
              L'orchestration efficace de ces intelligences collectives constitue un défi majeur mais prometteur, ouvrant la voie à des applications révolutionnaires dans de nombreux domaines, de la logistique à la santé en passant par la finance et l'industrie.
            </p>
            <AIBadge />
          </div>
          
          <div className="bg-electric-blue text-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Prêt à créer votre système multi-agents ?</h3>
            <p className="mb-6">
              Rejoignez notre communauté d'experts et accédez à des ressources exclusives pour développer vos propres systèmes multi-agents.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="secondary" className="w-full">
                Télécharger le guide complet (PDF)
              </Button>
              <Button variant="secondary" className="w-full">
                Discussion avec un expert
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Ask-Me-Anything button */}
      <AskMeAnything />
    </div>
  );
};

export default Index;
