<template>
  <div id="app">
    <Encabezado></Encabezado>
    <router-view></router-view>
  </div>
</template>

<script>

import encabezado from './components/encabezado.vue'
//Añadimos bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.js'

export default {
  name: 'App',
  components: {
    Encabezado: encabezado
  },
  mounted() {
    //Añadiremos Font Awesome con mi clave (Sergio Bosch)
    let myScript = document.createElement('script')
    myScript.setAttribute('src',"https://kit.fontawesome.com/e704792412.js")
    myScript.setAttribute('SameSite',"none Secure")
    myScript.setAttribute('crossorigin',"anonymous")
    document.head.appendChild(myScript)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
