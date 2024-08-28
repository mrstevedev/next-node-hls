export const convertDurationToSeconds = (duration) => {
  const split = duration?.split(":");
  const result = Number(split[0]) * 60 + Number(split[1]);
  return result;
};
export const convertSecondsToMinutes = (counter: number) => {
  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;
  const result = `${minutes}:${padTo2Digits(seconds)}`;
  return result;
};

export const onProgress = (counter, duration) => {
  let width = 0;

  const dur = convertDurationToSeconds(duration);

  if (!isNaN(dur)) {
    width = Math.floor(counter * (100 / dur));

    return width;
  }
};

export const padTo2Digits = (seconds) => {
  return seconds.toString().padStart(2, "0");
};
