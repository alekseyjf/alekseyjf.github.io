const getDate = (date: string) =>
  new Date(0, 0, 0, Number(date.split(':')[0]), Number(date.split(':')[1]));

type TimeFromTo = {
  timeFrom: string,
  timeTo: string,
};

const padStartStr = (str: number) => String(str).padStart(2, '0');

const getHoursAndMinutes = ({ timeFrom, timeTo }: TimeFromTo) => {
  const different = +getDate(timeTo) - +getDate(timeFrom);

  let hours = Math.floor((different % 86400000) / 3600000);
  let minutes = Math.round(((different % 86400000) % 3600000) / 60000);

  if (hours < 0) hours = 24 + hours;
  if (minutes < 0) minutes = 60 + minutes;

  return {
    hours,
    minutes,
  }
};

export const getDiffTime = (timeFromTo: TimeFromTo) => {
  const { hours, minutes } = getHoursAndMinutes(timeFromTo);

  return `${hours}год ${minutes}хв`;
};

export const getDiffTimeStamp = (timeFromTo: TimeFromTo) => {
  const { hours, minutes } = getHoursAndMinutes(timeFromTo);

  return Date.parse(`Thu, 01 Jan 1970 ${padStartStr(hours)}:${padStartStr(minutes)}:00 GMT+0000`);
};


