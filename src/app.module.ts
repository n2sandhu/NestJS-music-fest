import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordLabelModule } from './record-label/record-label.module';

@Module({
  imports: [RecordLabelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
