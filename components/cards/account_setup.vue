<template lang="html">
    <b-card no-body class="welcome_card" v-cloak>
        <b-card-body>
            <legend>Account Setup</legend>
            <div class="progress" :class="{'mb-2' : checklistPercent == 100}">
                <div class="progress-bar" role="progressbar"
                :style="'width:'+checklistPercent+'%;'"
                :class="{'bg-success' : checklistPercent == 100}"
                :aria-valuenow="checklistPercent"
                aria-valuemin="0"
                aria-valuemax="100">{{ checklistPercent }}%</div>
            </div>
        </b-card-body>
        <div v-if="checklistPercent<100">

            <!-- [[! if has user.two_factor
            <a href="/account#2fa" class="start_item" :class="{'completed' : two_factor}">
            <i class="far "></i> Enable enhanced security
        </a>]] -->

        <!-- [[! if has domains]] -->
        <a href="/settings#account_domains" class="start_item" :class="{'completed' : usage && usage.domain_count > 0}">
            <i class="far "></i> Add your domain
        </a>

        <!-- [[! if has visitors]] -->
        <a href="/settings#code" class="start_item" :class="{'completed' : usage && usage.visitor_count > 0}">
            <i class="far"></i> Install Consentiful code
        </a>

        <!-- [[! pro only onboarding checklist]] -->
        <span v-if="isPaid">

            <!-- [[! if has contact consent]] -->
            <a href="/contacts" class="start_item" :class="{'completed' : usage && usage.contact_count > 0}">
                <i class="far"></i> Collect your first consent
            </a>

            <!-- [[! if has zapier webhook]] -->
            <a href="/integrations#zapier" class="start_item" :class="{'completed' : !isEmpty(account.zapier_webhook_url)}">
                <i class="far"></i> Integrate your CRM
            </a>

        </span>
    </div>
</b-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data: _ => ({
        // Config for number of onboarding items
        items_free: 2,
        items_paid: 4,
    }),
    computed: {
        ...mapState('account', ['account', 'usage']),

        isPaid () { return this.account.tier == 'paid' },

        checklistItemValues () {
            return (this.isPaid ? Math.round(100/this.items_paid) : Math.round(100/this.items_free) )
        },

        checklistPercent () {
            let percent = 0;
            let value = this.checklistItemValues;

            // Free Level
            // if (this.two_factor) percent = percent+value
            if (this.usage && this.usage.domain_count > 0) percent += value
            if (this.usage && this.usage.visitor_count > 0) percent += value

            // Paid Level
            if (this.isPaid) {
                if (!this.isEmpty(this.account.zapier_webhook_url)) percent += value
                if (this.usage && this.usage.contact_count > 0) percent += value
            }

            // Show minimum progress
            if (percent == 0) return 15;

            // Return percentage (max of 100)
            return (percent < 100 ? percent : 100);
        }
    }
}
</script>

<style lang="css">
</style>
