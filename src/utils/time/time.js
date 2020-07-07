export const TIME_IN_MILLISECONDS = {
    MILLISECOND: 1,
    SECOND: 1000,
    MINUTE: 60000,
    HOUR: 3600000,
    DAY: 86400000,
    WEEK: 604800000,
};

export const unitIsValid = unit => {
    return Object.keys(TIME_IN_MILLISECONDS).indexOf(unit) !== -1;
}