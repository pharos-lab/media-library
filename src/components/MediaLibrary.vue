<template>
    <section class="media-library flex gap-2 h-full">
        <div class="preview grow border-2 p-8 flex flex-col gap-8 h-full">
            <div class="images grow p-8 bg-slate-100 self-stretch flex">    
                <div v-show="sidePanel == 'crop'" class="w-64 bg-red-500 self-stretch">
                    CROP
                </div>

                <div v-show="sidePanel == 'rotate'" class="w-64 bg-red-500 self-stretch">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="size-7" @click="rotateLeft">
                            <path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"/>
                        </svg>
                    </button>

                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="size-7" @click="rotateRight">
                            <path d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"/>
                        </svg>
                    </button>
                </div>

                <div class="grow flex items-center justify-center">
                    <canvas class="image-canvas max-w-full max-h-full bg-slate-400 " ref="canvas" width="800px" height="600px"></canvas>
                    <img :src="canvasToImg"/>
                </div>
            </div>

            <div class="controls flex gap-4 justify-center items-center bg-slate-100 p-8">
                <!-- <button title="undo" @click="undo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="size-5">
                        <path d="M48.5 224H40c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H48.5z"/>
                    </svg>
                </button> -->
                <button title="crop image" @click="open('crop')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="size-5">
                        <path d="M128 32c0-17.7-14.3-32-32-32S64 14.3 64 32V64H32C14.3 64 0 78.3 0 96s14.3 32 32 32H64V384c0 35.3 28.7 64 64 64H352V384H128V32zM384 480c0 17.7 14.3 32 32 32s32-14.3 32-32V448h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H448l0-256c0-35.3-28.7-64-64-64L160 64v64l224 0 0 352z"/>
                    </svg>
                </button>

                <button title="" @click="open('rotate')">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="size-5">
                        <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/>
                    </svg>
                </button> 

                <button title="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="size-5">
                        <path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"/>
                    </svg>
                </button>

                <button tilte="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="size-5">
                        <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
                    </svg>
                </button>

                <button title="">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="size-5">
                        <path d="M48 96V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V170.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H309.5c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8V184c0 13.3-10.7 24-24 24H104c-13.3 0-24-10.7-24-24V80H64c-8.8 0-16 7.2-16 16zm80-16v80H272V80H128zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"/>
                    </svg>
                </button>
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
const canvasToImg = ref()
const canvas = ref()
const sidePanel = ref()
const currentPreview = ref(model.value[0])
const currentImage = ref()
const rotation = ref(0)


const preview = (index) => {
    currentPreview.value = model.value[index] ?? model.value[0]
    currentImage.value = new Image()
    currentImage.value.src = model.value[index]?.src ?? 'placeholder-image.png'
    canvas.value.width = currentImage.value.width
    canvas.value.height = currentImage.value.height
    const ctx = canvas.value.getContext('2d')
    ctx.drawImage(currentImage.value, 0, 0)
    ctx.save()
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
    canvas.value.toBlob((blob) => {
        let file = new File([blob], "fileName.jpg", { type: "image/jpeg" })
        canvasToImg.value = URL.createObjectURL(file)
        emit('saveImage', file)
    }, 'image/jpeg');
}

const open = (panel) => {
    sidePanel.value = panel
}

const rotateLeft = () => {
    console.log('rotate left')
}

const rotateRight = () => {
    console.log(rotation.value)
    const ctx = canvas.value.getContext('2d')
    if (rotation.value == 0 ) {
        const size = [canvas.value.width, canvas.value.height]
        canvas.value.width = size[1]
        canvas.value.height = size[0]
        //ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
        ctx.translate(canvas.value.width, 0);
        ctx.rotate((90 * Math.PI) / 180)
        ctx.drawImage(currentImage.value, 0, 0)
        ctx.save()
        rotation.value = 90
    } else if (rotation.value == 90) {
        const size = [canvas.value.width, canvas.value.height]
        canvas.value.width = size[1]
        canvas.value.height = size[0]
        //ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
        ctx.translate(canvas.value.width, canvas.value.height);
        ctx.rotate((180 * Math.PI) / 180)
        ctx.drawImage(currentImage.value, 0, 0)
        ctx.save()
        console.log(ctx)
        rotation.value = 180
    } else if (rotation.value == 180) {

    }
}

const undo = () => {
    console.log('undo')
    const ctx = canvas.value.getContext('2d')
    ctx.restore()
    ctx.drawImage(currentImage.value, 0, 0)
}
</script>

<style scoped>
    .images {
        height: calc(100% - 150px)
    }
</style>