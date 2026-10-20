import React from 'react';
import { TabType, StudentProgress } from '../types';
import { Sparkles, RotateCcw } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  progress: StudentProgress;
  onResetProgress: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  progress,
  onResetProgress
}) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'comprehension-ecrite', label: '1. Compréhension écrite' },
    { id: 'comprehension-orale', label: '2. Compréhension orale' },
    { id: 'production-ecrite', label: '3. Production écrite' },
    { id: 'grammaire', label: '4. Grammaire' },
    { id: 'ressources', label: '5. Ressources & Lexique' }
  ];

  const totalScore = progress.part1Score + progress.part2Score + progress.part4Score;
  const maxPossible = progress.part1Total + progress.part2Total + progress.part4Total;
  const percentage = maxPossible > 0 ? Math.round((totalScore / maxPossible) * 100) : 0;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button 
            onClick={() => onTabChange('comprehension-ecrite')}
            className="text-left font-serif text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:text-stone-700 transition-colors"
          >
            Atelier Français · 9e
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`relative py-1 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-stone-900 font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 text-xs text-stone-600 font-mono tabular-nums bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Score : <strong className="text-stone-900">{totalScore} / {maxPossible}</strong> ({percentage}%)</span>
            </div>

            <button
              onClick={onResetProgress}
              title="Réinitialiser les scores et exercices"
              className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile secondary tab strip */}
        <div className="flex lg:hidden overflow-x-auto py-2 border-t border-stone-100 gap-2 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-1 text-xs rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-stone-900 text-white font-medium'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
