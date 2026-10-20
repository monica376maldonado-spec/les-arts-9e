/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, StudentProgress } from './types';
import { Navbar } from './components/Navbar';
import { ComprehensionEcrite } from './components/ComprehensionEcrite';
import { ComprehensionOrale } from './components/ComprehensionOrale';
import { ProductionEcrite } from './components/ProductionEcrite';
import { Grammaire } from './components/Grammaire';
import { Ressources } from './components/Ressources';
import { BookOpen, Sparkles, Award } from 'lucide-react';

const STORAGE_KEY = 'atelier_francais_9e_progress';

const initialProgress: StudentProgress = {
  part1Score: 0,
  part1Total: 21, // 13 (Activité 1.1) + 8 (Activité 1.2)
  part2Score: 0,
  part2Total: 14, // 8 (Activité 2.1) + 6 (Activité 2.2)
  part4Score: 0,
  part4Total: 25, // 6 (4.1) + 7 (4.2) + 8 (4.4) + 4 (4.5)
  completedActivities: []
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('comprehension-ecrite');
  const [scores, setScores] = useState<Record<string, { score: number; total: number }>>({});

  // Load scores from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setScores(JSON.parse(saved));
      }
    } catch (err) {
      console.warn('Could not load progress from localStorage', err);
    }
  }, []);

  // Save scores to localStorage
  const handleScoreUpdate = (activityKey: string, score: number, total: number) => {
    setScores(prev => {
      const next = { ...prev, [activityKey]: { score, total } };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.warn('Could not save progress to localStorage', err);
      }
      return next;
    });
  };

  const handleResetProgress = () => {
    if (window.confirm('Voulez-vous vraiment réinitialiser vos scores et recommencer l’atelier ?')) {
      setScores({});
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.warn('Could not clear progress from localStorage', err);
      }
    }
  };

  // Compute calculated progress
  const progress: StudentProgress = {
    part1Score: (scores['part1_1']?.score || 0) + (scores['part1_2']?.score || 0),
    part1Total: 21,
    part2Score: (scores['part2_1']?.score || 0) + (scores['part2_2']?.score || 0),
    part2Total: 14,
    part4Score: 
      (scores['part4_1']?.score || 0) + 
      (scores['part4_2']?.score || 0) + 
      (scores['part4_4']?.score || 0) + 
      (scores['part4_5']?.score || 0),
    part4Total: 25,
    completedActivities: Object.keys(scores)
  };

  const totalScore = progress.part1Score + progress.part2Score + progress.part4Score;
  const maxPossible = progress.part1Total + progress.part2Total + progress.part4Total;

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-200 selection:text-amber-950 font-sans">
      {/* Primary Top Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        progress={progress}
        onResetProgress={handleResetProgress}
      />

      {/* Main Workspace Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'comprehension-ecrite' && (
          <ComprehensionEcrite onScoreUpdate={handleScoreUpdate} />
        )}

        {activeTab === 'comprehension-orale' && (
          <ComprehensionOrale onScoreUpdate={handleScoreUpdate} />
        )}

        {activeTab === 'production-ecrite' && (
          <ProductionEcrite />
        )}

        {activeTab === 'grammaire' && (
          <Grammaire onScoreUpdate={handleScoreUpdate} />
        )}

        {activeTab === 'ressources' && (
          <Ressources />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="mt-auto border-t border-stone-200 bg-white py-8 text-stone-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-900">Atelier Français · 9e Collège</span>
            <span aria-hidden="true">·</span>
            <span>Préparation à l'examen « Art et BD »</span>
          </div>

          <div className="flex items-center gap-4 text-stone-600">
            <span>Cycle 4 · FLE / Français collège</span>
            <span aria-hidden="true">·</span>
            <span>Édition pédagogique interactive</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
