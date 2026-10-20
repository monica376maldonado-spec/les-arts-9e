import React, { useState, useMemo } from 'react';
import { forumStructureGuide, examSampleCamille } from '../data/workshopData';
import { 
  PenTool, 
  Copy, 
  Check, 
  MessageSquare, 
  BookOpen, 
  Award, 
  Send, 
  ChevronRight, 
  Sparkles,
  Info
} from 'lucide-react';

export const ProductionEcrite: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'studio' | 'structure' | 'modele'>('studio');
  const [copied, setCopied] = useState(false);

  // Form state for Activité 3.2
  const [formData, setFormData] = useState({
    titre: '',
    salutation: '',
    lancerDebat: '',
    arg1: '',
    arg2: '',
    exemplePerso: '',
    reagir: '',
    remerciements: '',
    signature: ''
  });

  const [activeField, setActiveField] = useState<string>('titre');

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInsertExpression = (expr: string) => {
    const currentVal = (formData as Record<string, string>)[activeField] || '';
    const updatedVal = currentVal ? `${currentVal} ${expr}` : expr;
    setFormData(prev => ({ ...prev, [activeField]: updatedVal }));
  };

  const fullText = useMemo(() => {
    const parts = [
      formData.titre ? `# ${formData.titre}\n` : '',
      formData.salutation,
      formData.lancerDebat,
      formData.arg1,
      formData.arg2,
      formData.exemplePerso,
      formData.reagir,
      formData.remerciements,
      formData.signature
    ].filter(Boolean);
    return parts.join('\n\n');
  }, [formData]);

  const wordCount = useMemo(() => {
    if (!fullText.trim()) return 0;
    return fullText.trim().split(/\s+/).filter(Boolean).length;
  }, [fullText]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFillExampleIdeas = () => {
    setFormData({
      titre: "Faut-il vraiment relooker la Joconde ?",
      salutation: "Salut les amis !",
      lancerDebat: "Aujourd’hui, je voudrais parler d'une question qui divise : est-ce une bonne idée de transformer les œuvres d'art pour les rendre plus amusantes ?",
      arg1: "D’abord, je pense que ces détournements rendent l'art beaucoup plus accessible aux collégiens. Par exemple, quand Philippe Geluck met Le Chat dans des toiles célèbres, on découvre ces peintures sans s'ennuyer.",
      arg2: "Ensuite, cela ne détruit pas le patrimoine, au contraire, cela éveille notre curiosité. Grâce à l'humour, on apprend à observer les détails des tableaux.",
      exemplePerso: "Personnellement, l’année dernière, j'ai visité une exposition où Zep avait revisité des tableaux anciens. Avant cette visite, je n'aimais pas les musées, mais là, nous avons beaucoup ri avec ma classe !",
      reagir: "Qu’est-ce que vous en pensez ? Êtes-vous pour ou contre ce genre d'initiatives ?",
      remerciements: "Merci pour votre attention et vos retours !",
      signature: "Camille"
    });
  };

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium uppercase tracking-wider mb-2">
            <span>Partie 3</span>
            <span aria-hidden="true">·</span>
            <span>Production écrite</span>
            <span aria-hidden="true">·</span>
            <span>Le message sur un forum</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Exprimer son opinion & débattre sur un forum
          </h2>
          <p className="text-sm sm:text-base text-stone-300 mt-2 leading-relaxed">
            Apprenez à structurer une argumentation convaincante pour l'examen de 9e année (150 mots) : 
            posez une question percutante, avancez des arguments illustrés, partagez une anecdote vécue au passé et invitez les lecteurs à réagir.
          </p>
        </div>
      </div>

      {/* Sub-navigation bar */}
      <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg max-w-md border border-stone-200">
        <button
          onClick={() => setActiveSubTab('studio')}
          className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${
            activeSubTab === 'studio'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Studio d'écriture (Activité 3.2)
        </button>
        <button
          onClick={() => setActiveSubTab('structure')}
          className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${
            activeSubTab === 'structure'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Structure du forum (3.1)
        </button>
        <button
          onClick={() => setActiveSubTab('modele')}
          className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all ${
            activeSubTab === 'modele'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Sujet modèle d'examen (3.3)
        </button>
      </div>

      {/* VIEW 1 : STUDIO D'ÉCRITURE GUIDÉ (Activité 3.2) */}
      {activeSubTab === 'studio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Form Writer */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-xl p-6 border border-stone-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                    Activité 3.2
                  </span>
                  <h3 className="text-lg font-bold font-serif text-stone-900 mt-0.5">
                    Rédige ton message de débat
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleFillExampleIdeas}
                    className="text-xs text-amber-800 hover:text-amber-950 font-medium px-2.5 py-1 bg-amber-50 rounded border border-amber-200 hover:bg-amber-100 transition-colors"
                  >
                    Remplir avec des idées modèles
                  </button>
                </div>
              </div>

              {/* Subject box */}
              <div className="mt-4 p-3.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-stone-800 leading-relaxed">
                <strong>Sujet d'examen :</strong> Sur le forum de ton école, un débat est lancé : 
                <em> « Faut-il transformer les œuvres d’art pour les rendre plus amusantes ? »</em>. Écris ton message en respectant la structure apprise.
              </div>

              {/* Useful Expressions quick insert toolbox */}
              <div className="mt-5 p-3 rounded-lg bg-stone-50 border border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                    Boîte à outils d'expressions utiles (clique pour insérer dans le champ actif) :
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {([
                    "Salut à tous !",
                    "Est-ce une bonne idée de... ?",
                    "D'abord,",
                    "Par exemple,",
                    "Ensuite,",
                    "De plus,",
                    "Personnellement,",
                    "L'année dernière,",
                    "Il y avait...",
                    "Qu'est-ce que vous en pensez ?",
                    "Merci pour votre attention."
                  ]).map((expr) => (
                    <button
                      key={expr}
                      type="button"
                      onClick={() => handleInsertExpression(expr)}
                      className="px-2.5 py-1 text-xs bg-white hover:bg-amber-50 text-stone-700 hover:text-amber-900 border border-stone-200 hover:border-amber-300 rounded transition-colors"
                    >
                      + {expr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guided Fields */}
              <div className="mt-6 space-y-4">
                {/* 1. Titre */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    1. Titre (court et percutant)
                  </label>
                  <input
                    type="text"
                    value={formData.titre}
                    onFocus={() => setActiveField('titre')}
                    onChange={(e) => handleFieldChange('titre', e.target.value)}
                    placeholder="Ex: Faut-il transformer les œuvres d'art pour les rendre plus amusantes ?"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                  />
                </div>

                {/* 2. Salutation */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    2. Formule d'appel informelle
                  </label>
                  <input
                    type="text"
                    value={formData.salutation}
                    onFocus={() => setActiveField('salutation')}
                    onChange={(e) => handleFieldChange('salutation', e.target.value)}
                    placeholder="Ex: Salut à tous ! / Bonjour tout le monde !"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                  />
                </div>

                {/* 3. Lancer le débat */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    3. Lancer le débat (présente le sujet et pose la question)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.lancerDebat}
                    onFocus={() => setActiveField('lancerDebat')}
                    onChange={(e) => handleFieldChange('lancerDebat', e.target.value)}
                    placeholder="Ex: Aujourd'hui, je voudrais parler de... Que pensez-vous de..."
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                  />
                </div>

                {/* 4. Argument 1 + exemple */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    4. Argument 1 + Exemple (D'abord... Par exemple...)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.arg1}
                    onFocus={() => setActiveField('arg1')}
                    onChange={(e) => handleFieldChange('arg1', e.target.value)}
                    placeholder="Ex: D'abord, ces parodies rendent l'art accessible. Par exemple, quand Philippe Geluck..."
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                  />
                </div>

                {/* 5. Argument 2 + exemple */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    5. Argument 2 + Exemple (Ensuite... De plus...)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.arg2}
                    onFocus={() => setActiveField('arg2')}
                    onChange={(e) => handleFieldChange('arg2', e.target.value)}
                    placeholder="Ex: De plus, l'humour ne détruit pas le patrimoine. En observant les dessins de Zep..."
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                  />
                </div>

                {/* 6. Exemple personnel (PC & IMP) */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    6. Exemple personnel vécue (Passé composé et Imparfait)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.exemplePerso}
                    onFocus={() => setActiveField('exemplePerso')}
                    onChange={(e) => handleFieldChange('exemplePerso', e.target.value)}
                    placeholder="Ex: Personnellement, l'année dernière, j'ai visité une exposition... Il y avait..."
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                  />
                </div>

                {/* 7. Appel à réagir */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    7. Encouragement à réagir
                  </label>
                  <input
                    type="text"
                    value={formData.reagir}
                    onFocus={() => setActiveField('reagir')}
                    onChange={(e) => handleFieldChange('reagir', e.target.value)}
                    placeholder="Ex: Qu'est-ce que vous en pensez ?"
                    className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                  />
                </div>

                {/* 8. Remerciements et Signature */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      8. Remerciements
                    </label>
                    <input
                      type="text"
                      value={formData.remerciements}
                      onFocus={() => setActiveField('remerciements')}
                      onChange={(e) => handleFieldChange('remerciements', e.target.value)}
                      placeholder="Ex: Merci pour votre attention."
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Signature (Ton prénom)
                    </label>
                    <input
                      type="text"
                      value={formData.signature}
                      onFocus={() => setActiveField('signature')}
                      onChange={(e) => handleFieldChange('signature', e.target.value)}
                      placeholder="Ex: Alex"
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Forum Preview & Word Counter */}
          <div className="lg:col-span-5 space-y-6 sticky top-20">
            {/* Word Counter & Exam Check */}
            <div className="bg-white rounded-xl p-5 border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">
                  Compteur de mots officiel :
                </span>
                <span className={`text-sm font-mono font-bold ${
                  wordCount >= 130 && wordCount <= 170
                    ? 'text-emerald-700'
                    : wordCount > 0 && wordCount < 130
                    ? 'text-amber-700'
                    : 'text-stone-400'
                }`}>
                  {wordCount} mots (objectif ~150)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    wordCount >= 130 && wordCount <= 170
                      ? 'bg-emerald-500'
                      : wordCount > 170
                      ? 'bg-amber-500'
                      : 'bg-stone-400'
                  }`}
                  style={{ width: `${Math.min(100, (wordCount / 150) * 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-400 mt-2 font-mono">
                <span>0 mot</span>
                <span>Idéal : 130-160 mots</span>
                <span>200+ mots</span>
              </div>

              {/* Checklist */}
              <div className="mt-4 pt-4 border-t border-stone-100 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  {formData.titre ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <div className="w-3.5 h-3.5 rounded-full border border-stone-300" />}
                  <span className={formData.titre ? 'text-stone-800' : 'text-stone-400'}>Titre accrocheur</span>
                </div>
                <div className="flex items-center gap-2">
                  {formData.arg1 && formData.arg2 ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <div className="w-3.5 h-3.5 rounded-full border border-stone-300" />}
                  <span className={formData.arg1 && formData.arg2 ? 'text-stone-800' : 'text-stone-400'}>2 arguments avec exemples précis</span>
                </div>
                <div className="flex items-center gap-2">
                  {formData.exemplePerso ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <div className="w-3.5 h-3.5 rounded-full border border-stone-300" />}
                  <span className={formData.exemplePerso ? 'text-stone-800' : 'text-stone-400'}>Expérience vécue (Passé composé + Imparfait)</span>
                </div>
                <div className="flex items-center gap-2">
                  {formData.reagir ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <div className="w-3.5 h-3.5 rounded-full border border-stone-300" />}
                  <span className={formData.reagir ? 'text-stone-800' : 'text-stone-400'}>Question finale pour inciter au débat</span>
                </div>
              </div>
            </div>

            {/* Authentically Styled Forum Post Preview */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
              <div className="bg-stone-900 text-stone-100 px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>Forum du Collège · Espace Culture</span>
                </div>
                <span className="text-[11px] text-stone-400 font-mono">En direct</span>
              </div>

              <div className="p-6 space-y-4">
                {formData.titre ? (
                  <h4 className="text-lg font-bold font-serif text-stone-900 border-b border-stone-100 pb-2">
                    {formData.titre}
                  </h4>
                ) : (
                  <h4 className="text-sm italic text-stone-400 border-b border-stone-100 pb-2">
                    [Titre de ton message ici]
                  </h4>
                )}

                <div className="flex items-center gap-3 text-xs text-stone-500">
                  <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs">
                    {formData.signature ? formData.signature[0].toUpperCase() : 'E'}
                  </div>
                  <div>
                    <span className="font-semibold text-stone-800">
                      {formData.signature || 'Élève de 9e'}
                    </span>
                    <span className="text-stone-400 ml-2">Posté aujourd'hui</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-stone-800 leading-relaxed font-serif">
                  {formData.salutation && <p className="font-sans font-medium text-stone-900">{formData.salutation}</p>}
                  {formData.lancerDebat && <p>{formData.lancerDebat}</p>}
                  {formData.arg1 && <p>{formData.arg1}</p>}
                  {formData.arg2 && <p>{formData.arg2}</p>}
                  {formData.exemplePerso && <p>{formData.exemplePerso}</p>}
                  {formData.reagir && <p className="font-sans font-semibold text-stone-900">{formData.reagir}</p>}
                  {formData.remerciements && <p className="text-stone-600">{formData.remerciements}</p>}
                  {formData.signature && <p className="font-sans font-bold text-stone-900">{formData.signature}</p>}

                  {!fullText.trim() && (
                    <p className="text-stone-400 italic font-sans text-xs">
                      Remplis les champs à gauche pour voir ton message de forum prendre vie en direct !
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={handleCopy}
                    disabled={!fullText.trim()}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg transition-colors disabled:opacity-40"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copié dans le presse-papier !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copier mon texte complet</span>
                      </>
                    )}
                  </button>

                  <span className="text-xs text-stone-400 font-mono">
                    {wordCount} mots
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2 : STRUCTURE D'UN MESSAGE DE FORUM (Activité 3.1) */}
      {activeSubTab === 'structure' && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Activité 3.1
            </span>
            <h3 className="text-xl font-bold font-serif text-stone-900 mt-0.5">
              La structure d’un message de forum
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Retrouvez les 8 étapes clés indispensables pour réussir l'épreuve de production écrite.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold text-[11px]">
                  <th className="py-3 px-3 w-1/4">Partie du message</th>
                  <th className="py-3 px-3 w-2/5">Ce que je dois faire</th>
                  <th className="py-3 px-3">Expressions utiles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {forumStructureGuide.map((step, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-3 font-semibold text-stone-900 whitespace-nowrap align-top">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-800 text-[11px] font-mono flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span>{step.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-stone-700 leading-relaxed align-top">
                      {step.role}
                    </td>
                    <td className="py-3.5 px-3 align-top">
                      <div className="flex flex-wrap gap-1">
                        {step.expressions.map((expr, i) => (
                          <span
                            key={i}
                            className="text-stone-800 font-serif italic text-xs bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
                          >
                            {expr}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3 : EXEMPLE SUJET D'EXAMEN (Activité 3.3) */}
      {activeSubTab === 'modele' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Activité 3.3
                </span>
                <h3 className="text-xl font-bold font-serif text-stone-900 mt-0.5">
                  Exemple officiel de sujet d'examen rédigé (150 mots)
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 bg-stone-100 rounded text-stone-800">
                Longueur : {examSampleCamille.wordCount} mots
              </span>
            </div>

            {/* Sujet consigne */}
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 text-xs sm:text-sm text-stone-800 leading-relaxed">
              <strong className="block text-stone-900 mb-1">Consigne officielle :</strong>
              Sur un forum consacré à la culture, vous présentez un musée ou une exposition que vous avez visité(e) et qui vous a particulièrement plu(e). 
              Présentez le lieu (nom, ville, type de musée). Racontez quand et avec qui vous l’avez visité(e). 
              Décrivez une œuvre qui a attiré votre attention. Expliquez ce que vous avez appris, ce que vous avez ressenti et pourquoi vous recommandez cette expérience. (150 mots)
            </div>

            {/* Camille's Exemplary Post */}
            <div className="p-6 rounded-xl border border-amber-200 bg-amber-50/30 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                <h4 className="text-lg font-bold font-serif text-stone-900">
                  {examSampleCamille.title}
                </h4>
                <span className="text-xs text-amber-900 font-medium bg-amber-100 px-2.5 py-0.5 rounded">
                  Modèle Camille · Note : 20/20
                </span>
              </div>

              <div className="space-y-3 font-serif text-sm sm:text-base text-stone-800 leading-relaxed">
                <p className="font-sans font-semibold text-stone-900">{examSampleCamille.salutation}</p>
                <p>Est-ce que visiter un musée peut changer votre journée ? Pour moi, oui, et je voudrais vous en parler !</p>
                <p>
                  Un musée est un lieu où l’on découvre de très belles œuvres. Par exemple, au Musée d’Orsay, à Paris, 
                  j’ai vu <strong>« La Nuit étoilée sur le Rhône »</strong> de Van Gogh, un tableau que je voulais voir depuis longtemps. 
                  Les couleurs étaient vraiment magnifiques et je suis resté(e) dix minutes devant !
                </p>
                <p>
                  On apprend aussi énormément de choses. Par exemple, j’ai appris que Van Gogh avait peint cette œuvre dehors, 
                  pendant la nuit, ce qui m’a beaucoup surpris(e).
                </p>
                <p>
                  Le mois dernier, j’ai visité ce musée avec ma sœur. Il y avait beaucoup de monde, mais nous étions très contents. 
                  J’étais profondément ému(e), et c’est pour ça que je recommande cette visite. Allez-y, c’est vraiment génial !
                </p>
                <p className="font-sans font-semibold text-stone-900">Qu’est-ce que vous en pensez ?</p>
                <p className="text-stone-600">Merci pour votre attention.</p>
                <p className="font-sans font-bold text-stone-900">Camille</p>
              </div>
            </div>

            {/* Breakdown Analysis Cards */}
            <div className="mt-8 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Analyse pas-à-pas de la rédaction de Camille :
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {examSampleCamille.breakdown.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg border border-stone-200 bg-stone-50 text-xs">
                    <span className="font-semibold text-amber-800 block mb-1">
                      {item.label}
                    </span>
                    <p className="text-stone-700 italic font-serif">
                      « {item.text} »
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
