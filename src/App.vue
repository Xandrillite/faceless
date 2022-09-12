<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">-->
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <div class="container editor-container">
    <EditorPage
        v-model:id="id"
        v-model:value="content"
        @update:value="onUpdate"/>
  </div>
  <div id="preview" class="container preview-container">

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import EditorPage from "@/components/EditorPage";

export default {
  name: 'App',
  data() {
    return {
      id: "editor",
      content: "",
    }
  },
  components: {
    // HelloWorld
    EditorPage
  },
  methods: {
    onUpdate() {
      let preview = document.getElementById("preview");
      window.electronAPI.renderMd(this.content).then((result)=>{
        preview.innerHTML = result;
      })
    }
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
  display: flex;
  height: 100%;
}

.container {
  height: 100%;
  flex: 1 1 10px;
}

#editor {
  height:  100% !important;
}
</style>
