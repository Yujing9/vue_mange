<template>
  <div class="hamburger-container">
    <svg-icon :icon="icon" @click="toggleClick" id="hamburger"></svg-icon>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();

const toggleClick = () => {
  console.log("toggleClick");
  store.commit("app/changeSideType");
};
const icon = computed(() => {
  console.log(store.getters.sideType)
  return store.getters.sideType ? 'hamburger-opened' : 'hamburger-closed';
});
</script>
