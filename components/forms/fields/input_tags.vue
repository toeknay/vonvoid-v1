<template>
    <div @click="focusNewTag()" :class="{'read-only': readOnly, 'focused' : focused}" class="vue-input-tag-wrapper">
        <span v-for="(tag, index) in innerTags" :key="index" class="input-tag">
            <span>{{ tag }}</span>
            <a v-if="!readOnly" @click.prevent.stop="remove(index)" class="remove"></a>
        </span>
        <input
        v-if                     = "!readOnly && !isLimit"
        ref                      = "inputtag"
        :placeholder             = "placeholder"
        type                     = "text"
        v-model                  = "newTag"
        @keydown.delete.stop     = "removeLastTag"
        @keydown                 = "addNew"
        @blur                    = "addNew(); isFocused(false)"
        @focus                   = "isFocused(true)"
        class                    = "new-tag"
        :name                    = "name"
        :id                      = "name"
        />
    </div>
</template>

<script>
/*eslint-disable*/
const validators = {
    email: new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    url: new RegExp(/^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i),
    text: new RegExp(/^[a-zA-Z]+$/),
    digits: new RegExp(/^[\d() \.\:\-\+#]+$/),
    isodate: new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/)
}
/*eslint-enable*/

export default {
    name: 'InputTag',

    props: {
        tags: {
            type: Array,
            default: () => []
        },
        placeholder: {
            type: String,
            default: ''
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        validate: {
            type: String | Object,
            default: ''
        },
        addTagOnKeys: {
            type: Array,
            default: function () {
                return [
                    13, // Return
                    188, // Comma ','
                    9 // Tab
                ]
            }
        },
        addTagOnBlur: {
            type: Boolean,
            default: false
        },
        limit: {
            default: -1
        },
        name: {
            type: String
        }
    },

    data () {
        return {
            focused: false,
            newTag: '',
            innerTags: [...this.tags]
        }
    },

    watch: {
        tags () {
            this.innerTags = [...this.tags]
        }
    },

    computed: {
        isLimit: function () {
            return this.limit > 0 && Number(this.limit) === this.innerTags.length
        }
    },

    methods: {
        focusNewTag () {
            if (this.readOnly || !this.$el.querySelector('.new-tag')) { return }
            this.$el.querySelector('.new-tag').focus()
        },

        isFocused (e) {
            this.focused = e;
        },

        addNew (e) {
            // Do nothing if the current key code is
            // not within those defined within the addTagOnKeys prop array.
            if ((e && this.addTagOnKeys.indexOf(e.keyCode) === -1 &&
            (e.type !== 'blur' || !this.addTagOnBlur)) || this.isLimit) {
                return
            }

            if (e) {
                e.stopPropagation()
                e.preventDefault()
            }

            if (
                this.newTag &&
                this.innerTags.indexOf(this.newTag) === -1 &&
                this.validateIfNeeded(this.newTag)
            ) {
                this.innerTags.push(this.newTag)
                this.newTag = ''
                this.tagChange()
            }
        },

        validateIfNeeded (tagValue) {
            if (this.validate === '' || this.validate === undefined) {
                return true
            } else if (typeof (this.validate) === 'string' && Object.keys(validators).indexOf(this.validate) > -1) {
                return validators[this.validate].test(tagValue)
            } else if (typeof (this.validate) === 'object' && this.validate.test !== undefined) {
                return this.validate.test(tagValue)
            }
            return true
        },

        remove (index) {
            this.innerTags.splice(index, 1)
            this.tagChange()
        },

        removeLastTag () {
            if (this.newTag) { return }
            this.innerTags.pop()
            this.tagChange()
        },

        tagChange () {
            this.$emit('update:tags', this.innerTags)
        }
    }
}
</script>
<style>
</style>
