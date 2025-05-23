
import { useState } from 'react';
import { Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AIBadge = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="ai-badge flex items-center bg-blue-50 rounded-md px-3 py-1.5 text-sm text-gray-700 max-w-fit mt-3 mb-2 shadow-sm border border-blue-100">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
        <path d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z" stroke="#3A86FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="font-medium">Généré par IA</span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="ml-2 text-electric-blue hover:bg-blue-100 rounded-full p-1" onClick={() => setOpen(true)}>
            <Info size={16} />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pourquoi faisons-nous confiance à cette réponse ?</DialogTitle>
            <DialogDescription className="text-left">
              Cette réponse a été générée par un modèle d'intelligence artificielle spécialement formé sur notre documentation concernant les systèmes multi-agents en IA. Le contenu est basé sur des sources académiques et industrielles vérifiées.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 text-left">
            <h4 className="font-semibold">Nos garanties</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Revue par des experts en IA et systèmes multi-agents</li>
              <li>Basé sur des publications et standards reconnus (IEEE, FIPA)</li>
              <li>Mise à jour régulière avec les dernières recherches</li>
              <li>Transparence sur les limites des connaissances</li>
            </ul>
            <h4 className="font-semibold">Sources et références</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>IEEE Foundation for Intelligent Physical Agents (FIPA) Specifications</li>
              <li>MIT Multi-Agent Systems Laboratory Research Papers</li>
              <li>Stanford AI Index Report 2024</li>
              <li>Gartner Research sur l'IA collaborative (2023-2025)</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIBadge;
