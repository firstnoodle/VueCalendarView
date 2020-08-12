<template>
    <div id="app">
        <h1>{{ date }}</h1>
        <renderless-calendar ref="calendarView" :value="date" @change="onDateChange" :options="options">
            <!-- MONTH -->
            <div
                slot="MONTH"
                slot-scope="{ calendar, changeView, moveViewDate, viewData, viewMonth }"
                class="calendar-view__page"
            >
                <nav class="calendar-view__nav">
                    <div class="calendar-view__cell">
                        <button @click="moveViewDate(-1, 'YEAR')">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.70711 14L8 14.7071L1.29289 8L8 1.29289L8.70711 2L2.708 8L8.70711 14Z" fill="black"/>
                                <path d="M13.7071 14L13 14.7071L6.29289 8L13 1.29289L13.7071 2L7.707 8L13.7071 14Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                    <div class="calendar-view__cell">
                        <button @click="moveViewDate(-1, 'MONTH')">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.7071 14L11 14.7071L4.29289 8L11 1.29289L11.7071 2L5.707 8L11.7071 14Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                    <div class="calendar-view__cell span-3">
                        <button @click="changeView('YEAR')">{{ viewMonth }}</button>
                        <button
                            @click="changeView('DECADE')"
                        >{{ calendar.dateCursor.getUTCFullYear() }}</button>
                    </div>
                    <div class="calendar-view__cell">
                        <button @click="moveViewDate(1, 'MONTH')">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.29289 14L5 14.7071L11.7071 8L5 1.29289L4.29289 2L10.293 8L4.29289 14Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                    <div class="calendar-view__cell">
                        <button @click="moveViewDate(1, 'YEAR')">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.00001 14.7071L2.29291 14L8.29201 8L2.29291 2L3.00001 1.29289L9.70712 8L3.00001 14.7071Z" fill="black"/>
                                <path d="M8.00001 14.7071L7.29291 14L13.293 8L7.29291 2L8.00001 1.29289L14.7071 8L8.00001 14.7071Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
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

            <!-- YEAR -->
            <div
                slot="YEAR"
                slot-scope="{ calendar, moveViewDate, setViewDateAndChangeView, viewData }"
                class="calendar-view__page"
            >
                <nav>
                    <div class="calendar-view__cell">
                        <button @click="moveViewDate(-1, 'year')">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.70711 14L8 14.7071L1.29289 8L8 1.29289L8.70711 2L2.708 8L8.70711 14Z" fill="black"/>
                                <path d="M13.7071 14L13 14.7071L6.29289 8L13 1.29289L13.7071 2L7.707 8L13.7071 14Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                    <div
                        class="calendar-view__cell span-5"
                    >{{ calendar.dateCursor.getUTCFullYear() }}</div>
                    <div class="calendar-view__cell">
                        <button @click="moveViewDate(1, 'year')">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.00001 14.7071L2.29291 14L8.29201 8L2.29291 2L3.00001 1.29289L9.70712 8L3.00001 14.7071Z" fill="black"/>
                                <path d="M8.00001 14.7071L7.29291 14L13.293 8L7.29291 2L8.00001 1.29289L14.7071 8L8.00001 14.7071Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
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

            <!-- DECADE -->
            <div
                slot="DECADE"
                slot-scope="{ moveViewDate, setViewDateAndChangeView, viewData }"
                class="calendar-view__page"
            >
                <nav>
                    <div class="calendar-view__cell">
                        <button @click="moveViewDate(-10, 'years')">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.70711 14L8 14.7071L1.29289 8L8 1.29289L8.70711 2L2.708 8L8.70711 14Z" fill="black"/>
                                <path d="M13.7071 14L13 14.7071L6.29289 8L13 1.29289L13.7071 2L7.707 8L13.7071 14Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                    <div
                        class="calendar-view__cell span-5"
                    >{{ viewData[0].label + ' - ' + viewData[viewData.length-1].label }}</div>
                    <div class="calendar-view__cell">
                        <button @click="moveViewDate(10, 'years')">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.00001 14.7071L2.29291 14L8.29201 8L2.29291 2L3.00001 1.29289L9.70712 8L3.00001 14.7071Z" fill="black"/>
                                <path d="M8.00001 14.7071L7.29291 14L13.293 8L7.29291 2L8.00001 1.29289L14.7071 8L8.00001 14.7071Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
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
