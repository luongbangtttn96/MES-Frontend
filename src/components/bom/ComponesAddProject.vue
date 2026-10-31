<template>    
    <tr>       
      <td style="padding: 3px;" colspan="3">            
          <div class="container row padding: 2px;">            
            <div class="icon-container" v-if="AddExcel">    
              <label for="file" class="contro_hand">
                <b-icon icon="file-earmark-excel" @click="btnClick" for="file"></b-icon>
              </label>
            </div>
            <div class="icon-container" v-if="!AddExcel">    
              <label for="file" class="contro_hand">
                <b-icon icon="server" @click="saveExcel(ProjId)" for="file"></b-icon>
              </label>
            </div>
            <div class="icon-container contro_hand">
              <b-icon icon="plus-square" @click="handAdd_BOMsemi(ProjId)"></b-icon>
            </div>
           
          </div>
        </td>
        <td style="min-height: 80px; ">   </td>
      <td style="min-height: 80px; ">
        <!-- <input type="file" name="file" id="file" accept=".xlsx" class="inputfile" @change="onChange($event)" />  -->
        <input class="input-file" type="file" @change="exportData"
           accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
           </td>
      <td style="min-height: 80px; "></td>
      <td style="min-height: 80px; ">  </td>
      <td style="min-height: 80px; "> </td>
      <td style="min-height: 80px; "></td>
      <td style="min-height: 80px; "></td>
      <td style="min-height: 80px; "></td>
      <td style="min-height: 80px; "></td>
    </tr>        
</template>

<script>
//import itemComponen from './item_componen.vue' 
//import readXlsxFile from 'read-excel-file'
import * as XLSX from 'xlsx-js-style'

export default {    
    data() {
      return {
        AddExcel:true,
        addBomHDR: true,
      }
      
    },
    props: {
      ProjId: {
        type: Number,
        default: null
      }
    },
    methods: {
      btnClick () {
      document.querySelector('.input-file').click()
      },
      handAdd_BOMsemi(proj_id){
        this.$emit('Add_BOMsemi',proj_id)
      },
      exportData (event) {
        var bomHdrs=[];
        //console.log(bomHdrs)
        let xlsxfile = event.target.files ? event.target.files[0] : null;
        if(xlsxfile){
          let fileReader = new FileReader();
          fileReader.readAsBinaryString(xlsxfile);
          fileReader.onload = (e)=>{
            let data = e.target.result;
            let workbook = XLSX.read(data,{type:"binary"});
          //console.log(workbook);
            let wb= workbook.SheetNames[0]
            let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[wb]);
            this.$emit('ImportDataExcel',rowObject)
            if(rowObject){ this.AddExcel=!this.AddExcel};
          
          }
        }
      },

      dataBomHDR(Arr) {
        let data = {BOM_CODE:"",BOM_NAME:"",PART_NUM:"",DESCRIPTION:"",SORT:"",NOTE:""}
            if(data.BOM_CODE){data.BOM_CODE= Arr[0]}else { data.BOM_CODE=null}
            if(data.BOM_NAME){data.BOM_NAME= Arr[1]}else { data.BOM_NAME=null}
            if(data.PART_NUM){data.PART_NUM= Arr[2]}else { data.PART_NUM=null}
            if(data.DESCRIPTION){data.DESCRIPTION= Arr[3]}else { data.DESCRIPTION=" "}
            if(data.SORT){data.SORT= Arr[4] }else { data.SORT=null}
            if(data.NOTE){data.NOTE= Arr[5]  }else { data.NOTE=null}                
        return data
      },

      saveExcel(proj_id){
       this.$emit('saveExcel',proj_id)
        this.AddExcel=!this.AddExcel
      },

      onChange(){
        console.log('Đang phát triển')
      }
    },
    
  
    
}
</script>

<style>
  .input-file {
    display: none;
  }
  
</style>