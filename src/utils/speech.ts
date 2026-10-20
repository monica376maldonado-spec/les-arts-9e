// Speech synthesis utility for French language learning

export const isSpeechSynthesisSupported = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

let currentUtterance: SpeechSynthesisUtterance | null = null;

export const speakFrenchText = (
  text: string, 
  rate: number = 0.95,
  onEnd?: () => void,
  onError?: () => void
): void => {
  if (!isSpeechSynthesisSupported()) {
    if (onError) onError();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR';
  utterance.rate = rate;
  utterance.pitch = 1.0;

  // Attempt to select a high quality French voice if available
  const voices = window.speechSynthesis.getVoices();
  const frenchVoice = voices.find(v => v.lang.startsWith('fr') && (v.name.includes('French') || v.name.includes('France') || v.name.includes('Thomas') || v.name.includes('Audrey') || v.name.includes('Amelie') || v.name.includes('Google')))
    || voices.find(v => v.lang.startsWith('fr'));

  if (frenchVoice) {
    utterance.voice = frenchVoice;
  }

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    currentUtterance = null;
    console.warn('Speech synthesis notice:', e);
    if (onError) onError();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = (): void => {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
};

export const pauseSpeech = (): void => {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.pause();
  }
};

export const resumeSpeech = (): void => {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.resume();
  }
};
