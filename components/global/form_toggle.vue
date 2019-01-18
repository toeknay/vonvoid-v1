<template lang="html">
    <div>
        <label :for="name" class="mb-0" v-if='label'>
            {{ label }}
        </label>
        <small v-if="description" class="d-block text-muted mb-3">{{ description }}</small>
        <label class="switch" :for="name">
            <input class="form-control"
                type="checkbox"
                :name="name"
                :id="name"
                :value="1"
                :checked="value"
                v-model="interface">
            <span class="slider round"></span>
        </label>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            required: false,
            default: false
        },
        description: {
            required: false,
            default: false
        },
        name: {
            type: String,
            required: true,
            default: ''
        },
        value: {},
    },
    data: _ => ({}),
    computed: {
        interface: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    }
}
</script>

<style lang="css">
</style>
