/**
 * Helper method for loading scripts to head on a per-component basis
 * @param  {[type]} src      [description]
 * @param  {[type]} location [description]
 * @return {[type]}          [description]
 */

export const loadScript = {
    methods: {
        loadScript (src, location) {

            return new Promise((resolve, reject) => {

                // TODO: Use Vuex store to globally tell all components this script
                //       is being loaded

                if (!location) location = 'head'

                let script = document.createElement('script')

                script.setAttribute('src', src)
                script.async = true

                // this.$root.$emit('loading_script')

                script.onload = () => {
                    /* emit to global event bus to inform other components
                    * we are already loading the script */
                    // this.$root.$emit('script_loaded')
                    resolve()
                }

                document[location].appendChild(script)

            })

        },
    }
}