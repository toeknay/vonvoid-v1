<template lang="html">
    <b-card class="mb-3 form-notification" :class="{'d-none' : !hasItems}" :bg-variant="variant" text-variant="white" no-body>
        <b-card-body class="p-3">
            <span v-for="(e, index) in items" :key="index" class="d-block">
                <i class="far fa-check mr-2" v-if="variant == 'success'"></i>
                <span v-html="e.msg"></span>
            </span>
        </b-card-body>
    </b-card>
</template>

<script>
export default {
    props: {
        items: {
            required: true,
            default: []
        }
    },
    computed: {
        hasItems () {
            return (this.items.length > 0 ? true : false)
        },
        variant () {

            if (this.items.length > 0) {
                let type = this.items[0].type || 'danger'
                if (this.items[0].type == 'error')
                    type = 'danger'

                return type
            }

            // always fall back to showing as error
            return 'danger'

        }
    }
}
</script>

<style lang="css" scoped>
.form-notification a { text-decoration: underline; color: white; }
</style>
