import i18next from 'i18next';
import {camelCase, snakeCase} from 'lodash';
import moment from 'moment';
import querystring from 'query-string';
import {type MutableRefObject, type RefCallback} from 'react';

import {DATE_FORMAT, StorageKeys} from '@/constants';

import {AsyncStorageUtils} from './_asyncStorageUtils';

export const sleep = (ms: number) => {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
};

export const formatPassword = (value: string = '', symbol = '*') => {
  return symbol.repeat(value.length);
};

export function getDateByPreviousMonth(month: number) {
  var currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - month);
  return currentDate;
}

export function toCamelCaseKey(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => toCamelCaseKey(v));
  } else if (obj !== null && obj !== undefined && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: toCamelCaseKey(obj[key]),
      }),
      {},
    );
  }
  return obj;
}

export function toSnakeCaseKey(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(v => toSnakeCaseKey(v));
  } else if (obj !== null && obj !== undefined && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [snakeCase(key)]: toSnakeCaseKey(obj[key]),
      }),
      {},
    );
  }
  return obj;
}

export function formatMoney(
  amount: string | number = 0,
  decimalCount = 2,
  decimal = '.',
  thousands = ',',
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)),
      10,
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          // @ts-ignore
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    );
  } catch (e) {
    // console.log(e);
  }
}
export function formatDate(
  date: string | Date | null,
  format = DATE_FORMAT.DEFAULT,
  utc = false,
) {
  if (!date) {
    return '';
  }
  let newDate = date;
  if (typeof date === 'string') {
    newDate = new Date(date);
    if (newDate.toString() === 'Invalid Date') {
      newDate = new Date(moment(date, format).toDate());
    }
  }
  if (utc) {
    // offset in minutes
    return moment.utc(newDate).format(format);
  }
  return moment(newDate).format(format);
}

export function applyAlphaToColorHex(hexColor: string, alpha = 1) {
  const red = parseInt(hexColor.substring(1, 3), 16);
  const green = parseInt(hexColor.substring(3, 5), 16);
  const blue = parseInt(hexColor.substring(5, 7), 16);
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function shuffleArray(array: number[]) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function generateRandomArray() {
  const initialArray = Array.from({length: 12}, (_, index) => index);
  return shuffleArray(initialArray);
}

export function chunkArray(array: string | any[], size: number) {
  const chunkedArray = [];
  let index = 0;
  while (index < array.length) {
    chunkedArray.push(array.slice(index, size + index));
    index += size;
  }
  return chunkedArray;
}

export function scaleSize(
  newSize: number,
  originalSize: {width: number; height: number},
  type: 'height' | 'width' = 'height',
) {
  if (type !== 'height') {
    return Math.floor((newSize * originalSize.width) / originalSize.height);
  }
  return Math.floor((newSize * originalSize.height) / originalSize.width);
}

export function formatPhoneNumber(str: string, shouldHash = false) {
  const cleaned = ('' + str).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{4})(\d{4}|\d{5})$/);
  if (match) {
    if (shouldHash) {
      return match[1] + '-****-' + match[3];
    }
    return match[1] + '-' + match[2] + '-' + match[3];
  }
  return str;
}

export function isSmallestUnitThousands(number: number) {
  return number % 1000 === 0;
}

type MutableRefList<T> = Array<
  RefCallback<T> | MutableRefObject<T> | undefined | null
>;

export function mergeRefs<T>(...refs: MutableRefList<T>): RefCallback<T> {
  return (val: T) => {
    setRef(val, ...refs);
  };
}

export function setRef<T>(val: T, ...refs: MutableRefList<T>): void {
  refs.forEach(ref => {
    if (typeof ref === 'function') {
      ref(val);
    } else if (ref != null) {
      ref.current = val;
    }
  });
}

export async function isTokenExpired() {
  const date = await AsyncStorageUtils.getData(StorageKeys.TOKEN_EXPIRE_DATE);
  if (!date) {
    return true;
  }
  const expiredDate = new Date(+date);
  if (expiredDate.toString() === 'Invalid Date') {
    return true;
  }
  return expiredDate.getTime() < Date.now();
}

export async function isRefreshTokenExpired() {
  const date = await AsyncStorageUtils.getData(
    StorageKeys.REFRESH_TOKEN_EXPIRE_DATE,
  );
  if (!date) {
    return true;
  }
  const expiredDate = new Date(+date);
  if (expiredDate.toString() === 'Invalid Date') {
    return true;
  }
  return expiredDate.getTime() < Date.now();
}

export function formatMoneyBig({
  amount = 0,
  hasLabel = true,
  returnString = true,
  decimal = false,
}) {
  try {
    if (i18next.language !== 'ko') {
      return formatMoney(amount, decimal ? 2 : 0);
    }
    const negativeSign = amount < 0 ? '-' : '';

    let money = '';
    let decimalValue = '0';

    let numberString = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(0)),
      10,
    ).toString();

    let thousand = (Math.floor(amount / 10000) || 0).toString();
    if (decimal) {
      const value = (amount / 10000).toFixed(2);
      const arr = value.split('.');
      thousand = arr[0];
      if (arr.length > 1) {
        decimalValue = arr[1];
      }
    }
    const moneyThousand =
      thousand.substring(thousand.length - 4, thousand.length) +
      '.' +
      decimalValue;
    if (numberString.length >= 9) {
      money =
        formatMoney(
          decimal ? amount / 100000000 : Math.floor(amount / 100000000),
          decimal ? 2 : 0,
        ) + '억';
    }
    if (hasLabel) {
      money += `${formatMoney(moneyThousand, decimal ? 2 : 0)}만`;
    } else {
      if (returnString) {
        money += `${formatMoney(moneyThousand, decimal ? 2 : 0)}`;
      } else {
        return Number(`${negativeSign}${moneyThousand}`);
      }
    }
    return `${negativeSign}${money}`;
  } catch (e) {
    // console.log(e);
  }
}
