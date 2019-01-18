<template lang="html">
    <form method="POST">

        <csf-form-alert :items="errors" />

        <b-form-group>
            <label for="tfa_token">Authenticator Code</label>

            <csf-form-input
                :v="$v.form.tfa_token"
                v-model="form.tfa_token"
                type="num"
                label="123456"
                name="name"
                invalid="Enter your 6-digit code"
                placeholder="123456">
            </csf-form-input>
    </b-form-group>

    <csf-form-button :form-loading="loading" action="Logging in..." text="Login" />

</form>
</template>

<script>

// Mixins
import { validationMixin } from "vuelidate"
import { numeric } from "vuelidate/lib/validators"
import { submit } from '@/utils/mixins/forms'

export default {
    data: _ => ({
        form: {
            tfa_token: '',
        },
        loading: false
    }),
    mixins: [
        validationMixin
    ],
    validations: {
        form: {
            tfa_token: { numeric }
        }
    }
}

</script>

<style lang="css">
</style>
