<script setup lang="ts">
import { computed } from 'vue'
import { icons } from '@/helpers/icons'

const props = withDefaults(
  defineProps<{
    name?: string
    size?: number | string
    alt?: string
  }>(),
  {
    name: 'element',
    size: 24,
    alt: '',
  }
)

const src = computed(() => icons[props.name])

const sizePx = computed(() =>
  typeof props.size === 'number' ? `${props.size}px` : props.size
)
</script>

<template>
  <span class="icon-wrapper">
    <img
      v-if="src"
      :src="src"
      :alt="alt || name"
      class="icon-img"
      :style="{ width: sizePx, height: sizePx }"
    />
  </span>
</template>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-img {
  object-fit: contain;
  filter: grayscale(1);
}
</style>