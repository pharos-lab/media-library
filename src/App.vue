<template>
  <div class="test h-[50rem] p-4">
    <MediaLibrary v-model="images" @addFile="addFile" @deleteFile="deleteFile"></MediaLibrary>
    {{ images }}
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MediaLibrary from './components/MediaLibrary.vue'


const items = [
]

const images = ref(items)

function addFile(file) {
  console.log(file)
}

function deleteFile(file) {
  console.log(file.alt + ' deleted')
}
</script>



<style scoped>

</style>
