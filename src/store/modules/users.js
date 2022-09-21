import {
  findById,
  docToResource,
  makeAppendChildToParentMutation,
  makeFetchItemAction,
  makeFetchItemsAction
} from '@/helpers'
import firebase from '@/helpers/firebase'

export default {
  namespaced: true,
  state: {
    items: []
  },

  getters: {
    user: (state, getters, rootState) => {
      return id => {
        const user = findById(state.items, id)
        if (!user) return null

        return {
          ...user,
          // authUser.posts
          get posts () {
            return rootState.posts.items.filter(
              post => post.userId === user.id
            )
          },
          get postsCount () {
            return user.postsCount || 0
          },
          get threads () {
            return rootState.threads.items.filter(
              thread => thread.userId === user.id
            )
          },
          get threadIds () {
            return user.threads
          },
          get threadsCount () {
            return user.threads?.length || 0
          }
        }
      }
    }
  },

  actions: {
    async registerUserWithEmailAndPassword (
      { dispatch },
      { avatar = null, email, name, username, password }
    ) {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      dispatch('createUser', {
        id: result.user.uid,
        name,
        username,
        email,
        avatar
      })
    },

    async createUser ({ commit }, { id, username, name, email, avatar = null }) {
      const registeredAt = firebase.firestore.FieldValue.serverTimestamp()
      const usernameLower = username.toLowerCase()
      email = email.toLowerCase()
      const user = {
        name,
        username,
        usernameLower,
        registeredAt,
        email,
        avatar
      }
      const userRef = await firebase.firestore().collection('users').doc(id)

      userRef.set(user)

      const newUser = await userRef.get()
      commit('setItem', { resource: 'users', item: newUser }, { root: true })
      return docToResource(newUser)
    },

    async updateUser (context, user) {
      const updates = {
        avatar: user.avatar || null,
        username: user.username || null,
        name: user.name || null,
        bio: user.bio || null,
        website: user.website || null,
        email: user.email || null,
        location: user.location || null
      }
      const userRef = firebase.firestore().collection('users').doc(user.id)
      await userRef.update(updates)
      context.commit(
        'setItem',
        { resource: 'users', item: user },
        { root: true }
      )
    },

    fetchUser: makeFetchItemAction({ emoji: '🙋', resource: 'users' }),

    fetchUsers: makeFetchItemsAction({ resource: 'users', emoji: '🙋' })
  },

  mutations: {
    appendThreadToUser: makeAppendChildToParentMutation({
      parent: 'users',
      child: 'threads'
    })
  }
}
