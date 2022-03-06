<template>
  <!-- headerのコピーのまま -->
  <div class="headWrapper">
    <img class="headImage" src="../../public/img/icon_psyduck.png" alt="" />
    <div class="category">
      <router-link to="/calculator">
        <span class="cate"
          ><img
            class="categoryIcon1"
            src="../../public/img/鉛筆アイコン8.png"
          />
          帳簿する</span
        ></router-link
      >
      <router-link to="/calender">
        <span class="cate"
          ><img
            class="categoryIcon2"
            src="../../public/img/カレンダーアイコン.png"
          />
          カレンダー</span
        ></router-link
      >
      <span class="cate"
        ><img class="categoryIcon3" src="../../public/img/分析アイコン.png" />
        レポート</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Footer extends Vue {}
</script>

<style scoped></style>
