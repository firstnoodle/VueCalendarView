import { TIME_IN_MILLISECONDS, unitIsValid } from './time.js';

/**
 * @param {String|Date} date
 */
export const parseDate = date => {
    if (typeof date === 'string') {
        return new Date(date);
    }
    return date;
};

/**
 * Check wether a date string is valid
 * @param {String} dateString
 */
export const dateIsValid = date => {
    date = parseDate(date);
    return date.getTime() === date.getTime();
};

/**
 * Small conveniency function to print dates to the console
 * @param {Date} date
 * @returns {void}
 */
export const printDate = date => {
    console.log(date.toISOString().substr(0, 16).replace('T', ' '));
};

/**
 * Check if two dates are the same
 * @param {Date} date1
 * @param {Date} date2
 * @returns {Boolean}
 */
export const datesAreEqual = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
};

/**
 * Add / subtract value from date
 * @param {Date|String} date
 * @param {Integer|Float} value
 * @returns {Date}
 */
export const moveDate = (date, value, unit) => {
    date = parseDate(date);

    if (!dateIsValid(date) || !unitIsValid(unit)) {
        return null;
    }

    let unixTime = date.getTime();
    unixTime += value * TIME_IN_MILLISECONDS[unit];
    date.setTime(unixTime);

    return date;
};

/**
 * Get the difference between two dates in a specified format
 * @param {String|Date} date1
 * @param {String|Date} date2
 * @param {String} unit
 * @returns {Number}
 */
export const diffDates = (date1, date2, unit) => {
    date1 = parseDate(date1);
    date2 = parseDate(date2);

    if (!dateIsValid(date1) || !dateIsValid(date2) || !unitIsValid(unit)) {
        return null;
    }

    const deltaMilliseconds = date1.getTime() - date2.getTime();

    return deltaMilliseconds / TIME_IN_MILLISECONDS[unit];
};

/**
 * Check if a (subject)date is after a given (target)date
 * @param {String|Date} subjectDate
 * @param {String|Date} targetDate
 * @returns {Boolean}
 */
export const dateIsAfter = (subjectDate, targetDate) => {
    return subjectDate.getTime() > targetDate.getTime();
};

/**
 * Check if a (subject)date is before a given (target)date
 * @param {String|Date} subjectDate
 * @param {String|Date} targetDate
 * @returns {Boolean}
 */
export const dateIsBefore = (subjectDate, targetDate) => {
    return subjectDate.getTime() < targetDate.getTime();
};

/**
 * Check if a (subject)date is between a given (start)date and (end)date
 * @param {String|Date} subjectDate
 * @param {String|Date} targetDate
 * @returns {Boolean}
 */
export const dateIsBetween = (subjectDate, startDate, endDate) => {
    return isAfter(subjectDate, startDate) && isBefore(subjectDate, endDate);
};