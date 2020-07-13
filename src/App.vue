<template>
    <div id="app">
        <h1>{{ date }}</h1>
        <!-- <calendar-view ref="calendarView" :value="date" :options="options" @change="onDateChange" /> -->
        <renderless-calendar :value="date" @change="onDateChange" :options="options">
            <!-- MONTH -->
            <div
                slot="MONTH"
                slot-scope="{ calendar, changeView, moveViewDate, selectedDate, viewData, viewMonth, viewType }"
                class="calendar-view__page"
            >
                <nav class="calendar-view__nav">
                    <div class="calendar-view__cell">
                        <button @click="moveViewDate(-1, 'YEAR')">&lt;&lt;</button>
                    </div>
                    <div class="calendar-view__cell">
                        <button @click="moveViewDate(-1, 'MONTH')">&lt;</button>
                    </div>
                    <div class="calendar-view__cell span-3">
                        <button @click="changeView('YEAR')">{{ viewMonth }}</button>
                        <button
                            @click="changeView('DECADE')"
                        >{{ calendar.dateCursor.getUTCFullYear() }}</button>
                    </div>
                    <div class="calendar-view__cell">
                        <button @click="moveViewDate(1, 'MONTH')">&gt;</button>
                    </div>
                    <div class="calendar-view__cell">
                        <button @click="moveViewDate(1, 'YEAR')">&gt;&gt;</button>
                    </div>
                </nav>
                <header>
                    <!-- <div class="calendar-view__cell" v-for="day in weekdays">{{ day.slice(0, 3) }}</div> -->
                </header>
                <main>
                    <div class="calendar-view__cell" v-for="col in viewData">
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

            <!-- YEAR -->
            <div
                slot="YEAR"
                slot-scope="{ calendar, changeView, moveViewDate, selectedDate, setViewDateAndChangeView, viewData, viewType }"
                class="calendar-view__page"
            >
                <nav>
                    <div class="calendar-view__cell">
                        <button @click="moveViewDate(-1, 'year')">&lt;&lt;</button>
                    </div>
                    <div
                        class="calendar-view__cell span-5"
                    >{{ calendar.dateCursor.getUTCFullYear() }}</div>
                    <div class="calendar-view__cell">
                        <button @click="moveViewDate(1, 'year')">&gt;&gt;</button>
                    </div>
                </nav>
                <main>
                    <div
                        v-for="(month, monthIndex) in viewData"
                        @click="setViewDateAndChangeView(monthIndex, 'month', 'MONTH')"
                        class="calendar-view__cell span-3-5"
                    >
                        <span :class="{ 'is-current': month.current }">{{ month.label }}</span>
                    </div>
                </main>
            </div>

            <!-- DECADE -->
            <div
                slot="DECADE"
                slot-scope="{ changeView, moveViewDate, selectedDate, setViewDateAndChangeView, viewData, viewType }"
                class="calendar-view__page"
            >
                <nav>
                    <div class="calendar-view__cell">
                        <button @click="moveViewDate(-10, 'years')">&lt;&lt;</button>
                    </div>
                    <div
                        class="calendar-view__cell span-5"
                    >{{ viewData[0].label + ' - ' + viewData[viewData.length-1].label }}</div>
                    <div class="calendar-view__cell">
                        <button @click="moveViewDate(10, 'years')">&gt;&gt;</button>
                    </div>
                </nav>
                <main>
                    <div
                        v-for="year in viewData"
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
import { disableWeekday } from "./utils/time/calendar.js";
import CalendarView from "./components/CalendarView/main.vue";
import RenderlessCalendar from "./components/RenderlessCalendar/main.js";

export default {
    name: "App",
    components: { CalendarView, RenderlessCalendar },
    data() {
        return {
            date: "2020-11-18",
            options: {
                weekStart: 1,
                disabledDate: disableWeekday("sunday")
            }
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
