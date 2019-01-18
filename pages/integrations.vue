<template lang="html">
    <div class="container mb-5 view_integrations">

        <card-upgrade v-if="account.tier=='free'" title="Upgrade to Pro to integrate Consentiful with your other software!" >
            <p class="text-muted">By integrating Consentiful with you other tools you'll be able to know who's from the EU right as they input their info!</p>
        </card-upgrade>

        <b-col cols="12" lg="10" xl="8" class="mx-auto" v-if="account.tier=='paid'">

            <b-card>
                <legend>Integrations</legend>
                <p class="pb-2">
                    As contacts consent through Consentiful we'll send all their information, including location, to your other tools/software via Zapier.
                    This is to help you keep adjust your marketing and segment GDPR contacts differently.
                </p>
                <div class="blocking_settings">
                    <form-zapier-hook />
                </div>
            </b-card>

        </b-col>

    </div>
</template>

<script>
import { mapState } from 'vuex'

// Components
import formZapierHook from '@/components/forms/integrations/zapier_webhook.vue'
import cardUpgrade from '@/components/cards/upgrade.vue'

export default {
    computed: {
        ...mapState('account', ['account']),
    },
    components: { formZapierHook, cardUpgrade }
}
</script>

<style lang="css">
</style>
