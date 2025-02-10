<template>
        <el-header>
          <h1>header</h1>
          <button @click="toggelMenu">toggle menu</button>
        </el-header>
      </template>
      
      <script setup>

      import {useStore} from 'vuex';
      import { computed } from 'vue';
    
      const store = useStore()
      const isCollapse = computed(
        ()=> store.state.isCollapsed);
      

      const toggelMenu = ()=>{
        store.commit("changeIsCollapsed", !isCollapse.value)
      }
       

      </script>