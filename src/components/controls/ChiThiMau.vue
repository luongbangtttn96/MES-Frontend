<template>
  <div style="width: 100%">
    <el-row>
      <div
        v-for="(item, index) in props.list_ChiThiMau"
        :key="index"
        class="row ml-2 mr-2 itemChiThi"
        style="height: 20px; cursor: pointer"
        @click="ActionChithiMau(item.color)"
      >
        <div class="boxNote" :style="'background:' + item.color"></div>
        <div>
          <b>:{{ item.text }} </b
          ><b v-if="index < list_ChiThiMau.length - 1">|</b>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  list_ChiThiMau: { text: string; color: string }[]
}>()

const emit = defineEmits<{
  (e: 'ActionChithiMau', color: string): void
}>()

const ActionChithiMau = (p_color: string) => {
  emit('ActionChithiMau', p_color)
}
</script>

<style scoped>
.itemChiThi {
  display: flex;
  align-items: center;
  gap: 2px;
}
.boxNote {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  /* position: relative; */
  /* top: 8px;
  left: 5px; */
}

.text-glow {
  color: #ffffff;
  text-shadow:
    0 0 5px rgba(255, 255, 255, 0.8),
    0 0 10px rgba(255, 255, 255, 0.6),
    0 0 15px rgba(255, 255, 255, 0.4),
    0 0 20px rgba(0, 191, 255, 0.3);
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% {
    text-shadow:
      0 0 5px rgba(255, 255, 255, 0.8),
      0 0 10px rgba(255, 255, 255, 0.6),
      0 0 15px rgba(255, 255, 255, 0.4),
      0 0 20px rgba(0, 191, 255, 0.3);
  }
  50% {
    text-shadow:
      0 0 10px rgba(255, 255, 255, 1),
      0 0 20px rgba(255, 255, 255, 0.8),
      0 0 30px rgba(255, 255, 255, 0.6),
      0 0 40px rgba(0, 191, 255, 0.5);
  }
}
</style>
