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
    const baseStyle = "w-full h-28 bg-white border-3 border-white rounded-2xl flex items-center justify-center text-center font-semibold text-xl transition-all duration-300 hover:bg-white hover:text-[#FF4B4B] hover:border-white hover:-translate-y-2 hover:shadow-2xl cursor-pointer shadow-xl";
    
    if (showCorrectAnswer) {
      if (index === currentQuestion.correctAnswer) {
        return "w-full h-28 bg-gradient-to-br from-green-500 to-green-600 text-white border-3 border-green-400 rounded-2xl flex items-center justify-center text-center font-semibold text-xl transition-all duration-300 shadow-xl";
      } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
        return "w-full h-28 bg-gradient-to-br from-red-500 to-red-600 text-white border-3 border-red-400 rounded-2xl flex items-center justify-center text-center font-semibold text-xl transition-all duration-300 shadow-xl";
      } else {
        return "w-full h-28 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 border-3 border-gray-300 rounded-2xl flex items-center justify-center text-center font-semibold text-xl transition-all duration-300 shadow-xl";
      }
    }
    
    if (selectedAnswer === index && !showCorrectAnswer) {
      return "w-full h-28 bg-white text-[#FF4B4B] border-3 border-white rounded-2xl flex items-center justify-center text-center font-semibold text-xl transition-all duration-300 shadow-xl";
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
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Main Envoy Red Container */}
        <div className="bg-gradient-to-br from-[#FF4B4B] to-[#E63939] rounded-3xl shadow-[0_12px_48px_rgba(255,75,75,0.4)] border-4 border-white p-10 max-w-6xl w-full">
          {appState === 'question' ? (
            <>
              {/* Question Block */}
              <div className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.15)] border-2 border-gray-100 p-10 mb-10">
                <h1 className="text-4xl font-bold text-[#2E2E2E] text-center leading-relaxed">
                  {currentQuestion.question}
                </h1>
              </div>

              {/* Answer Cards Grid */}
              <div className="grid grid-cols-2 gap-8">
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
              <div className="bg-white rounded-2xl shadow-lg p-8">
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
    </div>
  );
}
