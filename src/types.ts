export type TabType = 
  | 'comprehension-ecrite' 
  | 'comprehension-orale' 
  | 'production-ecrite' 
  | 'grammaire' 
  | 'ressources';

export interface MatchingItem {
  id: number;
  word: string;
  correctLetter: string;
}

export interface DefinitionItem {
  letter: string;
  text: string;
}

export interface FillBlankItem {
  id: number;
  sentenceBefore: string;
  sentenceAfter: string;
  correctAnswer: string;
  hint?: string;
}

export interface VocabCard {
  french: string;
  definition: string;
  spanish: string;
  category: 'art-bd' | 'debat-contemporain' | 'visite-musee';
  exampleSentence?: string;
}

export interface GrammaireQuizItem {
  id: number;
  phrase: string;
  correct: 'PC' | 'IMP';
  explanation: string;
}

export interface ConjugationItem {
  id: number;
  verb: string;
  correct: string;
  altCorrect?: string[];
  explanation: string;
}

export interface PronounItem {
  id: number;
  sentenceBefore: string;
  sentenceAfter: string;
  correct: 'qui' | 'que' | "qu'" | 'où' | 'dont';
  explanation: string;
}

export interface CombineSentenceItem {
  id: number;
  sentence1: string;
  sentence2: string;
  targetPronoun: 'qui' | 'que' | "qu'" | 'où' | 'dont';
  expectedSolution: string;
  alternativeSolutions?: string[];
  hint: string;
}

export interface StudentProgress {
  part1Score: number;
  part1Total: number;
  part2Score: number;
  part2Total: number;
  part4Score: number;
  part4Total: number;
  completedActivities: string[];
}
