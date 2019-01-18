<template lang="html">
    <b-form-group class="has-float-label">
        <textarea class="form-control"
            :name="name"
            :id="name"
            :placeholder="placeholder||label"
            v-model="interface"
            @focus="focused=true"
            @blur="touchInput(); focused=false;"
            :class="validationClass">
        </textarea>
        <label :for="name" :class="{'focused' : focused, 'is-invalid' : v.$error}">{{ label }}</label>
        <small class="form-text invalid-feedback" v-if="invalid">{{ invalid }}</small>
    </b-form-group>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true,
            default: ''
        },
        name: {
            type: String,
            required: true,
            default: ''
        },
        placeholder: {
            type: String,
            required: false,
            default: ''
        },
        v: {
            required: false,
            default () {
                return false
            }
        },
        value: {},
        invalid: {
            type: String,
            required: false
        },
    },
    data () {
        return {
            focused: false,
        }
    },
    methods: {
        touchInput () {
            return (this.v ? this.v.$touch() : '')
        }
    },
    computed: {
        interface: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        },
        validationClass () {
            if (this.v.$error)
                return 'is-invalid shake'
            if (this.v.$dirty && !this.v.$invalid)
                'is-valid'
        }
    }
}
</script>

<style lang="css">
</style>
