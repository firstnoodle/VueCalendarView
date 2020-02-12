export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const views = {
  DateView: {
    name: "DateView",
    type: "days",
    moveValues: {
      up: -7,
      down: 7,
      left: -1,
      right: 1
    }
  },
  MonthView: {
    name: "MonthView",
    type: "months",
    moveValues: {
      up: -2,
      down: 2,
      left: -1,
      right: 1
    }
  },
  YearView: {
    name: "YearView",
    type: "years",
    moveValues: {
      up: -2,
      down: 2,
      left: -1,
      right: 1
    }
  }
};
