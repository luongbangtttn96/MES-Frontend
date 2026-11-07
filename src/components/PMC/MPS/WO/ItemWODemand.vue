<template>
    <tr :class="mau(item.PLA_DTL_ID)">
        <td>{{index+1}}</td>
        <td>{{item.BOM_NAME}}</td>
        <td>{{ item.PART_NUM }}</td>
        <td>{{item.QTY_STOC  }}</td>
        <td><input type="number" name="txt_Qty" v-model="item.QTY" style="width: 80px;"></td>
        <td><input type="date" v-model="item.START_DATE"></td>
        <td><input type="date" v-model="item.END_DATE"></td>
        <td>{{item.SORT}}</td>
        <td>
            <div class="actions">
                <button class="btn btn-primary" @click="handUpdatePlanDTL()" title="Xác Nhận" aria-label="Xác Nhận">✓</button>
                <button class="btn btn-danger" @click="handDeletePlanDTL()" title="Xóa" aria-label="Xóa">🗑️</button>
                <button class="btn btn-secondary" @click="handUpdateMaterialPlanDTL()" title="Update" aria-label="Update">🔄</button>
            </div>
        </td>
    </tr>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return{

        }
    },
    props:{
        item:{
            type: Object,
            default:null
        },
        index:{
            type: Number,
            default:null
        }
    },
    methods:{
        ...mapActions([
            'UpdatePlanDTL',
            'DeletePlanDTL',
            'UpdateMaterialPlanDTL'
        ]),
        mau(Updated){
            if(Updated) return "mauNenXanh"
            else return ''
        },
        handUpdatePlanDTL(){
            //console.log(this.item);
            this.UpdatePlanDTL(this.item)
        },
        handDeletePlanDTL(){
            this.item.QTY=0
            this.DeletePlanDTL(this.item)
        },
        handUpdateMaterialPlanDTL(){
            this.item.SORT=this.item.SORT+1
            this.UpdateMaterialPlanDTL(this.item)
        }
    }
}
</script>

<style scoped>
.actions { display: flex; gap: 6px; align-items: center; justify-content: flex-end; white-space: nowrap; }
.btn { padding: 4px 6px; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; line-height: 1; height: 30px; display: inline-flex; align-items: center; justify-content: center; }
.btn-primary { background: #1976d2; color: #fff; }
.btn-danger { background: #d32f2f; color: #fff; }
.btn-secondary { background: #9e9e9e; color: #fff; }

/* ensure buttons stay on one line on small screens */
td { vertical-align: middle; }
@media (max-width: 480px) {
    .btn { padding: 3px 6px; font-size: 11px; height: 28px; }
}
</style>