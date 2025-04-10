'use server';

import prisma from '../postgres/db';
import { SurveyQuestion } from '@prisma/client';

export async function getSurveyQuestionByQuestion(surveyQuestion: string): Promise<SurveyQuestion> {
  const surveyQ = await prisma.surveyQuestion.findFirst({
    where: {
      questionText: surveyQuestion,
    },
  });
  if (!surveyQ) {
    throw new Error(`No survey question found with text ${surveyQuestion}`);
  }
  return surveyQ;
}

export async function storeSurveyResponse(surveyQuestionText: string, studentId: number, response: string) {
  const question = await getSurveyQuestionByQuestion(surveyQuestionText);
  const surveyResponse = await prisma.surveyResponse.create({
    data: {
      surveyQuestionId: question.id,
      studentId: studentId,
      response: response,
    },
  });
  return surveyResponse;
}
