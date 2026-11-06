<template>
    <div style="width:100%; height: 100%; display: flex; justify-content: center; align-items: center; position: relative;">
        <div class="canvas-container">
           <canvas ref="donutChart"></canvas>
        </div>
        <div class="center-text">
          <slot name="centerText"></slot>
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

      // Để vẽ THUẬN CHIỀU KIM ĐỒNG HỒ (clockwise):
      // Chart.js mặc định vẽ NGƯỢC chiều kim đồng hồ (counter-clockwise)
      // => Phải KHÔNG reverse data và đổi rotation thành 0 (bắt đầu từ 3 giờ)
      // HOẶC giữ rotation -90° và reverse data
      //
      // Cách đúng: rotation = -90° (12 giờ), data theo thứ tự THUẬN
      // Chart.js sẽ vẽ ngược chiều từ 12 giờ => ta thấy thuận chiều

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
          cutoutPercentage: 70, // dùng cho Chart.js v2
          rotation: 1.5 * Math.PI, // Bắt đầu từ 12 giờ và vẽ thuận chiều kim đồng hồ
          circumference: 2 * Math.PI // Vẽ đầy đủ vòng tròn
        }
      })
    }
  }
}
</script>

<style scoped>
.canvas-container {
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  width: 100% !important;
  height: 100% !important;
  max-width: 180px;
  max-height: 180px;
}

.center-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
  font-weight: bold;
  color: #FFA500;
  pointer-events: none;
}

.legend-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  white-space: nowrap;
  font-size: 0.8rem;
  gap: 10px;
  color: #fff;
}

.legend-color {
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  border-radius: 3px;
}

</style>
