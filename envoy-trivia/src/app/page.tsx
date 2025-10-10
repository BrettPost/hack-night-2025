'use client';

import { useState, useEffect } from 'react';
import Timer from '@/components/Timer';
import QRCode from '@/components/QRCode';
import { triviaQuestions, TriviaQuestion } from '@/data/trivia';

type AppState = 'question' | 'answer';

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion>(triviaQuestions[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [appState, setAppState] = useState<AppState>('question');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  // Auto-advance to next question after both question and answer phases complete
  useEffect(() => {
    if (appState === 'question' && selectedAnswer !== null) {
      // This will be handled by the timer completion
      return;
    }
  }, [appState, selectedAnswer]);

  const handleTimerComplete = () => {
    if (appState === 'question') {
      // Switch to answer phase
      setAppState('answer');
      setShowCorrectAnswer(true);
    } else {
      // Switch to next question
      const nextIndex = (currentQuestionIndex + 1) % triviaQuestions.length;
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(triviaQuestions[nextIndex]);
      setAppState('question');
      setShowCorrectAnswer(false);
      setSelectedAnswer(null);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const getAnswerCardStyle = (index: number) => {
    const baseStyle = "w-full h-24 bg-white border border-[#E5E5E5] rounded-xl flex items-center justify-center text-center font-medium text-lg transition-all duration-300 hover:bg-[#FF4B4B] hover:text-white hover:border-[#FF4B4B] hover:-translate-y-1 cursor-pointer";
    
    if (showCorrectAnswer) {
      if (index === currentQuestion.correctAnswer) {
        return `${baseStyle} bg-green-500 text-white border-green-500`;
      } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
        return `${baseStyle} bg-[#FF4B4B] text-white border-[#FF4B4B]`;
      }
    }
    
    if (selectedAnswer === index && !showCorrectAnswer) {
      return `${baseStyle} bg-[#FF4B4B] text-white border-[#FF4B4B]`;
    }
    
    return baseStyle;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans relative overflow-hidden">
      {/* Timer - Top Right */}
      <div className="absolute top-6 right-6 z-10">
        <Timer
          duration={appState === 'question' ? 30 : 20}
          onComplete={handleTimerComplete}
          isActive={true}
        />
      </div>

      {/* QR Code - Bottom Left */}
      <div className="absolute bottom-6 left-6 z-10">
        <QRCode />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-8 py-16">
        {appState === 'question' ? (
          <>
            {/* Question Block */}
            <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-12 max-w-4xl w-full mb-12">
              <h1 className="text-3xl font-bold text-[#2E2E2E] text-center leading-relaxed">
                {currentQuestion.question}
              </h1>
            </div>

            {/* Answer Cards Grid */}
            <div className="grid grid-cols-2 gap-6 max-w-2xl w-full">
              {currentQuestion.answers.map((answer, index) => (
                <div
                  key={index}
                  className={getAnswerCardStyle(index)}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className="px-4">{answer}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Answer Display */}
            <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-12 max-w-4xl w-full mb-12">
              <h1 className="text-3xl font-bold text-[#2E2E2E] text-center mb-8">
                {currentQuestion.question}
              </h1>
              
              <div className="space-y-4">
                {currentQuestion.answers.map((answer, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      index === currentQuestion.correctAnswer
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : index === selectedAnswer
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-gray-100 border-[#E5E5E5] text-gray-600'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-4">
                        {index === currentQuestion.correctAnswer ? '✅' : 
                         index === selectedAnswer ? '❌' : '⚪'}
                      </span>
                      <span className="text-xl font-medium">{answer}</span>
                    </div>
                  </div>
                ))}
              </div>

              {currentQuestion.explanation && (
                <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-lg text-blue-800">
                    <strong>Explanation:</strong> {currentQuestion.explanation}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
