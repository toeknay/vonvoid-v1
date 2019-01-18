<template lang="html">
    <b-form-group ref='container' class="code_input">
        <textarea class="form-control consentiful_code_input" readonly>{{ contents }}</textarea>
        <div class="code_overlay" @click="copy()" :class="{'copy_success' : copy_text == 'Copied!'}">
            <span>{{copy_text}}</span>
        </div>
    </b-form-group>
</template>

<script>
// Get the ConsentifulJS code snippet
import { code } from '@/utils/consentifuljs.js'

// Plugins
import Vue from 'vue'

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);

export default {
    props: ['integrator'],
    data: _ => ({
        copy_text: 'Copy to Clipboard!'
    }),
    computed: {
        container () { return this.$refs.container.$el },
        contents () { return code(this.integrator) }
    },
    methods: {
        copy () {

            this.$copyText(this.contents, this.container).then(_ => {

                this.copy_text = 'Copied!'

                setTimeout(_ => {
                    this.copy_text = 'Copy to Clipboard'
                }, 750);

            }).catch(e => {
                console.log(e);
            })

        },
    }
}
</script>

<style lang="css">
</style>
