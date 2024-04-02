<template>
    <section class="media-library flex gap-2 h-full">
        <div class="preview grow border-2 p-8"></div>
        <aside class="gallery w-96 border-2 p-4 flex flex-col">
            <h3 class="font-semibold text-slate- mb-8 text-2xl">{{ title || 'Medias' }}</h3>
            <div class="image-gallery grid grid-cols-2 gap-4 max-h-full overflow-auto mb-8">
                <input type="file" name="image" id="" class="hidden" ref="fileInput" @change="handleFileInput">
                <button class="aspect-square bg-emerald-500 text-white flex justify-center items-center" @click="triggerFileInput">
                    <PlusIcon class="size-12"></PlusIcon>
                </button>

                <div v-for="(image, index) in model" class="bg-red-300 aspect-square group relative" :key="index">
                    <div class="absolute size-full group-hover:bg-slate-100/70">
                        <div class="hidden group-hover:flex justify-end p-2 gap-2 text-slate-700">
                            <button @click="handleDelete(index)"><TrashIcon class="size-5 hover:text-slate-800"></TrashIcon></button>
                        </div>
                    </div>
                    <img :src="image.src" :alt="image.alt" srcset="" class="h-full w-full object-cover">
                </div>
            </div>
            <button class="px-3 py-2 rounded bg-emerald-500 text-white">save</button>
        </aside>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { PlusIcon, TrashIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
    title: String
})

const emit = defineEmits(['addFile', 'deleteFile'])

const model = defineModel()

const fileInput = ref()

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
</script>