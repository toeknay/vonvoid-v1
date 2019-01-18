<template lang="html">

    <b-container>
        <b-row>

            <b-col md="6" md-offset="1">
                <b-card>
                    <legend>Profile Information</legend>
                    <form-profile />
                </b-card>

                <b-card class="mt-4">
                    <legend>Change Password</legend>
                    <form-password />
                </b-card>
            </b-col>

            <b-col md="4">
                <card-subscription :subscription="subscription" />
            </b-col>

        </b-row>
    </b-container>

</template>

<script>
import { mapState } from 'vuex'

// Components
import formPassword from '@/components/forms/password.vue'
import formProfile from '@/components/forms/user_profile.vue'
import cardSubscription from '@/components/cards/account_subscription.vue'

export default {
    fetch ({ store }) {
        return store.dispatch('subscription/fetch')
    },

    data: _ => ({}),
    components: { formPassword, formProfile, cardSubscription },
    computed: {
        ...mapState('subscription', ['subscription'])
    }
}

</script>

<style lang="css">
</style>
