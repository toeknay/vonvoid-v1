<template lang="html">

    <b-container class="col-md-5">
        <b-card>
            <legend>Forgot Password</legend>
            <p>Enter your email address below and we'll send you password reset instructions.</p>
            <form-forgot />
        </b-card>
    </b-container>

</template>

<script>
// Components
import formForgot from '@/components/forms/forgot.vue'

export default {
    components: { formForgot }
}
</script>

<style lang="css">
</style>
