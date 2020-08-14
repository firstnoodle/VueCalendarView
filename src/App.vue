<template>
    <div id="app" class="p-16">
        <calendar :value="date" :options="options" @change="onDateChange" />
        <div class="relative inline-flex overflow-hidden pl-2 pr-8 py-1 border border-gray-400 rounded-md shadow-inner focus-within:shadow-outline focus-within:border-blue-600">
            <formatted-input 
                :value="inputContent" 
                :format="inputFormat"
                placeholder="2020-01-01 12:00" 
                @change="onInputChange"
            />
            <span v-show="!inputValid" class="absolute flex items-center justify-center w-8 h-full right-0 top-0 text-red-500">
                <svg class="inline" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 9.5H7.5V6.5L8.5 6.5V9.5Z"/>
                    <path d="M7.5 11.5H8.5V10.5H7.5V11.5Z"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.49613 2.12854C7.34713 2.21546 7.22315 2.33945 7.13623 2.48845L1.00675 12.9961C0.728465 13.4732 0.889601 14.0855 1.36665 14.3638C1.51959 14.453 1.69347 14.5 1.87052 14.5H14.1295C14.6818 14.5 15.1295 14.0523 15.1295 13.5C15.1295 13.3229 15.0825 13.1491 14.9933 12.9961L8.86378 2.48845C8.60538 2.04547 8.05896 1.87489 7.60026 2.07559L7.49613 2.12854ZM1.87052 13.5L8.00001 2.993L14.1295 13.5H1.87052Z"/>
                </svg>
            </span>
        </div>
    </div>
</template>

<script>
import { arrowKeys } from "./utils/keyboard.js";
import { DATE_TIME } from "./utils/input-formatting.js";
import { dateIsValid } from "~/utils/time/dates.js";
import { loopRange } from "~/utils/array.js";
import { disableWeekday, WEEKDAYS } from "~/utils/time/calendar.js";
import Calendar from './components/Calendar';
import FormattedInput from '~/components/FormattedInput';

export default {
    name: "App",
    components: { Calendar, FormattedInput },
    data() {
        return {
            date: "2020-11-18",
            inputContent: '2020',
            inputFormat: DATE_TIME,
            inputValid: false,
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
        // window.addEventListener("keydown", event => {
        //     const move = arrowKeys.find(key => key.code === event.keyCode);
        //     if (move) {
        //         event.preventDefault();
        //         this.$refs.calendarView.moveRequest(move.direction);
        //     }
        // });
    },
    methods: {
        onDateChange(date) {
            this.date = date;
        },
        onInputChange(value) {
            this.inputValid = dateIsValid(value) && value.length === DATE_TIME.format.length || value.length === 0;
            this.inputContent = value;
        }
    }
};
</script>
