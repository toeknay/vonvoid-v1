<template lang="html">

    <b-container class="login-container col-md-5">

        <b-card>
            <legend>Login</legend>
            <form-login />
        </b-card>

        <div class="text-center mt-4">
            Don't have an account? <b-link to="/signup"><strong>Sign up</strong></b-link>
        </div>

    </b-container>

</template>


<script>
import formLogin from '@/components/forms/login.vue'

export default {
    components: {
        formLogin
    }
}
</script>

<style lang="css">
</style>
