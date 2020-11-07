<template>
  <div class="body">
    <div id="inicio">
      <h3>Página de Inicio ({{role}})</h3>
      <br>
      <br>
      <img src="../../public/logo_okupa.png">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      role:""
    }
  },
  mounted() {
    this.role = this.$store.getters.getRole
  }
}
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
