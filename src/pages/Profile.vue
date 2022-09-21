<template>
  <div class="container" style="width: 100%">
    <div class="flex-grid">
      <div class="col-3 push-top">
        <user-profile-card v-if="!edit" :user="user" />
        <user-profile-card-editor v-else :user="user" />
      </div>
      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead"> {{ user.username }} recent activity </span>
        </div>

        <hr />

        <PostList :posts="user.posts" />

        <AppInfiniteScroll
          @load="fetchUserPosts"
          :done="this.user.posts.length === user.postsCount"
        />
      </div>
    </div>
  </div>
</template>
<script>
import PostList from '@/components/PostList'
import UserProfileCard from '@/components/UserProfileCard'
import UserProfileCardEditor from '@/components/UserProfileCardEditor'
import { mapGetters } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  mixins: [asyncDataStatus],
  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor
  },
  computed: {
    ...mapGetters('auth', { user: 'authUser' }),
    lastPostFetched () {
      if (this.user.posts.length === 0) return null
      return this.user.posts[this.user.posts.length - 1]
    }
  },
  methods: {
    fetchUserPosts () {
      return this.$store.dispatch('auth/fetchAuthUsersPosts', {
        startAfter: this.lastPostFetched
      })
    }
  },

  async created () {
    await this.fetchUserPosts()
    this.asyncDataStatus_fetch()
  }
}
</script>
