<template>
  <div>
    <div>
      <b>Số tồn kho:</b>
      <table class="table table-hover">
        <thead>
          <th>STT</th>
          <th>Mã SP</th>
          <th>Kho</th>
          <th>Vị Trí</th>
          <th>Số lượng</th>
          <th>Số Giao</th>
          <th>Đơn giá</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataThanhPham_Kho" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.PART_NUM }}</td>
            <td>{{ item.STO_CODE }}</td>
            <td>{{ item.POSITION_CODE }}</td>
            <td>{{ item.QUANTITY }}</td>
            <td>
              <el-input type="number" v-model="item.deliver" style="width: 80px" />
            </td>
            <td>
              <el-input
                type="number"
                v-model="item.UNIT_PRICE"
                style="width: 80px"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <label for="">Nội dung YC:</label>
        <el-input type="text" v-model="DESCRIPTION" size="60" maxlength="255" />
        <label for="">Loại tiền:</label>
        <el-input
          type="text"
          v-model="CUR_CODE"
          size="3"
          maxlength="3"
          placeholder="VND"
        />
      </div>
      <el-button type="primary" class="btn btn-info" @click="handDeNghiXuatHang()">
        Đề nghị xuất
      </el-button>
      <div>
        <table class="table mt-1">
          <thead>
            <th>STT</th>
            <th>Nội dung</th>
            <th>Ngày Đề nghị</th>
            <th>Số Lượng</th>
            <th>Trạng thái</th>
            <th>@</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataDelivers" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.DESCRIPTION }}</td>
              <td>{{ item.CREATED_AT }}</td>
              <td>{{ item.QTY }}</td>
              <td>{{ item.STATUS }}</td>
              <td>
                <div class="button-row">
                <!-- <el-button type="primary" @click="handUPDeNghiGiaoHang_ERP(item)">ERP</el-button> -->
                <el-button type="danger" 
                  @click="handHuyDeNghiGiaoHang(item.PDDE_ID)"
                >
                  &#10006;
                </el-button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usePOStore } from "@/stores/po.store";
import { useAppStore } from "@/stores/app.store";
import { useRoute } from "vue-router";


const poStore = usePOStore();
const appStore = useAppStore();
const route = useRoute();

const dataThanhPham_Kho = ref<(Record<string, any>[])>([])
const DESCRIPTION = ref("")
const CUR_CODE = ref("USD")
const dataDelivers = ref<(Record<string, any>[])>([])

const props = defineProps<{
  PDD_ID?: number,
  QTY?: number,
  QTY_DELIVER?: number,
}>();

//  methods: {

const handUPDeNghiGiaoHang_ERP = async (item: Record<string, any>) => {
      let data = {
        PDDE_ID: item.PDDE_ID,
        DESCRIPTION: item.DESCRIPTION,
        CUR_CODE: CUR_CODE.value,
      };
      const res = await poStore.UPDeNghiGiaoHang_ERP(data);
      Pro_getDeNghiXuatHang();
    };

const handHuyDeNghiGiaoHang = async (PDDE_ID: number) => {
      let data = { PDDE_ID: PDDE_ID };
      const res = await poStore.huyDeNghiGiaoHang(data);
      Pro_getDeNghiXuatHang();
    };
const Pro_getDeNghiXuatHang = async () => {
      let data = {
        PDD_ID: props.PDD_ID,
      };
      const res = await poStore.getDeNghiXuatHang(data);
      dataDelivers.value = res.dataDelivers;
    };
const handDeNghiXuatHang = async () => {
      let dataDeliver_dtl = dataThanhPham_Kho.value.filter((row) => {
        return row.deliver > 0;
      });
      let Deliver_QTY = 0;
      dataDeliver_dtl.forEach((item) => {
        Deliver_QTY = Deliver_QTY + Number(item.deliver);
      });
      if(Deliver_QTY + Number(props.QTY_DELIVER) > Number(props.QTY)){
        appStore.setMsgErro("Số xuất đang vượt quá số của lệnh SX")
        return
      }
      
      if (Deliver_QTY > 0) {
        let data = {
          PDD_ID: props.PDD_ID,
          TME_ID: dataDeliver_dtl[0].TME_ID,
          Deliver_QTY: Deliver_QTY,
          DESCRIPTION: DESCRIPTION.value,
          CUR_CODE: CUR_CODE.value,
          dataDeliver_dtl: dataDeliver_dtl,
        };
        const res = await poStore.DeNghiXuatHang(data);
        Pro_getDeNghiXuatHang();
      } else {
        alert("Chưa có số lượng giao");
      }
    };

  onMounted(async () => {
    let data = {
      PDD_ID: props.PDD_ID || route.query.PDD_ID,
    };
    const res = await poStore.getThanhPham_Kho(data);
    dataThanhPham_Kho.value = res.dataThanhPham_Kho;
    dataThanhPham_Kho.value.forEach((item) => {
      item.UNIT_PRICE = 0;
    });
    Pro_getDeNghiXuatHang();
  });
</script>

<style scoped>
.button-row {
  display: flex;
  gap: 1px;
  align-items: center;
}
</style>