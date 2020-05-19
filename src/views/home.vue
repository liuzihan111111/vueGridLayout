<template>
  <div class="app">
    <div class="navBar">
      <ul class="components-list">
        <li @click="layoutStart(1)">
          <span>单列布局</span>
        </li>
        <li @click="layoutStart(2)">
          <span>两列布局</span>
        </li>
        <!-- 点击时，将对应组件名保存进数组 -->
        <li @click="dragStart('oneDiv')" data-name="oneDiv">
          <span>组件1</span>
        </li>
        <li @click="dragStart('twoDiv')" data-name="twoDiv">
          <span>组件2</span>
        </li>
        <li @click="dragStart('threeDiv')" data-name="threeDiv">
          <span>组件3</span>
        </li>
        <li class="list-group col-md-3">
          <pre style="font-size:12px">{{listString}}</pre>
        </li>
      </ul>
    </div>
    <!-- 中间内容部分 -->
    <div ref="preview" class="content">
      <!-- 单列布局 -->
      <div class="oneLayout" v-if="layout==1" style="width:100%;height:auto;background:#cecece">
        <draggable
          v-model="componentData1"
          group="people"
          @start="drag=true"
          @end="drag=false"
          :move="onMove"
          tag="div"
        >
          <transition-group type="transition" tag="div" :name="'flip-list'" class="list-group">
            <div
              class="component_wrap"
              v-for="(item,index) in componentData1"
              :key="index"
              @contextmenu="getComponent(index,item)"
            >
              <!--      :is 显示相应的组件名；通过循环来显示组件 -->
              <component :is="item.name" :data-name="item.name"></component>
            </div>
          </transition-group>
        </draggable>
      </div>
      <!-- 两列布局 -->
      <div class="twoLayout" v-if="layout==2" style="width:100%;height:100%;display:flex">
        <div class="left" style="width:50%;height:auto;background:#eee">
          <draggable
            v-model="componentData1"
            group="people"
            @start="drag=true"
            @end="drag=false"
            :move="onMove"
            tag="div"
          >
            <transition-group type="transition" tag="div" :name="'flip-list'" class="list-group">
              <div
                class="component_wrap"
                v-for="(item,index) in componentData1"
                :key="index"
                @contextmenu="getComponent(index,item)"
              >
                <!--      :is 显示相应的组件名；通过循环来显示组件 -->
                <component :is="item.name" :data-name="item.name"></component>
              </div>
            </transition-group>
          </draggable>
        </div>
        <div class="right" style="width:50%;height:auto;background:#cecece">
          <draggable
            group="people"
            v-model="componentData2"
            :move="onMove"
            @start="isDragging=true"
            @end="isDragging=false"
          >
            <transition-group name="no" tag="div" class="list-group">
              <div
                class="component_wrap"
                v-for="(item,index) in componentData2"
                :key="index"
                @contextmenu="getComponent(index,item)"
              >
                <!--      :is 显示相应的组件名；通过循环来显示组件 -->
                <component :is="item.name" :data-name="item.name"></component>
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>
    </div>

    <div id="menu">
      <a href="javascript:;">删除</a>
    </div>
  </div>
</template>
<script>
import oneDiv from "../components/one";
import twoDiv from "../components/two";
import threeDiv from "../components/three";
import draggable from "vuedraggable";

