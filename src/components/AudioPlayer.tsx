import { useState, useEffect } from "react";

interface AudioPlayerProps {
  text: string;
  title?: string;
}

export default function AudioPlayer({ text, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Stop audio if route changes
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, [text]);

  if (!isSupported) return null;

  function togglePlay() {
    if (!window.speechSynthesis) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      // Clean up markdown syntax for cleaner speech
      const cleanedText = text
        .replace(/[#*`_~\[\]()>-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanedText);
      utterance.rate = 1.05; // Slightly brisk, clear pace
      utterance.pitch = 1.0;

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  }

  return (
    <button
      type="button"
      className={`audio-player-btn ${isPlaying ? "playing" : ""}`}
      onClick={togglePlay}
      title={isPlaying ? "Stop audio readout" : `Listen to ${title || "lesson"} readout`}
      aria-label={isPlaying ? "Stop audio" : `Listen to ${title || "lesson"}`}
    >
      <span className="audio-icon">{isPlaying ? "⏹️" : "🔊"}</span>
      <span className="audio-label">{isPlaying ? "Stop listening" : "Listen to lesson"}</span>
    </button>
  );
}
