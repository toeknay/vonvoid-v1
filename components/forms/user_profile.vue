<template lang="html">
    <form @submit.prevent="submit('user/update', null, 'Your information has been updated')">

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

        <csf-form-button :form-loading="loading" action="Saving...">
            Update Profile
        </csf-form-button>

    </form>
</template>

<script>
import { mapState } from 'vuex'

// Mixins
import { validationMixin } from "vuelidate"
import { required, minLength, email } from "vuelidate/lib/validators"
import { submit } from '@/utils/mixins/forms'

export default {
    data: _ => ({
        form: {
            name: '',
            email: '',
        },
        errors: [],
        loading: false
    }),
    computed: {
        ...mapState('user', ['user'])
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
        this.setFormData(this.user)

    },
    mixins: [
        validationMixin,
        submit
    ],
    validations: {
        form: {
            name: { required },
            email: { required, email },
        }
    }
}
</script>

<style lang="css">
</style>
