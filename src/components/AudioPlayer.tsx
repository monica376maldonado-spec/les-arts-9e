import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Eye, EyeOff, Gauge } from 'lucide-react';
import { speakFrenchText, stopSpeech, pauseSpeech, resumeSpeech } from '../utils/speech';

interface AudioPlayerProps {
  title: string;
  subtitle?: string;
  scriptText: string;
  docLabel: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title,
  subtitle,
  scriptText,
  docLabel
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState<number>(0.95);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const handlePlayToggle = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      setIsPaused(false);
      speakFrenchText(
        scriptText,
        speed,
        () => {
          setIsPlaying(false);
          setIsPaused(false);
        },
        () => {
          setIsPlaying(false);
          setIsPaused(false);
        }
      );
    } else if (isPaused) {
      resumeSpeech();
      setIsPaused(false);
    } else {
      pauseSpeech();
      setIsPaused(true);
    }
  };

  const handleRestart = () => {
    stopSpeech();
    setIsPlaying(true);
    setIsPaused(false);
    speakFrenchText(
      scriptText,
      speed,
      () => {
        setIsPlaying(false);
        setIsPaused(false);
      },
      () => {
        setIsPlaying(false);
        setIsPaused(false);
      }
    );
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (isPlaying && !isPaused) {
      stopSpeech();
      speakFrenchText(
        scriptText,
        newSpeed,
        () => {
          setIsPlaying(false);
          setIsPaused(false);
        },
        () => {
          setIsPlaying(false);
          setIsPaused(false);
        }
      );
    }
  };

  return (
    <div className="bg-stone-900 text-stone-100 rounded-xl p-6 border border-stone-800 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-400 font-medium">
            {docLabel}
          </span>
          <h4 className="text-lg font-semibold text-white tracking-tight mt-0.5">
            {title}
          </h4>
          {subtitle && (
            <p className="text-xs text-stone-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-2 self-start md:self-center bg-stone-800/80 rounded-lg p-1 border border-stone-700/60">
          <Gauge className="w-3.5 h-3.5 text-stone-400 ml-1.5" />
          <span className="text-xs text-stone-400">Vitesse :</span>
          {[0.8, 0.95, 1.15].map((s) => (
            <button
              key={s}
              onClick={() => handleSpeedChange(s)}
              className={`px-2 py-0.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                speed === s
                  ? 'bg-amber-500 text-stone-950 font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              {s === 0.95 ? '1.0x' : `${s}x`}
            </button>
          ))}
        </div>
      </div>

      {/* Audio Controls Bar */}
      <div className="flex items-center gap-4 py-3 px-4 bg-stone-950/60 rounded-lg border border-stone-800">
        <button
          onClick={handlePlayToggle}
          aria-label={isPlaying && !isPaused ? "Mettre en pause" : "Écouter l'enregistrement"}
          className="w-11 h-11 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center transition-transform active:scale-95 shrink-0 shadow-md"
        >
          {isPlaying && !isPaused ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current translate-x-0.5" />
          )}
        </button>

        <button
          onClick={handleRestart}
          title="Recommencer depuis le début"
          className="p-2 text-stone-400 hover:text-stone-200 transition-colors shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Visual equalizer / status */}
        <div className="flex-1 flex items-center gap-3">
          <div className="flex items-center gap-1 h-6">
            {[40, 75, 55, 90, 60, 80, 45, 95, 65, 50, 85, 40].map((h, i) => (
              <span
                key={i}
                className={`w-1 rounded-full transition-all duration-300 ${
                  isPlaying && !isPaused
                    ? 'bg-amber-400 animate-pulse'
                    : 'bg-stone-700'
                }`}
                style={{
                  height: isPlaying && !isPaused ? `${h}%` : '20%',
                  animationDelay: `${i * 120}ms`
                }}
              />
            ))}
          </div>
          <span className="text-xs text-stone-300 font-mono tabular-nums">
            {isPlaying && !isPaused
              ? 'Lecture en cours (voix française)...'
              : isPaused
              ? 'En pause'
              : 'Prêt pour l’écoute'}
          </span>
        </div>

        {/* Toggle Transcript */}
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 border border-stone-700 transition-colors shrink-0"
        >
          {showTranscript ? (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              <span>Masquer le texte</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>Voir la transcription</span>
            </>
          )}
        </button>
      </div>

      {/* Transcript accordeon */}
      {showTranscript && (
        <div className="mt-4 p-4 rounded-lg bg-stone-950/80 border border-stone-800 text-stone-300 text-sm leading-relaxed animate-in fade-in duration-200">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Volume2 className="w-3.5 h-3.5" />
            Transcription de l'enregistrement
          </div>
          <p className="font-serif text-[15px] leading-relaxed text-stone-200 italic">
            « {scriptText} »
          </p>
        </div>
      )}
    </div>
  );
};
