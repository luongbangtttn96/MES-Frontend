<template>    
    <tr>       
      <td style="padding: 3px;">  
          <div class="container row padding: 2px;">
            <div class="icon-container">
              <b-icon icon="pencil-square" @click="onChange(id)" ></b-icon>
            </div>
            <!----><!----><!----><!---->
            <div class="icon-container">
              <b-icon icon="caret-right-fill" @change="onChange"></b-icon>
            </div>
            <!----><!----><!----><!---->
            <div class="icon-container">
              <b-icon icon="exclamation-circle-fill" @change="onChange"></b-icon>
            </div>
          </div>
        </td>
      <td style="min-height: 80px;"> {{id}}  </td>
      <td style="min-height: 80px;"> <div>{{item.BOM_CODE}}</div></td>
      <td style="min-height: 80px;"> <div >{{item.BOM_NAME}}</div></td>
      <td :style="'min-height: 80px; cursor: pointer;' + mau"  @dblclick="capNhatMaNL(item.PART_NUM)" > {{item.PART_NUM}}  </td>
      <td style="min-height: 80px;"><div>{{item.DESCRIPTION}}</div> </td>
      <td style="min-height: 80px;"><div >{{item.SORT}}</div></td>
      <td style="min-height: 80px;"><div >{{item.NOTE}}</div></td>
      <td style="min-height: 80px;"><div >{{item.DEPT_ID}}</div></td>
      <td style="min-height: 80px;"><div >{{item.UPDATED}}</div></td>
      <!-- BOM CODE, BOM NAME, ITEM CODE, DESCRIPTION, ACTIVe, NOTE, CREATED, UPDATED, -->
      <!-- [BOM_HDR_ID] ,[BOM_CODE] ,[BOM_NAME]  ,[TME_ID]  ,[PART_NUM] ,[PART_NAME]  ,[DESCRIPTION]  ,[IS_ACTIVE] ,[NOTE] -->
    </tr>        
</template>

<script>
import itemComponen from './item_componen.vue' 
export default {
    
    props: {     
      item: {
        type: Object,
        default: null
      },
      id: Number
    },
    computed:{
      mau(){
        if (!this.item.dataExists) {
          return 'background-color: orangered'
        }
      }
    },
    components: {
      itemComponen
    },
    methods: {
      capNhatMaNL(PartNum){
        let src=''
            src='/#/UpdateTypeMaterial?partNum=' + PartNum 
            window.open(src, 'newWin', 'fullscreen=yes, scrollbars=auto,width=600,height=380, titlebar=no')
     },
      onChange(event) {
       alert('Hello ' + event + '!')
      },
    },
    
}
</script>

<style>
 .l{
   cursor: pointer;
 }
</style>