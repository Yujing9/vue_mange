<template>
  <el-dropdown @command="handleCommand">
    <svg-icon icon="language"></svg-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh" :disabled="currentLang === 'zh'"
          >中文</el-dropdown-item
        >
        <el-dropdown-item command="en" :disabled="currentLang === 'en'"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { useStore } from "vuex";
import zh from "@/I18n/zh";
import en from "@/I18n/en";
const i18n = useI18n();
const store = useStore();

const currentLang = computed(() => {
  return i18n.locale.value;
});

const handleCommand = (val) => {
  i18n.locale.value = val;
  store.commit("app/changeLang", val);
  localStorage.setItem("lang", val);
};
</script>

<style lang="scss" scoped></style>
