import dayjs from 'dayjs';

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const sortPricePoint = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortDayPoint = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const sortTimePoint = (pointA, pointB) => {
  const timePointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timePointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return timePointB - timePointA;
};

const sorting = {
  [SortType.DAY]: (points) => points.sort(sortDayPoint),
  [SortType.TIME]: (points) => points.sort(sortTimePoint),
  [SortType.PRICE]: (points) => points.sort(sortPricePoint)
};

export { SortType, sorting };


