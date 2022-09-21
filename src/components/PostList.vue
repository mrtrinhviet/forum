<template>
  <div v-if="users.length" class="post-list">
    <div class="post" v-for="post in posts" :key="post.id">
      <div v-if="userById(post.userId)" class="user-info">
        <a href="#" class="user-name">{{ userById(post.userId).name }}</a>

        <a href="#">
          <AppAvatarImg
            class="avatar-large"
            :src="userById(post.userId).avatar"
          />
        </a>

        <p class="desktop-only text-small">
          {{ userById(post.userId).postsCount }} posts
        </p>
        <p class="desktop-only text-small">
          {{ userById(post.userId).threadsCount }} threads
        </p>
      </div>

      <div class="post-content">
        <div class="col-full">
          <postEditor
            v-if="editing === post.id"
            :post="post"
            @save="handleUpdate"
          />
          <p v-else>
            {{ post.text }}
          </p>
        </div>
        <a
          v-if="post.userId === $store.state.auth.authId"
          @click.prevent="toggleEditMode(post.id)"
          href="#"
          style="margin-left: auto; padding-left: 10px"
          class="link-unstyled"
          title="Make a change"
        >
          <fa icon="pencil-alt" />
        </a>
      </div>

      <div class="post-date text-faded">
        <div v-if="post.edited?.at" class="editor-info">edited</div>
        <app-date :timestamp="post.publishedAt"></app-date>
      </div>
    </div>
  </div>
</template>

<script>
import PostEditor from './PostEditor.vue'
import { mapActions } from 'vuex'

export default {
  components: { PostEditor },
  props: {
    posts: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      editing: null
    }
  },
  computed: {
    users () {
      return this.$store.state.users.items
    }
  },
  methods: {
    ...mapActions('posts', ['updatePost']),
    userById (userId) {
      if (!userId) return {}
      return this.$store.getters['users/user'](userId)
    },
    toggleEditMode (id) {
      this.editing = id === this.editing ? null : id
    },
    handleUpdate (event) {
      this.updatePost(event.post)
      this.editing = null
    }
  }
}
</script>

<style scoped></style>
