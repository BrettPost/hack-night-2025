import { NextResponse } from 'next/server';
import { resetAnswers } from '@/lib/answerStore';

export async function POST(request: Request) {
  const { questionId } = await request.json();
  resetAnswers(questionId);
  return NextResponse.json({ success: true });
}
