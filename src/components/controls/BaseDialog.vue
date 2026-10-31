<template>
  <transition name="dialog">
    <div v-if="props.active" class="dialog-backdrop">
      <div class="dialog-container" @click.stop :style="`width: ${props.width};`">
        <div class="tile bg_m2">
          <el-row justify="space-between" align="middle">
            <strong>{{ Tile }}</strong>
            <el-button type="info" link :icon="CloseBold" @click="handleBackdropClick" />
          </el-row>
        </div>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'


defineOptions({
  name: 'BaseDialog',
})

const props = withDefaults(
  defineProps<{
    active?: boolean
    tile?: string
    width?: string
  }>(),
  {
    active: false,
    tile: 'TILE',
    width: '768px',
  },
)

const emit = defineEmits<{
  (e: 'update:active', value: boolean): void
}>()

const Tile = computed(() => props.tile.toUpperCase())

function handleBackdropClick() {
  emit('update:active', false)
}
</script>

<script lang="ts">
export default {
  name: 'BaseDialog',
}
</script>

<style scoped>
.dialog-backdrop {
  position: fixed;
  /* absolute; */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.dialog-container {
  /* max-width: 768px; */
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 15px 10px 15px;
  background-color: #fff;
  z-index: 1001;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.2s;
}
.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-active .dialog-container,
.dialog-leave-active .dialog-container {
  transition: transform 0.4s;
}
.dialog-enter .dialog-container,
.dialog-leave-to .dialog-container {
  transform: scale(0.9);
}
.tile{
  /* background-color:rgba(229, 226, 226, 0.938); */
  height:30px;
  margin: 0 -15px 4px -15px;
  padding: 3px 8px 0 10px;
}
</style>