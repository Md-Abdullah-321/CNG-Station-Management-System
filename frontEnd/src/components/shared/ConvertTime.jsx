export default function getTimeIn12HourFormat(milliseconds) {
  const date = new Date(milliseconds);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours %= 12;
  hours = hours ? hours : 12; // convert 0 to 12

  minutes = minutes < 10 ? "0" + minutes : minutes;

  const timeIn12HourFormat = hours + ":" + minutes + " " + ampm;
  return timeIn12HourFormat;
}
