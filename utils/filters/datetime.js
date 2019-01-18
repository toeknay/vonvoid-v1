import Vue from 'vue'

// import moment from 'moment'
import moment from 'moment-timezone'

// Show formatted datetime
Vue.filter('prettyDate', function (datetime) {
    return moment(datetime).format('lll');
});

// Show formatted date from unix time
Vue.filter('prettyUnix', function (timestamp) {
    return moment.unix(timestamp).format("MM/DD/YYYY");
});

// Show relative date
Vue.filter('relativeDate', function (datetime) {
    return moment(datetime).fromNow();
});

// Shows relative date if within 6 days
Vue.filter('hybridDate', function (datetime) {
    var mnt = moment(datetime)
    if(mnt.diff(moment(), 'days') > -6)
        return mnt.fromNow();
    else
        return mnt.format('lll');
});