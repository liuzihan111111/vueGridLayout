<template>
  <div class="board" style="width: 100%">
    <div class="home">
      <grid-layout
        :layout="layoutData"
        :col-num="12"
        :row-height="layoutConfig.height"
        :is-draggable="layoutConfig.dialogVisible"
        :is-resizable="layoutConfig.dialogVisible"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="(item,index) in layoutData"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
        >{{index}}</grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import layoutData from "./layoutData.json";
import VueGridLayout from "vue-grid-layout";

const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;
export default {
  data() {
    return {
      // 布局数据
      layoutData: [],
      layoutConfig: {
        height: 100, // 默认高度
        dialogVisible: true // 是否可拖拽或改变大小
      }
    };
  },
  components: {
    GridLayout,
    GridItem
  },
  methods: {
    init() {
      this.layoutData = layoutData.mainData;
    }
  },
  created() {
    this.init();
  }
};
</script>


<style lang="scss" scoped>
.vue-grid-item {
  background: aquamarine;
  font-size: 16px;
}
</style>

