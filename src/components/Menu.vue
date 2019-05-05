<template>
   <div id="menu">
      <a class="docs tabs" @click="openList" data-toggle="modal" data-target=".bd-example-modal-lg">
         Files
      </a>
      <a class="tab tabs" :class="{ 'non-active': this.$store.state.isPreview }" @click="clickEdit">
         Edit file
      </a>
      <a class="tab tabs" :class="{'non-active': !this.$store.state.isPreview }" @click="clickPreview">
         Preview
      </a>
      <a class="tabs save" @click="saveFile">
         Save
      </a>
      <div class="input-group input-group-lg">
        <input id="filename" type="text" class="form-control" placeholder="Filename" aria-describedby="sizing-addon2">
        <span class="input-group-addon" id="sizing-addon2">.md</span>
      </div>
      <Modal/>
   </div>
</template>
<script>
   import Modal from './Modal'
   export default{
      components: {
         Modal
      },
      methods: {
         clickEdit () {
            this.$store.commit('turnList', false);
            this.$store.commit('turnView', false);
            this.$store.commit('turnContEd', true);
            if (this.$store.state.activeContent == "md"){
               this.$store.commit('saveMD', document.getElementById('text-box').value);
            }else {
               this.$store.commit('activateContent', 'md');
            }
         },
         clickPreview () {
            this.$store.commit('turnList', false);
            this.$store.commit('turnView', true);
            this.$store.commit('turnContEd', false);
            if (this.$store.state.activeContent == "md"){
               this.$store.commit('saveMD', document.getElementById('text-box').value);
            }
            this.$store.commit('activateContent', 'html');
         },
         openList() {
            var files;
            $.ajax({type: 'POST', url : "http://localhost:3012/getfiles", async:false}).done(
               function(data){
                 files = data;
              });
             this.$store.state.files = files;
             this.drawListofFiles(this.$store.state.files);
         },
         drawListofFiles(files){
            var th = this;
            document.getElementById('modal-body').innerHTML = "";
            files.forEach(function(item, i){
               var divParent = document.createElement('div');
               var link = document.createElement('a');
               var x = document.createElement('a');
               x.innerHTML="X"
               x.classList.add("col-1");
               x.style.cursor = "pointer";
               x.addEventListener("click", function(){
                  $.ajax({type: 'POST', url : "http://localhost:3012/removefile",
                     data: { 'id': item._id }, async:false})
                     .done(
                        function(data){
                          files = data;
                       });
                  this.dataset.dismiss = "modal";
               })

               divParent.classList.add("row");
               divParent.id = "divParent" + i;

               link.innerHTML = item.name;
               link.classList.add("col-11");
               link.dataset.dismiss = "modal";
               link.style.cursor = "pointer";

               link.addEventListener("click", function(){
                  th.$store.commit('saveMD', item.text);
                  th.$store.commit('addFileName', item.name);
                  th.$store.commit('addId', item._id);
                  document.getElementById('text-box').value = item.text;
                  document.getElementById('filename').value = item.name;
                  th.clickEdit();
               })

               var hR = document.createElement('hr');
               document.getElementById('modal-body').appendChild(divParent);
               document.getElementById('divParent'+ i).appendChild(link);
               document.getElementById('divParent' + i).appendChild(x);
               if (i < files.length - 1)
                  document.getElementById('modal-body').appendChild(hR);
            })
         },
         saveFile(){
            var content = document.getElementById('text-box').value;
            var name = document.getElementById('filename').value;
            var oldName = this.$store.state.fileName;
            var id;
            var th = this;
            var mode = "save";
            var jsonOut = {
               'text': content,
               'name': name
            }
            if(name == ""){
               alert("Введите название файла");
               return;
            }
            if(this.$store.state.id != ""){
               jsonOut.id = this.$store.state.id;
               alert("jebhfb");
               mode = "update";
            }
            $.ajax({type: 'POST', url : "http://localhost:3012/"+ mode +"file",
               data: jsonOut, async:false})
               .done(
                  function(data){
                    th.$store.commit('addId', data._id);
                 });
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
   .save{
      background-color: rgb(51,204,153);
      float: right;
      width: 60px;
      margin-left: 5px;
   }
   .save:hover{
      background-color: rgb(51,204,191);
   }
</style>
