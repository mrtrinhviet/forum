<template>
  <div v-if="asyncDataStatus_ready" class="container col-full">
    <h1>{{ category.name }}</h1>
    <ForumList :title="category.name" :forums="getForumForCategory(category)" />
  </div>
</template>

<script>
import ForumList from '@/components/ForumList'
import { findById } from '@/helpers'
import { mapActions } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },
  components: {
    ForumList
  },
  mixins: [asyncDataStatus],
  computed: {
    category () {
      return findById(this.$store.state.categories.items, this.id) || {}
    }
  },
  methods: {
    getForumForCategory (category) {
      return this.$store.state.forums.items.filter(
        forum => forum.categoryId === category.id
      )
    },
    ...mapActions('categories', ['fetchCategory']),
    ...mapActions('forums', ['fetchForums'])
  },
  async created () {
    const category = await this.fetchCategory({ id: this.id })
    await this.fetchForums({ ids: category.forums })
    this.asyncDataStatus_fetch()
  }
}
</script>
