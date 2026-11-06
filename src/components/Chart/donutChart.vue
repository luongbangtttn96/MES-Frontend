<template>
    <div class="row" style="width:95%; height: 95%;">
       <div class="status-legend col-4" >
            <div class="legend-item" v-for="(item, index) in colors" :key="index">
              <span class="legend-color" :style="{'background-color':item}"></span>
              <span>{{ labels[index] + ' ' + data[index] }}</span>
            </div>
        </div>
        <div class="col-8 mb-2 canvas-container" >
           <canvas ref="donutChart"></canvas> 
        </div>        
    </div>
  
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'DonutChart',
  data() {
    return {
      chartInstance: null
    }
  },
  props: {
    title:{
      type: Object,
      default: ()=> { 
        return{
          display: false,
          text: "CharPie"
        }
        
      }
    },
    chartId: {
      type: String,
      default: 'donutChart'
    },
    labels: {
      type: Array,
      default: () => ['A', 'B', 'C', 'D', 'E']
    },
    data: {
      type: Array,
      default: () => [2665.025, 287.6, 517.055, 149.675, 53.106]
    },
    colors: {
      type: Array,
      default: () => ['#00BFFF', '#32CD32', '#FFD700', '#FF6347', '#9370DB']
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () =>  { return{
          tooltip:{
            titleFont: {size:15},
            bodyFont:{ size: 20},
            callbacks:{
              label: (context)=> `Total: ${context.formattedValue}`
            }
          },
          datalabels:{
            font:{ size:15},
            formattex: (value, context)=>{
              return value
            },
            display: (context)=>{
              return true
            }
          }
        }
       
      }
    }
},
  mounted() {
    this.renderChart()
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy()
    }
  },
  watch: {
    data() {
      this.renderChart()
    },
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.donutChart.getContext('2d')
      this.chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.labels,
          datasets: [{
            data: this.data,
            backgroundColor: this.colors,
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
           legend: {
                display: false
            },
          cutoutPercentage: 70 // dùng cho Chart.js v2
        }
      })
    }
  }
}
</script>

<style scoped>
.chart-container {
  width: 150px;
  height: 150px;
}
canvas {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.canvas-container {
  display: flex;
  justify-content: flex-end; /* 👈 Đẩy canvas sang phải */
  align-items: center;
  height: 100%;
}

.legend-item {
  display: flex;
  justify-content: flex-start; /* 👈 Căn lề phải */
  align-items: center;         /* 👈 Căn giữa theo chiều dọc */
  white-space: nowrap;         /* 👈 Ngăn xuống dòng */
  font-size: 0.8rem;
  gap: 10px;
  color: #fff;
}

.legend-color {
  flex-shrink: 0;           /* 👈 Không cho phép co lại */
  width: 10px;
  height: 10px;
  border-radius: 3px;
}

</style>
