import React, { useState } from 'react';
import { 
  audioDoc1Script,
  audioDoc2Script, 
  doc1Vocab,
  doc2Vocab, 
  part2FillWords,
  part2FillSentences,
  doc2ListeningQuiz 
} from '../data/workshopData';
import { AudioPlayer } from './AudioPlayer';
import { 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  BookOpen, 
  Check, 
  HelpCircle,
  Headphones
} from 'lucide-react';
import { speakFrenchText } from '../utils/speech';

interface ComprehensionOraleProps {
  onScoreUpdate: (activityKey: string, score: number, total: number) => void;
}

export const ComprehensionOrale: React.FC<ComprehensionOraleProps> = ({ onScoreUpdate }) => {
  const [activeDossier, setActiveDossier] = useState<'all' | 'dossier1' | 'dossier2'>('all');

  // --- State Dossier 1 (Activité 2.1) ---
  const [fillAnswers21, setFillAnswers21] = useState<Record<number, string>>({});
  const [submitted21, setSubmitted21] = useState(false);
  const [selectedBlank21, setSelectedBlank21] = useState<number | null>(null);

  // --- State Dossier 2 (Activité 2.2 Quiz) ---
  const [selectedAnswers22, setSelectedAnswers22] = useState<Record<number, string>>({});
  const [submitted22, setSubmitted22] = useState(false);

  // Handlers Dossier 1
  const handleWordBankClick = (word: string) => {
    if (selectedBlank21 !== null) {
      setFillAnswers21((prev) => ({ ...prev, [selectedBlank21]: word }));
      const nextEmpty = part2FillSentences.find(s => s.id > selectedBlank21 && !fillAnswers21[s.id]);
      if (nextEmpty) {
        setSelectedBlank21(nextEmpty.id);
      } else {
        setSelectedBlank21(null);
      }
    }
  };

  const calculateScore21 = () => {
    let score = 0;
    part2FillSentences.forEach((item) => {
      if (fillAnswers21[item.id]?.toLowerCase().trim() === item.correctAnswer.toLowerCase()) {
        score += 1;
      }
    });
    return score;
  };

  const handleValidate21 = () => {
    setSubmitted21(true);
    const score = calculateScore21();
    onScoreUpdate('part2_1', score, part2FillSentences.length);
  };

  const handleReset21 = () => {
    setFillAnswers21({});
    setSubmitted21(false);
    setSelectedBlank21(null);
    onScoreUpdate('part2_1', 0, part2FillSentences.length);
  };

  // Handlers Dossier 2
  const handleSelectOption22 = (questionId: number, option: string) => {
    if (!submitted22) {
      setSelectedAnswers22(prev => ({ ...prev, [questionId]: option }));
    }
  };

  const calculateScore22 = () => {
    let score = 0;
    doc2ListeningQuiz.forEach(item => {
      if (selectedAnswers22[item.id] === item.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleValidate22 = () => {
    setSubmitted22(true);
    const score = calculateScore22();
    onScoreUpdate('part2_2', score, doc2ListeningQuiz.length);
  };

  const handleReset22 = () => {
    setSelectedAnswers22({});
    setSubmitted22(false);
    onScoreUpdate('part2_2', 0, doc2ListeningQuiz.length);
  };

  const score21 = calculateScore21();
  const score22 = calculateScore22();

  return (
    <div className="space-y-12">
      {/* Editorial Header */}
      <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl relative z-10">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium uppercase tracking-wider mb-2">
            <span>Partie 2</span>
            <span aria-hidden="true">·</span>
            <span>Compréhension orale</span>
            <span aria-hidden="true">·</span>
            <span>Le vocabulaire des enregistrements</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Écoute, Débats & Sorties Culturelles
          </h2>
          <p className="text-sm sm:text-base text-stone-300 mt-2 leading-relaxed">
            Étudiez le vocabulaire des deux enregistrements : la grande mobilisation des artistes pour préserver leurs ateliers historiques,
            ainsi que le reportage sur la Nuit européenne des musées.
          </p>
        </div>
      </div>

      {/* Dossier Filter Controls */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg max-w-xl border border-stone-200">
        <button
          onClick={() => setActiveDossier('all')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
            activeDossier === 'all'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Tous les dossiers ({doc1Vocab.length + doc2Vocab.length} mots)
        </button>
        <button
          onClick={() => setActiveDossier('dossier1')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
            activeDossier === 'dossier1'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          1. Mobilisation des Artistes ({doc1Vocab.length} mots)
        </button>
        <button
          onClick={() => setActiveDossier('dossier2')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
            activeDossier === 'dossier2'
              ? 'bg-white text-stone-900 shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          2. Nuit des Musées ({doc2Vocab.length} mots)
        </button>
      </div>

      {/* ==================================================== */}
      {/* DOSSIER 1 : LA MOBILISATION DES ARTISTES ET LE PATRIMOINE */}
      {/* ==================================================== */}
      {(activeDossier === 'all' || activeDossier === 'dossier1') && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="border-b border-stone-200 pb-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Dossier d'écoute 1
            </div>
            <h3 className="text-xl font-bold font-serif text-stone-900">
              Mobilisation des Artistes & Sauvegarde du Patrimoine
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Vocabulaire à étudier : <em>un scandale, exposer, un détracteur, manifester, exiger, une interdiction, une insulte, une action en justice, l’hostilité, saluer une initiative, le patrimoine, préserver, un laboratoire.</em>
            </p>
          </div>

          {/* Audio Player 1 */}
          <AudioPlayer
            docLabel="Document Audio 1 · Débat artistique"
            title="Radio Culture Actu : Les artistes manifestent pour sauver la Cité des Ateliers"
            subtitle="Écoutez ce reportage sur la mobilisation du monde des arts pour repérer les 13 mots de vocabulaire."
            scriptText={audioDoc1Script}
          />

          {/* Table Vocabulaire Dossier 1 */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
            <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg mb-4">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <h4>Vocabulaire à étudier · Dossier 1 (avec traduction en espagnol)</h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold text-[11px]">
                    <th className="py-2.5 px-3">Mot ou expression</th>
                    <th className="py-2.5 px-3">Définition simple</th>
                    <th className="py-2.5 px-3 text-stone-600">En español</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {doc1Vocab.map((item, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-3 px-3 font-semibold text-stone-900 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => speakFrenchText(item.french)}
                            title="Écouter le mot"
                            className="p-1 text-stone-400 hover:text-amber-600 transition-colors"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <span>{item.french}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-stone-700 leading-relaxed">
                        {item.definition}
                      </td>
                      <td className="py-3 px-3 font-serif italic text-amber-800 whitespace-nowrap">
                        {item.spanish}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activité 2.1 : Exercice à trous pour Dossier 1 */}
          <section className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Activité 2.1
                </div>
                <h3 className="text-xl font-bold font-serif text-stone-900 mt-0.5">
                  Complète le compte-rendu avec le bon mot
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Place les mots du vocabulaire étudié dans les phrases correspondantes.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {submitted21 && (
                  <span className="text-xs font-mono font-bold px-3 py-1.5 bg-stone-100 rounded-lg text-stone-800 border border-stone-200">
                    Score : {score21} / {part2FillSentences.length}
                  </span>
                )}
                <button
                  onClick={handleReset21}
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
                  {selectedBlank21 ? `Placement dans la phrase n°${selectedBlank21}` : 'Clique d\'abord sur un trou'}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {part2FillWords.map((word) => {
                  const isUsed = Object.values(fillAnswers21).includes(word);
                  return (
                    <button
                      key={word}
                      onClick={() => handleWordBankClick(word)}
                      disabled={submitted21}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                        isUsed
                          ? 'bg-stone-200 text-stone-400 border-stone-200 line-through'
                          : selectedBlank21 !== null
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

            {/* Sentences */}
            <div className="space-y-4 mt-6">
              {part2FillSentences.map((sentence) => {
                const currentAnswer = fillAnswers21[sentence.id] || '';
                const isSelected = selectedBlank21 === sentence.id;
                const isCorrect = submitted21 && currentAnswer.toLowerCase() === sentence.correctAnswer.toLowerCase();
                const isWrong = submitted21 && currentAnswer && currentAnswer.toLowerCase() !== sentence.correctAnswer.toLowerCase();

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

                      <button
                        onClick={() => !submitted21 && setSelectedBlank21(sentence.id)}
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

                      {submitted21 && (
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

                    {isSelected && sentence.hint && !submitted21 && (
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-700 bg-amber-50/80 p-2 rounded">
                        <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Indice : {sentence.hint}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Actions 2.1 */}
            <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-stone-500">
                {Object.keys(fillAnswers21).length} sur {part2FillSentences.length} phrases complétées.
              </p>

              <div className="flex items-center gap-3">
                {!submitted21 ? (
                  <button
                    onClick={handleValidate21}
                    disabled={Object.keys(fillAnswers21).length === 0}
                    className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 disabled:opacity-40 transition-colors"
                  >
                    Vérifier mes réponses
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-600">
                      Score : <strong>{score21}/{part2FillSentences.length}</strong>
                    </span>
                    <button
                      onClick={handleReset21}
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
      )}

      {/* ==================================================== */}
      {/* DOSSIER 2 : LA NUIT EUROPÉENNE DES MUSÉES            */}
      {/* ==================================================== */}
      {(activeDossier === 'all' || activeDossier === 'dossier2') && (
        <div className="space-y-8 pt-6 border-t border-stone-200 animate-in fade-in duration-200">
          <div className="border-b border-stone-200 pb-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Dossier d'écoute 2
            </div>
            <h3 className="text-xl font-bold font-serif text-stone-900">
              La Nuit européenne des Musées & La Visite Culturelle
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Vocabulaire à étudier : <em>la nuit des musées, gratuit, une animation, un spectacle, un costume d’époque, Ça en valait la peine., une collection, se précipiter vers, un sculpteur / une statue, éclairé(e), la gare, le quai, de grosses bises.</em>
            </p>
          </div>

          {/* Audio Player 2 */}
          <AudioPlayer
            docLabel="Document Audio 2 · Reportage & Invitation"
            title="Radio Culture : Sortir la nuit au musée !"
            subtitle="Écoutez ce reportage pour mémoriser les expressions pratiques de la visite culturelle."
            scriptText={audioDoc2Script}
          />

          {/* Table Vocabulaire Dossier 2 */}
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
            <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg mb-4">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <h4>Vocabulaire à étudier · Dossier 2 (avec traduction en espagnol)</h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold text-[11px]">
                    <th className="py-2.5 px-3">Mot ou expression</th>
                    <th className="py-2.5 px-3">Définition simple</th>
                    <th className="py-2.5 px-3 text-stone-600">En español</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {doc2Vocab.map((item, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-3 px-3 font-semibold text-stone-900 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => speakFrenchText(item.french)}
                            title="Écouter l'expression"
                            className="p-1 text-stone-400 hover:text-amber-600 transition-colors"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <span>{item.french}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-stone-700 leading-relaxed">
                        {item.definition}
                      </td>
                      <td className="py-3 px-3 font-serif italic text-amber-800 whitespace-nowrap">
                        {item.spanish}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activité 2.2 : Quiz d'écoute active */}
          <section className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Activité 2.2 · Écoute active
                </div>
                <h3 className="text-xl font-bold font-serif text-stone-900 mt-0.5">
                  Quiz de compréhension sur la Nuit des musées
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Vérifiez votre compréhension de l'enregistrement à l'aide de ces 6 questions à choix multiples.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {submitted22 && (
                  <span className="text-xs font-mono font-bold px-3 py-1.5 bg-stone-100 rounded-lg text-stone-800 border border-stone-200">
                    Score : {score22} / {doc2ListeningQuiz.length}
                  </span>
                )}
                <button
                  onClick={handleReset22}
                  title="Réinitialiser le quiz"
                  className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {doc2ListeningQuiz.map((item) => {
                const userChoice = selectedAnswers22[item.id];
                const isCorrect = submitted22 && userChoice === item.correctAnswer;
                const isWrong = submitted22 && userChoice && userChoice !== item.correctAnswer;

                return (
                  <div 
                    key={item.id} 
                    className={`p-5 rounded-xl border transition-all ${
                      submitted22
                        ? isCorrect
                          ? 'border-emerald-300 bg-emerald-50/40'
                          : isWrong
                          ? 'border-rose-300 bg-rose-50/40'
                          : 'border-stone-200 bg-stone-50/30'
                        : 'border-stone-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h4 className="text-sm sm:text-base font-semibold text-stone-900 flex items-start gap-2">
                        <span className="font-mono text-xs font-bold text-amber-800 px-2 py-0.5 bg-amber-100 rounded mt-0.5">
                          Q{item.id}
                        </span>
                        <span>{item.question}</span>
                      </h4>

                      {submitted22 && (
                        <span className="shrink-0">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-600" />
                          )}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                      {item.options.map((opt, optIdx) => {
                        const isSelected = userChoice === opt;
                        const isTheCorrectOne = opt === item.correctAnswer;

                        return (
                          <button
                            key={optIdx}
                            disabled={submitted22}
                            onClick={() => handleSelectOption22(item.id, opt)}
                            className={`text-left p-3 rounded-lg border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                              submitted22
                                ? isTheCorrectOne
                                ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-semibold'
                                : isSelected
                                ? 'bg-rose-100 border-rose-400 text-rose-950 line-through'
                                : 'bg-stone-50 border-stone-200 text-stone-400'
                                : isSelected
                                ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                                : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && !submitted22 && (
                              <Check className="w-4 h-4 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {submitted22 && (
                      <p className={`text-xs mt-3 pt-2 border-t border-stone-200/80 leading-relaxed ${
                        isCorrect ? 'text-emerald-800' : 'text-stone-700'
                      }`}>
                        <strong>Explication :</strong> {item.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Actions 2.2 */}
            <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-stone-500 font-mono">
                {Object.keys(selectedAnswers22).length} / {doc2ListeningQuiz.length} questions répondues
              </span>

              {!submitted22 ? (
                <button
                  onClick={handleValidate22}
                  disabled={Object.keys(selectedAnswers22).length === 0}
                  className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 disabled:opacity-40 transition-colors"
                >
                  Vérifier mes réponses
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-stone-700">
                    Score obtenu : <strong>{score22} / {doc2ListeningQuiz.length}</strong>
                  </span>
                  <button
                    onClick={handleReset22}
                    className="px-4 py-2 bg-stone-100 text-stone-800 rounded-lg text-xs font-semibold hover:bg-stone-200 transition-colors"
                  >
                    Recommencer le quiz
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
