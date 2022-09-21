<template>
  <VeeForm @submit="save">
    <AppFormField v-model="form.title" name="title" label="Title" rules="required" type="text" />
    <AppFormField as="textarea" v-model="form.text" name="content" label="Content" rules="required" type="text" rows="8" cols="140" />

    <div class="btn-group">
      <button class="btn btn-ghost" @click.prevent="$emit('cancel')">
        Cancel
      </button>
      <button class="btn btn-blue" type="submit" name="Publish">
        {{ existing ? 'Update' : 'Publish' }}
      </button>
    </div>
  </VeeForm>
</template>
<script>
export default {
  props: {
    title: { type: String, default: '' },
    text: { type: String, default: '' }
  },
  data () {
    return {
      form: {
        title: this.title,
        text: this.text
      }
    }
  },
  computed: {
    existing () {
      return !!this.title
    }
  },
  methods: {
    async save () {
      this.$emit('clean')
      this.$emit('save', { ...this.form })
    }
  },
  watch: {
    form: {
      handler () {
        if (this.form.title !== this.title || this.form.text !== this.text) {
          this.$emit('dirty')
        } else {
          this.$emit('clean')
        }
      },
      deep: true
    }
  }
}
</script>
