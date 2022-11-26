import { getHours, getMinutes } from 'date-fns';

export const pluralWords = {
  seats: ['место', 'места', 'мест'],
  passengers: ['пассажира', 'пассажиров', 'пассажиров'],
  children: ['ребёнка', 'детей', 'детей'],
  adultPassengers: ['Взрослый', 'Взрослых', 'Взрослых'],
  childPassengers: ['Ребёнок', 'Ребёнка', 'Детей'],
};

export const formatDateToHM = (date) => {
  const hours = getHours(date);
  const minutes = getMinutes(date);
  return `${hours < 10 && '0'}${hours}:${minutes}`;
};

export const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// заимствованная функция

/**
 * Pluralize russian words
 * @param {Number} count quantity for word
 * @param {Array.<string[]>} declarations array of words [одна, две, пять]
 * @param {String} [zeroDeclaration] declaration for zero quantity
 * @example plural(4, ['пересадка', 'пересадки', 'пересадок'], 'Без пересадок')
 * @returns {String} count + plural form for word
 */

export const getPlural = (count, declarations, zeroDeclaration) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return zeroDeclaration && !count
    ? zeroDeclaration
    : `${count} ${
        declarations[
          count % 100 > 4 && count % 100 < 20
            ? 2
            : cases[Math.min(count % 10, 5)]
        ]
      }`;
};
