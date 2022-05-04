import { prisma } from '../../prisma';
import { feedbackCreateData, FeedbacksRepository } from './../feedbacksRepository';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
    async create({type, comment, screenshot}: feedbackCreateData) {
        await prisma.feedback.create({
            data: { type, comment, screenshot },
        });
    }

}