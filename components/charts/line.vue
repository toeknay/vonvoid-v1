<template lang="html">
    <b-card-body>
        <div class="graph_label col-6">
            <h5>{{title}}</h5>
        </div>

        <div class="graph_controls col-6">
            <!-- <a href="#" class="active">7 days</a> -->
            <a href="#" @click.prevent="" class="active">30 days</a>
        </div>

        <div class="graph col-12">
            <line-chart v-if="chartData" :chart-data="chartData" :width="500" :height="250"/>
        </div>

        <div class="card-loader" v-if="loading">
            <i class="far fa-spinner-third fa-spin"></i>
        </div>
    </b-card-body>
</template>

<script>
// Dependencies
import moment from 'moment-timezone';
import api from '@/api';

// Components
import lineChart from '@/components/charts/types/chartjs_line.vue'

export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        datasets: {
            //type: Array, // array of strings of accepted datasets from server
            required: true
        },
    },
    data: _ => ({
        startDate: moment().subtract(30, 'days').format(), // default past 30 days
        endDate: moment().format(), // today
        timezone: moment.tz.guess(), // get user's timezone

        chartData: false, // chart data to send to vue-chartjs component

        loading: true // state of this graph
    }),
    components: { lineChart },
    methods: {
        getData () {

            // Set loading status
            this.loading = true;

            var colors = ['#C488E3', '#ff667f'] // TODO: Build out chart color pallet

            // Prep data object
            let data = { params: {
                    startDate: this.startDate, // default past 30 days
                    endDate:  this.endDate, // today
                    timezone: this.timezone, // get user's timezone
                    datasets: this.datasets
                }
            }

            // Get data from API
            api.analytics.chart(data)
                .then(results => {

                    let datasets = results.data.chartData

                    datasets = Object.keys(datasets).reduce((chart, set) => {

                        let setting = [{
                            label: '',
                            data: this.getMomentObjs(datasets[set]),
                            backgroundColor: 'transparent',
                            borderColor: colors[chart.length],
                            pointBackgroundColor: colors[chart.length],
                            pointBorderColor: colors[chart.length],
                            borderWidth: 3,
                            radius:2
                        }]

                        return chart.concat(setting)

                    }, [])

                    this.chartData = { datasets: datasets }

                    this.loading = false

                })
                .catch(error => {
                    this.loading = false
                    // TODO: Add error messaging to stats component
                    console.log('ERROR GETTING CHART');
                    console.log(error);
                })

            this.loading = false;

        },

        /**
        * Loop chart data array and convert prop x into moment object
        * @param  {Array} dataArr array of objects with x & y props
        * @return {Array}         With x prop converted to moment object
        */
        getMomentObjs: (dataArr) => dataArr.map(data => {
            data.x = moment(data.x)
            return data
        })
    },
    mounted () {
        this.getData()
    }
}
</script>
