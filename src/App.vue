<template>
  <BasicLayout @handleSelect="(item) => (content = item)">
    <MainContent :content="content" />
  </BasicLayout>
</template>

<script>
import BasicLayout from "./components/layouts/BasicLayout";
import MainContent from "./components/MainContent";
export default {
  name: "App",
  components: {
    BasicLayout,
    MainContent,
  },
  data() {
    return {
      content: {
        index: "DashBoard",
        path: "main",
        label: "대시보드",
      },
    };
  },
};
</script>

<style></style>
