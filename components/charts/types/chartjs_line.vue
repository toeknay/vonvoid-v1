

<script>
// Dependencies, components, and mixins
import Chart from 'chart.js'
import { generateChart, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins


// Custom chart type to handle verticle tooltip guideline
Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
    draw: function(ease) {
        Chart.controllers.line.prototype.draw.call(this, ease);

        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
            var activePoint = this.chart.tooltip._active[0],
            ctx = this.chart.ctx,
            x = activePoint.tooltipPosition().x,
            topY = this.chart.scales['y-axis-0'].top,
            bottomY = this.chart.scales['y-axis-0'].bottom;

            // draw line
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(128,126,156,0.10)';
            ctx.stroke();
            ctx.restore();
        }
    }
});

// Pass custom chart to chartjs components
const LineWithLine = generateChart('custom-line', 'LineWithLine')

export default {
    extends: LineWithLine,
    props: {
        chartData: {
            required: true
        },
        options: {
            default: _ => ({
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes : [ {
                        type: 'time',
                        fillGapsWithZero: true,
                        minUnit: 'day',
                        gridLines : {
                            display : false,
                        },
                        time: {
                            unit: 'day',
                            format: 'DD/MM/YYYY',
                            unitStepSize: 3,
                            displayFormats: {
                                'day': 'MMM DD'
                            }
                        },
                        ticks: {
                            fontColor:"#807E9C",
                            fontSize: 12,
                            fontFamily: "'Lato', sans-serif"
                            // autoSkip: true,
                            // maxTicksLimit: 4
                        },

                    } ],

                    yAxes: [{
                        afterTickToLabelConversion: function(scaleInstance) {
                            scaleInstance.ticks[scaleInstance.ticks.length - 1] = null;
                            scaleInstance.ticksAsNumbers[scaleInstance.ticksAsNumbers.length - 1] = null;
                        },
                        ticks: {
                            beginAtZero:false,
                            min: 0,
                            //max: config['max']+5,
                            // stepSize:5,
                            // suggestedMax: 100,
                            padding: 17,
                            fontSize: 12,
                            fontColor:"#807E9C",
                            fontFamily: "'Lato', sans-serif",
                            maxTicksLimit: 4
                        },
                        gridLines: {
                            drawBorder: false,
                            color: "rgba(128,126,156,0.15)",
                        },
                    }]
                },

                legend: {
                    horizontalAlign: "left",
                    display:false,
                    labels: {
                        boxWidth: 0,
                    }
                },
                //  showAllTooltips: true,
                tooltips: {
                    mode: 'index',
                    position: 'average',
                    intersect: 'false',
                    cornerRadius: 3,
                    borderWidth: 0,
                    displayColors: true,
                    xPadding: 15,
                    yPadding: 15,
                    callbacks: {
                        label: function(tooltipItem, data) {
                            var allData = data.datasets[tooltipItem.datasetIndex].data;
                            var tooltipData = allData[tooltipItem.index].y;
                            var tooltipLabel = (tooltipItem.datasetIndex === 1 ? ' GDPR' : ' Visitors')
                            return [tooltipData + tooltipLabel];
                        },
                        // remove title
                        // title: function() {}
                    },
                    // change direction of tooltip caret
                    yAlign: 'bottom',
                    //  bodyFontSize: 18
                    bodyFontSize: 15,
                    intersect: false,
                    bodyFontSize: 12
                }

            })
        }
    },
    mixins: [reactiveProp],
    mounted () {
        // this.chartData is created in the mixin.
        // If you want to pass options please create a local options object
        this.renderChart(this.chartData, this.options)
    }
}
</script>
