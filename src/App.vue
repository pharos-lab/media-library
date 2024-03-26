<template>
  <div class="test h-[50rem] p-4">
    <MediaLibrary v-model="images"></MediaLibrary>
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
</script>



<style scoped>

</style>
