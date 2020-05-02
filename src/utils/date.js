const COLUMN_COUNT = 7;
const ROW_COUNT = 6;
const CELL_COUNT = COLUMN_COUNT * ROW_COUNT;

const MONTHS = [
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
const WEEKDAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const MS = {
    MILLISECOND: 1,
    SECOND: 1000,
    MINUTE: 60000,
    HOUR: 3600000,
    DAY: 86400000,
    WEEK: 604800000
};

const loopRange = (index, length) => ((index % length) + length) % length;

export class Calendar {
    constructor(options, date = null) {
        this.options = options;
        this.today = new Date();
        this.selectedDate = null;
        this.selectedDateValid = null;
        this.viewDate = null;

        if (date) this.setSelectedDate(date);
        else this.setSelectedDate(this.today);
    }

    setSelectedDate(date) {
        this.selectedDate = new Date(date);
        this.selectedDateValid = this.selectedDate.getTime() === this.selectedDate.getTime();
        this.viewDate = this.selectedDateValid ? new Date(date) : new Date(this.today);
        if(!this.selectedDateValid) console.error(`Calendar.js: date [${date}] is not valid.`);
    }

    getDatesInMonth() {
        let dateCursor = new Date(this.viewDate);

        // find and set calendar grid start date
        const startDate = !(dateCursor.getDay() - this.options.weekStart)
            ? 7
            : loopRange(
                  dateCursor.getDay() - this.options.weekStart,
                  WEEKDAYS.length
              );

        dateCursor.setDate(dateCursor.getDate() - startDate);

        let dates = [];

        // populate grid
        for (let row = 0; row < CELL_COUNT; row++) {
            dates.push({
                label: dateCursor.getDate(),
                date: dateCursor.toString(),
                disabled: this.options.disabledDate
                    ? this.options.disabledDate(dateCursor)
                    : false,
                inactive:
                    dateCursor.getMonth() !== this.viewDate.getMonth(),
                selected: dateCursor.getDate() === this.selectedDate.getDate(),
                current: dateCursor.getDate() === this.today.getDate()
            });
            dateCursor.setDate(dateCursor.getDate() + 1);
        }

        return dates;
    }

    getDecade(date) {
        return Math.floor(date.getFullYear() / 10) * 10;
    }
    
    getDatesInWeek() {
        return null; 
    }

    getMonthsInYear() {
        const monthGrid = [];
        for (let [index, month] of MONTHS.entries()) {
            monthGrid.push({
                label: month,
                current:
                    index === this.today.getMonth() &&
                    this.selectedDate.getFullYear() === this.today.getFullYear()
            });
        }
        return monthGrid;
    }
    
    getWeekNumber(date) {
        // Copy date so don't modify original
        date = new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
        );
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
        // Calculate full weeks to nearest Thursday
        var weekNumber = Math.ceil(((date - yearStart) / MS.DAY + 1) / 7);
        // Return array of year and week number
        return weekNumber;
    }

    getYearsInDecade() {
        const decade = this.getDecade(this.viewDate);
        let yearGrid = [];
        for (const digit of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
            const year = decade + digit;
            yearGrid.push({
                label: year,
                current: this.today.getFullYear() === year
            });
        }
        return yearGrid;
    }

    printDate(date) {
        const dd = date.getDate();
        var mm = date.getMonth() + 1;
        var y = date.getFullYear();

        console.log(y + "/" + mm + "/" + dd);
    }
    
    addYearsToView(years) {
        this.viewDate.setYear(this.viewDate.getFullYear() + years); 
    }
    
    addMonthsToView(months) {
        const currentMonth = this.viewDate.getMonth();
        const requestedMonth = loopRange(currentMonth + months, MONTHS.length);

        // TODO: revisit this - it doesn't seem to be the right solution..
        // change year ?
        const deltaMonths = currentMonth - requestedMonth;
        if (Math.abs(deltaMonths) > 1) {
            if (deltaMonths >= 0) {
                this.addYearsToView(1);
            } else {
                this.addYearsToView(-1);
            }
        }
        this.viewDate.setMonth(requestedMonth);
    }
    
    addDaysToView(days) {
        this.viewDate.setDate(this.viewDate.getDate() + days);    
    }

    setViewMonth(month) {
        this.viewDate.setMonth(month);
    }

    setViewYear(year) {
        this.viewDate.setYear(year);
    }
}
