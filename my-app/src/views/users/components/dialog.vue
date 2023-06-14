<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" label-width="70px" :rules="rules">
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="form.password" prop="password" type="" v-if="dialogTitle==='编辑用户'" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" prop="email" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.mobile" prop="mobile" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { defineEmits, ref, defineProps, watch } from "vue";
import { addUser,editUser } from "@/api/user";
import { ElMessage } from "element-plus";
import i18n from "@/I18n";
import { ElMenuItem } from "element-plus";

const emits = defineEmits(["update:modelValue", "initUserList"]);

const handleClose = () => {
  emits["update:modelValue"](false);
};
const handleConfirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      props.dialogTitle === "添加用户" ? await addUser(form.value):await editUser(form.value);
      ElMessage({
        message: i18n.global.t("message.updeteSuccess"),
        type: "success",
      });
      emits("initUserList");
      handleClose();
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
const formRef = ref(null);
const form = ref({
  username: "",
  password: "",
  email: "",
  mobile: "",
});
const props = defineProps({
  dialogTitle: {
    type: String,
    default: "",
    required: true,
  },
  dialogTableValue: {
    type: Object,
    default: () => {},
  },
});

watch(
  () => props.dialogTableValue,
  () => {
    console.log(props.dialogTableValue);
    form.value = props.dialogTableValue;
  },
  { deep: true, immediate: true }
);

const rules = ref({
  username: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
  ],
  email: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
    {
      type: "email",
      message: "请输入正确的邮箱地址",
      trigger: ["blur", "change"],
    },
  ],
  mobile: [
    {
      required: true,
      message: "Please select Activity zone",
      trigger: "change",
    },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "请输入正确的手机号",
      trigger: ["blur", "change"],
    },
  ],
});
</script>
<style></style>
