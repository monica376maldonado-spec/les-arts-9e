import React, { useState } from 'react';
import { 
  matchingWords, 
  matchingDefinitions, 
  part1FillWords, 
  part1FillSentences 
} from '../data/workshopData';
import { Volume2, CheckCircle2, XCircle, HelpCircle, RotateCcw } from 'lucide-react';
import { speakFrenchText } from '../utils/speech';

interface ComprehensionEcriteProps {
  onScoreUpdate: (activityKey: string, score: number, total: number) => void;
}

export const ComprehensionEcrite: React.FC<ComprehensionEcriteProps> = ({ onScoreUpdate }) => {
  // --- State for Activité 1.1 ---
  const [selectedWordId, setSelectedWordId] = useState<number | null>(null);
  const [userMatches, setUserMatches] = useState<Record<number, string>>({});
  const [submitted11, setSubmitted11] = useState(false);

  // --- State for Activité 1.2 ---
  const [fillAnswers, setFillAnswers] = useState<Record<number, string>>({});
  const [submitted12, setSubmitted12] = useState(false);
  const [selectedBlankId, setSelectedBlankId] = useState<number | null>(null);

  // Handlers for 1.1
  const handleSelectWord = (id: number) => {
    setSelectedWordId(id);
  };

  const handleSelectDefinition = (letter: string) => {
    if (selectedWordId !== null) {
      const nextMatches = { ...userMatches, [selectedWordId]: letter };
      setUserMatches(nextMatches);
      setSelectedWordId(null);
    }
  };

  const calculateScore11 = () => {
    let score = 0;
    matchingWords.forEach((item) => {
      if (userMatches[item.id] === item.correctLetter) {
        score += 1;
      }
    });
    return score;
  };

  const handleValidate11 = () => {
    setSubmitted11(true);
    const score = calculateScore11();
    onScoreUpdate('part1_1', score, matchingWords.length);
  };

  const handleReset11 = () => {
    setUserMatches({});
    setSubmitted11(false);
    setSelectedWordId(null);
    onScoreUpdate('part1_1', 0, matchingWords.length);
  };

  // Handlers for 1.2
  const handleWordBankClick = (word: string) => {
    if (selectedBlankId !== null) {
      setFillAnswers((prev) => ({ ...prev, [selectedBlankId]: word }));
      // Automatically advance to next empty blank
      const nextEmpty = part1FillSentences.find(s => s.id > selectedBlankId && !fillAnswers[s.id]);
      if (nextEmpty) {
        setSelectedBlankId(nextEmpty.id);
      } else {
        setSelectedBlankId(null);
      }
    }
  };

  const calculateScore12 = () => {
    let score = 0;
    part1FillSentences.forEach((item) => {
      if (fillAnswers[item.id]?.toLowerCase().trim() === item.correctAnswer.toLowerCase()) {
        score += 1;
      }
    });
    return score;
  };

  const handleValidate12 = () => {
    setSubmitted12(true);
    const score = calculateScore12();
    onScoreUpdate('part1_2', score, part1FillSentences.length);
  };

  const handleReset12 = () => {
    setFillAnswers({});
    setSubmitted12(false);
    setSelectedBlankId(null);
    onScoreUpdate('part1_2', 0, part1FillSentences.length);
  };

  const score11 = calculateScore11();
  const score12 = calculateScore12();

  return (
    <div className="space-y-12">
      {/* Editorial Header Section */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium uppercase tracking-wider mb-2">
            <span>Partie 1</span>
            <span aria-hidden="true">·</span>
            <span>Compréhension écrite</span>
            <span aria-hidden="true">·</span>
            <span>Le vocabulaire du texte</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            L'Art, les Musées et les Chefs-d'œuvre
          </h2>
          <p className="text-sm sm:text-base text-stone-300 mt-2 leading-relaxed">
            Découvrez le vocabulaire essentiel pour explorer les musées, observer les tableaux de grands maîtres
            et comprendre la création artistique afin de rendre la peinture accessible à tous.
          </p>
        </div>
      </div>

      {/* Activité 1.1 : Association Mot - Définition */}
      <section className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Activité 1.1
            </div>
            <h3 className="text-xl font-bold font-serif text-stone-900 mt-0.5">
              Relie chaque mot à sa définition
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Clique sur un mot à gauche, puis choisis sa définition correspondante à droite.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {submitted11 && (
              <span className="text-xs font-mono font-bold px-3 py-1.5 bg-stone-100 rounded-lg text-stone-800 border border-stone-200">
                Score : {score11} / {matchingWords.length}
              </span>
            )}
            <button
              onClick={handleReset11}
              title="Réinitialiser l'exercice"
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Association Dual Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Left Column: Words */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
              Mots à associer ({Object.keys(userMatches).length}/{matchingWords.length} reliés)
            </h4>
            {matchingWords.map((item) => {
              const matchedLetter = userMatches[item.id];
              const isSelected = selectedWordId === item.id;
              const isCorrect = submitted11 && matchedLetter === item.correctLetter;
              const isWrong = submitted11 && matchedLetter && matchedLetter !== item.correctLetter;

              return (
                <div
                  key={item.id}
                  onClick={() => !submitted11 && handleSelectWord(item.id)}
                  className={`flex items-center justify-between p-3 rounded-lg border text-sm transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/20'
                      : matchedLetter
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-50/50'
                        : isWrong
                        ? 'border-rose-300 bg-rose-50/50'
                        : 'border-stone-300 bg-stone-50'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 font-medium text-stone-900">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakFrenchText(item.word.replace(/^\d+\.\s*/, ''));
                      }}
                      title="Écouter la prononciation"
                      className="p-1 text-stone-400 hover:text-amber-600 transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <span>{item.word}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {matchedLetter ? (
                      <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-stone-900 text-white">
                        ➜ {matchedLetter}
                      </span>
                    ) : (
                      <span className="text-xs text-stone-400 italic">À relier</span>
                    )}

                    {submitted11 && (
                      isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-rose-600 font-mono">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>({item.correctLetter})</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Definitions */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
              Définitions {selectedWordId && <span className="text-amber-600 font-normal">← Choisis la définition pour le mot sélectionné</span>}
            </h4>
            {matchingDefinitions.map((def) => {
              // Check if this definition is already assigned to any word
              const assignedWordId = Object.entries(userMatches).find(
                ([, val]) => val === def.letter
              )?.[0];

              return (
                <div
                  key={def.letter}
                  onClick={() => !submitted11 && handleSelectDefinition(def.letter)}
                  className={`p-3 rounded-lg border text-sm transition-all cursor-pointer ${
                    selectedWordId !== null
                      ? 'border-amber-300 hover:bg-amber-50/50 hover:border-amber-500'
                      : assignedWordId
                      ? 'border-stone-300 bg-stone-50 text-stone-700'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="font-mono text-xs font-bold w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-stone-800 shrink-0 mt-0.5">
                      {def.letter}
                    </span>
                    <span className="text-stone-800 text-xs sm:text-sm leading-relaxed">
                      {def.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions 1.1 */}
        <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            {Object.keys(userMatches).length} mots sur {matchingWords.length} associés.
          </p>

          <div className="flex items-center gap-3">
            {!submitted11 ? (
              <button
                onClick={handleValidate11}
                disabled={Object.keys(userMatches).length === 0}
                className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 disabled:opacity-40 transition-colors"
              >
                Vérifier mes réponses
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-600">
                  {score11 === matchingWords.length 
                    ? '🎉 Félicitations ! Toutes les définitions sont exactes.' 
                    : `Tu as obtenu ${score11}/${matchingWords.length}. Consulte les lettres en rouge pour réviser.`}
                </span>
                <button
                  onClick={handleReset11}
                  className="px-4 py-2 bg-stone-100 text-stone-800 rounded-lg text-xs font-semibold hover:bg-stone-200 transition-colors"
                >
                  Recommencer
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Activité 1.2 : Complète avec le mot qui convient */}
      <section className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Activité 1.2
            </div>
            <h3 className="text-xl font-bold font-serif text-stone-900 mt-0.5">
              Complète le texte avec le mot qui convient
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Sélectionne un espace vide puis clique sur le mot correspondant dans la boîte de mots ci-dessous.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {submitted12 && (
              <span className="text-xs font-mono font-bold px-3 py-1.5 bg-stone-100 rounded-lg text-stone-800 border border-stone-200">
                Score : {score12} / {part1FillSentences.length}
              </span>
            )}
            <button
              onClick={handleReset12}
              title="Réinitialiser l'exercice"
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Word Bank */}
        <div className="mt-6 p-4 rounded-xl bg-stone-50 border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-500">
              Boîte de mots disponibles :
            </span>
            <span className="text-xs text-stone-400">
              {selectedBlankId ? `Placement dans le trou n°${selectedBlankId}` : 'Clique d\'abord sur un trou à remplir'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {part1FillWords.map((word) => {
              // check if already placed
              const isUsed = Object.values(fillAnswers).includes(word);
              return (
                <button
                  key={word}
                  onClick={() => handleWordBankClick(word)}
                  disabled={submitted12}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                    isUsed
                      ? 'bg-stone-200 text-stone-400 border-stone-200 line-through'
                      : selectedBlankId !== null
                      ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200 font-semibold'
                      : 'bg-white text-stone-800 border-stone-300 hover:border-stone-400'
                  }`}
                >
                  {word}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sentences List */}
        <div className="space-y-4 mt-6">
          {part1FillSentences.map((sentence) => {
            const currentAnswer = fillAnswers[sentence.id] || '';
            const isSelected = selectedBlankId === sentence.id;
            const isCorrect = submitted12 && currentAnswer.toLowerCase() === sentence.correctAnswer.toLowerCase();
            const isWrong = submitted12 && currentAnswer && currentAnswer.toLowerCase() !== sentence.correctAnswer.toLowerCase();

            return (
              <div
                key={sentence.id}
                className={`p-4 rounded-lg border text-sm sm:text-base leading-relaxed transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/30'
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-stone-400 mr-1">
                    {sentence.id}.
                  </span>
                  <span>{sentence.sentenceBefore}</span>

                  {/* Interactive Blank */}
                  <button
                    onClick={() => !submitted12 && setSelectedBlankId(sentence.id)}
                    className={`inline-flex items-center justify-center min-w-[130px] px-3 py-1 rounded-md text-xs sm:text-sm font-semibold border transition-all ${
                      isSelected
                        ? 'border-amber-600 bg-amber-100 text-amber-950 ring-2 ring-amber-400/40'
                        : currentAnswer
                        ? isCorrect
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                          : isWrong
                          ? 'border-rose-300 bg-rose-50 text-rose-800'
                          : 'border-stone-300 bg-stone-100 text-stone-900'
                        : 'border-dashed border-stone-300 bg-stone-50 text-stone-400 hover:border-amber-400'
                    }`}
                  >
                    {currentAnswer || 'Clique ici'}
                  </button>

                  <span>{sentence.sentenceAfter}</span>

                  {submitted12 && (
                    <span className="ml-auto flex items-center gap-1">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-rose-600 font-medium">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Réponse : <strong>{sentence.correctAnswer}</strong></span>
                        </div>
                      )}
                    </span>
                  )}
                </div>

                {/* Optional Hint on Focus */}
                {isSelected && sentence.hint && !submitted12 && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-700 bg-amber-50/80 p-2 rounded">
                    <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Indice : {sentence.hint}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Actions 1.2 */}
        <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            {Object.keys(fillAnswers).length} sur {part1FillSentences.length} phrases complétées.
          </p>

          <div className="flex items-center gap-3">
            {!submitted12 ? (
              <button
                onClick={handleValidate12}
                disabled={Object.keys(fillAnswers).length === 0}
                className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 disabled:opacity-40 transition-colors"
              >
                Vérifier mes réponses
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-xs text-stone-600">
                  Score : <strong>{score12}/{part1FillSentences.length}</strong>
                </span>
                <button
                  onClick={handleReset12}
                  className="px-4 py-2 bg-stone-100 text-stone-800 rounded-lg text-xs font-semibold hover:bg-stone-200 transition-colors"
                >
                  Recommencer
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
