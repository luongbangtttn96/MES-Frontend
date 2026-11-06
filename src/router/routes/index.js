import Vue from 'vue'
import Router from 'vue-router'
import { ifNotAuthenticated, ifAuthenticated, ifShift } from '../plugins/authenticate'

import HelloWorld from '@/components/HelloWorld'
import Login from '../components/Auth/Login.vue'

import Route from '../components/WIP/Rourte.vue'

//=================Costing========================
import Allocation from '../components/costing/Allocation.vue'
import CostingMonth from '../components/costing/CostingMonth.vue'
import ReportCost from '../components/costing/ReportCost.vue'
import ReportCostProducMonth from '../components/costing/ReportCostProducMonth.vue'

//===================================================
import Nhanhanggiao from '../components/WIP/RECEIVED/ReceivedContainer.vue'

import dashBoardLine from "../components/Dashboard/dashboard.vue"
import DashBoardAllLine from '../components/Dashboard/DashboardShowLineCuren.vue';
import MES_Dashboard from '../components/Dashboard/MES_Dashboard.vue';
import DashboardProduc_day from '../components/Dashboard/DashboardProduc_day.vue';
import INV_Dashboard from '../components/Dashboard/INV_Dashboard.vue';
import DashBoardAllLineOnline from '../components/Dashboard/DashboardOnline.vue'

import YeucauNguyenLieu from '../components/WIP/NhuCauNLSX/NhuCauNL.vue'
import YeucauNguyenLieuSX_LS from '../components/WIP/NhuCauNLSX/NhuCauNLSX_LSX.vue';
import NhuCauXuatNLSX_LSX from '../components/WIP/NhuCauNLSX/NhuCauXuatNLSX_LSX.vue';
//================BOM===================


//=========== PMC=================
import Plans from '../components/pmc/Plans.vue'
import MaterialExist from '../components/pmc/MaterialExist.vue'
import MaterialRequirementContaine from '../components/pmc/MaterialRequirementContaine.vue'
import PlanSchedulePro from '../components/pmc/MPS/Plan_Schedure_Pro.vue'
import PlanlotClosing from '../components/pmc/lotClosing/semiFinishedProduct.vue'

import ViewListScheduPro from '../components/pmc/MPS/Schedure/PlanSchedureProduc.vue'

import DamendsCaculationMaterial from '../components/pmc/MPS/Demands/DemandsCalculationMaterial.vue';
import Form_TongHopBoSungNL from '../components/pmc/MPS/Demands/Form_TongHopBoSungNL.vue';
import DemandsTheoDoiMateral from '../components/pmc/MPS/Demands/DemandsTheoDoiMateral.vue'
import XacNhanMuaNL from '../components/pmc/MPS/Demands/XacNhanMuaNL.vue'
import chuyenBoPhanLamViec from '../components/pmc/ChuyenBoPhanLamviec.vue';
import MPSCreaterWO from '../components/pmc/MPS/WO/CreaterWO.vue'
import manufacturer_material from '../components/BaseMaterial/Manufacturer_Materal.vue'
import PART_UPDATE_PLAN from '../components/pmc/MPS/WO/PART_UPDATE_PLAN.vue'
import form_setScheDuPro from '../components/pmc/MPS/SET/Form_SetScheduProduc.vue'

import setMaterialWastage from '../components/pmc/Material_Wastage.vue';
import CANCEL_PO from '../components/pmc/MRP/CANCEL_PO.vue'
import ManageCancel_Material_PO from '../components/PO/ManageCancel_Material_PO.vue'

import BI_WO_Month from '../components/pmc/MPS/WO/BI_WO_Month.vue'



import Update_Manufacturer_Material from '../components/BaseMaterial/Update_Manufacturer_Material.vue'

import Shedule_dtl_line from '../components/pmc/MPS/Demands/Shedule_dtl_line.vue'
import DashBoard_kehoach from '../components/pmc/MPS/Demands/DashBoard_kehoach.vue'

import BomGia_DTL_Project from '../components/pmc/MPS/Demands/BomGia_DTL_Project.vue'
import Demand_Group_PO from '../components/pmc/MPS/Demands/Demand_GROUP_PO.vue'

import ShowSumForecast from '../components/pmc/MPS/Demands/Forecast/ShowSumForecast.vue'


import BaoCaoTheoGioiKiemSoat_NLSX from '../components/pmc/MPS/Demands/BaoCaoTheoDoiKiemSoat_NLSX.vue'

import Sync_Material_ERP from '../components/BaseMaterial/Sync_Material_ERP.vue'

import BaoCao_YCXuat_SO from '../components/pmc/MPS/Demands/BaoCao_YCXuat_SO.vue'

//------MRP------------------------------
import PO_Plan_Material_now from '../components/pmc/MRP/PO_Plan_Material_now.vue'
import PO_Plan_Material_now_Schumacher from '../components/pmc/MRP/PO_Plan_Material_now_Schumacher.vue'
import set_up_shipping from '../components/pmc/MRP/set_up_shipping.vue'
import ShowBOM_WO from '../components/pmc/ShowBOM_WO.vue'
import XuatBanDemand from '../components/pmc/MRP/XuatBanDemand.vue'
import PPV_PLAN_SOM from '../components/pmc/MRP/PPV_PLAN_SOM.vue'

import CreaterShipment from '../components/PO/CreaterShipment.vue'


