<template lang="html">
    <span :class="'flag-icon flag-icon-' + isoCountry"></span>
</template>

<script>
export default {
    props: {
        country: {
            default: '',
            required: true
        }
    },
    computed: {
        isoCountry () {
            return String(this.$options.filters.shortCountry(this.country)).toLowerCase()
        }
    }
}
</script>

<style lang="css">
</style>