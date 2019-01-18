<template lang="html">

        <b-card :class="{'bg-primary text-white' : !subscription}">

                <form v-if="subscription" method="POST" ref="subscriptionForm" >
                    <legend>Account Status</legend>

                    <b-form-group v-if="subscription.cancel_at_period_end">
                        Cancelling - Cancels on {{subscription.current_period_end | prettyUnix}}
                    </b-form-group>

                    <b-form-group v-if="!subscription.cancel_at_period_end">
                        Active - Renews on {{subscription.current_period_end | prettyUnix}}
                        <input type="hidden" name="subscription_id" id="subscription_id" :value="subscription.id">
                        <a href="#" @click.prevent="stopAutorenew" :class="{'disabled' : loading}">
                            Cancel Subscription <i class="far fa-long-arrow-right" v-if="!loading"></i><i class="far fa-spinner-third fa-spin mr-1" style="font-size:12px;" v-if="loading"></i>
                        </a>
                    </b-form-group>
                </form>

                <div  v-if="!subscription">
                    <legend>Account Status</legend>
                    <p>Plan: Basic</p>
                    <b-link to="/account/upgrade" class="btn btn-light btn-block">
                        Upgrade!
                        <i class="far fa-long-arrow-right"></i>
                    </b-link>
                </div>

        </b-card>
</template>

<script>

// Mixins
import '@/utils/filters/datetime.js'
import { submit } from '@/utils/mixins/forms'

export default {
    props: {
        subscription: {
            type: Object,
            required: false,
            default: null
        }
    },
    data: _ => ({
        form: {
            id: null
        },
        errors: [],
        loading: false
    }),
    methods: {
        stopAutorenew: function () {

            // Prevent spam-clicking
            if(this.loading) return;

            // Make sure they fo reals
            if (confirm("Are you absolutely sure you want to cancel your account? Your account will remain active until the end of your billing cycle.")) {

                // Execute order 66
                let method = this.subscription.cancel_at_period_end ? 'subscription/resubscribe' : 'subscription/unsubscribe';
                this.submit(method, null, 'Your subscription has been cancelled successfully.');

            }
        },
    },
    mounted () { this.form.id = this.subscription ? this.subscription.id : null },
    mixins: [ submit ]
}
</script>

<style lang="css">
</style>
