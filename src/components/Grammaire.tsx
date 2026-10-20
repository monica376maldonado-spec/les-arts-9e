import React, { useState } from 'react';
import { 
  grammaireQuiz41, 
  conjugationItems42, 
  relativePronounsQuiz44, 
  combineSentences45 
} from '../data/workshopData';
import { CheckCircle2, XCircle, RotateCcw, HelpCircle, Volume2, Sparkles, BookOpen } from 'lucide-react';
import { speakFrenchText } from '../utils/speech';

interface GrammaireProps {
  onScoreUpdate: (activityKey: string, score: number, total: number) => void;
}

export const Grammaire: React.FC<GrammaireProps> = ({ onScoreUpdate }) => {
  // --- 4.1 State ---
  const [answers41, setAnswers41] = useState<Record<number, 'PC' | 'IMP'>>({});
  const [submitted41, setSubmitted41] = useState(false);

  // --- 4.2 State ---
  const [answers42, setAnswers42] = useState<Record<number, string>>({});
  const [submitted42, setSubmitted42] = useState(false);

  // --- 4.4 State ---
  const [answers44, setAnswers44] = useState<Record<number, string>>({});
  const [submitted44, setSubmitted44] = useState(false);

  // --- 4.5 State ---
  const [answers45, setAnswers45] = useState<Record<number, string>>({});
  const [submitted45, setSubmitted45] = useState(false);
  const [showHint45, setShowHint45] = useState<Record<number, boolean>>({});

  // Handlers 4.1
  const calculateScore41 = () => {
    let s = 0;
    grammaireQuiz41.forEach(item => {
      if (answers41[item.id] === item.correct) s++;
    });
    return s;
  };

  const handleValidate41 = () => {
    setSubmitted41(true);
    onScoreUpdate('part4_1', calculateScore41(), grammaireQuiz41.length);
  };

  const handleReset41 = () => {
    setAnswers41({});
    setSubmitted41(false);
    onScoreUpdate('part4_1', 0, grammaireQuiz41.length);
  };

  // Handlers 4.2
  const calculateScore42 = () => {
    let s = 0;
    conjugationItems42.forEach(item => {
      const user = (answers42[item.id] || '').trim().toLowerCase();
      const valid = [item.correct.toLowerCase(), ...(item.altCorrect || []).map(a => a.toLowerCase())];
      if (valid.includes(user)) s++;
    });
    return s;
  };

  const handleValidate42 = () => {
    setSubmitted42(true);
    onScoreUpdate('part4_2', calculateScore42(), conjugationItems42.length);
  };

  const handleReset42 = () => {
    setAnswers42({});
    setSubmitted42(false);
    onScoreUpdate('part4_2', 0, conjugationItems42.length);
  };

  // Handlers 4.4
  const calculateScore44 = () => {
    let s = 0;
    relativePronounsQuiz44.forEach(item => {
      if (answers44[item.id]?.toLowerCase().trim() === item.correct.toLowerCase()) s++;
    });
    return s;
  };

  const handleValidate44 = () => {
    setSubmitted44(true);
    onScoreUpdate('part4_4', calculateScore44(), relativePronounsQuiz44.length);
  };

  const handleReset44 = () => {
    setAnswers44({});
    setSubmitted44(false);
    onScoreUpdate('part4_4', 0, relativePronounsQuiz44.length);
  };

  // Handlers 4.5
  const cleanStr = (str: string) => {
    return str.toLowerCase().replace(/['’]/g, "'").replace(/[.,!?;:]/g, '').trim().replace(/\s+/g, ' ');
  };

  const calculateScore45 = () => {
    let s = 0;
    combineSentences45.forEach(item => {
      const user = cleanStr(answers45[item.id] || '');
      const valid = [cleanStr(item.expectedSolution), ...(item.alternativeSolutions || []).map(cleanStr)];
      if (valid.includes(user)) s++;
    });
    return s;
  };

  const handleValidate45 = () => {
    setSubmitted45(true);
    onScoreUpdate('part4_5', calculateScore45(), combineSentences45.length);
  };

  const handleReset45 = () => {
    setAnswers45({});
    setSubmitted45(false);
    onScoreUpdate('part4_5', 0, combineSentences45.length);
  };

  const score41 = calculateScore41();
  const score42 = calculateScore42();
  const score44 = calculateScore44();
  const score45 = calculateScore45();

  return (
    <div className="space-y-12">
      {/* Editorial Header */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium uppercase tracking-wider mb-2">
            <span>Partie 4</span>
            <span aria-hidden="true">·</span>
            <span>Grammaire pour l'examen</span>
            <span aria-hidden="true">·</span>
            <span>Temps du passé & Pronoms relatifs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Maîtriser les rouages de la langue française
          </h2>
          <p className="text-sm sm:text-base text-stone-300 mt-2 leading-relaxed">
            Deux piliers indispensables pour réussir l'examen de 9e : l'alternance entre le Passé Composé et l'Imparfait
            dans le récit, et la précision des pronoms relatifs simples (qui, que, où, dont) pour enrichir vos phrases.
          </p>
        </div>
      </div>

      {/* ==================================================== */}
      {/* ACTIVITÉ 4.1 : Passé Composé (PC) ou Imparfait (IMP) */}
      {/* ==================================================== */}
      <section className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Activité 4.1
            </div>
            <h3 className="text-xl font-bold font-serif text-stone-900 mt-0.5">
              Passé composé (PC) ou imparfait (IMP) ?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Indique pour chaque phrase si le verbe est au Passé Composé ou à l'Imparfait.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {submitted41 && (
              <span className="text-xs font-mono font-bold px-3 py-1.5 bg-stone-100 rounded-lg text-stone-800 border border-stone-200">
                Score : {score41} / {grammaireQuiz41.length}
              </span>
            )}
            <button
              onClick={handleReset41}
              title="Réinitialiser l'exercice"
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="divide-y divide-stone-100 mt-6">
          {grammaireQuiz41.map((item) => {
            const userChoice = answers41[item.id];
            const isCorrect = submitted41 && userChoice === item.correct;
            const isWrong = submitted41 && userChoice && userChoice !== item.correct;

            return (
              <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-2.5 max-w-xl">
                  <button
                    onClick={() => speakFrenchText(item.phrase)}
                    title="Écouter la phrase"
                    className="p-1 text-stone-400 hover:text-amber-600 transition-colors mt-0.5"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <div>
                    <span className="text-sm sm:text-base font-medium text-stone-900">
                      {item.phrase}
                    </span>
                    {submitted41 && (
                      <p className={`text-xs mt-1 leading-relaxed ${isCorrect ? 'text-emerald-700' : 'text-stone-600'}`}>
                        {item.explanation}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => !submitted41 && setAnswers41(prev => ({ ...prev, [item.id]: 'PC' }))}
                    disabled={submitted41}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      userChoice === 'PC'
                        ? submitted41
                          ? isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-rose-600 text-white border-rose-600'
                          : 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                    }`}
                  >
                    Passé composé
                  </button>

                  <button
                    onClick={() => !submitted41 && setAnswers41(prev => ({ ...prev, [item.id]: 'IMP' }))}
                    disabled={submitted41}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      userChoice === 'IMP'
                        ? submitted41
                          ? isCorrect
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-rose-600 text-white border-rose-600'
                          : 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                    }`}
                  >
                    Imparfait
                  </button>

                  {submitted41 && (
                    isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action 4.1 */}
        <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-mono">
            {Object.keys(answers41).length} / {grammaireQuiz41.length} phrases répondues
          </span>

          {!submitted41 ? (
            <button
              onClick={handleValidate41}
              disabled={Object.keys(answers41).length === 0}
              className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 disabled:opacity-40 transition-colors"
            >
              Vérifier mes réponses
            </button>
          ) : (
            <button
              onClick={handleReset41}
              className="px-4 py-2 bg-stone-100 text-stone-800 rounded-lg text-xs font-semibold hover:bg-stone-200 transition-colors"
            >
              Recommencer
            </button>
          )}
        </div>
      </section>

      {/* ==================================================== */}
      {/* ACTIVITÉ 4.2 : Conjugaison dans le texte             */}
      {/* ==================================================== */}
      <section className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Activité 4.2
            </div>
            <h3 className="text-xl font-bold font-serif text-stone-900 mt-0.5">
              Conjugue les verbes au passé composé ou à l’imparfait
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Remplis chaque trou avec la forme verbale correcte selon le contexte du récit.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {submitted42 && (
              <span className="text-xs font-mono font-bold px-3 py-1.5 bg-stone-100 rounded-lg text-stone-800 border border-stone-200">
                Score : {score42} / {conjugationItems42.length}
              </span>
            )}
            <button
              onClick={handleReset42}
              title="Réinitialiser l'exercice"
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Narrative Paragraph with embedded inputs */}
        <div className="mt-6 p-6 rounded-xl bg-amber-50/20 border border-amber-200/60 leading-loose text-stone-800 text-sm sm:text-base font-serif">
          <span>Hier, je (visiter) </span>
          <input
            type="text"
            disabled={submitted42}
            value={answers42[1] || ''}
            onChange={(e) => setAnswers42({ ...answers42, 1: e.target.value })}
            placeholder="ai visité"
            className={`font-sans font-semibold text-xs sm:text-sm px-2.5 py-1 rounded border inline-block w-32 text-center ${
              submitted42
                ? answers42[1]?.toLowerCase().trim() === 'ai visité'
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                  : 'bg-rose-50 border-rose-400 text-rose-900'
                : 'bg-white border-stone-300'
            }`}
          />
          <span> un musée avec ma classe. Il (faire) </span>
          <input
            type="text"
            disabled={submitted42}
            value={answers42[2] || ''}
            onChange={(e) => setAnswers42({ ...answers42, 2: e.target.value })}
            placeholder="faisait"
            className={`font-sans font-semibold text-xs sm:text-sm px-2.5 py-1 rounded border inline-block w-28 text-center ${
              submitted42
                ? answers42[2]?.toLowerCase().trim() === 'faisait'
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                  : 'bg-rose-50 border-rose-400 text-rose-900'
                : 'bg-white border-stone-300'
            }`}
          />
          <span> très chaud et il y (avoir) </span>
          <input
            type="text"
            disabled={submitted42}
            value={answers42[3] || ''}
            onChange={(e) => setAnswers42({ ...answers42, 3: e.target.value })}
            placeholder="avait"
            className={`font-sans font-semibold text-xs sm:text-sm px-2.5 py-1 rounded border inline-block w-28 text-center ${
              submitted42
                ? answers42[3]?.toLowerCase().trim() === 'avait'
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                  : 'bg-rose-50 border-rose-400 text-rose-900'
                : 'bg-white border-stone-300'
            }`}
          />
          <span> beaucoup de monde. Nous (regarder) </span>
          <input
            type="text"
            disabled={submitted42}
            value={answers42[4] || ''}
            onChange={(e) => setAnswers42({ ...answers42, 4: e.target.value })}
            placeholder="regardions"
            className={`font-sans font-semibold text-xs sm:text-sm px-2.5 py-1 rounded border inline-block w-32 text-center ${
              submitted42
                ? answers42[4]?.toLowerCase().trim() === 'regardions'
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                  : 'bg-rose-50 border-rose-400 text-rose-900'
                : 'bg-white border-stone-300'
            }`}
          />
          <span> un tableau de Monet quand le guide (arriver) </span>
          <input
            type="text"
            disabled={submitted42}
            value={answers42[5] || ''}
            onChange={(e) => setAnswers42({ ...answers42, 5: e.target.value })}
            placeholder="est arrivé"
            className={`font-sans font-semibold text-xs sm:text-sm px-2.5 py-1 rounded border inline-block w-32 text-center ${
              submitted42
                ? answers42[5]?.toLowerCase().trim() === 'est arrivé'
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                  : 'bg-rose-50 border-rose-400 text-rose-900'
                : 'bg-white border-stone-300'
            }`}
          />
          <span> . Il (expliquer) </span>
          <input
            type="text"
            disabled={submitted42}
            value={answers42[6] || ''}
            onChange={(e) => setAnswers42({ ...answers42, 6: e.target.value })}
            placeholder="a expliqué"
            className={`font-sans font-semibold text-xs sm:text-sm px-2.5 py-1 rounded border inline-block w-32 text-center ${
              submitted42
                ? ['a expliqué', 'expliquait'].includes(answers42[6]?.toLowerCase().trim())
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                  : 'bg-rose-50 border-rose-400 text-rose-900'
                : 'bg-white border-stone-300'
            }`}
          />
          <span> l’histoire du tableau. Après la visite, nous (acheter) </span>
          <input
            type="text"
            disabled={submitted42}
            value={answers42[7] || ''}
            onChange={(e) => setAnswers42({ ...answers42, 7: e.target.value })}
            placeholder="avons acheté"
            className={`font-sans font-semibold text-xs sm:text-sm px-2.5 py-1 rounded border inline-block w-36 text-center ${
              submitted42
                ? answers42[7]?.toLowerCase().trim() === 'avons acheté'
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                  : 'bg-rose-50 border-rose-400 text-rose-900'
                : 'bg-white border-stone-300'
            }`}
          />
          <span> des cartes postales.</span>
        </div>

        {/* Detailed Correction Explanations 4.2 */}
        {submitted42 && (
          <div className="mt-6 p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
            <h5 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] mb-2">
              Corrigé didactique :
            </h5>
            {conjugationItems42.map(item => (
              <div key={item.id} className="flex items-start gap-2">
                <span className="font-bold text-amber-800">Verbe {item.verb} :</span>
                <span className="text-stone-700">
                  Réponse attendue : <strong className="text-stone-900">{item.correct}</strong> — {item.explanation}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Actions 4.2 */}
        <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-mono">
            7 formes verbales à conjuguer
          </span>

          {!submitted42 ? (
            <button
              onClick={handleValidate42}
              className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
            >
              Vérifier le texte
            </button>
          ) : (
            <button
              onClick={handleReset42}
              className="px-4 py-2 bg-stone-100 text-stone-800 rounded-lg text-xs font-semibold hover:bg-stone-200 transition-colors"
            >
              Recommencer
            </button>
          )}
        </div>
      </section>

      {/* ==================================================== */}
      {/* 4.3 : RAPPEL LES PRONOMS RELATIFS                    */}
      {/* ==================================================== */}
      <div className="bg-stone-900 text-stone-100 rounded-xl p-6 sm:p-8 border border-stone-800 shadow-xs">
        <div className="flex items-center gap-2 text-xs text-amber-400 uppercase tracking-wider font-semibold mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Fiche Récapitulative · 4.3</span>
        </div>
        <h4 className="text-xl font-serif font-bold text-white mb-4">
          Les pronoms relatifs : qui, que, où, dont
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="bg-stone-950/80 p-4 rounded-lg border border-stone-800">
            <span className="text-base font-bold text-amber-400 font-mono">QUI</span>
            <p className="text-xs text-stone-300 mt-1">Remplace le <strong>sujet</strong>.</p>
            <p className="text-xs text-stone-400 italic mt-2">« Le peintre QUI crée cette fresque. »</p>
          </div>
          <div className="bg-stone-950/80 p-4 rounded-lg border border-stone-800">
            <span className="text-base font-bold text-amber-400 font-mono">QUE / QU'</span>
            <p className="text-xs text-stone-300 mt-1">Remplace le <strong>COD</strong>.</p>
            <p className="text-xs text-stone-400 italic mt-2">« La toile QUE la galerie expose. »</p>
          </div>
          <div className="bg-stone-950/80 p-4 rounded-lg border border-stone-800">
            <span className="text-base font-bold text-amber-400 font-mono">OÙ</span>
            <p className="text-xs text-stone-300 mt-1">Indique le <strong>lieu</strong> ou le temps.</p>
            <p className="text-xs text-stone-400 italic mt-2">« Le musée OÙ l'exposition a lieu. »</p>
          </div>
          <div className="bg-stone-950/80 p-4 rounded-lg border border-stone-800">
            <span className="text-base font-bold text-amber-400 font-mono">DONT</span>
            <p className="text-xs text-stone-300 mt-1">Remplace un complément avec <strong>DE</strong>.</p>
            <p className="text-xs text-stone-400 italic mt-2">« L'artiste DONT tout le monde parle. »</p>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* ACTIVITÉ 4.4 : Complète avec qui, que, où, dont      */}
      {/* ==================================================== */}
      <section className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Activité 4.4
            </div>
            <h3 className="text-xl font-bold font-serif text-stone-900 mt-0.5">
              Complète avec qui, que (qu’), où ou dont
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Choisis le pronom relatif adapté pour chaque phrase.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {submitted44 && (
              <span className="text-xs font-mono font-bold px-3 py-1.5 bg-stone-100 rounded-lg text-stone-800 border border-stone-200">
                Score : {score44} / {relativePronounsQuiz44.length}
              </span>
            )}
            <button
              onClick={handleReset44}
              title="Réinitialiser l'exercice"
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          {relativePronounsQuiz44.map((item) => {
            const currentAnswer = answers44[item.id] || '';
            const isCorrect = submitted44 && currentAnswer.toLowerCase() === item.correct.toLowerCase();

            return (
              <div key={item.id} className="p-4 rounded-lg border border-stone-200 bg-white">
                <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base text-stone-900">
                  <span className="text-xs font-mono font-bold text-stone-400 mr-1">
                    {item.id}.
                  </span>
                  <span>{item.sentenceBefore}</span>

                  <select
                    disabled={submitted44}
                    value={currentAnswer}
                    onChange={(e) => setAnswers44({ ...answers44, [item.id]: e.target.value })}
                    className={`font-semibold text-xs sm:text-sm px-3 py-1 rounded-md border focus:outline-hidden ${
                      submitted44
                        ? isCorrect
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                          : 'bg-rose-50 border-rose-400 text-rose-900'
                        : 'bg-stone-50 border-stone-300 text-stone-800'
                    }`}
                  >
                    <option value="">Sélectionner</option>
                    <option value="qui">qui</option>
                    <option value="que">que</option>
                    <option value="où">où</option>
                    <option value="dont">dont</option>
                  </select>

                  <span>{item.sentenceAfter}</span>

                  {submitted44 && (
                    <span className="ml-auto flex items-center gap-1.5 text-xs">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <div className="flex items-center gap-1 text-rose-600 font-medium">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Réponse : <strong>{item.correct}</strong></span>
                        </div>
                      )}
                    </span>
                  )}
                </div>

                {submitted44 && (
                  <p className="text-xs text-stone-500 mt-2 pl-6">
                    {item.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions 4.4 */}
        <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-mono">
            {Object.keys(answers44).length} / {relativePronounsQuiz44.length} phrases complétées
          </span>

          {!submitted44 ? (
            <button
              onClick={handleValidate44}
              disabled={Object.keys(answers44).length === 0}
              className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 disabled:opacity-40 transition-colors"
            >
              Vérifier les pronoms
            </button>
          ) : (
            <button
              onClick={handleReset44}
              className="px-4 py-2 bg-stone-100 text-stone-800 rounded-lg text-xs font-semibold hover:bg-stone-200 transition-colors"
            >
              Recommencer
            </button>
          )}
        </div>
      </section>

      {/* ==================================================== */}
      {/* ACTIVITÉ 4.5 : Réunis les deux phrases               */}
      {/* ==================================================== */}
      <section className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Activité 4.5
            </div>
            <h3 className="text-xl font-bold font-serif text-stone-900 mt-0.5">
              Réunis les deux phrases avec un pronom relatif
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Supprime la répétition en fusionnant les deux propositions en une seule phrase complexe.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {submitted45 && (
              <span className="text-xs font-mono font-bold px-3 py-1.5 bg-stone-100 rounded-lg text-stone-800 border border-stone-200">
                Score : {score45} / {combineSentences45.length}
              </span>
            )}
            <button
              onClick={handleReset45}
              title="Réinitialiser l'exercice"
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-6 mt-6">
          {combineSentences45.map((item) => {
            const userStr = cleanStr(answers45[item.id] || '');
            const valid = [cleanStr(item.expectedSolution), ...(item.alternativeSolutions || []).map(cleanStr)];
            const isCorrect = submitted45 && valid.includes(userStr);

            return (
              <div key={item.id} className="p-4 sm:p-5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs sm:text-sm font-serif">
                    <span className="font-mono font-bold text-amber-800 mr-2">{item.id}.</span>
                    <span className="text-stone-900 font-semibold">{item.sentence1}</span>
                    <span className="text-stone-700 ml-2">{item.sentence2}</span>
                  </div>

                  <button
                    onClick={() => setShowHint45(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                    className="text-[11px] text-amber-800 hover:text-amber-950 font-medium px-2 py-0.5 bg-amber-50 rounded border border-amber-200 shrink-0"
                  >
                    {showHint45[item.id] ? 'Masquer l\'indice' : 'Besoin d\'un indice ?'}
                  </button>
                </div>

                {showHint45[item.id] && (
                  <div className="flex items-center gap-2 p-2 rounded bg-amber-100/60 text-amber-950 text-xs">
                    <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.hint}</span>
                  </div>
                )}

                <div>
                  <input
                    type="text"
                    disabled={submitted45}
                    value={answers45[item.id] || ''}
                    onChange={(e) => setAnswers45({ ...answers45, [item.id]: e.target.value })}
                    placeholder={`Écris ta phrase réunie avec « ${item.targetPronoun} »...`}
                    className={`w-full px-3.5 py-2 text-xs sm:text-sm rounded-lg border bg-white ${
                      submitted45
                        ? isCorrect
                          ? 'border-emerald-400 bg-emerald-50 text-emerald-950'
                          : 'border-rose-400 bg-rose-50 text-rose-950'
                        : 'border-stone-300 focus:outline-hidden focus:border-amber-500'
                    }`}
                  />
                </div>

                {submitted45 && (
                  <div className="flex items-start gap-2 text-xs pt-1">
                    {isCorrect ? (
                      <span className="text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Excellente formulation !
                      </span>
                    ) : (
                      <div className="space-y-1 text-rose-700">
                        <div className="flex items-center gap-1 font-semibold">
                          <XCircle className="w-4 h-4" />
                          <span>À revoir :</span>
                        </div>
                        <p className="text-stone-800 pl-5">
                          Formulation attendue : <strong>« {item.expectedSolution} »</strong>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions 4.5 */}
        <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-mono">
            4 fusions de phrases
          </span>

          {!submitted45 ? (
            <button
              onClick={handleValidate45}
              disabled={Object.keys(answers45).length === 0}
              className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 disabled:opacity-40 transition-colors"
            >
              Vérifier la syntaxe
            </button>
          ) : (
            <button
              onClick={handleReset45}
              className="px-4 py-2 bg-stone-100 text-stone-800 rounded-lg text-xs font-semibold hover:bg-stone-200 transition-colors"
            >
              Recommencer
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
