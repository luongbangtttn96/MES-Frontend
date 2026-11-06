<script>
import { Bar, mixins } from "vue-chartjs";
// import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
const { reactiveProp, reactiveData } = mixins;
export default {
  extends:  Bar,
  mixins: [reactiveProp],
  data(){
    return{     
            
    }
  },
    props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
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
      default: () => {}
    }
  },
watch:{
        chartData(){
            this.renderChart(
                this.chartData, this.options
                )
        }
},
  created(){
    this.options={
              responsive: true, 
              maintainAspectRatio: false,
              tooltips:{
                  enabled : true
              },
              plugins:{
                legend:{
                      display: false,                         
                    },
                  },
              scales: {
                  xAxes: [{
                  stacked: true,
                  categoryPercentage: 0.5,
                  barPercentage: 1
                  }],
                  yAxes: [{
                  // beginAtZero:true,
                  stacked: true
                  }]
              }
            }
    
  },
  mounted() {
    
    console.log(this.options);
    this.renderChart( 
                this.chartData , this.options
            )
    // this.renderChart(
    //     this.data,
    //     this.options
    // );
  }
};
</script>