<template lang="html">
    <div class="loader" :class="active">
        <i class="far fa-spinner-third fa-spin"></i>
    </div>
</template>

<script>
export default {
    props: ['active']
}
</script>

<style lang="css">
</style>
