import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { unionBy, uniqBy, sortBy, isArray } from 'lodash';
import { FestivalInterface, RecordLabelInterface } from './record-label.interface';

@Injectable()
export class RecordLabelService {
  async fetchRecordLabelsWithBands() {
    const { data: festivals }: { data: FestivalInterface[] } = await axios
      .get('https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals')
      .catch((err: AxiosError) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
    // if the festivals data is not in expected format throw an error
    if (!isArray(festivals)) throw new InternalServerErrorException('Data corrupted');
    const result = festivals.reduce((recordLabels: RecordLabelInterface[], festival) => {
      festival.bands.forEach((band) => {
        // check if a record with record-label already exists in the output
        let prevRecordLabel = recordLabels.find((rl) => rl.name === band.recordLabel);
        if (!prevRecordLabel) {
          // if record-label doesn't exist create a new record populating with band and festival data
          recordLabels.push({
            name: band.recordLabel,
            bands: [
              {
                name: band.name,
                festivals: festival.name ? [{ name: festival.name }] : [],
              },
            ],
          });
        } else {
          // if record-label exists then check if the band is already present in the record-label data
          const existingLabelBand = prevRecordLabel.bands.find((b) => b.name === band.name);
          let festivals = existingLabelBand?.festivals || [];
          // populate the band-festivals only if the festival name exists and is not null
          if (festival.name) festivals = [...festivals, { name: festival.name }];
          prevRecordLabel = {
            name: prevRecordLabel.name,
            bands: uniqBy(
              [
                {
                  name: band.name,
                  festivals,
                },
                ...prevRecordLabel.bands,
              ],
              'name',
            ),
          };
          // replace the existing record-label record with newly built record
          recordLabels = unionBy([prevRecordLabel], recordLabels, 'name');
        }
      });
      return recordLabels;
    }, []);
    // sort all the records alphabetically
    return sortBy(result, 'name').map((recordLabel) => ({
      ...recordLabel,
      bands: sortBy(recordLabel.bands, 'name').map((band) => ({
        ...band,
        festivals: sortBy(band.festivals, 'name'),
      })),
    }));
  }
}
