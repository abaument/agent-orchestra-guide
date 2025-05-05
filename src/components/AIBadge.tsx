
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
    <>
      <div className="ai-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z" stroke="#3A86FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Généré par IA</span>
        <DialogTrigger asChild>
          <button className="ml-1 text-electric-blue" onClick={() => setOpen(true)}>
            <Info size={12} />
          </button>
        </DialogTrigger>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pourquoi faisons-nous confiance à cette réponse ?</DialogTitle>
            <DialogDescription>
              Cette réponse a été générée par un modèle d'intelligence artificielle spécialement formé sur notre documentation concernant les systèmes multi-agents en IA. Le contenu est basé sur des sources académiques et industrielles vérifiées.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <h4 className="font-semibold">Nos garanties</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Revue par des experts en IA et systèmes multi-agents</li>
              <li>Basé sur des publications et standards reconnus (IEEE, FIPA)</li>
              <li>Mise à jour régulière avec les dernières recherches</li>
              <li>Transparence sur les limites des connaissances</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIBadge;
