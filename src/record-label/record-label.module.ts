import { Module } from '@nestjs/common';
import { RecordLabelController } from './record-label.controller';
import { RecordLabelService } from './record-label.service';

@Module({
  controllers: [RecordLabelController],
  providers: [RecordLabelService],
})
export class RecordLabelModule {}
