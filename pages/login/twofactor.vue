<template lang="html">

    <b-container class="login-container col-md-5">

        <b-card>
            <legend>Login</legend>
            <form-twofactor />
        </b-card>

    </b-container>

</template>

<script>
// Components
import formTwofactor from '@/components/forms/login_twofactor.vue'

export default {
    components: { formTwofactor }
}
</script>

<style lang="css">
</style>
