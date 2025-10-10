// Simple in-memory store for answer counts
const answerCounts: { [key: string]: number } = {};
let currentQuestionId = 1;

export function recordAnswer(questionId: number, answerId: number) {
  const key = `${questionId}-${answerId}`;
  answerCounts[key] = (answerCounts[key] || 0) + 1;
}

export function getAnswerCounts(questionId: number) {
  const counts = [0, 0, 0, 0]; // 4 answers
  for (let i = 0; i < 4; i++) {
    const key = `${questionId}-${i}`;
    counts[i] = answerCounts[key] || 0;
  }
  return counts;
}

export function getTotalAnswers(questionId: number) {
  return getAnswerCounts(questionId).reduce((a, b) => a + b, 0);
}

export function resetAnswers(questionId: number) {
  for (let i = 0; i < 4; i++) {
    const key = `${questionId}-${i}`;
    delete answerCounts[key];
  }
}

export function setCurrentQuestion(id: number) {
  currentQuestionId = id;
}

export function getCurrentQuestion() {
  return currentQuestionId;
}
