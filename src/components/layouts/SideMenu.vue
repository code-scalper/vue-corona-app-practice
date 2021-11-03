<template>
  <el-row class="tac">
    <el-col>
      <el-menu default-active="" :collapse="isCollapse">
        <el-sub-menu
          :index="menu.index"
          v-for="menu in menuItem"
          :key="menu.index"
        >
          <template #title>
            <el-icon><component :is="menu.icon"></component></el-icon>
            <span>{{ menu.label }}</span>
          </template>
          <el-menu-item
            @click="handleSelect(item)"
            :index="item.index"
            v-for="item in menu.items"
            :key="item.index"
            >{{ item.label }}</el-menu-item
          >
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { Location, Setting } from "@element-plus/icons";
import { reactive, toRefs } from "vue";
export default {
  name: "SideMenu",
  components: {
    Location,
    Setting,
  },
  props: {
    isCollapse: Boolean,
  },
  setup(props, context) {
    const state = reactive({
      menuItem: [
        {
          label: "코로나 현황 요약",
          index: "corona-briefing",
          icon: "location",
          items: [
            {
              label: "국가별 요약",
              index: "InternationalCases",
              path: "corona",
            },
            { label: "국내 요약", index: "DomesticCases", path: "corona" },
          ],
        },
        {
          label: "코로나 분석",
          index: "corona-analysis",
          icon: "setting",
          items: [
            { label: "국가별 분석", index: "CountryAnalysis" },
            { label: "국내 분석", index: "DomesticAnalysis" },
          ],
        },
      ],
    });

    const handleSelect = (item) => {
      context.emit("handleSelect", item);
    };
    return {
      ...toRefs(state),
      handleSelect,
    };
  },
};
</script>

<style>
.tac {
  height: 100%;
}
.el-menu {
  height: 100%;
}
.el-menu-item {
  font-size: 12px;
}
</style>
