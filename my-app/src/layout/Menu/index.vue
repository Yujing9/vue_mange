<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="menuBg"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    text-color="#fff"
    router
    unique-opened
    :collapse = "!store.getters.sideType"
  >
    <el-sub-menu
      v-for="(item, index) in menusList"
      :key="item.id"
      :index="item.id"
    >
      <template #title>
        <el-icon>
          <component :is="iconList[index]"></component>
        </el-icon>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item
        v-for="child in item.children"
        :key="child.id"
        :index="'/' + child.path"
        @click="savePath(child.path)"
      >
        <template #title>
          <el-icon><component :is="icon"></component></el-icon>
          {{ child.authName }}
        </template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<script setup>
import { menuList } from "@/api/menu";
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const iconList = ref(["user", "setting", "shop", "tickets", "pie-chart"]);
const icon = ref("menu");

const defaultActive = ref(sessionStorage.getItem("path") || "/");
const menusList = ref([]);
const initMenu = async () => {
  console.log(menusList.value);
  menusList.value = await menuList();
};
initMenu();

const savePath = (path) => {
  console.log(path);
  sessionStorage.setItem("path", `/${path}`);
};
const isCollapse = ref(false);
</script>
