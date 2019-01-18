<template lang="html">
    <form method="POST" @submit.prevent="submit('user/forgot', '/login', 'Check your email for instructions on reseting your password')">

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

        <csf-form-button :form-loading="loading" action="Loading..." text="Reset Password" />

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
        }
    }
}
</script>
