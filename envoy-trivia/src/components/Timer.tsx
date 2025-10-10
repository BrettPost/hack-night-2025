'use client';

import { useEffect, useState, useRef } from 'react';

interface TimerProps {
  duration: number;
  onComplete: () => void;
  isActive: boolean;
}

export default function Timer({ duration, onComplete, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const onCompleteRef = useRef(onComplete);

  // Keep the ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Use setTimeout to defer the callback until after render
          setTimeout(() => {
            onCompleteRef.current();
          }, 0);
          return duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, duration]);

  useEffect(() => {
    if (isActive) {
      setTimeLeft(duration);
    }
  }, [isActive, duration]);

  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (timeLeft / duration) * circumference;

  return (
    <div className="relative w-24 h-24">
      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#E5E5E5"
          strokeWidth="4"
          fill="white"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#FF4B4B"
          strokeWidth="4"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">
          {timeLeft}
        </span>
      </div>
    </div>
  );
}
