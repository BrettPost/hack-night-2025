'use client';

import { useState, useEffect } from 'react';
import Timer from '@/components/Timer';
import QRCode from '@/components/QRCode';
import PartyAnimations from '@/components/PartyAnimations';
import { triviaQuestions, TriviaQuestion } from '@/data/trivia';

type AppState = 'question' | 'answer';

// Shuffle function to randomize questions
const shuffleQuestions = (questions: TriviaQuestion[]) => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Home() {
  const [questionPool, setQuestionPool] = useState<TriviaQuestion[]>(triviaQuestions);
  const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion>(triviaQuestions[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [appState, setAppState] = useState<AppState>('question');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  // Shuffle questions on mount (client-side only)
  useEffect(() => {
    const shuffled = shuffleQuestions(triviaQuestions);
    setQuestionPool(shuffled);
    setCurrentQuestion(shuffled[0]);
  }, []);

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
      const nextIndex = (currentQuestionIndex + 1) % questionPool.length;
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(questionPool[nextIndex]);
      setAppState('question');
      setShowCorrectAnswer(false);
      setSelectedAnswer(null);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const getAnswerCardStyle = (index: number) => {
    const baseStyle = "w-full h-16 sm:h-20 lg:h-24 xl:h-28 bg-white border-2 sm:border-3 border-white rounded-xl sm:rounded-2xl flex items-center justify-center text-center font-semibold text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 hover:bg-white hover:text-[#FF4B4B] hover:border-white hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl sm:hover:shadow-2xl cursor-pointer shadow-lg sm:shadow-xl";
    
    if (showCorrectAnswer) {
      if (index === currentQuestion.correctAnswer) {
        return "w-full h-16 sm:h-20 lg:h-24 xl:h-28 bg-gradient-to-br from-green-500 to-green-600 text-white border-2 sm:border-3 border-green-400 rounded-xl sm:rounded-2xl flex items-center justify-center text-center font-semibold text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 shadow-lg sm:shadow-xl";
      } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
        return "w-full h-16 sm:h-20 lg:h-24 xl:h-28 bg-gradient-to-br from-red-500 to-red-600 text-white border-2 sm:border-3 border-red-400 rounded-xl sm:rounded-2xl flex items-center justify-center text-center font-semibold text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 shadow-lg sm:shadow-xl";
      } else {
        return "w-full h-16 sm:h-20 lg:h-24 xl:h-28 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 border-2 sm:border-3 border-gray-300 rounded-xl sm:rounded-2xl flex items-center justify-center text-center font-semibold text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 shadow-lg sm:shadow-xl";
      }
    }
    
    if (selectedAnswer === index && !showCorrectAnswer) {
      return "w-full h-16 sm:h-20 lg:h-24 xl:h-28 bg-white text-[#FF4B4B] border-2 sm:border-3 border-white rounded-xl sm:rounded-2xl flex items-center justify-center text-center font-semibold text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-300 shadow-lg sm:shadow-xl";
    }
    
    return baseStyle;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans relative overflow-hidden">
      {/* Party Animations - Only during question phase */}
      <PartyAnimations isActive={appState === 'question'} />
      
      {/* Timer - Top Right */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 z-10">
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
          <Timer
            duration={appState === 'question' ? 30 : 20}
            onComplete={handleTimerComplete}
            isActive={true}
          />
        </div>
      </div>

      {/* QR Code - Bottom Left */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 lg:bottom-6 lg:left-6 z-10">
        <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
          <QRCode />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 sm:px-6 sm:py-8">
        {/* Main Envoy Red Container */}
        <div className={`bg-gradient-to-br from-[#FF4B4B] to-[#E63939] rounded-2xl sm:rounded-3xl shadow-[0_8px_32px_rgba(255,75,75,0.3)] sm:shadow-[0_12px_48px_rgba(255,75,75,0.4)] border-2 sm:border-4 border-white p-4 sm:p-6 lg:p-8 xl:p-10 w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl transition-all duration-500 ${
          appState === 'question' ? 'animate-pulse-glow' : ''
        }`}>
          {appState === 'question' ? (
            <>
              {/* Question Block */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.1)] sm:shadow-[0_8px_24px_rgba(0,0,0,0.15)] border border-gray-100 sm:border-2 p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#2E2E2E] text-center leading-tight sm:leading-relaxed">
                  {currentQuestion.question}
                </h1>
              </div>

              {/* Answer Cards Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
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
