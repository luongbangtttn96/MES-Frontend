<template>
  <div class="select-container" :style="containerStyle">
    <div class="input-wrapper">
      <input 
        type="text"
        class="form-control search-input"
        :placeholder="placeholder" 
        v-model="textInput"
        @input="handleInput"
        @click="toggleSelect"
        @blur="handleBlur"
        :style="inputStyle"
      >
      <span class="search-icon">
        <i class="fas fa-search"></i>
      </span>
    </div>

    <transition name="fade">
      <div v-show="show_select" class="select-dropdown">
        <div class="select-list">
          <div 
            v-for="item in filteredData" 
            :key="item.ID"
            class="select-item"
            :class="{ 'selected': isSelected(item) }"
            @click="selectItem(item)"
          >
            <span class="item-id">{{item.ID}}</span>
            <span class="item-text">{{item.text}}</span>
          </div>
          <div v-if="!filteredData.length" class="no-results">
            Không tìm thấy kết quả
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SelectText',
  
  props: {
    placeholder: {
      type: String,
      default: 'Tìm kiếm...'
    },
    dataSelect: {
      type: Array,
      default: () => []
    },
    width: {
      type: [String, Number],
      default: '200px'
    },
    height: {
      type: [String, Number],
      default: '32px'
    },
    maxWidth: {
      type: [String, Number],
      default: '100%'
    },
    value: {
      type: Object,
      default: null
    } 
  },

  data() {
    return {
      show_select: false,
      Selected: null,
      textInput: '',
      data: []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        if(newVal === null) {
          this.Selected = null;
          this.textInput = '';
          return;
        }
        this.Selected = newVal;
        this.textInput = newVal ? newVal.text : '';
      }
    },
    dataSelect: {
      immediate: true,
      handler(newVal) {
        this.data = newVal;
      }
    }
  },
  computed: {
    filteredData() {
      return this.dataSelect.filter(item => 
        item.text.toLowerCase().includes(this.textInput.toLowerCase())
      )
    },
    containerStyle() {
      return {
        width: typeof this.width === 'number' ? `${this.width}px` : this.width,
        maxWidth: typeof this.maxWidth === 'number' ? `${this.maxWidth}px` : this.maxWidth
      }
    },
    inputStyle() {
      return {
        height: typeof this.height === 'number' ? `${this.height}px` : this.height,
      }
    }
  },

  methods: {
    handleInput() {
      this.show_select = true
      this.data = this.filteredData
    },

    toggleSelect() {
      this.show_select = !this.show_select
    },

    handleBlur() {
      setTimeout(() => {
        this.show_select = false
      }, 200)
    },

    selectItem(item) {
      this.Selected = item
      this.textInput = item.text
      this.show_select = false
      this.$emit('input', item);// For v-model
      this.$emit('getValue', item)
    },
    clearSelection() {
      this.Selected = null;
      this.textInput = '';
      this.$emit('input', null);
      this.$emit('getValue', null);
    },
    isSelected(item) {
      return this.Selected && this.Selected.ID === item.ID
    }
  }
}
</script>

<style scoped>
.select-container {
  position: relative;
  min-width: 100px;
}

.input-wrapper {
  position: relative;
}

.search-input {
  padding: 4px 28px 4px 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 100%;
  transition: all 0.3s;
  font-size: 14px;
}

.search-input:focus {
  border-color: #2196F3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
  outline: none;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 1000;
  max-height: 250px;
  overflow-y: auto;
  width: 100%; /* Ensure dropdown width matches input */
}

.select-list {
  padding: 4px 0;
}

.select-item {
  padding: 4px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.2s;
}

.select-item:hover {
  background: #f5f5f5;
}

.select-item.selected {
  background: #e3f2fd;
}

.item-id {
  color: #666;
  margin-right: 8px;
  font-size: 0.9em;
}

.item-text {
  flex: 1;
}

.no-results {
  padding: 12px;
  text-align: center;
  color: #666;
}

/* Animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>