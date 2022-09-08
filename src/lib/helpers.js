import { getHours, getMinutes } from 'date-fns';

export const formatDateToHM = (date) => {
  const hours = getHours(date);
  const minutes = getMinutes(date);
  return `${hours < 10 && '0'}${hours}:${minutes}`;
};

export const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
