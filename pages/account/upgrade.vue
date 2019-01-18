<template lang="html">
    <div class="container">
        <div class="col-md-10 offset-md-1">

            <div class="row">

                <div class="text-center mb-5 w-100" v-if="usage.domain_count">
                    <h2>Get PRO and start collecting consent the easy way</h2>
                    <h4>Start collecting consent on all {{usage.domain_count}} of your sites, <u>instantly</u></h4>
                </div>

                <div class="text-center mb-5 w-100" v-if="!usage.domain_count">
                    <h2><strong>Get PRO and start collecting consent the easy way</strong></h2>
                    <h4></h4>
                </div>

                <div class="col-md-7">

                    <div class="card mb-3 plan"
                         :class="{selected : !isPro}"
                         @click.prevent="selected_plan = 'basic'">
                        <div class="card-body">
                            <h4 class="d-inline">
                                Basic -
                                <strong class="text-muted">FREE</strong>
                            </h4>
                            <small class="d-block text-muted">Basic features to reduce GDPR risk</small>
                        </div>
                        <div class="check"><i class="far fa-check"></i></div>
                    </div>

                    <div class="card mb-3 plan"
                         :class="{selected : isPro}"
                         @click.prevent="selected_plan = 'pro'">
                        <div class="card-body">
                            <h4 class="d-inline">
                                Pro -
                                <span style="text-decoration: line-through;" class="text-muted">$30</span>
                                <span class="text-success">$15</span>
                            </h4>
                            <small class="text-success">/mo</small>
                            <small class="d-block text-muted">Billed annually. Includes 50%-off beta discount.</small>
                        </div>
                        <div class="check"><i class="far fa-check"></i></div>
                    </div>


                    <div class="card" v-show="isPro">
                        <div class="card-body">
                            <form-payment button="Upgrade to Pro" id="payment" :stripe="stripeKey" />
                        </div>
                    </div>

                    <div class="text-right" v-show="!isPro">
                        <a href="/" class="btn btn-secondary">Continue wtih Free Account <i class="far fa-long-arrow-right"></i> </a>

                    </div>
                </div>

                <div class="col-md-5">
                    <div class="pt-0 pr-3 pl-3">

                        <h5 class="">What's Included:</h5>

                        <div class="basic_features">

                            <feature tooltip="When enabled, no EU-based traffic will be able to access your websites.">GDPR Shield</feature>

                            <feature>Basic Risk Analytics</feature>

                            <feature>Unlimited Domains</feature>

                            <feature v-if="!isPro">10,000 Visitors</feature>

                            <feature v-if="isPro">Unlimited Visitors</feature>

                        </div>

                        <div class="pro_features" :class="{'text-muted' : !isPro}">

                            <feature tooltip="If you need additional contacts you can add 50k more for just $5/mo or upgrade to a high volume account">Consent Tracking: 50k</feature>

                            <feature>Smart Consent Collection</feature>

                            <feature>CRM/Marketing Integrations</feature>

                            <feature>Advanced Risk Analytics</feature>

                            <feature>Fully Unbranded</feature>

                            <feature>Unlimited Domains</feature>

                            <feature tooltip="You're grandfathered into our special beta pricing for as long a you keep your subscription active!">Beta pricing for LIFE</feature>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import formPayment from '@/components/forms/payment.vue'
import feature from '@/components/feature.vue'
import { mapState } from 'vuex'

export default {
    middleware: 'upgrade',
    data: _ => ({
        stripeKey: process.env.STRIPE_PUBLIC_API_KEY,
        selected_plan: 'pro'
    }),
    computed: {
        isPro () { return this.selected_plan == 'pro' },
        ...mapState('account', ['account']),
        ...mapState('account', ['account', 'usage'])
    },
    components: { formPayment, feature }
}
</script>
