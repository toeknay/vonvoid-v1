<template lang="html">
    <footer>
        <b-container class="text-center mt-5 mb-4 text-muted">
            <small>
                © {{copyrightYear}} Consentiful. All Rights Reserved.<br>
                <strong>Need help? </strong> <a href="mailto:support@consentiful.com">Shoot us an email!</a>
            </small>

        </b-container>
    </footer>
</template>

<script>
export default {
    computed: {
        copyrightYear: _ => (new Date()).getFullYear()
    }
}
</script>

<style lang="css">
</style>
