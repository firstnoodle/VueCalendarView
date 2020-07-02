<template>
    <div class="calendar-view">
        <component :is="currentView" v-bind="currentProps" v-dynamic-events="knownEvents" />
    </div>
</template>

<script>
import { Calendar } from "~/utils/time/calendar.js";
import { dateIsValid } from "~/utils/time/dates.js";
import { months, weekdays } from "./config.js";
import DateView from "./components/DateView.vue";
import MonthView from "./components/MonthView.vue";
import YearView from "./components/YearView.vue";

export default {
    name: "CalendarView",
    components: { DateView, MonthView, YearView },
    props: {
        options: {
            type: Object
        },
        value: {
            type: String | Object | null,
            validator: value => {
                return dateIsValid(value);
            }
        }
    },
    data() {
        return {
            calendar: null,
            currentView: DateView,
            dateGrid: [],
            monthGrid: [],
            yearGrid: [],
            selectedDate: null,
            weekStart: 1,
            knownEvents: {
                changeDate: "onChangeDate",
                changeMonth: "onChangeMonth",
                changeView: "onChangeView",
                changeYear: "onChangeYear",
                stepMonth: "onStepMonth",
                stepYear: "onStepYear"
            }
        };
    },
    directives: {
        DynamicEvents: {
            bind: (el, binding, vnode) => {
                const allEvents = binding.value;
                Object.keys(allEvents).forEach(event => {
                    // register handler in the dynamic component
                    vnode.componentInstance.$on(event, eventData => {
                        const targetEvent = allEvents[event];
                        vnode.context[targetEvent](eventData);
                    });
                });
            },
            unbind: function(el, binding, vnode) {
                vnode.componentInstance.$off();
            }
        }
    },
    computed: {
        currentProps() {
            if (this.currentView.name === DateView.name) {
                return {
                    dateGrid: this.dateGrid,
                    month: months[this.calendar.dateCursor.getMonth()],
                    year: this.calendar.dateCursor.getFullYear(),
                    weekdays: weekdays.map((day, index) => {
                        return weekdays[
                            this.loopRange(
                                index + this.options.weekStart,
                                weekdays.length
                            )
                        ];
                    })
                };
            }
            if (this.currentView.name === MonthView.name) {
                return {
                    monthGrid: this.monthGrid,
                    year: this.calendar.dateCursor.getFullYear()
                };
            }
            if (this.currentView.name === YearView.name) {
                return {
                    decade: Calendar.getDecade(this.calendar.dateCursor),
                    year: this.calendar.dateCursor.getFullYear(),
                    yearGrid: this.yearGrid
                };
            }
        }
    },
    watch: {
        value(newDate, oldDate) {
            this.calendar.setSelectedDate(this.value);
            this.updateView();
        }
    },
    created() {
        this.calendar = new Calendar(this.options, this.value);
        this.updateView();
    },
    methods: {
        loopRange(index, length) {
            return ((index % length) + length) % length;
        },

        onChangeDate(value) {
            this.$emit("change", value);
        },

        onChangeMonth(month) {
            this.calendar.setDateCursorMonth(month);
            this.onChangeView("DateView");
            this.updateView();
        },

        onChangeYear(year) {
            this.calendar.dateCursor.setYear(year);
            this.onChangeView("DateView");
            this.updateView();
        },

        onChangeView(viewName) {
            this.updateView(viewName);
            this.currentView = this.$options.components[viewName];
        },

        onStepMonth(value) {
            this.calendar.addMonthsToDateCursor(value);
            this.updateView();
        },

        onStepYear(value) {
            this.calendar.addYearsToDateCursor(value);
            this.updateView();
        },

        moveRequest(direction) {
            // TODO: create eventListener for calendar
            this.calendar.moveDateCursor(direction);

            // change back to DateView (if on month or year)
            if (this.currentView !== DateView) {
                this.onChangeView("DateView");
            }
            this.updateView();
        },

        updateView(view = null) {
            const viewName = view || this.currentView.name;
            const fnName = `update${viewName}`;
            this[fnName]();
        },

        updateDateView() {
            this.dateGrid = this.calendar.getDatesInCurrentMonth();
        },

        updateMonthView() {
            this.monthGrid = this.calendar.getMonthsInCurrentYear();
        },

        updateYearView() {
            this.yearGrid = this.calendar.getYearsInCurrentDecade();
        }
    }
};
</script>

<style lang="scss">
$cellDimension: 40;

.calendar-view {
    // nav buttons
    button {
        border: none;
        border-radius: 4px;
        cursor: pointer;
        padding: 4px 8px;
        outline: none;

        &:hover {
            background-color: #eee;
        }
    }

    &__page {
        color: #555;
        font-family: Roboto mono;
        font-size: 12px;
        font-weight: 400;
        width: $cellDimension * 7 + px;
    }

    &__cell {
        align-items: center;
        display: inline-flex;
        height: $cellDimension + px;
        justify-content: center;
        width: $cellDimension + px;

        & > span {
            align-items: center;
            cursor: pointer;
            display: flex;
            height: $cellDimension - 14 + px;
            justify-content: center;
            width: calc(100% - 14px);

            &.is-disabled {
                background-color: #eee;
                //border-bottom: 1px solid white;
                color: #aaa;
                cursor: not-allowed;
                height: $cellDimension + px;
                width: $cellDimension + px;
            }

            &.is-inactive {
                color: #aaa;
            }

            &.is-selected {
                background-color: red;
                border-radius: $cellDimension/2 + px;
                color: white;
            }

            &.is-current {
                color: red;
                font-weight: 700;

                &.is-selected {
                    color: white;
                }
            }
        }

        &.span-2 {
            width: $cellDimension * 2 + px;
        }
        &.span-3 {
            width: $cellDimension * 3 + px;
        }
        &.span-3-5 {
            width: $cellDimension * 3.5 + px;
        }
        &.span-4 {
            width: $cellDimension * 4 + px;
        }
        &.span-5 {
            width: $cellDimension * 5 + px;
        }
    }
}
</style>