export default {
  data() {
    return {
      layout: 0,
      componentData1: [],
      componentData2: [],
      componentData3: [],
      list: [
        {
          name: "oneDiv",
          order: 0,
          fixed: false
        }
      ]
    };
  },
  components: {
    oneDiv,
    twoDiv,
    threeDiv,
    draggable
  },
  mounted() {
    //拖动放置位置的虚线框位置计算
    document.ondrag = e => {
      let { left, top } = this.$refs.preview.getBoundingClientRect();
      //鼠标在预览视图中的相对坐标
      // console.log("鼠标在预览视图中的相对坐标");
      // console.log(e.clientX, e.clientY);
      let preview = this.$refs.preview;
      let x = e.clientX - left,
        y = e.clientY - top + preview.scrollTop;
      //   console.log(this.$refs.preview);
      /*   let {
        offsetLeft,
        offsetTop,
        offsetRight,
        offsetBottom
      } = e.target.position;

      let offset = 5;
      //不在当前元素位置内
      if (
        !(
          x > offsetLeft &&
          x < offsetRight &&
          y > offsetTop &&
          y < offsetBottom
        )
      ) {
        return;
      }
      //上方
      if (y > offsetTop && y < offsetTop + offset) {
        this.setPlaceholder("上方", component);
        return;
      }
      //右方
      if (x < offsetRight && x > offsetRight - offset) {
        this.setPlaceholder("右方", component);
        return;
      }
      //下方
      if (y < offsetBottom && y > offsetBottom - offset) {
        this.setPlaceholder("下方", component);
        return;
      }
      //左方
      if (x > offsetLeft && x < offsetLeft + offset) {
        this.setPlaceholder("左方", component);
        return;
      } */
    };

    /*由于启用drag后的元素无法获取到mouseup事件，
        所以监听body的拖拽事件，以便在鼠标松开后，
        删除虚线框占位元素
        */
    document.body.ondragover = e => {
      e.preventDefault();
    };

    document.body.ondrop = e => {
      //  this.removePlaceholder();
      e.preventDefault();
    };
  },
  methods: {
    layoutStart(num) {
      this.layout = num;
    },
    // 拖拽开始
    dragStart(name) {
      this.componentData1.push({
        name: name,
        order: this.componentData1.length,
        fixed: false
      });
      //  e.dataTransfer.setData("info", type);
    },
    //禁止元素拖动到目标元素后，继续拖动
    dragOver(e) {
      e.preventDefault();
    },
    // 被拖动元素最终停留的目标元素
    drop(e) {
      let tag = e.target;
      console.log(tag);
      console.log(e.dataTransfer.getData("info"));
      let name = e.dataTransfer.getData("info");
      this.componentData.push({
        name: name,
        order: Number(this.componentData.length) + 1,
        fixed: false
      });

      /*   var template = "<one />";
      var frag = document.createRange().createContextualFragment(template);

      //如果使用 appendChild
      tag.appendChild(frag); */

      //如果使用 insertBefore ,insertBefore 即使第二个参数为 null 也能插入进去，就像append了一个元素
      // list.insertBefore(frag, list.firstElementChild);
    },
    // 点击组件
    getComponent(index, item) {
      let e = e || window.event;
      e.preventDefault();
      console.log("点击事件");
      console.log(index, item);
      console.log(this.componentData[index]);
      //获取自定义右键菜单
      /*  let menu = document.getElementById("menu");

      //根据事件对象中鼠标点击的位置，进行定位
      menu.style.left = e.clientX + "px";
      menu.style.top = e.pageY + "px";

      //改变自定义菜单宽度。让其显示
      menu.style.display = "block"; */

      if (this.componentData[index].name == item.name) {
        this.componentData.splice(index, 1);
      }
    },
    onMove({ relatedContext, draggedContext }) {
      console.log("onMove");
      console.log(relatedContext);
      console.log(draggedContext);
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      console.log(this.componentData);
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    }
  },
  computed: {
    listString() {
      return JSON.stringify(this.componentData, null, 2);
    }
  }
};
</script>
<style lang="less" scoped>
.list-group {
  min-height: 100px;
}
.app {
  width: 100%;
  height: 100%;
  display: flex;
  background: #fff;
}
.navBar {
  width: 15%;
  height: 100%;
  background: #ede7f6;
  overflow: auto;
  .components-list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    li {
      width: 100%;
      height: 50px;
      margin-bottom: 10px;
      span {
        display: inline-block;
        width: 150px;
        height: 50px;
        color: #fff;
        background: chocolate;
        font-size: 20px;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        float: left;
      }
    }
  }
}
.content {
  width: 85%;
  height: 100%;

  .component_wrap {
    margin: 10px;
  }
  /*  .component_wrap:hover {
    padding: 10px;
    background: #cecece;
    border-radius: 5px;
    .operat {
      display: flex;
    }
  } */
  .operat {
    width: 100%;
    font-size: 16px;
    display: flex;
    justify-content: flex-end;
    display: none;
    transition: display 1s linear;
    span {
      cursor: pointer;
    }
  }
}
#menu {
  background-color: #fff;
  width: 100px;
  display: none;
  box-shadow: 0 1px 20px #eeeeee, 1px 0 20px #eeeeee;
  position: absolute;
  z-index: 99999;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
#menu a {
  display: block;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  text-decoration: none;
  font-size: 14px;
  color: #4c4c4c;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
#menu a:hover {
  background-color: #eeeeee;
}
</style>

