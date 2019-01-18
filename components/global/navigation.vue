<template lang="html">
    <div class="mb-5">
        <b-navbar toggleable="lg" type="light" class="bg-white">
            <b-container>
                <div class="navbar-header">
                    <b-navbar-toggle target="navbar"></b-navbar-toggle>
                </div>
                <div class="logo_container">
                    <b-navbar-brand to="/">
                        <img src="/img/logo-dark.png" alt="Consentiful logo">
                    </b-navbar-brand>
                </div>
                <b-collapse is-nav id="navbar">

                    <b-navbar-nav class="mr-auto"  v-if="isLoggedIn">

                        <b-nav-item to="/dashboard">Dashboard</b-nav-item>
                        <b-nav-item to="/contacts">Contacts <span class="badge pro-badge" v-if="(account && account.tier != 'paid')">PRO</span></b-nav-item>
                        <b-nav-item to="/settings">Settings</b-nav-item>

                    </b-navbar-nav>

                    <b-navbar-nav class="ml-auto navbar-right">

                        <!-- [[! TODO Add this back when we tackle notifications
                        <ul class="navbar-nav mr-auto"><li class="nav-item"><b-link class="nav-link" ><i class="fa fa-bell fa-2x"></i></b-link></li></ul>]] -->

                        <b-nav-item-dropdown right v-if="isLoggedIn">
                            <template slot="button-content">
                                <img :src="user.gravatar" width="30" class="rounded-circle">
                                <i class="caret"></i>
                            </template>

                            <b-dropdown-item to="/account">My Account</b-dropdown-item>
                            <b-dropdown-item to="/settings">Settings</b-dropdown-item>
                            <b-dropdown-item to="/integrations">Integrations</b-dropdown-item>
                            <!-- [[!-- <li class="dropdown-item"><b-link to="/reports">Reports</b-link></li> --]] -->
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item href="http://consentiful.drift.help/" target="_blank">Help</b-dropdown-item>
                            <b-dropdown-item href="#" @click.prevent="logOut">Logout</b-dropdown-item>

                        </b-nav-item-dropdown>

                        <b-nav-item to="/login" v-if="!isLoggedIn">Log in</b-nav-item>
                        <b-nav-item to="/signup" v-if="!isLoggedIn">Register</b-nav-item>

                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>

        <div class="upgrade_notice bg-light" v-if="(account && account.tier != 'paid')">
            <b-container class="text-center p-2 text-gray">
                <small>Upgrade to Consentiful pro for consent collection, crm integrations, and much more... <b-link to="/account/upgrade" class="text-primary">Learn more <i class="far fa-chevron-right" style="font-size:10px;"></i> </b-link></small>
            </b-container>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    methods: {
        logOut() {
            this.$store.dispatch("clearAll").then(() => {
                this.$router.push({ path: "/login" });
            }).catch(err => console.log(err));
        }
    },
    computed: {
        ...mapState('user', ['user', 'isLoggedIn']),
        ...mapState('account', ['account']),
    }
}
</script>

<style lang="css">
</style>
