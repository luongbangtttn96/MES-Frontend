<template>
  <div @click="handHidePopup()" >
    <title-page :titlepage="'Raw material price management'" />
    <b-tabs>
      <b-tab title="Current Prices">
        <div class="container-fluid ml-3 row justify-content-between">
            <div class="input-group col-md-4 ">
                <div class="input-group-prepend" style="height: 38px;">
                    <span class="input-group-text" id="inputGroup-sizing-default">
                    <b-icon icon="search"></b-icon
                    ></span>
                </div>
                <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="search" />
                <pagination v-model="v_Pagination" :totalPages="totalPages" />
            </div>
            <div>Tỷ giá: <b>{{ tygia }}/USD</b></div>
            <div class=" mr-3">
                <button  class="btn btn-info" @click="handSave_New_Prices()">Save Price</button>
                <button class="btn btn-info" @click="handImport_Prices()">Import</button>
                <input class="input-file" type="file" @change="exportDataNewPrice" id="input-file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
                <button  class="btn btn-info" @click="handGetBomGiaDTL_Projec()">BOM Cost</button>
                <button class="btn btn-info" @click="handExport_price()">Export</button>
            </div>
        </div>
        
        <div>
            <div class="tableFixHead" style="height: 92vh;">
                <table class="table" id="tab_export_Prices">
                    <thead>
                        <th>STT</th>
                        <th>Mã NL</th>
                        <th>UNIT</th>
                        <th>Đơn Giá</th>
                        <th>Tiền tệ</th>
                        <th>Giá USD</th>
                        <th>Mã NCC</th>
                        <th>nhà CC</th>  
                        <th>MOQ</th>   
                        <th>SPQ</th> 
                        <th>LEADTIME</th>       
                        <th>P/N OF</th>  
                        <th>Ngày Lập</th>

                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in data_New_Prices_excel" :key="item.PART_NUM" class="mauNenVang">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.PART_NUM }}</td>
                            <td>{{ item.UNIT }}</td>
                            <td>{{ item.UNIT_PRICE }}</td>
                            <td>{{ item.CUR_CODE }}</td>
                            <td>{{ item.USD_PRICE }}</td>
                            <td>{{ item.SUP_CODE }}</td>
                            <td>{{ item.SHORT_NAME }}</td> 
                            <td>{{ item.MOQ }}</td>
                            <td>{{ item.SPQ }}</td>
                            <td>{{ item.LEADTIME }}</td>     
                            <td>{{ item.DEFINE_BY }}</td>
                            <td>{{ item.CREATED_AT }}</td>
                        </tr>
                        <tr v-for="(item, index) in data_Prices_page" :key="index">
                            <td>{{ index+1 + (v_Pagination.page-1)*v_Pagination.size }}</td>
                            <td class="contro_hand" @click="handChartPrice_PART($event, item.PART_NUM)">{{ item.PART_NUM }}</td>
                            <td>{{ item.UNIT }}</td>
                            <td>{{ item.UNIT_PRICE }}</td>
                            <td>{{ item.CUR_CODE }}</td>
                            <td>{{ item.USD_PRICE }}</td>
                            <td>{{ item.SUP_CODE }}</td>                            
                            <td>{{ item.SHORT_NAME }}</td>                             
                            <td>{{ item.MOQ }}</td>
                            <td>{{ item.SPQ }}</td>
                            <td>{{ item.LEADTIME }}</td>                
                            <td>{{ item.DEFINE_BY }}</td>
                            <td>{{ item.CREATED_AT }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="Popup" id="Popup_ChartPrice" @click="handNoEvent($event)">
          <b-tabs>
            <b-tab>
                <ChartPrice :chartData="chartData"/>
            </b-tab>
            <b-tab style="background-color: cadetblue;">
              <table class="table">
                <thead>
                  <th>Date</th>
                  <th>Price</th>
                  <th>CURRENCY</th>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in dataPrices_history_PN" :key="index">
                    <td>{{ item.DATE_PRICE }}</td>
                    <td>{{ item.UNIT_PRICE }}</td>
                    <td>{{ item.CUR_CODE }}</td>
                  </tr>
                </tbody>
              </table>
            </b-tab>
          </b-tabs>
          
        </div>
      </b-tab>
      <b-tab title="Plan price">
        <div class="ml-3 row">
          <b>Năm:</b>
          <select v-model="Year" @change="hand_get_Plan_Prices_Year()" >
            <option v-for="(item) in Years" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <div>
            <title-block :titlepage="'Bảng giá'" />
            <div>
              <div class="container-fluid ml-3 row justify-content-between">
                <div class="input-group col-md-4 ">
                    <div class="input-group-prepend" style="height: 38px;">
                        <span class="input-group-text" id="inputGroup-sizing-default">
                        <b-icon icon="search"></b-icon
                        ></span>
                    </div>
                    <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" v-model="search_Material_Plan" />
                    <pagination v-model="v_Pagination_Plan_Prices" :totalPages="totalPages_Plan_Prece" />
                </div>
                
                <div class=" mr-3">
                    <button  class="btn btn-info" @click="handSave_Plan_Prices()">Save Price</button>
                    <button class="btn btn-info" @click="handImport_Plan_Prices()">Import</button>
                    <input class="input-file" type="file" @change="exportDataPlanPrice" id="input-file-Plan-materia"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                    <button class="btn btn-info" @click="handExport_price()">Export</button>
                </div>
              </div>
            <div class="tableFixHead" style="height: 92vh;">
                <table class="table" id="tab_export_Prices">
                    <thead>
                        <th>STT</th>
                        <th>Mã NL</th>
                        <th>Đơn Giá</th>
                        <th>Tiền tệ</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in data_Plan_Prices_excel" :key="item.PART_NUM" class="mauNenVang">
                            <td>{{ index+1 }}</td>
                            <td>{{ item.PART_NUM }}</td>
                            <td>{{ item.UNIT_PRICE }}</td>
                            <td>{{ item.CUR_CODE }}</td>   
                        </tr>
                        <tr v-for="(item, index) in data_Plan_Prices_page" :key="index">
                            <td>{{ index+1 + (v_Pagination_Plan_Prices.page-1)*v_Pagination_Plan_Prices.size }}</td>
                            <td class="contro_hand">{{ item.PART_NUM }}</td>
                            <td>{{ item.UNIT_PRICE }}</td>
                            <td>{{ item.CUR_CODE }}</td>                    
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>

      </b-tab>
    </b-tabs>
    
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { exportData, exportDataExcel_to_Arr, exportArrObject } from '../../../plugins/Excel';
import XLSX from "xlsx";
import TitlePage from '../../controls/TitlePage.vue';
import ChartPrice from './ChartPrice.vue';
import Pagination from '../../controls/Pagination/Pagination.vue';
import TitleBlock from '../../controls/TitleBlock.vue';

export default {
  components: { TitlePage,
    ChartPrice,
    Pagination,
    TitleBlock,
   },
data(){
    return {
        data_New_Prices:[],
        data_New_Prices_excel:[],
        PART_NUM:'',
        search:'',
        ShowChart:false,
        chartData: {},
        dataPrices_history_PN:[],
        v_Pagination:{
          page:1,
          size:50
        },
        tygia:25000,

        data_Plan_Prices_Year:[],
        data_Plan_Prices_excel:[],
        Years:[],
        Year: new Date().getFullYear() ,
        search_Material_Plan:'',

        v_Pagination_Plan_Prices:{
          page:1,
          size:50
        },
    }

},
computed:{
    data_Plan_Prices_page(){
      return this.show_data_Plan_Prices.slice((this.v_Pagination_Plan_Prices.page-1)*this.v_Pagination_Plan_Prices.size, this.v_Pagination_Plan_Prices.page*this.v_Pagination_Plan_Prices.size)
    },
    show_data_Plan_Prices(){
        if (this.data_Plan_Prices_Year){
           let data =  this.data_Plan_Prices_Year.filter((item)=>{ 
                return item.PART_NUM.toUpperCase().includes(this.search_Material_Plan.toUpperCase())
            })
           
            return data
        } 
        return []
    },
    totalPages_Plan_Prece(){
      return Math.ceil(this.show_data_Plan_Prices.length/this.v_Pagination.size)
    },

    data_Prices_page(){
      return this.show_data_New_Prices.slice((this.v_Pagination.page-1)*this.v_Pagination.size, this.v_Pagination.page*this.v_Pagination.size)
    },
    show_data_New_Prices(){
        if (this.data_New_Prices){
           let data =  this.data_New_Prices.filter((item)=>{ 
                return item.PART_NUM.toUpperCase().includes(this.search.toUpperCase()) ||
                        item.DEFINE_BY.toUpperCase().includes(this.search.toUpperCase())
            })
           
            return data
        } 
        return []
    },
    totalPages(){
      return Math.ceil(this.show_data_New_Prices.length/this.v_Pagination.size)
    }
},
methods:{
    ...mapActions([
        'getNew_Prices',
        'Save_New_Prices',
        'get_Sup_code_fr_ShortName',
        'getPrices_history_PN',
        'get_tyGiaUSD',
        'get_Plan_Prices_Year',
        'Save_Plan_Prices_Year'
    ]),
    hand_get_Plan_Prices_Year(){

      this.Po_get_Plan_Prices_Year()
    },
    async Po_get_Plan_Prices_Year(){
    
      this.get_Plan_Prices_Year({Year:this.Year}).then(res=>{
        this.data_Plan_Prices_Year=res.data_Plan_Prices_Year
      })
    },
    async handChartPrice_PART(event,PART_NUM){
      event.stopPropagation();
        // lấy dữ liệu lịch sử giá
        this.PART_NUM=PART_NUM
        await this.getPrices_history_PN({PART_NUM:this.PART_NUM}).then(res=>{
           this.dataPrices_history_PN= res.dataPrices_history_PN
        })
        this.chartData=this.Proc_getchartData(this.dataPrices_history_PN)

        let Popup_ChartPrice = document.getElementById("Popup_ChartPrice");
        Popup_ChartPrice.style.top = event.layerY + "px";
        Popup_ChartPrice.style.left = event.layerX + "px";
        document.querySelector(".Popup").classList.toggle("hienPopup");
        //console.log(this.curenItem);
    },

    handHidePopup() {
      document.querySelector(".Popup").classList.remove("hienPopup");
    },
    handNoEvent(event){
      event.stopPropagation();
    },
    Proc_getchartData(data) {
      let mau =['#f40606','#f87979','#3D5B96','#1EFFFF','#d9ec07','#ec07e0', '#e85708','#2de005','#140257']
      let labels = [], setLabas= new Set();
      let row_code = [];
      let dt = [];

      let datasets = [];
      data.forEach((element, i) => {
        labels.push(element.DATE_PRICE)
        dt.push(element.UNIT_PRICE)
      });
      datasets.push({
        label:this.PART_NUM,
        data:dt,
        fill: false,
        backgroundColor:mau[2]
      })
     
      // datasets= [{
      //   label:this.PART_NUM,
      //   data: [65, 59, 80, 81, 56, 55, 40],
      //   fill: false,
      //   borderColor: 'rgb(75, 192, 192)',
      //   //tension: 0.1
      // }]
      //console.log({labels:this.tileClos,datasets: datasets});
      return { labels: labels, datasets: datasets };
    },

    handGetBomGiaDTL_Projec() {
        let src = "";
        src =
          "/pmc/BomGia_DTL_Project?"
        window.open(
          src,
          "BomGia_DTL_Project",
          "fullscreen=yes, scrollbars=auto, titlebar=no"
        );
    },
    async Po_getNew_Prices(){
        await this.getNew_Prices().then(res=>{
            this.data_New_Prices=res.data_New_Prices
            this.data_New_Prices.forEach(element => {
              if(element.CUR_CODE!='VND'){ element.USD_PRICE=element.UNIT_PRICE}
              else { element.USD_PRICE= (element.UNIT_PRICE/this.tygia).toFixed(6) }
            });
        })
    },
    async handSave_Plan_Prices(){
      let i=0, nrow=500, nr=0
        let Dat_row=[]
        if (!this.Year) { 
          confirm('Chưa chọn năm kế hoạch');
          return ''
        }
        while (i< this.data_Plan_Prices_excel.length)
        {
          this.data_Plan_Prices_excel[i].YEAR=this.Year
          if(this.data_Plan_Prices_excel[i].UNIT_PRICE>0)
          {
            // kiêm tra giá có bằng giá cũ không
            if (this.data_Plan_Prices_Year.findIndex(item=>{ 
              item.PART_NUM===this.data_Plan_Prices_excel[i].PART_NUM
              item.UNIT_PRICE===this.data_Plan_Prices_excel[i].UNIT_PRICE
            })===-1){ 
              Dat_row.push(this.data_Plan_Prices_excel[i])  
              nr++
            }
              
          }
          if (nr % nrow==0)
          {
                let data={
              data_New_Prices:Dat_row
              }
              await this.Save_Plan_Prices_Year(data)
              Dat_row=[]
          }
            
          i++
        }

        let data={
        data_New_Prices:Dat_row
        }
        await this.Save_Plan_Prices_Year(data)
        this.Po_getNew_Prices()
        this.data_Plan_Prices_excel=[]
       
    },

    async handSave_New_Prices(){
        let i=0, nrow=500, nr=0
        let Dat_row=[]
        while (i< this.data_New_Prices_excel.length)
        {
            if(this.data_New_Prices_excel[i].UNIT_PRICE>=0)
            {
              // kiêm tra giá có bằng giá cũ không
                           
              if (this.data_New_Prices.findIndex(item=>{ 
                item.PART_NUM===this.data_New_Prices_excel[i].PART_NUM
                item.UNIT_PRICE===this.data_New_Prices_excel[i].UNIT_PRICE
              })===-1){ 
                Dat_row.push(this.data_New_Prices_excel[i])  
                nr++
              }
               
            }
            if (nr % nrow==0)
            {
                 let data={
                data_New_Prices:Dat_row
                }
                await this.Save_New_Prices(data)
                Dat_row=[]
            }
              
            i++
        }

        let data={
        data_New_Prices:Dat_row
        }
        await this.Save_New_Prices(data)
        this.Po_getNew_Prices()
        this.data_New_Prices_excel=[]
       
    },
    handExport_price(){
        //exportData('Xlsx','tab_export_Prices')
        exportArrObject('Xlsx',this.data_New_Prices)
    },
    handImport_Plan_Prices(){
      document.getElementById("input-file-Plan-materia").click();
    },
    handImport_Prices(){
      document.getElementById("input-file").click();
    },
    async exportDataPlanPrice(event){      
      let xlsxfile = event.target.files ? event.target.files[0] : null;
      this.data_Plan_Prices_excel= await exportDataExcel_to_Arr(xlsxfile)    
       console.log('Import plan',this.data_Plan_Prices_excel);
      
    },

    async exportDataNewPrice(event) {
        let xlsxfile = event.target.files ? event.target.files[0] : null;
        this.data_New_Prices_excel= await exportDataExcel_to_Arr(xlsxfile)
        
        console.log('Import new Prices',this.data_New_Prices_excel);

        let SHORT_NAMES= new Set()
             
        let Prices_Name=this.data_New_Prices_excel.filter(item=>{ return item.SHORT_NAME})
        
        Prices_Name.forEach(element => {
            SHORT_NAMES.add(element.SHORT_NAME)

        });

        if(SHORT_NAMES.size>0){
              this.get_Sup_code_fr_ShortName({SHORT_NAMES:Array.from(SHORT_NAMES) }).then(res=>{
                
                res.data_SUP_codes.forEach(row => {
                    
                    this.data_New_Prices_excel.forEach(item => {
                        if(item.SHORT_NAME==row.SHORT_NAME) {                                
                            this.$set(item, 'SUP_CODE', row.SUP_CODE)
                            //console.log(item);
                        }
                    });
                }); 

            })
        }

        // let fileReader = new FileReader();
        // fileReader.readAsBinaryString(xlsxfile);
        // fileReader.onload = (e) =>  {
        //   let data = e.target.result;
        //   let workbook = XLSX.read(data, { type: "binary" });
        //   //console.log(workbook);
        //   let wb = workbook.SheetNames[0];

        //   this.data_New_Prices_excel = XLSX.utils.sheet_to_json( workbook.Sheets[wb] );
        //   // đồng bộ Mã nhà cung cấp dữ liệu giá excel
        //     let SHORT_NAMES= new Set()
             
        //     let Prices_Name=this.data_New_Prices_excel.filter(item=>{ return item.SHORT_NAME})
            
        //     Prices_Name.forEach(element => {
        //         SHORT_NAMES.add(element.SHORT_NAME)
  
        //     });
        //     // lấy mã nhà cung cấp 
        //     if(SHORT_NAMES.size>0){
        //          this.get_Sup_code_fr_ShortName({SHORT_NAMES:Array.from(SHORT_NAMES) }).then(res=>{
                    
        //             res.data_SUP_codes.forEach(row => {
                        
        //                 this.data_New_Prices_excel.forEach(item => {
        //                     if(item.SHORT_NAME==row.SHORT_NAME) {                                
        //                         this.$set(item, 'SUP_CODE', row.SUP_CODE)
        //                         //console.log(item);
        //                     }
        //                 });
        //             }); 

        //         })
        //     }
        //     //this.data_New_Prices_excel=[...data_New_Prices_excel]
        //    this.$forceUpdate()
        // }
       
    }

},
async created(){
    await this.get_tyGiaUSD().then(res=>{
      this.tygia=res.tyGiaUSD
    })
    await this.Po_getNew_Prices()
    await this.Po_get_Plan_Prices_Year()
    let iYear=new Date().getFullYear()+1
    for(let i=iYear; i>iYear-4; i--){
      this.Years.push(i)
    }
    
}
}
</script>

<style scoped>
.Popup {
  background-color: #ffffff;
  color: black;
  position: absolute;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.3);
  display: none;
}
.Popup a {
  display: block;
  text-decoration: none;
}
.Popup a:hover {
  background-color: #95a5a6;
}
.hienPopup {
  display: block;
}
</style>