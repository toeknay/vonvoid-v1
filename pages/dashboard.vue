<template lang="html">
    <b-container class="mb-5">

        <!-- [[!TODO: Add alert component back in]] -->

        <!-- <div class="row mb-3"> -->
            <!-- <div class="col-md-9 text-right">

            </div>
            <div class="col-md-3 text-right">
                <a href="#" class="btn btn-light btn-sm">
                    <svg style="width:12px; margin-bottom:-1px;" version="1.1" id="Flash" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">
                        <path fill="#755188" d="M6.803,18.998c-0.194-0.127,3.153-7.16,3.038-7.469c-0.116-0.309-3.665-1.436-3.838-1.979 c-0.174-0.543,7.007-8.707,7.196-8.549c0.188,0.158-3.129,7.238-3.039,7.469c0.091,0.23,3.728,1.404,3.838,1.979 C14.109,11.024,6.996,19.125,6.803,18.998z"/></svg>
                        Install Code
                    </a>
                </div>
            </div> -->

            <b-row>
                <b-col md="4">

                    <b-card no-body class="stat-card">
                        <stat title="EU Visitors" :stat="['views', 'views_gdpr']" subtext="%% of your total traffic" />
                    </b-card>

                    <card-account-setup />

                </b-col>
                <b-col md="8">
                    <!-- [[ <div class="rounded bg-primary mb-3 p-3 text-white">
                    <div class="col-md-12">
                    <h5>Welcome to the Consentiful Beta!</h5>
                    <small>This is subtext</small>
                </div>
            </div> ]] -->
            <b-card no-body class="graph-card">
                <line-chart title="Overview" :datasets="['traffic', 'traffic_gdpr']" />
            </b-card>
        </b-col>
    </b-row>
</b-container>
</template>

<script>
// Components
import lineChart from '@/components/charts/line.vue'
import stat from '@/components/charts/stat.vue'
import cardAccountSetup from '@/components/cards/account_setup.vue'

export default {
    data: _ => ({
        account: '',
        two_factor: '',
        stats: {
            traffic: { views: 0, gdpr: 0 }
        }
    }),
    computed: {
        // isPaid () { return this.account.tier == 'paid'||false }, // TODO: Getter
    },
    methods: {},
    components: { lineChart, stat, cardAccountSetup }
}
</script>

<style lang="css">
</style>