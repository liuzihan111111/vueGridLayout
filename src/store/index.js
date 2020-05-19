import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        layout: "", // 布局组件
        componentList1: [],// 第一列组件
        componentList2: [],
        componentList3: [],
    },
    mutations: {
        addComponent1(state, componentList1) {
            state.componentList1.push(componentList1)
        },
    }

})

export default store
