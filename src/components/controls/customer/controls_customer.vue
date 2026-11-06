<template>
  <div>
    <SelectText :options="ProjectSelected" v-model="selectedObject" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import SelectText from "../DynamicSelect.vue";

import { useCustomerStore } from "@/stores/customer.store.ts";
const customerStore = useCustomerStore();

const ProjectSelected = ref<{ id: string; name: string }[]>([]);
const selectedObject = ref(null);

const props = withDefaults(
  defineProps<{
    modelValue?: any | null
  }>(),{
    modelValue: null
  })

const emit = defineEmits(["update:modelValue", "getValue"]);

watch(
  () => props.modelValue,
  (newValue) => {
    selectedObject.value = newValue;
  }
);

watch(
  selectedObject,
  (newValue) => {
    emit("update:modelValue", newValue);
    emit("getValue", newValue);
  }
);

const SelectProject = (valueSelect: any) => {
  emit("getValue", valueSelect);
};

onMounted( async () => {
  const res = await customerStore.getdataCustomers(null);
  let data: { id: string; name: string }[] = [];
  res.dataCustomers.forEach((element: any) => {
    let proj: { id: string; name: string } = {
      id: element.CUS_NUMBER,
      name: element.CUS_NAME,
    };
    data.push(proj);
  });
  ProjectSelected.value = data;
});
</script>

<style >
</style>