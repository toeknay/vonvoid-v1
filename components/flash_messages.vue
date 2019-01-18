<template lang="html">
    <div class="flash-message" v-if="hasMessages">
        <transition-group v-for="(m,index) in messages" name="slide-fade" :key="index">
            <csf-form-alert v-if="m.show" :items="m.items" :key="index"/>
        </transition-group>
    </div>
</template>

<script>
export default {
    data: _ => ({
        messages: []
    }),
    methods: {
        getMessages () {
            this.messages.push({ items: this.$flash.messages, show: false })
            this.$flash.clear()
            let key = this.messages.length-1

            this.show(key)
            setTimeout(_ => this.hide(), 3000);
        },
        show (key = this.messages.length-1) {
            this.messages[key].show = true
        },
        hide (key = this.messages.length-1) {
            this.messages[key].show = false
            setTimeout(_ => this.destroy(key), 500); // queue up to destroy
        },
        destroy (key = this.messages.length) {
            this.messages.splice(key-1, 1)
        }
    },
    computed: {
        hasMessages () { return this.messages.length > 0 },
        flash () { return this.$flash.messages },
    },
    watch: {
        flash () {
            if(this.$flash.messages.length > 0)
                this.getMessages()
        }
    },
    mounted () {
        if(this.$flash.messages.length > 0)
            this.getMessages()
    }
}
</script>


<style scoped>

    .alert-wrap,
    .flash-message {
        position: fixed;
        right: 25px;
        bottom: 25px;
        z-index:9999;
    }
    /**
     * Fade transition styles
     */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0
    }
    /**
     * Bounce transition styles
     */
    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }
    /**
     * Slide transition styles
     */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for <2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
</style>