//-----------MPS----------------
import Sum_ALL_PLAN_WO from '../components/pmc/MPS/WO/Sum_ALL_PLAN_WO.vue'
//=========== Production WIP=============
import QLBoPhanSX from '../components/WIP/Add_BoPhan.vue'
import Creatershift from '../components/WIP/Shift/CreateShift.vue'
import Thietlapline from '../components/WIP/LinesContainer.vue'
import Closingshift from '../components/WIP/Shift/closingShift.vue'
import TongHopShift from '../components/WIP/Shift/TongHopShift.vue'

import ReportShift from '../components/WIP/Shift/ReportShift.vue'
import GiaoNVLSX from '../components/WIP/GiaoNVL/GiaoNVLSX.vue'
import PrintWIP from '../components/WIP/GiaoNVL/PhieuGiao.vue'

import QuanLyNLSX from '../components/WIP/TonNL/QuanLyHangTon.vue'
import NhapKhoThanhPham from '../components/WIP/TonNL/NhapKhoThanhPham.vue'

import QLStopLine from '../components/WIP/StopLine/LIST_DUNGLINE.vue'

import SetupThungChua from '../components/WIP/ThungChua/SetupThungChua.vue'
import Form_SplitThungChua from '../components/WIP/ThungChua/SplitThungChua.vue'

import SetupIoT from '../components/WIP/IoT/SetIoTThuThapTT.vue'

import Rewok from '../components/WIP/ReWork/F_rework.vue';
import XacNhanLoiProduc from '../components/QC/QC-PRODUCTION-RW/CheckProductionErr.vue'

import tonghopNGDTL from '../components/WIP/NG/TongHopNGDTLthoiGian.vue'

import AllProduc_shift from '../components/WIP/Reports/Report_BaoCaoChiTietSX.vue';

import chotBTP from '../components/WIP/lotClosing/semiFinishedProduct.vue'
import NhanNVLSX from '../components/WIP/RECEIVED/TheoDoiMateralReceived-WO.vue'
import NhanNguyenLieuSX from '../components/WIP/NhapNVLSX/NhanNguyenLieuSX.vue'
import ThatthoatNguyenLieuSX from '../components/WIP/WIPThatThoat/ThatthoatNguyenLieuSX.vue'
import ChuyenNguyenLieuWIP_PLAN from "../components/WIP/TonNL/ChuyenNguyenLieuWIP_PLAN.vue";
import NhapKhoNguyenLieuTon_WIP from '../components/WIP/TonNL/NhapKhoNguyenLieuTon_WIP.vue'
import NhapKhoNguyenLieu_WIP from '../components/WIP/TonNL/NhapKhoNguyenLieu_WIP.vue'

import TonghopAllProducOfDays from '../components/WIP/Reports/TonghopAllProducOfDays.vue'

import BCSanLuong from '../components/WIP/Reports/Report_THSanrluong.vue'

import BC_TonKhoNguyenLieu_WIP from '../components/WIP/TonNL/BC_TonKhoNguyenLieu_WIP.vue'

import ShowPART_NUM_Xuat from '../components/WIP/NhuCauNLSX/ShowPART_NUM_Xuat.vue'
import DS_NhuCauNLSX from '@/components/WIP/NhuCauNLSX/DS_NhuCauNLSX.vue'
import DS_NhuCauNLSX_ERP from '@/components/WIP/NhuCauNLSX/DS_NhuCauNLSX_ERP.vue'

import ShowUser_material_WO from '@/components/WIP/ShowUser_material_WO.vue'


//====================EMG================
import MaintenanceReport from '../components/EMG/Reports/MaintenanceReport.vue'
import Device from '../components/EMG/EMG_Device.vue'
import equipments from '../components/EMG/EMG_Equipments.vue'
import Plan_maintenance from '../components/EMG/EMG_TongHopLichBD.vue'
import EMG_PrintEQU from "../components/EMG/EMG_PrintEQU.vue";
import hieusuatDevice from '../components/EMG/HieuSuat/HieuSuat_device.vue';
import SparepartItems from '../components/EMG/DATAMASTER/Sparepart_Item.vue';
import EMGBOMHDR from '../components/EMG/DATAMASTER/EMG_BOMHDR.vue';
import EMG_NhatKyBaoDuong from '../components/EMG/EMG_NhatKyBaoDuong.vue'
import MaintenanceEMG_Report from '../components/EMG/Reports/MaintenanceEMG_Report.vue'

//=====================================


import searchInfoPartNum from "../components/INV/Seach_linhkien.vue"
//==========================INV===================
import Stores from "../components/INV/INV_Stores.vue"
import received from '../components/INV/INV_RECEIVED.vue'
import deliver from '../components/INV/INV_DELIVER.vue'
import invdocking from '../components/INV/INV_Docking_Item.vue'
import invchonVatTugiao from '../components/INV/INV_OrderVattu.vue'
import invkiemke from '../components/INV/INV_KIEMKE.vue'
import chuyenVattu from '../components/INV/INV_ChuyenVitriVatTu.vue'
import updateImageItem from "../components/BaseMaterial/Update_Image_Material.vue"
import TheKhoPosition from '../components/INV/INV_TheKhoPosition.vue';
import MaterialObject from '../components/INV/INV_MaterialObject.vue';
import INV_QLPhieuGiaoNLSX from '../components/INV/INV_QLPhieuGiaoNLSX.vue'
import INV_QLPhieuGiaoNLSX_ERP from '../components/INV/INV_QLPhieuGiaoNLSX_ERP.vue'
import INV_itemPhieuGiao from '../components/INV/INV_itemPhieuGiao.vue'
import SetMfrOfMaterial from '../components/INV/SetMfrOfMaterial.vue'
import INV_XoaLineEndTheKhoPosition from '../components/INV/INV_DeleteLineTheKhoPosition.vue';
import INV_SetItemErro from '../components/INV/INV_SetItemErro.vue'
import PrintLableNguyenLieu from '../components/INV/INV_InNhanNL.vue'
import DS_Material_DeNghiXuat from '@/components/INV/DS_Material_DeNghiXuat.vue'
import taoPhieuXuatNL_SX from '../components/INV/taoPhieuXuatNL_SX.vue'
import INV_QLPhieu_received from '../components/INV/INV_QLPhieu_received.vue'
import INV_itemPhieuNhap from '../components/INV/INV_itemPhieuNhap.vue'
import INV_SetStore from '../components/INV/INV_SetStore.vue'

