<template>
   <div>
      <textarea v-if="this.$store.state.isContEd" id="text-box" class="textBox" v-html="content"></textarea>
      <div v-else id="text-box" v-html="content"></div>
   </div>
</template>
<script>
   export default{
      computed : {
         content() {
            if (this.$store.state.activeContent == "html"){
               let md = this.$store.state.contentMD;
               return marked(md, { sanitize: true });
            }
            if (this.$store.state.activeContent == "md"){
               return this.$store.state.contentMD
            }
         }
      }
   }
</script>
<style scoped>
   #text-box{
      width: 100%;
      height: 600px;
      background-color: white;
      border: 1px solid #ddd;
      overflow: auto;
      padding: 0px;
      resize: none;
   }
</style>
