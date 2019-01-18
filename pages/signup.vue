<template lang="html">
    <b-container class="login-container col-md-5">
        <b-card>
            <legend class="m-0">Create an account</legend>
            <p class="mb-4 text-muted">It's absolutely free!</p>

            <form-signup />
        </b-card>
        <p class="text-center mt-4">
            Already have an account? <b-link to="/login"><strong>Log in</strong></b-link>
        </p>
    </b-container>
</template>

<script>

import formSignup from '@/components/forms/signup.vue'

export default {
    components: {
        formSignup
    }
}
</script>

<style lang="css">
</style>
