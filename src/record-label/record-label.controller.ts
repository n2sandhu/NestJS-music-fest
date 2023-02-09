import { Controller, Get } from '@nestjs/common';
import { RecordLabelService } from './record-label.service';

@Controller('record-label')
export class RecordLabelController {
  constructor(private readonly recordLabelService: RecordLabelService) {}

  @Get()
  async getRecordLabels() {
    return this.recordLabelService.fetchRecordLabelsWithBands();
  }
}
