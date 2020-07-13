## CalendarView
Calendar module for building datetime-based interfaces.

### Abstracting further
Get timespan (view eg. day, week, month, year, decade)
Move timespan
Change timespan

### Rendeless approach
The ambition is to make a renderless component.
This is a short first stab at listing what it would expose.

**Data**
- selectedDate - string | Date
- viewType - string
- viewDate - string
- viewData - array - based on current view name we would be able to render the grid appropriately 

#### Functions
**SelectDate**

**ChangeView**  `viewType = "Date"`
- ~~DateView      `viewData = getHoursInDate`~~
- WeekView      `viewData = DaysInWeek`  get("2020-01-01", "2020-01-07", "DAYS")
- MonthView     `viewData = getDaysInMonth` get("2020-01-01", "2020-01-31", "DAYS")
- YearView      `viewData = getMonthsInYear` get("2020-01-01", "2020-12-31", "MONTHS")
- DecadeView    `viewData = YearsInDecade`  get("2020-01-01", "2029-12-31", "YEARS")

**MoveView**
- StepHours     `moveViewDate(value, "hours")`
- StepDate      `moveViewDate(value, "days")`
- StepWeek      `moveViewDate(value, "weeks")`
- StepMonth     `moveViewDate(value, "months")`
- StepYear      `moveViewDate(value, "years")`
- StepDecade    `moveViewDate(value, "decades")`
