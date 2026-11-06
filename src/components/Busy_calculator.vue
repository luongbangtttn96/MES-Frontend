<template>
    <transition name="dialog">
      <div v-if="active" class="dialog-backdrop" >
          <div class="text">
            <strong> {{ textShow }} </strong>
          </div>
      </div>
    </transition>
  </template>
  
  <script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const textShow = ref('');
const IntervarBusy = ref(0);
const i = ref(0);

const props = defineProps({
      active: { type: Boolean, default: false },
      message:{ type: String, default: 'đang thực hiện'} 
    })

const Pro_Typing = (text: string) => {
      if(i.value==text.length){ i.value = 0}
      i.value++
      textShow.value=text.substring(0,i.value)         
  }

onMounted(() => {
    IntervarBusy.value = setInterval(
        Pro_Typing,
        100,
        props.message
      );
  },)
onUnmounted(() => {
      clearInterval(IntervarBusy.value);
  });

  </script>
  
  <style scoped>
  .dialog-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;

    height: 100%; margin: 0; 
    display: grid; 
    place-items: center;
  }


.tile{
    /* background-color:rgba(229, 226, 226, 0.938); */
    height: auto;
    width: auto;
    margin: 0 -15px 4px -15px;
    padding: 3px 8px 0 10px;
  }

.text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: .15em solid orange;
  animation: blink-caret .75s step-end infinite;
}
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange }
}

  
  </style>