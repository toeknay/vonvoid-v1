<template lang="html">
    <form @submit.prevent="submit(method, forward, 'Your password has been updated')">

        <csf-form-alert :items="errors" />

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
            <csf-form-input
                :v="$v.form.confirm"
                v-model="form.confirm"
                type="password"
                label="Confirm Password"
                name="confirm"
                invalid="Passwords must match"
                placeholder="Confirm Password">
            </csf-form-input>
        </b-form-group>

        <csf-form-button :form-loading="loading" action="Saving..." text="Change Password" />

    </form>
</template>

<script>
// Mixins
import { validationMixin } from "vuelidate"
import { required, minLength, sameAs } from "vuelidate/lib/validators"
import { submit } from '@/utils/mixins/forms'

export default {
    data: _ => ({
        form: {
            password: '',
            confirm: '',
        },
        errors: [],
        loading: false
    }),
    computed: {
        // get proper form method (password reset or just normal change)
        method () { return this.form.token ? 'user/forgotUpdate' : 'user/update' },
        forward () { return this.form.token ? '/login' : null }
    },
    mixins: [
        validationMixin,
        submit
    ],
    validations: {
        form: {
            password: { required, minLength: minLength(6) },
            confirm: { required, sameAsPassword: sameAs('password') }
        }
    },
    mounted () {
        // Do we have a reset token, if so add to form data
        if (this.$route.params.token) this.form.token = this.$route.params.token
    }
}
</script>
