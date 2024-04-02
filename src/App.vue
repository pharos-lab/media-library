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
  {'src': 'ok', 'alt': 'alt text 1'},
  {'src': 'ok', 'alt': 'alt text 2'},
  {'src': 'ok', 'alt': 'alt text 3'},
  {'src': 'ok', 'alt': 'alt text 4'},
  {'src': 'ok', 'alt': 'alt text 5'},
]

const images = ref(items)

function addFile(file) {
  console.log(file)
}

function deleteFile(file) {
  console.log(file.alt)
}
</script>



<style scoped>

</style>
