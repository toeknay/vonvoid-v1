import Vue from 'vue'
import FlashMessagesComponent from 'vue'

/**
 * Flash Message plugin for Nuxt.js
 */
export default ({ req }, inject) => {

    // Inject `$flash` key
    // -> app.$flash
    // -> this.$flash in vue components
    // -> this.$flash in store actions/mutations
    inject('flash',
        new Vue({
            data: _ => ({
                messages: [],
                redirectTo: null
            }),
            methods: {
                add (msg, type = 'error') {
                    if (Array.isArray(msg))
                        this.messages = this.messages.concat(msg)
                    else
                        this.messages.push({msg: msg, type: type});
                },
                redirect (message, url) {
                    this.add(message)
                    if (url && this.$router) this.$router.push(url)
                },
                clear () {
                    this.messages = []
                }
            }
        })
    )

    // TODO: This should also be somehow plugin-itized
    Vue.component('flashMessages', require('@/components/flash_messages.vue').default)

}