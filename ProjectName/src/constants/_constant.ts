const MAX_SPACING_SIZE = 1000;
const MIN_SPACING_SIZE = -1000;
const _unitSize = {};

for (let size = MIN_SPACING_SIZE; size <= MAX_SPACING_SIZE; size++) {
  // @ts-ignore
  _unitSize[size] = size.toString();
}

export const unitSize = _unitSize;

export const DATE_FORMAT = {
  DEFAULT: 'YYYY-MM-DD',
  DATE: 'YYYY/MM/DD',
};

export const DEFAULT_SCREEN_SIZE = {
  WIDTH: 360,
  HEIGHT: 760,
};

export const GIFT_LIMIT = {
  MIN: 10000,
  MAX: 9000000,
};
