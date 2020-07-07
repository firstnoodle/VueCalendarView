## CalendarView
Calendar module for building datetime-based interfaces.

#### Abstracting further
Get timespan (view eg. day, week, month, year, decade)
Move timespan
Change timespan

#### Rendeless approach
The ambition is to make a renderless component.
This is a short first stab at listing what it would expose.

**Data**
selectedDate - string | Date
viewType - string
viewDate - string
viewData - array - based on current view name we would be able to render the grid appropriately 

**Functions**
SelectDate

ChangeViewType  viewType = "Date"
- DateView      viewData = getHoursInDate
- WeekView      viewData = DaysInWeek
- MonthView     viewData = getDaysInMonth
- YearView      viewData = getMonthsInYear
- DecadeView    viewData = YearsInDecade

MoveView by 
- StepHours     moveViewDate(value, "hours")
- StepDate      moveViewDate(value, "days")
- StepWeek      moveViewDate(value, "weeks")
- StepMonth     moveViewDate(value, "months")
- StepYear      moveViewDate(value, "years")
- StepDecade    moveViewDate(value, "decades")