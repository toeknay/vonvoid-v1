/**
* General form submission method using Vuex state actions
* @param  {String} method  what to dispatch from the state
* @param  {String} forward where to forward upon success
* @param  {String} message what success message to display
*/

export const submit = {
    methods: {
        submit (method, forward, message) {

            // make sure we're not already submitting
            if (this.loading) return

            // Do we have Vuelidate validation?
            if (this.$v) {

                // trigger vuelidate validation
                this.$v.$touch()

                // ensure validated
                if (this.$v.form.$error) return
            }

            this.errors = [];
            this.loading = true;

            return this.$store.dispatch(method, this.form).then( _ => {

                if (forward) {
                    this.$router.push({ path: forward });
                    window.scrollTo(0,0)
                }

                if (message && forward) {
                    // add a success flash message
                    this.$flash.add([{type: 'success', msg: message}])
                } else if (message) {
                    // standard in-line success message
                    this.errors = [{type: 'success', msg: message}]
                }

                this.loading = false;

            }).catch(error => {

                // Stop loading
                this.loading = false;

                if (error.response && typeof error.response.data == 'object') {
                    // Set form errors
                    this.errors = error.response.data;
                } else {
                    // No response from server, lets show something generic
                    this.errors = [{type: 'error', msg: 'Oops! There was a problem processing your request'}]
                }

                return Promise.reject(error);

            });
        }
    }
}
