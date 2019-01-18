<template lang="html">

    <div class="">

        <div class="card mt-4" v-if="false">
            <div class="card-body">

                <legend>Enhanced Security</legend>
                <p>Secure your account with 2-factor authentication through Google Authenticator.</p>
                <form method="POST" action="/account/2fa" class="form-horizontal">
                    <div class="form-group">
                        <label for="2fa_enabled" class="mb-0">Enable 2-Factor?</label>
                        <small class="d-block text-muted mb-3">This will enable 2-factor authentication for your account</small>
                        <label class="switch" for="2fa_enabled">
                            <input type="checkbox" name="2fa_enabled" id="2fa_enabled" class="form-control"
                            v-model="user.tfa_switch_enabled"
                            @change="toggleTwoFactor"
                            <!-- [[#if user.2fa_enabled]] --> checked <!-- [[/if]] -->>
                            <span class="slider round"></span>
                        </label>
                    </div>

                    <!-- [[! verify 2FA code before disabling]] -->
                    <div class="2fa_verify-disable"  v-if="user.tfa_enabled && !user.tfa_switch_enabled">
                        <div class="form-group">
                            <label for="">Verify Authenticator Code:</label>
                            <input type="hidden" name="2fa_enabled" value="true">
                            <input type="text" name="token" value="" class="form-control" maxlength="6">
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">Verify & Disable</button>
                        </div>
                    </div>
                </form>

                <!-- TODO: Jeremy needs to remove the below and do the whole ajax front-end flow here -->
                <div class="2fa_verify-enable" v-if="user.tfa_qr.length > 0 && user.tfa_switch_enabled" v-cloak>
                    <form method="POST" action="/account/2fa" class="form-horizontal">
                        <div class="form-group">
                            <label for=""><strong>1.</strong> Scan this with Google Authenticator</label>
                            <div>
                                <img :src="user.tfa_qr"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for=""><strong>2.</strong> Enter the Authenticator Code:</label>
                            <input type="hidden" name="2fa_enabled" value="true">
                            <input type="text" name="token" value="" class="form-control" maxlength="6">
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">Verify & Enable</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>


    </div>
</template>

<script>
export default {
    data: _ => ({
        // user: {
        //     tfa_switch_enabled: JSON.parse('<!-- [[{toJSON user.2fa_enabled]] -->}'), // v-model only
        //     tfa_enabled: JSON.parse('<!-- [[{toJSON user.2fa_enabled]] -->}'), // true value from server
        //     tfa_set: JSON.parse('<!-- [[{toJSON 2fa_set]] -->}'),
        //     tfa_qr: "",
        // }
    }),
    methods: {
        verifyTwoFactor: function () {
            var self = this;

            axios.get('/account/2fa', {})
            .then(function (response) {
                self.user.tfa_qr = response.data;
            })
            .catch(function (err) {
                console.log(err);
            });
        },
        toggleTwoFactor: function (regenerate) {
            var self = this;

            // If already enabled and they turned it on, we need to RE-generate...exit
            if (self.user.tfa_enabled && self.user.tfa_switch_enabled){
                console.log('already 2fa...exit');
                return;
            }

            // Not enabled, switch turned on, generate QR code
            else if (!self.user.tfa_enabled && self.user.tfa_switch_enabled){

                // already have active qr, exit
                if (self.user.tfa_qr.length > 0)
                return;

                // Generate QR
                console.log('generate 2fa');
                axios.get('/account/2fa', {regenerate: regenerate})
                .then(function (response) {
                    self.user.tfa_qr = response.data;
                })
                .catch(function (err) {
                    console.log(err);
                });
            }

            // Already enabled but switch turned to off
            else if (self.user.tfa_enabled && !self.user.tfa_switch_enabled) {
                //disable 2fa
                console.log('disable 2fa');
                axios.put('/account/2fa', {})
                .then(function (response) {
                    self.user.tfa_qr = response.data;
                })
                .catch(function (err) {
                    console.log(err);
                });
            }

        },
    }
}
</script>

<style lang="css">
</style>
