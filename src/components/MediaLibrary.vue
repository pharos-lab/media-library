<template>
    <section class="media-library flex gap-2 h-full">
        <div class="preview grow border-2 p-8"></div>
        <aside class="gallery w-96 border-2 p-4 flex flex-col">
            <h3 class="font-semibold text-slate- mb-8 text-2xl">{{ title || 'Medias' }}</h3>
            <div class="image-gallery grid grid-cols-2 gap-4 max-h-full overflow-auto">
                <button class="aspect-square bg-emerald-500 text-white flex justify-center items-center">
                    <PlusIcon class="size-12"></PlusIcon>
                </button>

                <div v-for="n in 8" class="bg-red-300 aspect-square">ok</div>
            </div>
        </aside>
    </section>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
    title: String
})
</script>