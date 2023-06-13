<template>
    <el-dropdown>
    <span class="el-dropdown-link">
        <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="toggleclick">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
     
</template>
<script setup>
import { useStore } from "vuex";
const store = useStore();

const toggleclick =()=>{
    store.dispatch("app/logout")
}
</script>