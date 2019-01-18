<template lang="html">
    <form method="POST" @submit.prevent="submit('account/zapier',null,'Zapier settings were updated successfully! A test webhook has been sent.')" class="form-horizontal">

        <csf-form-alert :items="errors" />

        <b-form-group class="zapier">
            <csf-form-input
                :v="$v.form.zapier_webhook_url"
                v-model="form.zapier_webhook_url"
                type="url"
                label="Zapier Webhook"
                name="zapier_webhook_url"
                invalid="Must be a valid Zapier Webhook URL"
                placeholder="https://zapier.com/your-webhook">
            </csf-form-input>

            <small class="text-muted">This is the URL that Zapier gives you during setup. <a href="https://consentiful.drift.help/article/setup-zapier-general/" target="_blank">Learn more</a></small>
            <small class="zap-auth-key"
                   v-clipboard:copy="account.zapier_auth_key"
                   title="Click this to copy a secret Zapier authentication key for extra security. Follow our help section on using this key."
                   v-b-tooltip.hover>
                <i class="fas fa-lock"></i>
            </small>
        </b-form-group>

        <b-form-group>
            <csf-form-button :form-loading="loading" action="Saving..." text="Save Webhook" />
        </b-form-group>

    </form>
</template>

<script>
import { mapState } from 'vuex'

// Mixins
import { validationMixin } from "vuelidate"
import { url } from "vuelidate/lib/validators"
import { submit } from '@/utils/mixins/forms'

// Plugins
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);

export default {
    data: _ => ({
        form: {
            zapier_webhook_url: '',
        },
        errors: [],
        loading: false
    }),
    mixins: [
        validationMixin,
        VueClipboard,
        submit
    ],
    validations: {
        form: {
            zapier_webhook_url: { url }
        }
    },
    computed: {
        ...mapState('account', ['account']),
    },
    methods: {
        setFormData (data) {
            this.form = Object.keys(this.form).reduce((obj, key) => {
                obj[key] = data[key];
                return obj;
            }, {});
        }
    },
    mounted () {

        // Set existing data
        this.setFormData(this.account)

    },
}
</script>

<style lang="css">
</style>
