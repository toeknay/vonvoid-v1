<template lang="html">
    <form method="POST" @submit.prevent="submit('user/signup', '/account/upgrade')">

        <csf-form-alert :items="errors" />

        <b-form-group>
            <csf-form-input
                :v="$v.form.name"
                v-model="form.name"
                type="text"
                label="Full Name"
                name="name"
                invalid="Enter your name"
                placeholder="Full Name">
            </csf-form-input>
        </b-form-group>

        <b-form-group>
            <csf-form-input
                :v="$v.form.email"
                v-model="form.email"
                type="email"
                label="Email"
                name="email"
                invalid="Enter your email address"
                placeholder="you@email.com">
            </csf-form-input>
        </b-form-group>

        <b-form-group>
            <csf-form-input
                :v="$v.form.password"
                v-model="form.password"
                type="password"
                label="Password"
                name="password"
                invalid="Enter your password"
                placeholder="Password">
            </csf-form-input>
        </b-form-group>

        <b-form-group>
            <small class="text-muted">
                By signing up, you agree to the <a href="//consentiful.com/legal/terms" target="_blank">Terms of Service</a> and <a href="//consentiful.com/legal/privacy" target="_blank">Privacy Policy</a>.
            </small>
        </b-form-group>

        <b-form-group>
            <recaptcha sitekey="6LcMJFwUAAAAAAaonO3re0c--TYSnfcOilohdHNJ" @verify="onVerify"></recaptcha>
        </b-form-group>

        <csf-form-button :form-loading="loading" action="Saving...">
            Continue <i class="far fa-long-arrow-right"></i>
        </csf-form-button>

    </form>
</template>

<script>
// Mixins
import { validationMixin } from "vuelidate"
import { required, minLength, email } from "vuelidate/lib/validators"
import { submit } from '@/utils/mixins/forms'

// Components
// TODO: Need to do data bindings so the form actually submits the recaptcha
//       or look into using https://www.npmjs.com/package/vue-recaptcha if too difficult
// import recaptcha from '@/components/forms/fields/recaptcha.vue'
import recaptcha from 'vue-recaptcha'

export default {
    data: _ => ({
        form: {
            name: '',
            email: '',
            password: '',
            'recaptchaResponse': ''
        },
        errors: [],
        loading: false
    }),
    components: { recaptcha },
    mixins: [
        validationMixin,
        submit
    ],
    validations: {
        form: {
            name: { required },
            email: { required, email },
            password: { required, minLength: minLength(6) }
        }
    },
    methods: {
        onVerify (response) {
            this.form.recaptchaResponse = response;
        }
    },
    head: _ => ({
        script: [
            // Add script to page head
            { src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit' }
        ]
    })
}
</script>

<style lang="css">
</style>
