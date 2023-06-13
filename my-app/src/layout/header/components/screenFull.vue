<template>
  <div @click="handleFullScreen" id="screenFul">
    <svg-icon :icon="isFullScreen ? 'exit-fullscreen':'fullscreen'"></svg-icon>
  </div>
</template>
<script setup>
import screenfull from 'screenfull';
import { ref,onMounted,onBeforeMount } from 'vue';
const isFullScreen = ref(screenfull.isFullscreen);

const handleFullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  }
}
const changeIcon = ()=>{
    isFullScreen.value = screenfull.isFullscreen;
}
onMounted(()=>{
    screenfull.on('change', changeIcon);
})
onBeforeMount(()=>{
    screenfull.off('change', changeIcon);
})

</script>
