import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/ceo-tasks'), // Connect to local mongodb server 'ceo-tasks'
    TasksModule, // Register the Tasks feature module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
