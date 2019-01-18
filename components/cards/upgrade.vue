<template lang="html">
    <b-container class="mb-5">
        <b-row>
            <b-col cols="12" lg="10" xl="8" class="mx-auto">
                <b-card class="text-center">
                        <legend><strong>{{ title }}</strong></legend>
                        <slot>
                            <p class="text-muted">{{ content }}</p>
                        </slot>
                        <!-- TODO: Add explainer video or more details here -->
                        <b-button to="/account/upgrade" variant="primary">{{ button }} <i class="far fa-long-arrow-right"></i></b-button>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    props: {
        title: {
            default: false
        },
        content: {
            default: false
        },
        button: {
            default: 'Upgrade to Pro'
        },
        video: {
            default: false
        }
    }
}
</script>

<style lang="css">
</style>