import DS_itemPhieuGiao_Require from '../components/INV/DS_itemPhieuGiao_Require.vue'

import taoPhieuGiaoTuPhieuERP from '../components/INV/taoPhieuGiaoTuPhieuERP.vue'
import taoPhieuNhanTuPhieuERP from '../components/INV/taoPhieuNhanTuPhieuERP.vue'

//================ Adminstrator =====================


//======================= chất lượng QC =============

import reportSlotMaterial from '../components/QC/showConfigCurrentDeviceSlot.vue'
import listDefectCode from '../components/QC/Form_Defect_code.vue'
import CheckQCProcess from '../components/QC/Check_QC_Process.vue'
import CheckFinalQC from '../components/QC/Check_final.vue'
import CheckDefectDTL from '../components/QC/Check_defect_DTL.vue'
import ReportDefectShift from '../components/QC/REPORTS/Defect_Report.vue'
import ChartChatLuong from '../components/QC/CHARTS/ChatLuongPPM.vue';
import TongHopLoi_thoiGian from '../components/qc/TongHopLoi_thoiGian.vue'

import phantichLoiFa from '../components/QC/FA/phantichLoiFa.vue';
import TonghopQCPPMNgay from "../components/QC/BAOCAO-TH/UI_BaoCaoHangLoi.vue";
import CheckIQC from "../components/QC/IQC/IQC_Component.vue";
import ItemCheckIQC from "../components/QC/IQC/IQC_Item.vue";
import IQC_ERR_HDR from '../components/QC/IQC/IQC_ERR_DTL.vue';
import Report_IQCERR from '../components/QC/REPORTS/Report_IQCERR.vue'
import SetUpMaterialFAI from '../components/QC/FAI/SetUpMaterialFAI.vue'
import CheckFAI from '../components/QC/FAI/Check_FAI.vue'
import Check_FAI_DTL from '../components/QC/FAI/Check_FAI_DTL.vue'
import FAI_DTL_Done from '../components/QC/FAI/FAI_DTL_Done.vue';
import Code_Defect_Project from '../components/QC/Code_Defect_Project.vue';
import Report_IQC_PO from '../components/QC/IQC/Report_IQC_PO.vue'
import Report_IQC_Material from '../components/QC/IQC/Report_IQC_Material.vue'

//================ form =================================
import FormUpdateMaintenance from '../components/EMG/EMG_UpdateInfoMaintenance.vue'
import UpdateTypeMaterial from '../components/BaseMaterial/Add_baseMaterial.vue'
import reportWO from '../components/pmc/Reports/Report_WO.vue'
import RepostRequiseMaterialPlanPro from '../components/WIP/Reports/Report_RequiseMaterial.vue';
import ReportTotalMateralPlanDTLPro from '../components/WIP/Reports/Report_TongHopNVLCuaKHSXBTP.vue';
import ReportOderItem from '../components/INV/Reports/Report_OderItem.vue';
import ReportTongHopNVLCuaKHSXBTPOfDep from '../components/WIP/Reports/Report_TongHopNVLCuaKHSXBTPOfDep.vue'
import TongHopNVLCuaKHSXBTP from '../components/WIP/lotClosing/TongHopNVLCuaKHSXBTP.vue'



import formAddTypeMaterial from '../components/BaseMaterial/Add_baseMaterial.vue'
//================================Virtium =======================
import QCInNhanVirtium from '../components/Virtium/QC_In_Nhan_Virtium.vue'
import ReportInVirtium from '../components/Virtium/ReportInVirtium.vue'

//======================= PO =====================================
import MuaHang from '../components/PO/MuaHang.vue'
import Shipment from '../components/PO/Shipment.vue'
import QLSuppliers from '../components/PO/SUPPLIERS/QL_Suppliers.vue'
import PRICEQOUTEPHASE from '../components/PO/PRICR_QOUTE/PRICE_QOUTE_PHASE.vue'
import ADD_PRICE_QOUTE_HDR from '../components/PO/PRICR_QOUTE/ADD_PRICE_QOUTE_HDR.vue'
import ADD_PRICE_QOUTE_DTL from '../components/PO/PRICR_QOUTE/ADD_PRICE_QOUTE_DTL.vue'
import ADD_QOUTE_Materal from '../components/PO/PRICR_QOUTE/ADD_QOUTE_Materal.vue';

import NEW_PRICEs from '../components/PO/PRICR_QOUTE/NEW_PRICEs.vue'
import CURRENCY_RATES from '../components/PO/CURRENCY_RATES.vue'


