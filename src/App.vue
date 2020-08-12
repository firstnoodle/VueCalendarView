<template>
    <div id="app" class="p-16">
        <h1>{{ date }}</h1>
        <renderless-calendar ref="calendarView" :value="date" @change="onDateChange" :options="options">
            <div
                slot="MONTH"
                slot-scope="{ calendar, changeView, moveViewDate, viewData, viewMonth }"
                class="block w-64 p-4 text-xs border border-gray-300 rounded shadow-md"
            >
                <nav class="w-56 grid grid-cols-7">
                    <nav-button icon="double-left" @click="moveViewDate(-1, 'YEAR')" />
                    <nav-button icon="single-left" @click="moveViewDate(-1, 'MONTH')" />
                    <div class="col-span-3 flex justify-center">
                        <button class="inline-flex items-center h-8 text-blue-600 mr-1" @click="changeView('YEAR')">{{ viewMonth.slice(0,3) }}</button>
                        <button
                            class="inline-flex items-center h-8 text-blue-600"
                            @click="changeView('DECADE')"
                        >
                            {{ calendar.dateCursor.getUTCFullYear() }}
                        </button>
                    </div>
                    <nav-button icon="single-right" @click="moveViewDate(1, 'MONTH')" />
                    <nav-button icon="double-right" @click="moveViewDate(1, 'YEAR')" />
                </nav>
                <header class="w-56 grid grid-cols-7">
                    <div class="flex items-center justify-center w-8 h-8 text-gray-800 select-none" v-for="day in weekdays" :key="day">{{ day.slice(0, 3) }}</div>
                </header>
                <main class="w-56 grid grid-cols-7">
                    <button
                        v-for="col in viewData" :key="col.date"
                        @click="date = col.date"
                        class="css-calendar-cell flex items-center justify-center w-8 h-8 rounded-full cursor-pointer text-gray-600 hover:bg-blue-100 focus:outline-none focus:bg-blue-100"
                        :class="{
                            'is-selected': col.selected,
                            'is-disabled': col.disabled,
                            'is-inactive': col.inactive,
                            'is-current': col.current,
                        }"
                    >
                        {{ col.label }}
                    </button>
                </main>
            </div>

            <div
                slot="YEAR"
                slot-scope="{ calendar, moveViewDate, setViewDateAndChangeView, viewData }"
                class="block w-64 p-4 text-xs border border-gray-300 rounded shadow-md"
            >
                <nav class="w-56 grid grid-cols-7">
                    <nav-button icon="double-left" @click="moveViewDate(-1, 'YEAR')" />
                    <div class="col-span-5 flex justify-center items-center">{{ calendar.dateCursor.getUTCFullYear() }}</div>
                    <nav-button icon="double-right" @click="moveViewDate(1, 'YEAR')" />
                </nav>
                <main class="w-56 grid grid-cols-2 py-4">
                    <button
                        v-for="(month, monthIndex) in viewData"
                        :key="month.label"
                        @click="setViewDateAndChangeView(monthIndex, 'month', 'MONTH')"
                        class="h-8 flex items-center justify-center cursor-pointer text-blue-600"
                        :class="{ 'is-current': month.current }"
                    >
                        {{ month.label }}
                    </button>
                </main>
            </div>

            <div
                slot="DECADE"
                slot-scope="{ moveViewDate, setViewDateAndChangeView, viewData }"
                class="block w-64 p-4 text-xs border border-gray-300 rounded shadow-md"
            >
                <nav class="w-56 grid grid-cols-7">
                    <nav-button icon="double-left" @click="moveViewDate(-10, 'YEAR')" />
                    <div class="col-span-5 flex items-center justify-center">{{ viewData[0].label + ' - ' + viewData[viewData.length-1].label }}</div>
                    <nav-button icon="double-right" @click="moveViewDate(10, 'YEAR')" />
                </nav>
                </main>
                <main class="w-56 grid grid-cols-2 py-8">
                    <button
                        v-for="year in viewData"
                        :key="year.label"
                        @click="setViewDateAndChangeView(year.label, 'year', 'MONTH')"
                        class="h-8 flex items-center justify-center cursor-pointer text-blue-600"
                        :class="{ 'is-current': year.current }"
                    >
                        {{ year.label }}
                    </button>
                </main>
            </div>
        </renderless-calendar>
    </div>
</template>

<script>
import { arrowKeys } from "./utils/keyboard.js";
import { loopRange } from "./utils/array.js";
import { disableWeekday, WEEKDAYS } from "./utils/time/calendar.js";
import RenderlessCalendar from "./components/RenderlessCalendar/main.js";
import NavButton from "./components/NavButton";

export default {
    name: "App",
    components: { NavButton, RenderlessCalendar },
    data() {
        return {
            date: "2020-11-18",
            options: {
                weekStart: 1,
                disabledDate: disableWeekday("sunday")
            },
            weekdays: null,
        };
    },
    created() {
        this.weekdays = WEEKDAYS.map((day, index) => {
            return WEEKDAYS[
                loopRange(
                    index + this.options.weekStart,
                    WEEKDAYS.length
                )
            ];
        })
    },
    mounted() {
        window.addEventListener("keydown", event => {
            const move = arrowKeys.find(key => key.code === event.keyCode);
            if (move) {
                event.preventDefault();
                this.$refs.calendarView.moveRequest(move.direction);
            }
        });
    },
    methods: {
        onDateChange(date) {
            this.date = date;
        }
    }
};
</script>
