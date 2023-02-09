export interface FestivalInterface {
  name?: string;
  bands: FestivalBand[];
}

interface FestivalBand {
  name: string;
  recordLabel?: string;
}

export interface RecordLabelInterface {
  name: string;
  bands: RecordLabelBand[];
}

export interface RecordLabelBand {
  name: string;
  festivals: RecordLabelBandFestival[];
}

interface RecordLabelBandFestival {
  name: string;
}
