<template lang="html">
    <button type="submit" class="btn"
        :class="[type ? 'btn-'+type : 'btn-primary', formLoading ? 'btn-loading' : '']">
        <i class="far fa-spinner-third fa-spin mr-1" style="font-size:12px;" v-show="formLoading"></i>
        <slot>{{ buttonText }}</slot>
    </button>
</template>

<script>
export default {
    props: ['formLoading', 'type', 'action' , 'text'],
    data: () => {
        return {

        }
    },
    computed: {
        buttonText: function () {
            if (this.formLoading) {
                return this.action
            }
            return this.text
        }
    }
}
</script>