s
import SetDay_PO_Material from '../components/PO/SetDays_PO_Material.vue'
import baoCaoChiTietMuaHang from '../components/PO/Baocao/BaoChitietMuaHang.vue'
import MuaHang_Group from '../components/PO/MuaHang_Group.vue'
import BC_TonNguyenLieu_PO from '../components/PO/BC_TonKhoNguyenLieu_PO.vue'
import Manage_PO from '../components/PO/Manage_PO.vue'
import PO_HDR_PO_DTL from '../components/PO/PO_HDR_PO_DTL.vue'
import FormShowPOs_Day from '../components/PO/FormShowPOs_Day.vue'
import PO_IMPORT from '../components/PO/PO_IMPORT.vue'
import PO_ReadyVC from '../components/PO/PO_ReadyVC.vue'
import PURCHASE_ORDER from '../components/PO/Reports/PURCHASE_ORDER.vue'
import PO_Material_Ch_VC from '../components/pmc/MRP/PO_Material_Ch_VC.vue'
import CONTRACT_PO from '../components/PO/Reports/CONTRACT_PO.vue'

//==================BI ========================
import VongQuayTonKho from '../components/BI/VongQuayTonKho.vue'
//=============================================
import thu from '../components/Chart/ThuChart.vue' //PermissionManager.vue

import ASI_Traceability from '../components/Traceability/ASI_Traceability.vue'

Vue.use(Router)

