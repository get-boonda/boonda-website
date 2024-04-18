export type CalculateRetention = {
  sizeInBytes: number;
  isLoggedIn: boolean;
};

export function calculateRetention({
  sizeInBytes,
  isLoggedIn,
}: CalculateRetention) {
  const minAge = 1000 * 60 * 60 * 24 * 30;
  const maxAge = 1000 * 60 * 60 * 24 * 365;
  const maxSize = isLoggedIn ? 1024 * 1024 * 50 : 1024 * 1024 * 30;
  const expiresIn =
    minAge + (-maxAge + minAge) * Math.pow(sizeInBytes / maxSize - 1, 3);

  return expiresIn;
}

export function millisecondsToStr(milliseconds: number) {
  // TIP: to find current time in milliseconds, use:
  // var  current_time_milliseconds = new Date().getTime();

  function numberEnding(number: number) {
    return number > 1 ? 's' : '';
  }

  var temp = Math.floor(milliseconds / 1000);
  var years = Math.floor(temp / 31536000);
  if (years) {
    return years + ' year' + numberEnding(years);
  }
  //TODO: Months! Maybe weeks?
  var days = Math.floor((temp %= 31536000) / 86400);
  if (days) {
    return days + ' day' + numberEnding(days);
  }
  var hours = Math.floor((temp %= 86400) / 3600);
  if (hours) {
    return hours + ' hour' + numberEnding(hours);
  }
  var minutes = Math.floor((temp %= 3600) / 60);
  if (minutes) {
    return minutes + ' minute' + numberEnding(minutes);
  }
  var seconds = temp % 60;
  if (seconds) {
    return seconds + ' second' + numberEnding(seconds);
  }
  return 'less than a second'; //'just now' //or other string you like;
}
