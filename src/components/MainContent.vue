<template>
  <h2 class="content-title">{{ content.label }}</h2>
  <component :is="targetComponent" />
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  name: "MainContent",
  props: {
    content: {
      type: Object,
      default() {
        return {
          label: "International",
          path: "corona",
          index: "DomesticCases",
        };
      },
    },
  },
  data() {
    return {
      targetComponent: null,
    };
  },
  watch: {
    content: {
      handler: function (newValue) {
        console.log("wrok!");
        this.targetComponent = defineAsyncComponent(() =>
          import(`@/components/${newValue.path}/${newValue.index}`)
        );
        console.log(this.targetComponent, "comp");
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style></style>
