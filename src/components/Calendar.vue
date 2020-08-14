<template>
    <base-popper
        ref="popper"
        trigger="clickToOpen"
        :options="{
            placement: 'bottom-start',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 0],
                    },
                }
            ]
        }"
    >
        <div class="popper">
            <renderless-calendar 
                ref="calendarView" 
                class="block w-64 p-4 text-xs border border-gray-300 rounded shadow-md"
                :value="value" 
                :options="options"
                >
                <div
                    slot="MONTH"
                    slot-scope="{ calendar, changeView, moveViewDate, viewData, viewMonth }"
                >
                    <nav class="w-56 grid grid-cols-7">
                        <nav-button icon="double-left" @click="moveViewDate(-1, 'YEAR')" />
                        <nav-button icon="single-left" @click="moveViewDate(-1, 'MONTH')" />
                        <div class="col-span-3 flex justify-center">
                            <button class="inline-flex items-center h-8 text-blue-600 mr-1" @mouseup="changeView('YEAR')">{{ viewMonth.slice(0,3) }}</button>
                            <button
                                class="inline-flex items-center h-8 text-blue-600"
                                @mouseup="changeView('DECADE')"
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
                        <div
                            v-for="col in viewData" :key="col.date"
                            @mouseup="onDateClick(col)"
                            class="css-calendar-cell flex items-center justify-center w-8 h-8 rounded-full cursor-pointer text-gray-600 hover:bg-blue-100 focus:outline-none focus:bg-blue-100"
                            :class="{
                                'is-selected': col.selected,
                                'is-disabled': col.disabled,
                                'is-inactive': col.inactive,
                                'is-current': col.current,
                            }"
                        >
                            {{ col.label }}
                        </div>
                    </main>
                </div>

                <div
                    slot="YEAR"
                    slot-scope="{ calendar, moveViewDate, setViewDateAndChangeView, viewData }"
                >
                    <nav class="w-56 grid grid-cols-7">
                        <nav-button icon="double-left" @click="moveViewDate(-1, 'YEAR')" />
                        <div class="col-span-5 flex justify-center items-center">{{ calendar.dateCursor.getUTCFullYear() }}</div>
                        <nav-button icon="double-right" @click="moveViewDate(1, 'YEAR')" />
                    </nav>
                    <main class="w-56 grid grid-cols-2 py-4">
                        <div
                            v-for="(month, monthIndex) in viewData"
                            :key="month.label"
                            @mouseup="setViewDateAndChangeView(monthIndex, 'month', 'MONTH')"
                            class="h-8 flex items-center justify-center cursor-pointer text-blue-600"
                            :class="{ 'is-current': month.current }"
                        >
                            {{ month.label }}
                        </div>
                    </main>
                </div>

                <div
                    slot="DECADE"
                    slot-scope="{ moveViewDate, setViewDateAndChangeView, viewData }"
                >
                    <nav class="w-56 grid grid-cols-7">
                        <nav-button icon="double-left" @click="moveViewDate(-10, 'YEAR')" />
                        <div class="col-span-5 flex items-center justify-center">{{ viewData[0].label + ' - ' + viewData[viewData.length-1].label }}</div>
                        <nav-button icon="double-right" @click="moveViewDate(10, 'YEAR')" />
                    </nav>
                    <main class="w-56 grid grid-cols-2 py-8">
                        <div
                            v-for="year in viewData"
                            :key="year.label"
                            @mouseup="setViewDateAndChangeView(year.label, 'year', 'MONTH')"
                            class="h-8 flex items-center justify-center cursor-pointer text-blue-600"
                            :class="{ 'is-current': year.current }"
                        >
                            {{ year.label }}
                        </div>
                    </main>
                </div>
            </renderless-calendar>
        </div>
        <div slot="reference">{{ value }}</div>
    </base-popper>
</template>

<script>
import { loopRange } from "~/utils/array.js";
import { disableWeekday, WEEKDAYS } from "~/utils/time/calendar.js";
import BasePopper from '~/components/BasePopper';
import RenderlessCalendar from "~/components/RenderlessCalendar/main.js";
import NavButton from "~/components/NavButton";

export default {
    name: 'Calendar',
    components: { BasePopper, NavButton, RenderlessCalendar },
    props: {
        value: {
            type: String,
            required: true
        },
        options: {
            type: Object,
            required: false
        }
    },
    data() {
        return {
            defaultOptions: {
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
    methods: {
        onDateClick(date) {
            if(date.disabled) return;
            const formattedDate = this.options.format ? '2020-02-02 02:02' : this.formatDate(date.date);
            this.$emit('change', formattedDate);
            this.$refs.popper.doClose();
        },

        formatDate(date) {
            const d = new Date(date);
            return d.toISOString().substr(0, 16).replace('T', ' ');
        }
    }
}
</script>