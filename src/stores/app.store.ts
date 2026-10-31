import { defineStore } from 'pinia'
import { ref} from 'vue'
import { ElMessage } from 'element-plus'

export const useAppStore = defineStore('app', ()=> {
	
	const isLoading = ref(false)
	const isAlam = ref(false)
	const messager = ref('')
	const error = ref('')
	

	function setLoading(loading = false) {
		isLoading.value = loading
	}

	function setMessager(msg = '') {
		ElMessage.success(msg)
	}

	function setMsgErro(msg = '') {
		ElMessage.error(msg)
	}

	function setWarning(msg=''){
		ElMessage.warning(msg)
	}

	function setLoadingAlam(is_Alam = false) {
		isAlam.value = is_Alam
	}

	return {
		isLoading,
		isAlam,
		messager,
		error,

		setLoading,
		setMessager,
		setMsgErro,
		setWarning,
		setLoadingAlam,
	}
})


export type AppStore = ReturnType<typeof useAppStore>
