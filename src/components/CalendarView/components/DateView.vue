<template>
    <div class="calendar-view__page">
        <nav class="calendar-view__nav">
            <div class="calendar-view__cell">
                <button @click="$emit('stepYear', -1)">&lt;&lt;</button>
            </div>
            <div class="calendar-view__cell">
                <button @click="$emit('stepMonth', -1)">&lt;</button>
            </div>
            <div class="calendar-view__cell span-3">
                <button @click="$emit('changeView', 'MonthView')">{{ this.month }}</button>
                <button @click="$emit('changeView', 'YearView')">{{ this.year }}</button>
            </div>
            <div class="calendar-view__cell">
                <button @click="$emit('stepMonth', 1)">&gt;</button>
            </div>
            <div class="calendar-view__cell">
                <button @click="$emit('stepYear', 1)">&gt;&gt;</button>
            </div>
        </nav>
        <header>
            <div class="calendar-view__cell" v-for="day in weekdays">{{ day.slice(0, 3) }}</div>
        </header>
        <main>
            <div class="calendar-view__cell" v-for="col in dateGrid">
                <span
                    @click="onDateClick(col)"
                    :class="{
                        'is-selected': col.selected,
                        'is-disabled': col.disabled,
                        'is-inactive': col.inactive,
                        'is-current': col.current,
                    }"
                    >{{ col.label }}</span
                >
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: 'DateView',
    props: {
        dateGrid: {
            type: Array,
            required: true,
        },
        month: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        weekdays: {
            type: Array,
            required: true,
        },
    },
    methods: {
        onDateClick(date) {
            if (!date.disabled) {
                this.$emit('changeDate', date.date);
            }
        },
    },
};
</script>
