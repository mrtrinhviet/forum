<template>
  <ForumList
    v-for="category in categories"
    :key="category.id"
    :forums="getForums(category)"
    :title="category.name"
    :category-id="category.id"
  />
</template>
<script>
import ForumList from '@/components/ForumList'
import { findById } from '@/helpers'

export default {
  props: {
    categories: {
      required: true,
      type: Array
    }
  },
  components: {
    ForumList
  },
  methods: {
    // getForumForCategory(category) {
    //   return this.$store.state.forums.filter(
    //     forum => forum.categoryId === category.id,
    //   );
    // },
    getForums (category) {
      if (this.$store.state.forums.items.length === 0) {
        return []
      }
      let forums = category.forums.map(forumId =>
        findById(this.$store.state.forums.items, forumId)
      )
      for (const forum of forums) {
        if (forum === undefined) {
          forums = []
          break
        }
      }
      return forums
    }
  }
}
</script>