export default new Router({
  //mode: 'history',

  routes: [
    {
      path: '/thu',
      name: 'thu',
      component: thu
    },
    //================= Costing =======================
    
    {
      path: '/costing/ReportCostProducMonth',
      name: 'ReportCostProducMonth',
      beforeEnter: ifAuthenticated,
      component: ReportCostProducMonth
    },
    {
      path: '/costing/ReportCost',
      name: 'ReportCost',
      beforeEnter: ifAuthenticated,
      component: ReportCost
    },
    {
      path: '/costing/Allocation',
      name: 'Allocation',
      beforeEnter: ifAuthenticated,
      component: Allocation
    },
    {
      path: '/costing/Costing_Month',
      name: 'Costing_Month',
      beforeEnter: ifAuthenticated,
      component: CostingMonth
    },
    //==================================
    //================= BI ========================

    {
      path: '/bi/VongQuayTonKho',
      name: 'VongQuayTonKho',
      beforeEnter: ifAuthenticated,
      component: VongQuayTonKho,

    },
   
    //=================Traceability============

    {
      path: '/ats/ASI_Traceability',
      name: 'ASI_Traceability',
      beforeEnter: ifAuthenticated,
      component: ASI_Traceability,

    },
    //=============PO ====================
    {
      path: '/pmc/po/Reports/CONTRACT_PO',
      name: 'CONTRACT_PO',
      beforeEnter: ifAuthenticated,
      component: CONTRACT_PO,
    },

    {
      path: '/po/PO_Material_Ch_VC',
      name: 'PO_Material_Ch_VC',
      beforeEnter: ifAuthenticated,
      component: PO_Material_Ch_VC,
    },

    {
      path: '/pmc/po/Reports/PURCHASE_ORDER',
      name: 'PURCHASE_ORDER',
      beforeEnter: ifAuthenticated,
      component: PURCHASE_ORDER,
    },

    {
      path: '/pmc/po/PO_IMPORT',
      name: 'PO_IMPORT',
      beforeEnter: ifAuthenticated,
      component: PO_IMPORT,
    },

    {
      path: '/pmc/po/ManageCancel_Material_PO',
      name: 'ManageCancel_Material_PO',
      component: ManageCancel_Material_PO,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/po/FormShowPOs_Day',
      name: 'FormShowPOs_Day',
      component: FormShowPOs_Day,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/po/PO_HDR_PO_DTL',
      name: 'PO_HDR_PO_DTL',
      component: PO_HDR_PO_DTL,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/po/CURRENCY_RATES',
      name: 'CURRENCY_RATES',
      component: CURRENCY_RATES,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/po/Manage_PO',
      name: 'Manage_PO',
      component: Manage_PO,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/pmc/po/BC_TonNguyenLieu_PO',
      name: 'BC_TonNguyenLieu_PO',
      component: BC_TonNguyenLieu_PO,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/po/NEW_PRICEs',
      name: 'NEW_PRICEs',
      beforeEnter: ifAuthenticated,
      component: NEW_PRICEs,

    },

    {
      path: '/pmc/po/baoCaoChiTietMuaHang',
      name: 'baoCaoChiTietMuaHang',
      beforeEnter: ifAuthenticated,
      component: baoCaoChiTietMuaHang,
    },

    {
      path: '/pmc/po/SetDay_PO_Material',
      name: 'SetDay_PO_Material',
      beforeEnter: ifAuthenticated,
      component: SetDay_PO_Material,
    },





    {
      path: '/pmc/po/ADD_QOUTE_Materal',
      name: 'ADD_QOUTE_Materal',
      component: ADD_QOUTE_Materal,

    },


    {
      path: '/pmc/po/ADD_PRICE_QOUTE_HDR',
      name: 'ADD_PRICE_QOUTE_HDR',
      beforeEnter: ifAuthenticated,
      component: ADD_PRICE_QOUTE_HDR,

    },

    {
      path: '/pmc/po/PRICEQOUTEPHASE',
      name: 'PRICEQOUTEPHASE',
      beforeEnter: ifAuthenticated,
      component: PRICEQOUTEPHASE,

    },
    {
      path: '/pmc/po/QLSuppliers',
      name: 'QLSuppliers',
      beforeEnter: ifAuthenticated,
      component: QLSuppliers,

    },
    {
      path: '/pmc/po/Shipment',
      name: 'Shipment',
      beforeEnter: ifAuthenticated,
      component: Shipment,

    },
    {
      path: '/po/MuaHang',
      name: 'MuaHang',
      beforeEnter: ifAuthenticated,
      component: MuaHang,

    },
    {
      path: '/po/MuaHang_Group',
      name: 'MuaHang_Group',
      beforeEnter: ifAuthenticated,
      component: MuaHang_Group,

    },
    {
      path: '/po/PO_ReadyVC',
      name: 'PO_ReadyVC',
      beforeEnter: ifAuthenticated,
      component: PO_ReadyVC,

    },
    //===========Virtium=================

    {
      path: '/Virtium/ReportInVirtium',
      name: 'ReportInVirtium',
      component: ReportInVirtium,
      beforeEnter: ifAuthenticated
    },

    //=================EMG============

    {
      path: '/emg/EMG_NhatKyBaoDuong',
      name: 'EMG_NhatKyBaoDuong',
      beforeEnter: ifAuthenticated,
      component: EMG_NhatKyBaoDuong,

    },

    {
      path: '/emg/EMGBOMHDR',
      name: 'EMGBOMHDR',
      beforeEnter: ifAuthenticated,
      component: EMGBOMHDR,

    },

    {
      path: '/emg/SparepartItems',
      name: 'SparepartItems',
      beforeEnter: ifAuthenticated,
      component: SparepartItems,

    },

    {
      path: '/emg/hieusuatDevice',
      name: 'hieusuatDevice',
      beforeEnter: ifAuthenticated,
      component: hieusuatDevice,

    },

    {
      path: '/emg/MaintenanceReport',
      name: 'MaintenanceReport',
      beforeEnter: ifAuthenticated,
      component: MaintenanceReport,

    },

    {
      path: '/emg/EMG_PrintEQU',
      name: 'EMG_PrintEQU',
      beforeEnter: ifAuthenticated,
      component: EMG_PrintEQU,

    },
    {
      path: '/emg/FormUpdateMaintenance',
      name: 'FormUpdateMaintenance',
      component: FormUpdateMaintenance,
      beforeEnter: ifAuthenticated
    },


    ///========================== Quản lý chất lượng

    {
      path: '/qc/Report_IQC_Material',
      name: 'Report_IQC_Material',
      component: Report_IQC_Material,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/qc/Report_IQC_PO',
      name: 'Report_IQC_PO',
      component: Report_IQC_PO,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/qc/Code_Defect_Project',
      name: 'Code_Defect_Project',
      component: Code_Defect_Project,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/qc/ItemCheckIQC',
      name: 'ItemCheckIQC',
      component: ItemCheckIQC,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/qc/FAI_DTL_Done',
      name: 'FAI_DTL_Done',
      component: FAI_DTL_Done,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/qc/Check_FAI_DTL',
      name: 'Check_FAI_DTL',
      component: Check_FAI_DTL,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/qc/CheckFAI',
      name: 'CheckFAI',
      component: CheckFAI,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/qc/SetUpMaterialFAI',
      name: 'SetUpMaterialFAI',
      component: SetUpMaterialFAI,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/qc/Report_IQCERR',
      name: 'Report_IQCERR',
      component: Report_IQCERR,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/qc/IQC_ERR_HDR',
      name: 'IQC_ERR_HDR',
      component: IQC_ERR_HDR,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/qc/CheckIQC',
      name: 'CheckIQC',
      component: CheckIQC,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/qc/TonghopQCPPMNgay',
      name: 'TonghopQCPPMNgay',
      component: TonghopQCPPMNgay,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/qc/phantichLoiFa',
      name: 'phantichLoiFa',
      component: phantichLoiFa,
      beforeEnter: ifAuthenticated
    },


    {
      path: '/qc/TongHopLoi_thoiGian',
      name: 'TongHopLoi_thoiGian',
      component: TongHopLoi_thoiGian,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/qc/ChartChatLuong',
      name: 'ChartChatLuong',
      component: ChartChatLuong,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/qc/ReportDefectShift',
      name: 'ReportDefectShift',
      component: ReportDefectShift,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/qc/CheckDefectDTL',
      name: 'CheckDefectDTL',
      component: CheckDefectDTL,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/qc/CheckFinalQC',
      name: 'CheckFinalQC',
      component: CheckFinalQC,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/qc/CheckQCProcess',
      name: 'CheckQCProcess',
      component: CheckQCProcess,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/qc/listDefectCode',
      name: 'listDefectCode',
      component: listDefectCode,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/qc/reportSlot_Material',
      name: 'reportSlotMaterial',
      component: reportSlotMaterial,
      beforeEnter: ifAuthenticated
    },

    ////////======================================

    {
      path: '/formAddTypeMaterial',
      name: 'AddTypeMaterial',
      beforeEnter: ifAuthenticated,
      component: formAddTypeMaterial,

    },
   

    {
      path: '/users',
      name: 'Users',
      beforeEnter: ifAuthenticated,
      component: Users,

    },

    {
      path: '/reportWO',
      name: 'reportWO',
      component: reportWO,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/UpdateTypeMaterial',
      name: 'UpdateTypeMaterial',
      component: UpdateTypeMaterial,
      beforeEnter: ifAuthenticated
    },
    //=========================== Dashboard ==================
    {
      path: '/DashBoard/DashBoardAllLineOnline',
      name: 'DashBoardAllLineOnline',
      component: DashBoardAllLineOnline
    },

    {
      path: '/DashBoard/INV_Dashboard',
      name: INV_Dashboard,
      component: INV_Dashboard
    },
    {
      path: '/DashBoard/DashboardProduc_day',
      name: 'DashboardProduc_day',
      component: DashboardProduc_day
    },
    {
      path: '/dashBoardLine',
      name: 'DashBoardLine',
      component: dashBoardLine
    },

    {
      path: '/DashBoard/DashBoardAllLine',
      name: 'DashBoardAllLine',
      component: DashBoardAllLine
    },

    {
      path: '/DashBoard/MES_Dashboard',
      name: 'MES_Dashboard',
      component: MES_Dashboard
    },
    //===========================================================
    {
      path: '/ViewListScheduPro',
      name: 'ViewListScheduPro',
      component: ViewListScheduPro,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/',
      name: 'Home',
      component: HelloWorld
    },
  
    //======================= WIP 

    {
      path: '/wip/TongHopNVLCuaKHSXBTP',
      name: 'TongHopNVLCuaKHSXBTP',
      component: TongHopNVLCuaKHSXBTP,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/wip/ShowUser_material_WO',
      name: 'ShowUser_material_WO',
      component: ShowUser_material_WO,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/wip/DS_NhuCauNLSX_ERP',
      name: 'DS_NhuCauNLSX_ERP',
      component: DS_NhuCauNLSX_ERP,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/wip/DS_NhuCauNLSX',
      name: 'DS_NhuCauNLSX',
      component: DS_NhuCauNLSX,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/wip/ShowPART_NUM_Xuat',
      name: 'ShowPART_NUM_Xuat',
      component: ShowPART_NUM_Xuat,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/wip/NhapKhoNguyenLieu_WIP',
      name: 'NhapKhoNguyenLieu_WIP',
      component: NhapKhoNguyenLieu_WIP,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/wip/BC_TonKhoNguyenLieu_WIP',
      name: 'BC_TonKhoNguyenLieu_WIP',
      component: BC_TonKhoNguyenLieu_WIP,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/wip/NhapKhoNguyenLieuTon_WIP',
      name: 'NhapKhoNguyenLieuTon_WIP',
      component: NhapKhoNguyenLieuTon_WIP,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/wip/ChuyenNguyenLieuWIP_PLAN',
      name: 'ChuyenNguyenLieuWIP_PLAN',
      component: ChuyenNguyenLieuWIP_PLAN,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/wip/ReportTongHopNVLCuaKHSXBTPOfDep',
      name: 'ReportTongHopNVLCuaKHSXBTPOfDep',
      component: ReportTongHopNVLCuaKHSXBTPOfDep,
      //beforeEnter: ifAuthenticated
    },

    {
      path: '/wip/ThatthoatNguyenLieuSX',
      name: 'ThatthoatNguyenLieuSX',
      component: ThatthoatNguyenLieuSX,
      beforeEnter: ifAuthenticated
    },


    {
      path: '/wip/NhanNguyenLieuSX',
      name: 'NhanNguyenLieuSX',
      component: NhanNguyenLieuSX,
      beforeEnter: ifAuthenticated,
    },

    {
      path: '/wip/QuanLyNLSX',
      name: 'QuanLyNLSX',
      component: QuanLyNLSX,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/wip/NhapKhoThanhPham',
      name: 'NhapKhoThanhPham',
      component: NhapKhoThanhPham,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/wip/ReportShift',
      name: 'ReportShift',
      component: ReportShift,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/wip/ReportTotalMateralPlanDTLPro',
      name: 'ReportTotalMateralPlanDTLPro',
      component: ReportTotalMateralPlanDTLPro,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/wip/RepostRequiseMaterialPlanPro',
      name: 'RepostRequiseMaterialPlanPro',
      component: RepostRequiseMaterialPlanPro,
      beforeEnter: ifAuthenticated
    },
    //======================INV =======================

    {
      path: '/inv/INV_SetStore',
      name: 'INV_SetStore',
      component: INV_SetStore,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/inv/INV_itemPhieuNhap',
      name: 'INV_itemPhieuNhap',
      component: INV_itemPhieuNhap,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/inv/taoPhieuNhanTuPhieuERP',
      name: 'taoPhieuNhanTuPhieuERP',
      component: taoPhieuNhanTuPhieuERP,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/inv/INV_QLPhieu_received',
      name: 'INV_QLPhieu_received',
      component: INV_QLPhieu_received,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/inv/taoPhieuGiaoTuPhieuERP',
      name: 'taoPhieuGiaoTuPhieuERP',
      component: taoPhieuGiaoTuPhieuERP,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/inv/DS_itemPhieuGiao_Require',
      name: 'DS_itemPhieuGiao_Require',
      component: DS_itemPhieuGiao_Require,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/inv/taoPhieuXuatNL_SX',
      name: 'taoPhieuXuatNL_SX',
      component: taoPhieuXuatNL_SX,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/inv/INV_QLPhieuGiaoNLSX_ERP',
      name: 'INV_QLPhieuGiaoNLSX_ERP',
      component: INV_QLPhieuGiaoNLSX_ERP,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/inv/DS_Material_DeNghiXuat',
      name: 'DS_Material_DeNghiXuat',
      component: DS_Material_DeNghiXuat,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/inv/PrintLableNguyenLieu',
      name: 'PrintLableNguyenLieu',
      component: PrintLableNguyenLieu,
      beforeEnter: ifAuthenticated
    },


    {
      path: '/inv/INV_SetItemErro',
      name: 'INV_SetItemErro',
      component: INV_SetItemErro,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/inv/INV_XoaLineEndTheKhoPosition',
      name: 'INV_XoaLineEndTheKhoPosition',
      component: INV_XoaLineEndTheKhoPosition,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/inv/SetMfrOfMaterial',
      name: 'SetMfrOfMaterial',
      component: SetMfrOfMaterial,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/inv/INV_itemPhieuGiao',
      name: 'INV_itemPhieuGiao',
      component: INV_itemPhieuGiao,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/inv/INV_QLPhieuGiaoNLSX',
      name: 'INV_QLPhieuGiaoNLSX',
      component: INV_QLPhieuGiaoNLSX,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/inv/MaterialObject',
      name: 'MaterialObject',
      component: MaterialObject,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/inv/TheKhoPosition',
      name: 'TheKhoPosition',
      component: TheKhoPosition,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/inv/updateImageItem',
      name: 'updateImageItem',
      component: updateImageItem
    },
    {
      path: '/inv/ReportOderItem',
      name: 'ReportOderItem',
      component: ReportOderItem,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/inv/chuyenVattu',
      name: 'chuyenVattu',
      component: chuyenVattu,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/inv/invkiemke',
      name: 'invkiemke',
      component: invkiemke,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/inv/chonVatTugiao',
      name: 'chonVatTugiao',
      component: invchonVatTugiao,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/inv/docking',
      name: 'invdocking',
      component: invdocking,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/inv/deliver',
      name: 'deliver',
      component: deliver,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/inv/received',
      name: 'received',
      component: received,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/inv/Stores',
      name: 'Stores',
      component: Stores,
      beforeEnter: ifAuthenticated
    },


    {
      path: '/inv/searchInfoPartNum',
      name: 'searchInfoPartNum',
      component: searchInfoPartNum,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/inv/Nhanhang',
      name: 'Nhanhang',
      component: Nhanhanggiao,
      beforeEnter: ifAuthenticated
    },

    //========================= WIN
    // code 10/06/2026
    {
      path: '/Production/TongHopShift',
      name: 'TongHopShift',
      component: TongHopShift,
      beforeEnter: ifAuthenticated,
    },

    // code 04/01/2026
    {
      path: '/Production/NhuCauXuatNLSX_LSX',
      name: 'NhuCauXuatNLSX_LSX',
      component: NhuCauXuatNLSX_LSX,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/Production/Form_SplitThungChua',
      name: 'Form_SplitThungChua',
      component: Form_SplitThungChua,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/Production/BCSanLuong',
      name: 'BCSanLuong',
      component: BCSanLuong,
      beforeEnter: ifAuthenticated
    },

    { // xác nhận phế phẩm sản xuất
      path: '/Production/XacNhanLoiProduc',
      name: 'XacNhanLoiProduc',
      component: XacNhanLoiProduc,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/Production/TonghopAllProducOfDays',
      name: 'TonghopAllProducOfDays',
      component: TonghopAllProducOfDays,
      beforeEnter: ifAuthenticated
    },


    {
      path: '/Production/tonghopNGDTL',
      name: 'tonghopNGDTL',
      component: tonghopNGDTL,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/Production/QLStopLine',
      name: 'QLStopLine',
      component: QLStopLine,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/Production/AllProduc_shift',
      name: 'AllProduc_shift',
      component: AllProduc_shift,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/Production/Rewok',
      name: 'Rewok',
      component: Rewok,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/Production/SetupIoT',
      name: 'SetupIoT',
      component: SetupIoT,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/Production/SetupThungChua',
      name: 'SetupThungChua',
      component: SetupThungChua,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/Production/PrintWIP',
      name: 'PrintWIP',
      component: PrintWIP,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/Production/GiaoNVLSX',
      name: 'GiaoNVLSX',
      component: GiaoNVLSX,
      beforeEnter: ifAuthenticated,
    },


    {
      path: '/Production/NhanNVLSX',
      name: 'NhanNVLSX',
      component: NhanNVLSX,
      beforeEnter: ifAuthenticated,
      beforeEnter: ifShift
    },
    // code 12/12/2021
    {
      path: '/Production/chotBTP',
      name: 'chotBTP',
      component: chotBTP,
      //beforeEnter: ifAuthenticated,
      //beforeEnter: ifShift
    },
    // code 25/05/2023
    {
      path: '/Production/YeucauNguyenLieuSX_LS',
      name: 'YeucauNguyenLieuSX_LS',
      component: YeucauNguyenLieuSX_LS,
      beforeEnter: ifAuthenticated
    },

    // code 07/12/2021
    {
      path: '/Production/YeucauNguyenLieu',
      name: 'YeucauNguyenLieu',
      component: YeucauNguyenLieu,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/Production/Thietlapline',
      name: 'Thietlapline',
      component: Thietlapline,
      beforeEnter: ifAuthenticated,
      //beforeEnter: ifShift
    },

    {
      path: '/Production/Closingshift',
      name: 'Closingshift',
      component: Closingshift,
      beforeEnter: ifAuthenticated,
      beforeEnter: ifShift
    },
    {
      path: '/Production/Creatershift',
      name: 'Creatershift',
      component: Creatershift,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/Production/QLBoPhanSX',
      name: 'QLBoPhanSX',
      component: QLBoPhanSX,
      beforeEnter: ifAuthenticated
    },
    //==================== PMC
    //------ MRP --------------------------------
    
    {
      path: '/pmc/po/CreaterShipment',
      name: 'CreaterShipment',
      component: CreaterShipment,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/MRP/PPV_PLAN_SOM',
      name: 'PPV_PLAN_SOM',
      component: PPV_PLAN_SOM,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/MRP/XuatBanDemand',
      name: 'XuatBanDemand',
      component: XuatBanDemand,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/pmc/MRP/CANCEL_PO',
      name: 'CANCEL_PO',
      component: CANCEL_PO,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/pmc/MRP/set_up_shipping',
      name: 'set_up_shipping',
      component: set_up_shipping,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/MRP/PO_Plan_Material_now_Schumacher',
      name: 'PO_Plan_Material_now_Schumacher',
      component: PO_Plan_Material_now_Schumacher,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/MRP/PO_Plan_Material_now',
      name: 'PO_Plan_Material_now',
      component: PO_Plan_Material_now,
      beforeEnter: ifAuthenticated
    },

  

    {
      path: '/pmc/BaoCao_YCXuat_SO',
      name: 'BaoCao_YCXuat_SO',
      component: BaoCao_YCXuat_SO,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/pmc/Sync_Material_ERP',
      name: 'Sync_Material_ERP',
      component: Sync_Material_ERP,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/BaoCaoTheoGioiKiemSoat_NLSX',
      name: 'BaoCaoTheoGioiKiemSoat_NLSX',
      component: BaoCaoTheoGioiKiemSoat_NLSX,
      beforeEnter: ifAuthenticated
    },

  

    {
      path: '/pmc/Demand_Group_PO',
      name: 'Demand_Group_PO',
      component: Demand_Group_PO,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/BomGia_DTL_Project',
      name: 'BomGia_DTL_Project',
      component: BomGia_DTL_Project,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/DashBoard_kehoach',
      name: 'DashBoard_kehoach',
      component: DashBoard_kehoach,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/Shedule_dtl_line',
      name: 'Shedule_dtl_line',
      component: Shedule_dtl_line,
      beforeEnter: ifAuthenticated
    },



    {
      path: '/pmc/Update_Manufacturer_Material',
      name: 'Update_Manufacturer_Material',
      component: Update_Manufacturer_Material,
      beforeEnter: ifAuthenticated
    },

    //24/10/2023
    {
      path: '/pmc/BI_WO_Month',
      name: 'BI_WO_Month',
      component: BI_WO_Month,
      beforeEnter: ifAuthenticated
    },
    // 23/07/2023
    {
      path: '/pmc/setMaterialWastage',
      name: 'setMaterialWastage',
      component: setMaterialWastage,
      beforeEnter: ifAuthenticated
    },


    // 28/02/2023
    {
      path: '/pmc/form_setScheDuPro',
      name: 'form_setScheDuPro',
      component: form_setScheDuPro,
      beforeEnter: ifAuthenticated
    },

    // 21/02/2023
    {
      path: '/pmc/PART_UPDATE_PLAN',
      name: 'PART_UPDATE_PLAN',
      component: PART_UPDATE_PLAN,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/manufacturer_material',
      name: 'manufacturer_material',
      component: manufacturer_material,
      beforeEnter: ifAuthenticated
    },

    /// ------ MPS--------------------

    {
      path: '/pmc/ShowBOM_WO',
      name: 'ShowBOM_WO',
      component: ShowBOM_WO,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/pmc/MPS/Sum_ALL_PLAN_WO',
      name: 'Sum_ALL_PLAN_WO',
      component: Sum_ALL_PLAN_WO,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/MPS/MPSCreaterWO',
      name: 'MPSCreaterWO',
      component: MPSCreaterWO,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/chuyenBoPhanLamViec',
      name: 'chuyenBoPhanLamViec',
      component: chuyenBoPhanLamViec,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/XacNhanMuaNL',
      name: 'XacNhanMuaNL',
      component: XacNhanMuaNL,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/DemandsTheoDoiMateral',
      name: 'DemandsTheoDoiMateral',
      component: DemandsTheoDoiMateral,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/Form_TongHopBoSungNL',
      name: 'Form_TongHopBoSungNL',
      component: Form_TongHopBoSungNL,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/DamendsCaculationMaterial',
      name: 'DamendsCaculationMaterial',
      component: DamendsCaculationMaterial,
      beforeEnter: ifAuthenticated
    },




    {
      path: '/pmc/lotClosing',
      name: 'PlanlotClosing',
      component: PlanlotClosing,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/pmc/PlanSchedulePro',
      name: 'PlanSchedulePro',
      component: PlanSchedulePro,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/pmc/plans',
      name: 'project',
      component: Plans,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/pmc/MaterialExist',
      name: 'MaterialExist',
      component: MaterialExist,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/pmc/MaterialRequirement',
      name: 'MaterialRequirement',
      component: MaterialRequirementContaine,
      beforeEnter: ifAuthenticated
    },

    
    //=========================================

    //========================================

    {
      path: '/emg/MaintenanceEMG_Report',
      name: 'MaintenanceEMG_Report',
      component: MaintenanceEMG_Report,
    },

    {
      path: '/emg/Plan_maintenance',
      name: 'Plan_maintenance',
      component: Plan_maintenance,
      beforeEnter: ifAuthenticated
    },

    {
      path: '/emg/equipments',
      name: 'equipments',
      component: equipments,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/emg/getListDevice',
      name: 'getListDevice',
      component: Device,
      beforeEnter: ifAuthenticated
    }
    //===============================================
    ,
    {
      path: '/wip/router',
      name: 'Route',
      component: Route,
      beforeEnter: ifAuthenticated
    }

  ]
})
