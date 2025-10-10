import { NextResponse } from 'next/server';
import { getAnswerCounts, getTotalAnswers } from '@/lib/answerStore';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const questionId = parseInt(searchParams.get('questionId') || '1');
  
  const counts = getAnswerCounts(questionId);
  const total = getTotalAnswers(questionId);
  
  return NextResponse.json({ counts, total });
}
