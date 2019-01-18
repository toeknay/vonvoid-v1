<template lang="html">
    <div class="container mb-5">
        <div class="row">
            <div class="col-12 col-lg-10 col-xl-8 mx-auto">

                <div class="text-right float-right mb-3">

                    <a v-b-modal="'consentifulInstall'" id="code" class="btn btn-primary text-white btn-sm">
                        <svg style="width:12px; margin-bottom:-1px;" version="1.1" id="Flash" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">
                        <path fill="#ffffff" d="M6.803,18.998c-0.194-0.127,3.153-7.16,3.038-7.469c-0.116-0.309-3.665-1.436-3.838-1.979 c-0.174-0.543,7.007-8.707,7.196-8.549c0.188,0.158-3.129,7.238-3.039,7.469c0.091,0.23,3.728,1.404,3.838,1.979 C14.109,11.024,6.996,19.125,6.803,18.998z"/></svg>
                        Your Install Code
                    </a>

                    <modal-install id='consentifulInstall' />

                </div>

                <h2 class="card-title" v-if="account.tier=='paid'">Consent Checkboxes</h2>

                <div class="section__consent-items mb-5" id="consent_items" v-if="account.tier=='paid'" v-cloak>

                    <csf-form-alert :items="errors" />

                    <div class="card mb-3" v-if="!consentItems">
                        <div class="card-body p-3 text-center">
                            Looks like you have no consent checkboxes setup, <a href="#" @click.prevent="editing_consent = null" v-b-modal="'consentItemModal'">lets add one!</a>
                        </div>
                    </div>

                    <div class="consent-item" v-for="(c, index) in consentItems" :class="{enabled : c.is_enabled}" @click.prevent="editing_consent = index" v-b-modal="'consentItemModal'">
                        <div class="row">
                            <div class="col-8">
                                <span class="consent-name">
                                    <i class="status-circle" :title="(c.is_enabled ? 'Enabled' : 'Disabled')" data-toggle="tooltip"></i>
                                    {{c.name}}
                                </span>
                                <small class="consent-text" v-html="$options.filters.strip(c.contents)"></small>
                            </div>
                            <div class="col-4 align-self-center">
                                <small class="badge badge-danger" v-if="c.is_eu_only">EU Only</small>
                                <small class="badge badge-info" v-if="c.is_required">Required</small>
                            </div>
                        </div>
                    </div>

                    <a class="btn btn-primary text-white" @click.prevent="editing_consent = null" v-b-modal="'consentItemModal'">Add New</a>

                    <modal-consent-item id="consentItemModal" :editing="currentConsent" />

                </div>

                <hr class="my-3" v-if="account.tier=='paid'" />

                <b-card class="mt-5">

                    <legend>Settings</legend>
                    <form-blocking-settings />

                </b-card>


                <b-card class="mt-4" id="account_domains">
                    <card-domains />
                </b-card>

            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

// Components
import modalInstall from '@/components/modals/installation.vue'
import modalConsentItem from '@/components/modals/consent_item.vue'
import cardDomains from '@/components/cards/manage_domains.vue'
import formBlockingSettings from '@/components/forms/block_settings.vue'

export default {
    fetch ({ store }) {
        // Fetch basic user package
        return store.dispatch('user/fetch')
            // Fetch account settings
            .then(_ => store.dispatch('account/fetch'))
    },

    data: _ => ({
        editing_consent: false,
        errors: []
    }),
    computed: {
        currentConsent () {
            return this.editing_consent !== null ? this.consentItems[this.editing_consent] : null
        },
        ...mapState('account', ['account']),
        ...mapState('account', ['account', 'consentItems']),
    },
    filters: {
        strip (html) {
            if(process.browser){
                let doc = new DOMParser().parseFromString( unescape(html), 'text/html' );
                return doc.body.textContent || "";
            }
        }
    },
    components: {
        modalInstall,
        cardDomains,
        formBlockingSettings,
        modalConsentItem
    },
}
</script>

<style lang="css">
</style>
