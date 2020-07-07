<template>
    <div class="calendar-view__page">
        <nav>
            <div class="calendar-view__cell">
                <button @click="$emit('stepYear', -1)">&lt;&lt;</button>
            </div>
            <div class="calendar-view__cell span-5">{{ year }}</div>
            <div class="calendar-view__cell">
                <button @click="$emit('stepYear', 1)">&gt;&gt;</button>
            </div>
        </nav>
        <main>
            <div
                v-for="(month, index) in monthGrid"
                @click="$emit('changeMonth', index)"
                class="calendar-view__cell span-3-5"
            >
                <span :class="{ 'is-current': month.current }">{{ month.label }}</span>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    name: 'MonthView',
    props: {
        monthGrid: {
            type: Array,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
    },
};
</script>
