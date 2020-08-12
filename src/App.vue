<template>
    <div id="app">
        <h1>{{ date }}</h1>
        <renderless-calendar ref="calendarView" :value="date" @change="onDateChange" :options="options">
            <div
                slot="MONTH"
                slot-scope="{ calendar, changeView, moveViewDate, viewData, viewMonth }"
                class="calendar-view__page"
            >
                <nav class="calendar-view__nav">
                    <nav-button icon="double-left" @click="moveViewDate(-1, 'YEAR')" />
                    <nav-button icon="single-left" @click="moveViewDate(-1, 'MONTH')" />
                    <div class="calendar-view__cell span-3">
                        <button @click="changeView('YEAR')">{{ viewMonth }}</button>
                        <button
                            @click="changeView('DECADE')"
                        >{{ calendar.dateCursor.getUTCFullYear() }}</button>
                    </div>
                    <nav-button icon="double-right" @click="moveViewDate(1, 'YEAR')" />
                    <nav-button icon="single-right" @click="moveViewDate(1, 'MONTH')" />
                </nav>
                <header>
                    <div class="calendar-view__cell" v-for="day in weekdays" :key="day">{{ day.slice(0, 3) }}</div>
                </header>
                <main>
                    <div class="calendar-view__cell" v-for="col in viewData" :key="col.date">
                        <span
                            @click="date = col.date"
                            :class="{
                                'is-selected': col.selected,
                                'is-disabled': col.disabled,
                                'is-inactive': col.inactive,
                                'is-current': col.current,
                            }"
                        >{{ col.label }}</span>
                    </div>
                </main>
            </div>

            <div
                slot="YEAR"
                slot-scope="{ calendar, moveViewDate, setViewDateAndChangeView, viewData }"
                class="calendar-view__page"
            >
                <nav>
                    <nav-button icon="double-left" @click="moveViewDate(-1, 'YEAR')" />
                    <div class="calendar-view__cell span-5">{{ calendar.dateCursor.getUTCFullYear() }}</div>
                    <nav-button icon="double-right" @click="moveViewDate(1, 'YEAR')" />
                </nav>
                <main>
                    <div
                        v-for="(month, monthIndex) in viewData"
                        :key="month.label"
                        @click="setViewDateAndChangeView(monthIndex, 'month', 'MONTH')"
                        class="calendar-view__cell span-3-5"
                    >
                        <span :class="{ 'is-current': month.current }">{{ month.label }}</span>
                    </div>
                </main>
            </div>

            <div
                slot="DECADE"
                slot-scope="{ moveViewDate, setViewDateAndChangeView, viewData }"
                class="calendar-view__page"
            >
                <nav>
                    <nav-button icon="double-left" @click="moveViewDate(-10, 'YEAR')" />
                    <div class="calendar-view__cell span-5">{{ viewData[0].label + ' - ' + viewData[viewData.length-1].label }}</div>
                    <nav-button icon="double-right" @click="moveViewDate(10, 'YEAR')" />
                </nav>
                <main>
                    <div
                        v-for="year in viewData"
                        :key="year.label"
                        @click="setViewDateAndChangeView(year.label, 'year', 'MONTH')"
                        class="calendar-view__cell span-3-5"
                    >
                        <span :class="{ 'is-current': year.current }">{{ year.label }}</span>
                    </div>
                </main>
            </div>
        </renderless-calendar>
    </div>
</template>

<script>
import { arrowKeys } from "./utils/keyboard.js";
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
            weekdays: WEEKDAYS
        };
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

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono:400,700");

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
