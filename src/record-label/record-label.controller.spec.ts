import { Test, TestingModule } from '@nestjs/testing';
import { RecordLabelController } from './record-label.controller';
import { RecordLabelService } from './record-label.service';

describe('RecordLabelController', () => {
  let recordLabelController: RecordLabelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordLabelController],
      providers: [RecordLabelService],
    }).compile();

    recordLabelController = module.get<RecordLabelController>(RecordLabelController);
  });

  describe('getRecordLabels', () => {
    it('should return an array of record-labels', async () => {
      const recordLabels = await recordLabelController.getRecordLabels();
      expect(recordLabels[0]).toMatchObject({
        bands: expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            festivals: expect.any(Array),
          }),
        ]),
      });
    });
  });
});
