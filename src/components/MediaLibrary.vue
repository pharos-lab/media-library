<template>
    <section class="media-library flex gap-2 h-full">
        <div class="preview grow border-2 p-8 flex flex-col gap-8 h-full">
            <div class="images grow p-8 bg-slate-100 self-stretch flex justify-center items-center">    
                <canvas class="image-canvas max-w-full max-h-full bg-slate-400" ref="canvas" width="800px" height="600px">
                    
                </canvas>
                <img :src="canvaToImg" alt="" class="w-1/3">
            </div>
            <div class="controls flex gap-4 justify-center bg-slate-100 p-8">
                <button @click="save">save</button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="size-5 fill-blue-500">
                        <path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"/>
                    </svg>
                </button>

                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="size-5">
                        <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/>
                    </svg>
                </button>
                <div v-for="n in 10">ok</div>

            </div>
        </div>
        <aside class="gallery w-96 border-2 p-4 flex flex-col">
            <h3 class="font-semibold text-slate- mb-8 text-2xl">{{ title || 'Medias' }}</h3>
            <div class="image-gallery grid grid-cols-2 gap-4 max-h-full overflow-auto mb-8 grow auto-rows-min">
                <input type="file" name="image" id="" class="hidden" ref="fileInput" @change="handleFileInput">
                <button class="aspect-square bg-emerald-500 text-white flex justify-center items-center" @click="triggerFileInput">
                    <PlusIcon class="size-12"></PlusIcon>
                </button>

                <div v-for="(image, index) in model" class="bg-red-300 aspect-square group relative" :key="index" @click="preview(index)">
                    <div class="absolute size-full group-hover:bg-slate-100/70">
                        <div class="hidden group-hover:flex justify-end p-2 gap-2 text-slate-700">
                            <button @click="handleDelete(index)"><TrashIcon class="size-5 hover:text-slate-800"></TrashIcon></button>
                        </div>
                    </div>
                    <img :src="image.src" :alt="image.alt" srcset="" class="h-full w-full object-cover">
                </div>
            </div>
        </aside>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { PlusIcon, TrashIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
    title: String
})

const emit = defineEmits(['addFile', 'deleteFile', 'saveFiles'])

const model = defineModel()

const fileInput = ref()
const canvaToImg = ref()
const canvas = ref()

const currentPreview = ref(model.value[0])


const preview = (index) => {
    currentPreview.value = model.value[index] ?? model.value[0]
    const image = new Image()
    image.src = model.value[index]?.src ?? 'placeholder-image.png'
    canvas.value.width = image.width
    canvas.value.height = image.height
    const ctx = canvas.value.getContext('2d')
    ctx.drawImage(image, 0, 0)
}

const triggerFileInput = () => {
    fileInput.value.click()
}

const handleFileInput = (event) => {
    model.value.push({
        'src': URL.createObjectURL(event.target.files[0]),
        'alt': 'ok',
        'file': event.target.files[0]
    })

    emit('addFile', event.target.files[0])
}

const handleDelete = (index) => {
    emit('deleteFile', model.value[index])

    model.value.splice(index, 1)
}

const save = () => {
    console.log(canvas.value)
    canvas.value.toBlob((blob) => {
        let file = new File([blob], "fileName.jpg", { type: "image/jpeg" })
        console.log(file)
        canvaToImg.value = URL.createObjectURL(file)
    }, 'image/jpeg');
}
</script>

<style scoped>
    .images {
        height: calc(100% - 150px)
    }
</style>