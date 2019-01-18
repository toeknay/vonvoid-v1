<template lang="html">
    <div class="card-body" :class="{loading : loading}" v-cloak>
        <div class="stat_label col-6">
            <h5>{{ title }}</h5>
        </div>
        <div class="stat_controls col-6">
            <!-- <a href="#" class="active">7 days</a> -->
            <a href="#" @click.prevent="" class="active">30 days</a>
        </div>
        <div class="card-loader" v-if="loading">
            <i class="far fa-spinner-third fa-spin"></i>
        </div>
        <div class="stat col-12" v-if="!loading && statData">
            <div>
                {{ total }}
                <small>{{ subtextReplaced }}</small>
            </div>
        </div>
    </div>
</template>

<script>
// Dependencies
import moment from 'moment-timezone';
import api from '@/api';

export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        stat: {
            //type: Array, // array of strings of accepted datasets from server
            required: true
        },
        subtext: {
            type: String
        }
    },
    data: _ => ({
        startDate: moment().subtract(30, 'days').format(), // default past 30 days
        endDate: moment().format(), // today
        timezone: moment.tz.guess(), // get user's timezone

        statData: false, // chart data to send to vue-chartjs component

        loading: true // state of this graph
    }),
    computed: {
        total () { return this.statData ? this.statData[this.stat[0]].total : 0  },
        secondaryTotal () { return this.statData ? this.statData[this.stat[1]].total : 0 },
        subtextReplaced () {
            return this.subtext.replace('%%', this.percent)
        },

        // subtext options
        percent () { return (Math.round((this.secondaryTotal/this.total)*100)||0) + '%' }, // percentage
        // lastPeriod () { return (Math.round((this.secondaryTotal/this.total)*100)||0) + '%' }, // percentage change over last period

    },
    methods: {
        getData () {
            // Mark loading
            this.loading = true

            // Prep data object
            let data = { params: {
                    startDate: this.startDate, // default past 30 days
                    endDate:  this.endDate, // today
                    timezone: this.timezone, // get user's timezone
                    stat: this.stat
                }
            }

            // Get data from API
            api.analytics.stat(data)
                .then(results => {
                    this.loading = false
                    this.statData = results.data.statData
                })
                .catch(error => {
                    this.loading = false
                    // TODO: Add error messaging to stats component
                    console.log('ERROR GETTING STAT');
                    console.log(error);
                })

        }
    },
    mounted () {
        this.getData()
    }
}
</script>