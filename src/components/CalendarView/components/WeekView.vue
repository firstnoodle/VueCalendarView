<template>
    <div class="calendar-view__page">
        <main>
            <div v-for="(day, index) in weekGrid" class="calendar-view__cell">
                <span
                    @click="onDateClick(day)"
                    :class="{
                        'is-selected': day.selected,
                        'is-disabled': day.disabled,
                        'is-inactive': day.inactive,
                        'is-current': day.current,
                    }"
                >{{ day.label }}</span>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: "WeekView",
    props: {
        weekGrid: {
            type: Array,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
    },
    methods: {
        onDateClick(date) {
            if (!date.disabled) {
                this.$emit("changeDate", date.date);
            }
        }
    }
};
</script>