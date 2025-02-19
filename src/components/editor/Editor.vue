<template>
    <div id="myeditor"></div>
</template>

<script setup>

import E from 'wangeditor'
import { onMounted, defineEmits } from 'vue';

const emit = defineEmits(["event"]) //父组件定义了event

onMounted(()=>{
    const editor = new E("#myeditor")
    editor.create()
    editor.config.onchange= function (newHtml) {
        //子传父
        emit("event", newHtml)
    }
}) 

</script>