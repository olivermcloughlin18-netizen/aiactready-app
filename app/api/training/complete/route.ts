import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as any).id

  const { moduleId, quizAnswers }: { moduleId: string; quizAnswers: Record<string, string> } = await req.json()

  const module = await db.trainingModule.findUnique({ where: { id: moduleId } })
  if (!module) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const content = module.content as { quiz: { id: string; correct: string }[] }
  const score = content.quiz.filter(q => quizAnswers[q.id] === q.correct).length
  const passed = score >= Math.ceil(content.quiz.length * 0.67)

  if (!passed) {
    return NextResponse.json({ passed: false, score, total: content.quiz.length })
  }

  await db.trainingAssignment.updateMany({
    where: { userId, moduleId },
    data: { completedAt: new Date(), quizScore: score },
  })

  return NextResponse.json({ passed: true, score, total: content.quiz.length })
}
