<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp, reactiveData } = mixins;
export default {
  extends:  Bar,
  mixins: [reactiveProp],
  data(){
    return{     
            Options:{
                responsive: true, 
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                      stacked: true,
                      categoryPercentage: 0.5,
                      barPercentage: 1
                    }],
                      yAxes: [{
                      stacked: true
                    }]
                }
            },
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
            console.log(this.chartData);
            this.renderChart(
                this.chartData
            , {
            responsive: true, 
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                categoryPercentage: 0.5,
                barPercentage: 1
                }],
                yAxes: [{
                }]
            }
            })
        }
},
  
  mounted() {
    this.renderChart( 
                this.chartData,
                {
                responsive: true, 
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                    categoryPercentage: 0.5,
                    barPercentage: 1
                    }],
                    yAxes: [{

                    }]
                },
                //plugins: [ChartLabels]
            }, 
            )
    // this.renderChart(
    //     this.data,
    //     this.options
    // );
  }
};
</script>