<template>
  <div>
    <div class="row m-1">
          <!-- <div>
        <label> Tháng:</label>
        <input  type="month"  v-model="v_month"  @change="handGetDemandsDTLs_month()" />
        </div> -->
        <div class="input-group col-md-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-default">
            <b-icon icon="search"></b-icon
            ></span>
        </div>
        <input
            type="text"
            class="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            v-model="search"
        />
        </div>
    </div>
    
    <div class="tableFixHead" style="overflow: auto; height: 80vh">
        <table class="table table-striped table-hover">
        <thead>
            <tr>
            <th rowspan="2" style="width: 50px">Số TT</th>
            <th rowspan="2" style="width: 80px">ID</th>
            <th rowspan="2" style="width: 80px">SOM ID</th>
            <th rowspan="2"> Khách hàng</th>
            <th rowspan="2" style="width: 80px">Dự Án</th>
            <th rowspan="2" style="width: 80px">Lệnh SX</th>
            <th colspan="6">Nhu cầu</th>
            <th colspan="4">Sản Xuất</th>

            <th rowspan="2" style="width: 80px">Trạng thái</th>
            <th rowspan="2" style="width: 150px">Ghi chú</th>
            </tr>
            <tr>
            <th style="width: 50px">Số Yêu cầu</th>
            <th style="width: 50px">Đơn Vi</th>
            <th>Mã PO</th>
            <th>Mã SO</th>
            <th style="width: 30px">Từ ngày</th>
            <th style="width: 50px">Đến Ngày</th>
            <th style="width: 30px">Từ ngày</th>
            <th style="width: 50px">Đến Ngày</th>
            <th style="width: 50px">DK Số SX </th>
            <th style="width: 50px">Đã SX</th>
            </tr>
        </thead>
        <tbody>
            <tr
            v-for="(item, index) in showdataDemandDTL"
            :key="index"
            @click="handSelectDemand(item)"
            :class="maurow(item.QTY,item.QTY_CHANGER)"
            >
            <td>{{ index + 1 }}</td>
            <td>{{ item.PDD_ID }}</td>
            <td>{{ item.PDE_ID }}</td>
            <td>{{ item.CUS_NAME }}</td>
            <td>{{ item.PROJ_CODE }}</td>
            <td>{{ item.NUM_WO }}</td>
            <td>{{ item.QTY }}</td>
            <td>{{ item.UNIT_NAME }}</td>
            <td>{{ item.PO_CODE }}</td>
            <td class="text-truncate">{{ item.SALESODER_CODE }}</td>
            <td>{{ item.START_DEMANDS }}</td>
            <td>{{ item.END_DEMANDS }}</td>
            <td>{{ item.START_PRODUCT }}</td>
            <td>{{ item.END_PRODUCT }}</td>
            <td>{{ item.QTY_DKSX }}</td>
            <td>{{ item.PRODUCTION }}</td>
            <td>{{ item.STATUS }}</td>
            <td>{{ item.NOTE }}</td>
            
            </tr>
        </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex/dist/vuex.common.js';

export default {
    data(){
        return {
           dataDemandsDTLs_SanXuat:[],
           search: "",
        }
        
    },
    computed: {
    showdataDemandDTL() {
        let data = this.dataDemandsDTLs_SanXuat.filter((element) => {
            return (
            element.PROJ_CODE.toUpperCase().includes(this.search.toUpperCase()) ||
            (element.PO_CODE && element.PO_CODE.toUpperCase().includes( this.search.toUpperCase() )) ||
            (element.CUS_NAME && element.CUS_NAME.toUpperCase().includes( this.search.toUpperCase() )) ||
            (element.SALESODER_CODE && element.SALESODER_CODE.toUpperCase().includes( this.search.toUpperCase() )) ||
            element.PDE_ID == this.search
            );
        });
        return data;
        },
    },
    props:{
        sanxuat:{
            type: Boolean,
            default: null
        }
    },
    methods:{
        ...mapActions([
            'getDemandDTLs_SanXuat'
        ]),
        maurow(QTY, QTY_CHANGER){
            if (QTY!=QTY_CHANGER && QTY_CHANGER!=null){
            return 'mauNenDo'
            }
        },
        ProgetDemandDTLs_SanXuat() {
            let data={
                sanxuat:this.sanxuat
            }
            this.getDemandDTLs_SanXuat(data).then((res) => {
                this.dataDemandsDTLs_SanXuat = res.dataDemandsDTLs_SanXuat;
            });
        },
    },
    async created() {
        this.ProgetDemandDTLs_SanXuat();    
    },
}
</script>

<style>

</style>