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