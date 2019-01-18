<template lang="html">
    <div class="my-5">
        <label for="">{{ label }}</label>
        <VuePellEditor
            :actions="editorOptions"
            :content="contents"
            :placeholder="placeholder"
            v-model="interface"
            :style-with-css="false"
            editorHeight="100px"
            class="form-control"
            default-paragraph-separator="div"
            @onChange="onchange()"></VuePellEditor>
        <small class="form-text text-muted">{{ description }}</small>
    </div>
</template>

<script>
import VuePellEditor from '@/components/vendors/vue-pell-editor.vue'

export default {
    props: {
        contents: {
            type: String,
            required: false,
            default: ''
        },
        preset: {
            type: String,
            required: false,
            default: 'simple'
        },
        options: {
            type: Object,
            required: false,
            default: null
        },
        placeholder: {
            type: String,
            required: false,
            default: ''
        },
        label: {
            type: String,
            required: true,
            default: ''
        },
        description: {
            type: String,
            required: false,
            default: ''
        }
    },
    data: _ => ({
        presets: {
            simple: ['bold', 'underline', 'italic', {
                    name: 'link',
                    icon: '<i class="far fa-link" style="font-size:12px;"></i>'
                }]
        }
    }),
    computed: {
        interface: {
            get () { return this.value },
            set (value) { this.$emit('input', value) }
        },
        editorOptions () { return this.options||this.presets[this.preset] }
    },
    components: {VuePellEditor}
}
</script>

<style lang="css">
@import 'vue-pell-editor/dist/vue-pell-editor.css';

.vp-editor .vp-editor__placeholder {
    top: 60px;
    left: 18px;
    color: #ddd;
    font-style: normal;
}

.pell-actionbar {
    padding: 7px 10px;
}
.vp-editor .pell-content {
    padding: 14px;
    transition: all .15s ease;
}
.vp-editor.form-control{
    padding:0;
}

</style>
