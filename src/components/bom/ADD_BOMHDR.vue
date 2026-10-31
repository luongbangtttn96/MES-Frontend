<template>
  <div class="add-bom-hdr-placeholder">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    PROJ_ID?: number | string
    PROJ_CODE?: string
    BomHDR?: unknown[]
  }>(),
  {
    PROJ_ID: '',
    PROJ_CODE: '',
    BomHDR: () => [],
  },
)
</script>

<script lang="ts">
export default {
  name: 'ADD_BOMHDR',
}
</script>

<style scoped>
.add-bom-hdr-placeholder {
  width: 100%;
}
</style>
