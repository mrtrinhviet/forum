export default {
  data () {
    return {
      asyncDataStatus_ready: false
    }
  },
  methods: {
    asyncDataStatus_fetch () {
      this.asyncDataStatus_ready = true
      this.$emit('ready')
    }
  }
}
