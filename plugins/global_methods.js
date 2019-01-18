import Vue from 'vue'

Vue.mixin({
    methods: {

        /**
        * Check if string is truly empty
        * @param  {String} str  String to check
        * @return {Bool}        Returns true or false
        */
        isEmpty (str) {
            return (!str || 0 === str.length);
        },

        /**
         * Find object in array of object by prop value
         * @param  {Array} array        Array of objects in question
         * @param  {String} key         String of the object key
         * @param  {Multi} value        String/int, etc of the object prop value
         * @return {Object|Null}        Returns either null or matching object
         */
        findObjectByProp (array, key, value) {
            // TODO: Use map instead of a for loop
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] === value) {
                    return array[i];
                }
            }
            return null;
        }

    }
})
