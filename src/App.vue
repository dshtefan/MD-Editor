<template>
  <div id="app">
    <Menu/>
    <TextBox/>
  </div>
</template>

<script>
   import Menu from './components/Menu'
   import TextBox from './components/TextBox'

   export default {
     name: 'App',
     components: {
       Menu,
       TextBox
     }
   }
</script>

<style>
#app {
   float: right;
   margin-right: 5%;
   width: 90%;
}
</style>
