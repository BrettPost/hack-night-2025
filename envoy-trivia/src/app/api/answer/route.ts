import { NextResponse } from 'next/server';
import { recordAnswer } from '@/lib/answerStore';

export async function POST(request: Request) {
  const { questionId, answerId } = await request.json();
  recordAnswer(questionId, answerId);
  return NextResponse.json({ success: true });
}
