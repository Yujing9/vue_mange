<template>
  <el-card class="box-card">
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input
          :placeholder="$t('table.placeholder')"
          clearble
          v-model="queryForm.query"
          :suffix-icon="'CircleClose'"
        />
      </el-col>
      <el-button type="primary" :icon="Search" @click="initGetUserList">{{
        $t("table.search")
      }}</el-button>
      <el-button type="primary" @click="handleDialogValue()">{{
        $t("table.adduser")
      }}</el-button>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        v-for="(item, index) in options"
        :prop="item.prop"
        :label="$t(`table.${item.label}`)"
        :key="index"
        :width="item.width"
      >
        <template v-slot="{ row }" v-if="item.prop === 'mg_state'">
          <el-switch v-model="value1" @change="changeState(row)" />
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'create_time'">
          {{ $filters.filterTime(row.create_time) }}
        </template>
        <template #default="{ row }" v-else-if="item.prop === 'action'">
          <el-button
            type="primary"
            :icon="Edit"
            @click="handleDialogValue(row)"
            circle
          />
          <el-button :icon="Setting" circle />
          <el-button
            type="danger"
            :icon="Delete"
            @click="delUser(row)"
            circle
          />
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="queryForm.pagesize"
      :pager-count="queryForm.pagenum"
      layout="prev, pager, next"
      :total="total"
    />
  </el-card>
  <Dialog
    v-model="dialogVisible"
    :dialogTitle="dialogTitle"
    v-if="dialogVisible"
    @initUserList="initGetUserList"
    :dialogTableValue="dialogTableValue"
  />
</template>

<script setup>
import { Delete, Edit, Setting, CircleClose } from "@element-plus/icons-vue";
import { ref } from "vue";
import { userList, changeUserState,deleteUser } from "@/api/user";
import { options } from "@/views/users/options";
import { POPPER_CONTAINER_SELECTOR } from "element-plus";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import Dialog from "./components/dialog.vue";
import { isNull } from "@/utils/filters";
import { ElMessage, ElMessageBox } from "element-plus";

const queryForm = ref({
  query: "",
  pagenum: 1,
  pagesize: 10,
});
const dialogVisible = ref(false);
const i18n = useI18n();
console.log(queryForm.value);
const total = ref(0);
const tableData = ref([]);
const dialogTitle = ref("");
const dialogTableValue = ref({});
const initGetUserList = async () => {
  const res = await userList(queryForm.value);
  // console.log(res)
  tableData.value = res.users;
  total.value = res.total;
};
initGetUserList();

const changeState = async (info) => {
  await changeUserState(info.id, info.mg_state);
  ElMessage({
    message: i18n.t("message.updeteSuccess"),
    type: "success",
  });
};
const handleDialogValue = (row) => {
  if (isNull(row)) {
    dialogTitle.value = "添加用户";
    dialogTableValue.value = {};
  } else {
    dialogTitle.value = "编辑用户";
    dialogTableValue.value = JSON.parse(JSON.stringify(row));
  }
};
const delUser = async (row) => {
  console.log(row);
  ElMessageBox.confirm(i18n.t("dialog.deleteHtml"), "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(async() => {
      await deleteUser(row.id);
      ElMessage({
        type: "success",
        message: "Delete completed",
      });
      initGetUserList();
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};

</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}
</style>
