<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">
      <span class='no-redirect' v-if="index === breadList.length - 1">
        {{ item.name }}
      </span>
      <span class='redirect' v-else @click= "toggleClick(item.path)"> {{ item.name }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { useRoute,useRouter } from "vue-router";
import { ref, watch } from "vue";
const route = useRoute();
const router = useRouter()
const breadList = ref([]);
const toggleClick = (path) => {
  console.log("toggleClick");
  router.push(path)

};
const initBreadcrumbList = () => {
  breadList.value = route.matched;
};
watch(
  route,
  () => {
    initBreadcrumbList();
  },
  { deep: true, immediate: true }
);
</script>
<style lang="scss" scoped>
.no-redirect {
  color: #97a8be;
  cursor: text;
}
.redirect {
  color: #666;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: menuBg;
  }
}
</style>
