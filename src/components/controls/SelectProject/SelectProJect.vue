<template>
  <div>
    <SelectText 
      :options="ProjectSelected" 
      v-model="selectedObject" 
      :placeholder="placeholder"
      @change="handleChange" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { usePOStore } from '@/stores/po.store' // TODO: đổi lại store đang chứa getDataProjectSelect / getDataProjectSelect_SX
import { useProjectStore, type ProjectOption } from '@/stores/project.store' // Example import if needed

import SelectText from "./DynamicSelect.vue";


const poStore = usePOStore();
const projectStore = useProjectStore();

/* ===================== STATE ===================== */
const ProjectSelected = ref<ProjectOption[]>([]);
const selectedObject = ref<ProjectOption | null>(null);

const props = withDefaults(defineProps<{
  modelValue?: string | null;
  placeholder?: string;
  bom_sx?: boolean;
}>(),{
  modelValue:null,
  placeholder: "Chọn dự án...",
  bom_sx: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
  (e: 'change', value: ProjectOption | null): void
  (e: 'getValue', value: ProjectOption | null): void
  (e: 'clear'): void
}>()


/* ===================== METHODS ===================== */

   // ...mapActions(["getDataProjectSelect",'getDataProjectSelect_SX']),

  const getSelectedId = () => (selectedObject.value ? selectedObject.value.id : null)

  const handleClear = () => {
    selectedObject.value = null
    emit('update:modelValue', null)
    emit('change', null)
    emit('clear')
  }

  const handleChange = (value: Record<string, any> | null) => {
    selectedObject.value = value && typeof value === 'object' ? (value as ProjectOption) : null
  }

  const mapProjects = (list: any[]): ProjectOption[] =>
  list.map((element) => ({
    id: element.code_project,
    name: element.PROJ_NAME, // khớp với optionText mặc định của DynamicSelect
    value: element.code_project,
  }))
  
  const Pro_GetProjects = async () => {
  try {
    const res = props.bom_sx
      ? await projectStore.getDataProjectSelect_SX()
      : await projectStore.getDataProjectSelect()
 
    ProjectSelected.value = mapProjects(res.ProjectSelected)
 
    // Chọn sẵn nếu đã có giá trị truyền vào
    if (props.modelValue) {
      const project = ProjectSelected.value.find((p) => p.id === props.modelValue)
      selectedObject.value = project || null
    }
  } catch (error) {
    console.error('Error loading projects:', error)
  }
}


/* ===================== WATCH ===================== */
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== getSelectedId()) {
      const project = ProjectSelected.value.find((p) => p.id === newVal)
      selectedObject.value = project || null
    }
  },
  { immediate: true }
)
 
watch(selectedObject, (newVal, oldVal) => {
  if (oldVal && !newVal) {
    handleClear()
  } else if (newVal !== oldVal) {
    emit('update:modelValue', newVal ? newVal.id : null)
    emit('change', newVal)
    emit('getValue', newVal)
  }
})

/* ===================== LIFECYCLE ===================== */
onMounted(() => {
  Pro_GetProjects()
})

</script>

<style >
</style>