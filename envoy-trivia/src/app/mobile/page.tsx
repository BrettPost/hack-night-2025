'use client';

import { useState, useEffect } from 'react';
import { triviaQuestions, TriviaQuestion } from '@/data/trivia';

export default function MobilePage() {
  const [currentQuestion] = useState<TriviaQuestion>(triviaQuestions[0]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Poll for current question from main screen
  useEffect(() => {
    const interval = setInterval(async () => {
      // In a real implementation, you'd fetch the current question from an API
      // For now, we'll just show the first question
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleAnswerSelect = async (answerIndex: number) => {
    if (hasAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setHasAnswered(true);

    // Send answer to server
    try {
      await fetch('/api/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          answerId: answerIndex,
        }),
      });
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 mt-8">
          <h1 className="text-2xl font-bold text-[#FF4B4B] mb-2">Envoy Trivia</h1>
          <p className="text-gray-600">Join the game!</p>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-[#2E2E2E] text-center leading-relaxed">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Answers */}
        <div className="space-y-4">
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={hasAnswered}
              className={`w-full p-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                hasAnswered && selectedAnswer === index
                  ? 'bg-[#FF4B4B] text-white border-2 border-[#FF4B4B]'
                  : hasAnswered
                  ? 'bg-gray-200 text-gray-500 border-2 border-gray-300'
                  : 'bg-white text-[#2E2E2E] border-2 border-gray-300 hover:bg-[#FF4B4B] hover:text-white hover:border-[#FF4B4B] active:scale-95'
              }`}
            >
              {answer}
            </button>
          ))}
        </div>

        {hasAnswered && (
          <div className="mt-6 p-4 bg-green-100 border-2 border-green-500 rounded-xl text-center">
            <p className="text-green-800 font-semibold">✓ Answer submitted!</p>
          </div>
        )}
      </div>
    </div>
  );
}
