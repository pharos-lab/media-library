<template>
    <section class="media-library">
        <div class="preview"></div>
        <aside class="gallery"></aside>
    </section>
</template>

<style scoped>
.media-library {
    display: flex;
    gap: 12px;
    height: 100%
}

.preview, .gallery {
    border: 1px solid blue
}

.preview {
    flex-grow: 1
}
.gallery {
    width: 384px
}

* {
    box-sizing: border-box;
}
</style>