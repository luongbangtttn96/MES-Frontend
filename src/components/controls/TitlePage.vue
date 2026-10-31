<template>
  <header class="title-page bg_m2">
    <span class="title-page__text">{{ titlepage }}</span>
    <el-divider class="title-page__divider" />
  </header>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    titlepage?: string
  }>(),
  {
    titlepage: 'Tiêu đề',
  },
)
</script>

<style scoped>
.title-page {
  margin-bottom: 12px;
}

.title-page__text {
  color: #26382e;
  font-size: 20px;
  font-weight: 650;
}

.title-page__divider {
  margin: 10px 0 0;
}
</style>