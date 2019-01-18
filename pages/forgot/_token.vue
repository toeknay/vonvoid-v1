<template lang="html">
    <b-container class="col-md-5">
        <b-card>
            <legend>Reset Password</legend>
            <form-password />
        </b-card>
    </b-container>
</template>

<script>
// Components
import formPassword from '@/components/forms/password.vue'

export default {

    validate ({ params }) {
        // Must be a alphanumeric
        return /^[a-z0-9]+$/i.test(params.token)
    },
    asyncData ({store, redirect, params, app}) {
        // Validate token isn't expired
        return store.dispatch('user/forgotValidate', { token: params.token })
            .then(response => {
                return response
            })
            .catch(error => {
                app.$flash.add(error.response.data)
                redirect('/forgot')
            })

    },

    components: { formPassword }
}
</script>

<style lang="css">
</style>
