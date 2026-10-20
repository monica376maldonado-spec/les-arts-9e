import React, { useState, useMemo } from 'react';
import { 
  doc1Vocab, 
  doc2Vocab, 
  grammarMemoCards 
} from '../data/workshopData';
import { VocabCard } from '../types';
import { 
  Search, 
  Volume2, 
  BookMarked, 
  FileText, 
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { speakFrenchText } from '../utils/speech';

export const Ressources: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'lexique' | 'memos' | 'methode'>('lexique');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Build complete vocabulary from workshop
  const allVocabCards = useMemo<VocabCard[]>(() => {
    const list: VocabCard[] = [
      { french: "un dessinateur", definition: "Une personne qui crée des dessins, par exemple pour une bande dessinée.", spanish: "un dibujante", category: "art-bd" },
      { french: "un tableau", definition: "Une peinture sur toile que l’on peut voir dans un musée.", spanish: "un cuadro / una pintura", category: "art-bd" },
      { french: "une exposition", definition: "Un événement où l’on présente des œuvres au public.", spanish: "una exposición", category: "art-bd" },
      { french: "un chef-d’œuvre", definition: "Une œuvre d’art très célèbre et d'une qualité exceptionnelle.", spanish: "una obra maestra", category: "art-bd" },
      { french: "un détournement artistique", definition: "Une création qui reprend une œuvre connue pour lui donner un nouveau sens humoristique ou critique.", spanish: "una reinterpretación artística", category: "art-bd" },
      { french: "projeter", definition: "Montrer une image ou vidéo sur un mur avec la lumière d’un appareil.", spanish: "proyectar", category: "art-bd" },
      { french: "un spécialiste", definition: "Une personne qui connaît très bien un domaine ou une discipline.", spanish: "un especialista / un experto", category: "art-bd" },
      { french: "accessible", definition: "Facile à comprendre, à découvrir ou à aborder pour tout le monde.", spanish: "accesible", category: "art-bd" },
      { french: "une bande dessinée (BD)", definition: "Une histoire racontée avec des dessins successifs dans des cases.", spanish: "una historieta / un cómic", category: "art-bd" },
      { french: "s’amuser", definition: "Passer un moment agréable, rire et jouer.", spanish: "divertirse", category: "art-bd" },
      { french: "emmener quelqu’un", definition: "Conduire ou accompagner une personne avec soi dans un lieu.", spanish: "llevar a alguien", category: "visite-musee" },
      { french: "rendre (+ adjectif)", definition: "Faire devenir : « rendre l’art accessible » = faire en sorte que l’art soit accessible.", spanish: "hacer que sea / volver (+ adjetivo)", category: "art-bd" },
      { french: "faire réfléchir", definition: "Pousser quelqu’un à penser sérieusement à quelque chose.", spanish: "hacer reflexionar", category: "debat-contemporain" },
      ...doc1Vocab,
      ...doc2Vocab
    ];

    // remove duplicates by french term
    const seen = new Set<string>();
    return list.filter(item => {
      const key = item.french.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

  const filteredVocab = useMemo(() => {
    return allVocabCards.filter(item => {
      const matchesSearch = 
        item.french.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.spanish.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [allVocabCards, searchQuery, selectedCategory]);

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium uppercase tracking-wider mb-2">
            <span>Espace Ressources</span>
            <span aria-hidden="true">·</span>
            <span>Accompagnement Élèves 9e</span>
            <span aria-hidden="true">·</span>
            <span>Boîte à outils de révision</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Ressources complémentaires pour réussir l'examen
          </h2>
          <p className="text-sm sm:text-base text-stone-300 mt-2 leading-relaxed">
            Consultez le lexique bilingue franco-espagnol avec prononciation audio, révisez les fiches mémos de grammaire
            et perfectionnez votre méthodologie pour le jour J.
          </p>
        </div>
      </div>

      {/* Navigation tabs for resources */}
      <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-100 rounded-lg max-w-lg border border-stone-200">
        <button
          onClick={() => setActiveSection('lexique')}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
            activeSection === 'lexique'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Lexique Franco-Espagnol
        </button>
        <button
          onClick={() => setActiveSection('memos')}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
            activeSection === 'memos'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Fiches Mémos Grammaire
        </button>
        <button
          onClick={() => setActiveSection('methode')}
          className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
            activeSection === 'methode'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Méthode Examen
        </button>
      </div>

      {/* ==================================================== */}
      {/* 1. LEXIQUE BILINGUE FRANCO-ESPAGNOL                  */}
      {/* ==================================================== */}
      {activeSection === 'lexique' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un mot en français, espagnol ou sa définition..."
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:border-amber-500 bg-stone-50/50"
                />
              </div>

              {/* Category Filter Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'all', label: 'Tous les termes' },
                  { id: 'art-bd', label: 'Art & BD' },
                  { id: 'debat-contemporain', label: 'Débat & Scandale' },
                  { id: 'visite-musee', label: 'Visite & Musées' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 text-xs rounded-md transition-colors whitespace-nowrap ${
                      selectedCategory === cat.id
                        ? 'bg-stone-900 text-white font-medium'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-2 text-xs text-stone-400">
              {filteredVocab.length} mots répertoriés
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVocab.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs hover:border-amber-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400">
                      {item.category === 'art-bd' ? 'Art & BD' : item.category === 'debat-contemporain' ? 'Débat' : 'Musée'}
                    </span>
                    <button
                      onClick={() => speakFrenchText(item.french)}
                      title="Écouter la prononciation"
                      className="p-1.5 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="text-base font-bold text-stone-900 font-serif">
                    {item.french}
                  </h4>

                  <p className="text-xs text-stone-700 mt-2 leading-relaxed">
                    {item.definition}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400">Espagnol :</span>
                  <span className="font-serif italic font-semibold text-amber-800">
                    {item.spanish}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* 2. FICHES MÉMOS GRAMMAIRE                            */}
      {/* ==================================================== */}
      {activeSection === 'memos' && (
        <div className="space-y-8">
          {grammarMemoCards.map((memo, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Fiche de Révision N°{idx + 1}
                </span>
                <h3 className="text-xl font-bold font-serif text-stone-900 mt-0.5">
                  {memo.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  {memo.concept}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {memo.points.map((pt, pIdx) => (
                  <div key={pIdx} className="p-5 rounded-lg border border-stone-200 bg-stone-50/60 space-y-3">
                    <span className="text-sm font-bold font-mono text-stone-900 px-2 py-0.5 bg-stone-200 rounded">
                      {pt.tag}
                    </span>
                    <p className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                      {pt.desc}
                    </p>
                    <div className="text-xs text-stone-600 space-y-1 pt-1 border-t border-stone-200">
                      <div><strong className="text-stone-800">Mots déclencheurs :</strong> {pt.triggers}</div>
                      <div className="italic text-stone-700 font-serif">Exemple : « {pt.example} »</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pro-Tip Box */}
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Conseil pour l'examen :</strong> {memo.tip}
                </p>
              </div>
            </div>
          ))}

          {/* Connecteurs Logiques d'argumentation */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-xl font-bold font-serif text-stone-900">
              Boîte à connecteurs logiques pour la production écrite
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Utilisez au moins 3 connecteurs différents dans votre message de forum pour obtenir le maximum de points.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-xs">
              <div className="p-4 rounded-lg border border-stone-200 bg-stone-50">
                <span className="font-semibold text-stone-900 block mb-2">1. Pour commencer</span>
                <ul className="space-y-1 text-stone-700 font-serif italic">
                  <li>• D’abord,</li>
                  <li>• Premièrement,</li>
                  <li>• En premier lieu,</li>
                  <li>• Tout d’abord,</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-stone-200 bg-stone-50">
                <span className="font-semibold text-stone-900 block mb-2">2. Pour ajouter une idée</span>
                <ul className="space-y-1 text-stone-700 font-serif italic">
                  <li>• Ensuite,</li>
                  <li>• De plus,</li>
                  <li>• En outre,</li>
                  <li>• Par ailleurs,</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-stone-200 bg-stone-50">
                <span className="font-semibold text-stone-900 block mb-2">3. Pour illustrer</span>
                <ul className="space-y-1 text-stone-700 font-serif italic">
                  <li>• Par exemple,</li>
                  <li>• C’est le cas de...</li>
                  <li>• Comme le montre...</li>
                  <li>• Notamment...</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-stone-200 bg-stone-50">
                <span className="font-semibold text-stone-900 block mb-2">4. Pour conclure & réagir</span>
                <ul className="space-y-1 text-stone-700 font-serif italic">
                  <li>• Finalement,</li>
                  <li>• En conclusion,</li>
                  <li>• C’est pour cela que...</li>
                  <li>• Qu’en pensez-vous ?</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* ==================================================== */}
      {/* 4. MÉTHODE POUR LE JOUR DE L'EXAMEN                  */}
      {/* ==================================================== */}
      {activeSection === 'methode' && (
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Conseils Pédagogiques Collège
            </span>
            <h3 className="text-xl font-bold font-serif text-stone-900 mt-0.5">
              La grille de relecture en 5 étapes pour le jour de l'examen
            </h3>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-lg border border-stone-200 bg-stone-50 flex items-start gap-3">
              <span className="font-mono font-bold text-base text-amber-800 shrink-0">1.</span>
              <div>
                <strong className="text-stone-900 block mb-0.5">Respect de la consigne et du format forum :</strong>
                <p className="text-stone-700">Avez-vous bien inclus un titre, une salutation informelle aux camarades, le lancement du débat, vos arguments et une formule de politesse finale ?</p>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-stone-200 bg-stone-50 flex items-start gap-3">
              <span className="font-mono font-bold text-base text-amber-800 shrink-0">2.</span>
              <div>
                <strong className="text-stone-900 block mb-0.5">Longueur du texte (150 mots environ) :</strong>
                <p className="text-stone-700">Une tolérance de ± 10% est acceptée (soit entre 135 et 165 mots). Comptez rapidement vos lignes si vous composez sur papier (environ 10 mots par ligne).</p>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-stone-200 bg-stone-50 flex items-start gap-3">
              <span className="font-mono font-bold text-base text-amber-800 shrink-0">3.</span>
              <div>
                <strong className="text-stone-900 block mb-0.5">Alternance Passé Composé / Imparfait dans l'exemple personnel :</strong>
                <p className="text-stone-700">Vérifiez que vous avez utilisé l'imparfait pour décrire le lieu ou les sentiments (« Il y avait du monde, le musée était grand... ») et le passé composé pour les événements précis (« J'ai vu ce tableau, nous avons pris le train... »).</p>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-stone-200 bg-stone-50 flex items-start gap-3">
              <span className="font-mono font-bold text-base text-amber-800 shrink-0">4.</span>
              <div>
                <strong className="text-stone-900 block mb-0.5">Richesse du vocabulaire de l'art :</strong>
                <p className="text-stone-700">Réutilisez les mots appris dans le dossier : <em>chef-d'œuvre, exposition, détournement artistique, patrimoine, rendre accessible, public</em>.</p>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-stone-200 bg-stone-50 flex items-start gap-3">
              <span className="font-mono font-bold text-base text-amber-800 shrink-0">5.</span>
              <div>
                <strong className="text-stone-900 block mb-0.5">Chasse aux fautes d'accord :</strong>
                <p className="text-stone-700">Vérifiez les accords sujets-verbes, le pluriel des adjectifs, et les participes passés avec être (« je suis resté(e) »).</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
