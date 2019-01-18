<template lang="html">
    <div class="plan_feature">

        <i class="fas fa-check-circle"></i>


        <a ref="feature" :data-toggle="tooltip ? 'tooltip' : ''">
            <slot>{{ feature }}</slot>
        </a>

        <b-tooltip v-if="tooltip" :title="tooltip" placement="top" :target="() => $refs.feature"></b-tooltip>

        <small class="d-block" v-if="description">{{ description }}</small>

    </div>
</template>

<script>
export default {
    props: [
        'feature',
        'description',
        'tooltip',
    ]
}
</script>

<style lang="css">
</style>