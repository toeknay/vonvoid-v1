<template lang="html">
    <form class="" @submit.prevent="submit('user/login', '/dashboard')">

        <csf-form-alert :items="errors" />

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
            <b-link to="/forgot"><strong>Forgot your password?</strong></b-link>
        </b-form-group>

        <csf-form-button :form-loading="loading" action="Logging in..." text="Login" />

    </form>
</template>

<script>
// Mixins
import { validationMixin } from "vuelidate"
import { required, minLength, email } from "vuelidate/lib/validators"
import { submit } from '@/utils/mixins/forms'

export default {
    data: _ => ({
        form: {
            email: '',
            password: '',
        },
        errors: [],
        loading: false
    }),
    mixins: [
        validationMixin,
        submit
    ],
    validations: {
        form: {
            email: { required, email },
            password: { required, minLength: minLength(6) }
        }
    }
}
</script>
