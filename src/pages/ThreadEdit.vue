<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">
    <h1>
      Edit <i>{{ thread?.title }}</i>
    </h1>

    <ThreadEditor
      :title="thread?.title"
      :text="text"
      @save="save"
      @cancel="cancel"
      @dirty="isFormDirty = true"
      @clean="isFormDirty = false"
    />
  </div>
</template>
<script>
import ThreadEditor from '@/components/ThreadEditor'
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  components: {
    ThreadEditor
  },
  mixins: [asyncDataStatus],
  props: {
    id: { type: String, required: true }
  },
  data () {
    return {
      isFormDirty: false
    }
  },
  computed: {
    thread () {
      return this.$store.state.threads.items.find(
        thread => thread.id === this.id
      )
    },
    text () {
      return this.$store.state.posts.items.find(
        post => post.id === this.thread.posts[0]
      )?.text
    }
  },
  methods: {
    ...mapActions('threads', ['fetchThread', 'updateThread']),
    ...mapActions('posts', ['fetchPost']),
    async save ({ title, text }) {
      const thread = await this.updateThread({
        id: this.id,
        title,
        text
      })
      this.$router.push({ name: 'ThreadShow', params: { id: thread.id } })
    },
    cancel () {
      this.$router.push({ name: 'ThreadShow', params: { id: this.id } })
    }
  },
  async created () {
    const thread = await this.fetchThread({ id: this.id })
    await this.fetchPost({ id: thread.posts[0] })
    this.asyncDataStatus_fetch()
  },

  beforeRouteLeave () {
    if (this.isFormDirty) {
      const confirmed = window.confirm(
        'Are you sure you want to leave. Unsaved changes will be lost!'
      )
      if (!confirmed) {
        return false
      }
    }
  }
}
</script>
