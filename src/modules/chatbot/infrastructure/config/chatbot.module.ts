import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaClient } from '@prisma/client';
import { ChatbotController } from '../controllers/chatbot.controller';

@Module({
  imports: [HttpModule],
  controllers: [ChatbotController],
  providers: [
    {
      provide: PrismaClient,
      useFactory: () => new PrismaClient(),
    },
  ],
})
export class ChatbotModule {}