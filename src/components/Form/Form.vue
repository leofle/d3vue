<template>
  <div>
    <label for="msg">Change the title</label>
    <input @input="changed" name="msg">
  </div>
</template>

<script>
export default {
  methods: {
    changed: function(event) {
      this.$store.commit('changeText', event.target.value)
    }
  }
}
</script>