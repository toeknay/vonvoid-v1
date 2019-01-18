<template>
    <form refs="payment-form" @submit.prevent="purchase">

        <csf-form-alert :items="errors" />

        <b-form-group>
            <label :for="id">Card Details:</label>
            <div :id="id" class="form-control" refs="card"></div>
            <small :id="id+'-errors'" role="alert" class="form-text text-danger" v-if="stripeError">{{ stripeError }}</small>
        </b-form-group>
    </div>
    <b-form-group>
        <button type="submit" class="btn btn-primary btn-block">{{ button }}</button>
        <small class="text-muted text-center d-block mt-2">You agree to the <a href="//consentiful.com/legal/terms" target="_blank">terms</a> and authorize an annual $180 charge</small>
    </b-form-group>
</form>

</template>

<script>
import { loadScript } from '@/utils/mixins/misc'
import { submit } from '@/utils/mixins/forms'

let stripe = undefined
let elements = undefined

export default {
    mixins: [loadScript, submit],
    props: {
        stripe: {
            type: String,
            required: true,
            default: ''
        },
        id: {
            type: String,
            required: false
        },
        button: {
            type: String,
            required: false,
            default: 'Upgrade to Pro!'
        },
        options: {
            type: Object,
            required: false,
            default: _ => ({
                // see https://stripe.com/docs/stripe.js#element-options for details
            })
        },
        stripeStyle: {
            type: Object,
            required: false,
            default: _ => ({
                base: {
                    color: '#32325d',
                    //lineHeight: '18px',
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                    '::placeholder': {
                        color: '#aab7c4'
                    }
                },
                invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a'
                }
            })
        }
    },
    data: _ => ({
        cardInput: {}, // Stripe element object
        stripeError: false,
        form: {
            stripeToken: ''
        },
        errors: [],
        loading: false
    }),
    methods: {
        purchase () {
            // stripe.createToken(this.cardInput).then(data => console.log(data.token))
            stripe.createToken(this.cardInput)
            .then(result => {

                // Error handling
                if (result.error) {
                    this.stripeError = result.error.message;
                    return;
                }

                // Set on form for submission
                this.form.stripeToken = result.token;

                // Payment API call to server
                return this.submit('subscription/subscribe', '/account', 'Congratulations! Your account has been upgraded.');

            });
        },
        validate (event) {
            this.stripeError = (event.error ?  event.error.message : false)
        },
    },
    mounted () {

        // Load stripe then do stuff!
        this.loadScript('https://js.stripe.com/v3/').then(_ => {

            stripe = Stripe(this.stripe);
            elements = stripe.elements();

            // Create an instance of the card Element.
            this.cardInput = elements.create('card', {style: this.stripeStyle});

            // Add an instance of the card Element into the `card-element` <div>.
            this.cardInput.mount('#' + this.id);

            // Handle real-time validation errors from the card Element.
            this.cardInput.addEventListener('change', event => this.validate(event));

        })

    },
    // head: _ => ({
    //     script: [
    //         // Add script to page head
    //         { hid:'stripe', src: '' }
    //     ]
    // }),
}
</script>
