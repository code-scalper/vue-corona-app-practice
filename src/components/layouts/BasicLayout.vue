<template>
  <el-container class="main">
    <el-header><BasicHeader /></el-header>
    <el-container>
      <el-aside :width="menuWidth">
        <SideMenu
          :isCollapse="isCollapse"
          @handleSelect="(item) => $emit('handleSelect', item)"
      /></el-aside>
      <el-main><slot></slot></el-main>
    </el-container>
  </el-container>
</template>

<script>
import BasicHeader from "./BasicHeader";
import SideMenu from "./SideMenu";
import useBreakpoint from "@/composables/useBreakpoint";
import { computed } from "vue";
export default {
  name: "BasicLayout",
  components: {
    BasicHeader,
    SideMenu,
  },
  setup() {
    const { type } = useBreakpoint();
    const isCollapse = computed(() => type.value === "sm");
    const menuWidth = computed(() => {
      return isCollapse.value ? "65px" : "200px";
    });
    return {
      isCollapse,
      menuWidth,
    };
  },
};
</script>

<style>
.el-header {
  background: #409eff;
  color: #fff;
  display: flex;
  align-items: center;
}
.main {
  height: 100%;
}
.el-sub-menu__title {
  display: flex;
  align-items: center;
}
.content-container {
  display: grid;
}
</style>
