<template>
   <div id="menu">
      <a class="docs tabs" @click="openList">
         Docs
      </a>
      <a class="tab tabs" :class="{ 'non-active': this.$store.state.isPreview }" @click="turnEdit">
         Edit file
      </a>
      <a class="tab tabs" :class="{'non-active': !this.$store.state.isPreview }" @click="turnPreview">
         Preview
      </a>
      <a class="action tabs save" href="*">
         Save
      </a>
      <a class="action tabs delete" href="*">
         Delete
      </a>
      <div class="input-group input-group-lg">
        <input id="filename" type="text" class="form-control" placeholder="Filename" aria-describedby="sizing-addon2">
        <span class="input-group-addon" id="sizing-addon2">.md</span>
      </div>
   </div>
</template>
<script>
   export default{
      methods: {
         turnEdit () {
            this.$store.commit('turnList', false);
            this.$store.commit('turnView', false);
            this.$store.commit('turnContEd', true);
         },
         turnPreview () {
            this.$store.commit('turnList', false);
            this.$store.commit('turnView', true);
            this.$store.commit('turnContEd', false);
         },
         openList() {
            this.$store.commit('turnList', !this.$store.state.listOfDocs);
            this.$store.commit('turnContEd', !this.$store.state.listOfDocs);
         }
      }
   }
</script>
<style scoped>
   .input-group{
      float: right;
      width: 230px;
      margin-right: 20px;
   }
   #filename{
      border: none;
      text-align: right;
   }
   .input-group-addon{
       border-radius: 0.3rem;
       background-color: #eceeef;
       border-bottom-left-radius: 0;
       border-top-left-radius: 0;
       text-align: center;
       padding: 0.75rem 0.8rem;
   }
   #menu{
      margin-top: 20px;
      padding: 0;
      height: 45px;
   }
   .tabs{
      cursor: pointer;
      margin: 0;
      padding: 0;
      height: 45px;
      text-align: center;
      font-size: 16px;
      border-radius: 5px;
      padding:8px;
      color: white;
   }
   .docs{
      float: left;
      margin-right: 5px;
      width: 60px;
      background-color: rgb(53, 215, 187);
      text-decoration:none;
   }
   .docs:hover{
      background-color: rgb(17,96,98);
   }
   a:hover{
      color: white;
      text-decoration-line: none;
   }
   .tab{
      margin-right: 5px;
      float: left;
      width: 150px;
      background-color: #777;
      border-radius: 0px;
   }
   .non-active{
      background-color: rgb(243,243,243);
      color: black;
   }
   .non-active:hover{
      color: #777 !important;
      background-color: rgb(225,225,225) !important;
   }
   .action{
      float: right;
      width: 60px;
      margin-left: 5px;
   }
   .save{
      background-color: rgb(51,204,153);
   }
   .save:hover{
      background-color: rgb(51,204,191);
   }
   .delete{
      background-color: rgb(255,64,64);
   }
   .delete:hover{
      background-color: rgb(238,32,77);
   }
</style>
