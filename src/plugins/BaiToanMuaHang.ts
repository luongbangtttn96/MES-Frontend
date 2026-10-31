import solverModule from 'javascript-lp-solver';

const model = {
    optimize: "capacity",
    opType: "max",
    constraints: {
        plane: { max: 44 },
        person: { max: 512 },
        cost: { max: 300000 },
    },
    variables: {
        brit: { capacity: 20000, plane: 1, person: 8, cost: 5000 },
        yank: { capacity: 30000, plane: 1, person: 16, cost: 9000 },
    },
};
var solver = solverModule;
//const solver = solverModule && solverModule.default ? solverModule.default : solverModule;

/** Dòng nhu cầu (BOM / yêu cầu báo giá) */
export interface DemandItem {
  QMA_SIP?: string;
  DESCRIPTION?: string;
  MATERIAL_CODE?: string;
  PROFIT_MARGIN: number;
  MinTime?: unknown;
 
  CUR_CODE?: string | null;
  UNIT_PRICE?: number | null;
  UNIT_COST_MIN?: number | null;
  DATECODE?: string | null;
  EXPIRY_DATE?: string | null;
  LEADTIME?: number | string | null;
  MFR_NAME?: string | null;
  MOQ?: number | null;
  NCNR?: string | boolean | null;
  SPQ?: number | null;
  SUP_ID?: string | number | null;
  UNIT_COST?: number | null;
  NAME?: string | null;
  [key: string]: unknown;
}

/** Dòng báo giá của nhà cung cấp theo vật tư */
export interface MaterialSupplier {
  QMA_SIP?: string;
  DESCRIPTION?: string;
  MATERIAL_CODE?: string;
  CUR_CODE?: string;
  UNIT_PRICE: number;
  MIN_PRICE?: number | null;
  DATECODE?: string | null;
  EXPIRY_DATE?: string | null;
  LEADTIME?: number | string | null;
  MFR_NAME?: string | null;
  MOQ?: number | null;
  NCNR?: string | boolean | null;
  SPQ?: number | null;
  SUP_ID?: string | number | null;
  SUPPLIERS_NAME?: string | null;
  [key: string]: unknown;
}

export interface Supplier {
  freight: number;
  prices: Record<string, number>;
}

export interface LpConstraint {
  equal?: number;
  max?: number;
  min?: number;
}
 
export interface LpModel {
  optimize: string;
  opType: 'min' | 'max';
  constraints: Record<string, LpConstraint>;
  variables: Record<string, Record<string, number>>;
  ints: Record<string, 1>;
}
 
export interface LpResult {
  feasible: boolean;
  result: number;
  bounded?: boolean;
  [key: string]: number | boolean | undefined;
}
 
export interface AllocationItem {
  partNum: string;
  supplierId: string;
  quantity: number;
  unitPrice: number;
}
 
export interface SolveOutput {
  feasible: boolean;
  message: string;
  result: number | null;
  raw: LpResult | null;
  allocation: AllocationItem[];
}

// -------------------------------------------------------------
// Solver resolver
// -------------------------------------------------------------

export function giaiBaiToanMuaHang(demand: Record<string, number>, suppliers:Record<string, Supplier>) {
  console.log('Demand:', demand, 'Suppliers:', suppliers);
  // -------------------------------------------------------------
  // 1. Dữ liệu đầu vào (Sample Data)
  // -------------------------------------------------------------
  /* const demand = {
  //   Mã_A: 100,
  //   Mã_B: 150,
  //   Mã_C: 200,
  //   Mã_D: 80
  // };

  // const suppliers = {
  //   NCC_HaNoi: {
  //     freight: 500,
  //     prices: { Mã_A: 10, Mã_B: 12, Mã_D: 25 } // Mã_C không cung cấp
  //   },
  //   NCC_DaNang: {
  //     freight: 1200,
  //     prices: { Mã_A: 12, Mã_B: 14, Mã_C: 15, Mã_D: 20 }
  //   },
  //   NCC_HCM: {
  //     freight: 300,
  //     prices: { Mã_A: 8, Mã_C: 16, Mã_D: 22 } // Mã_B không cung cấp
  //   }
  // };
 */
  // -------------------------------------------------------------
  // 2. Dựng Cấu trúc Mô hình (Model Structure) cho LP Solver
  // -------------------------------------------------------------
  const model: LpModel = {
    optimize: 'totalCost',
    opType: 'min',
    constraints: {},
    variables: {},
    ints: {} // Khai báo các biến số nguyên / nhị phân
  };

  // A. Thêm các ràng buộc về nhu cầu sản phẩm (Demand constraints)
  Object.keys(demand).forEach(item => {
    const qty = Number(demand[item]);
    if (Number.isFinite(qty) && qty > 0) {
      model.constraints[`demand_${item}`] = { equal: qty };
    }
  });

  const demandKeys = Object.keys(model.constraints)
    .filter(key => key.startsWith('demand_'))
    .map(key => key.replace('demand_', ''));

  if (demandKeys.length === 0) {
    return {
      feasible: false,
      message: 'Khong co nhu cau mua hop le de toi uu',
      result: null,
      raw: null,
      allocation: []
    };
  }

  // B. Tạo các biến số lượng mua x[i, j] và biến nhị phân y[j]
  Object.keys(suppliers).forEach(supKey => {
    const sup = suppliers[supKey];

    // Biến nhị phân y[j]: 1 nếu chọn mua từ NCC này, 0 nếu không
    const yVarName = `y_${supKey}`;
    model.variables[yVarName] = {
      totalCost: sup.freight
    };
    // Đánh dấu yVarName là biến nhị phân (Binary Variable: 0 hoặc 1)
    model.ints[yVarName] = 1;
    model.constraints[yVarName] = { max: 1 };

    // Biến số lượng mua x[i, j]
    Object.keys(sup.prices).forEach(itemKey => {
      if (!Object.prototype.hasOwnProperty.call(model.constraints, `demand_${itemKey}`)) {
        return;
      }

      const price = Number(sup.prices[itemKey]);
      if (!Number.isFinite(price) || price < 0) {
        return;
      }

      const xVarName = `x_${itemKey}_${supKey}`;
      const itemDemand = Number(demand[itemKey]);

      if (!Number.isFinite(itemDemand) || itemDemand <= 0) {
        return;
      }

      // Biến x liên quan đến: Chi phí đơn giá, Ràng buộc nhu cầu mã hàng, Ràng buộc Big-M với y
      model.variables[xVarName] = {
        totalCost: price,
        [`demand_${itemKey}`]: 1,
        // Ràng buộc Big-M: x[i,j] - M * y[j] <= 0  <=>  x[i,j] - itemDemand * y[j] <= 0
        [`link_${xVarName}`]: 1
      };

      // Đơn giản hóa ràng buộc kích hoạt chi phí ship (x <= Demand * y)
      model.constraints[`link_${xVarName}`] = { max: 0 };
      model.variables[yVarName][`link_${xVarName}`] = -itemDemand;
    });
  });

  const hasDecisionVar = Object.keys(model.variables).some(key => key.startsWith('x_'));
  if (!hasDecisionVar) {
    return {
      feasible: false,
      message: 'Khong co bao gia hop le de lap bai toan toi uu',
      result: null,
      raw: null,
      allocation: []
    };
  }

  // -------------------------------------------------------------
  // 3. Tiến hành giải mô hình (Solve)
  // -------------------------------------------------------------
  const solveFn = typeof solver.Solve === 'function'
    ? solver.Solve.bind(solver)
    : (typeof solver.Solve === 'function'
      ? solver.Solve.bind(solver)
      : (solverModule && solverModule.Default && typeof solverModule.default.Solve === 'function'
        ? solverModule.default.Solve.bind(solverModule.default)
        : null));

  if (!solveFn) {
    throw new Error('javascript-lp-solver API không hợp lệ: thiếu hàm Solve/solve');
  }

  const results = solveFn(model);

  console.log('=== KẾT QUẢ GIẢI BÀI TOÁN MUA HÀNG ===', model);
  // -------------------------------------------------------------
  // 4. Hiển thị kết quả
  // -------------------------------------------------------------
  if (results && results.feasible) {
    console.log(`=== TỔNG CHI PHÍ TỐI ƯU NHẤT: $${results.result.toLocaleString()} ===\n`);

    Object.keys(suppliers).forEach(supKey => {
      const yVal = results[`y_${supKey}`] || 0;
      if (yVal > 0.5) {
        console.log(`📦 Chọn Nhà Cung Cấp: ${supKey} (Chi phí vận chuyển: $${suppliers[supKey].freight})`);

        Object.keys(suppliers[supKey].prices).forEach(itemKey => {
          const qty = results[`x_${itemKey}_${supKey}`] || 0;
          if (qty > 0) {
            const price = suppliers[supKey].prices[itemKey];
            console.log(`   • ${itemKey}: ${qty} đơn vị | Đơn giá: $${price} | Thành tiền: $${(qty * price).toLocaleString()}`);
          }
        });
        console.log('-'.repeat(60));
      }
    });
  } else {
    console.log('Không tìm thấy phương án đáp ứng đủ các ràng buộc.');
  }

  const allocation: AllocationItem[] = [];
  if (results && results.feasible) {
    Object.keys(suppliers).forEach(supKey => {
      Object.keys(suppliers[supKey].prices).forEach(itemKey => {
        const xVarName = `x_${itemKey}_${supKey}`;
        const qty = Number(results[xVarName] || 0);
        if (qty > 0) {
          allocation.push({
            partNum: itemKey,
            supplierId: supKey,
            quantity: qty,
            unitPrice: Number(suppliers[supKey].prices[itemKey])
          });
        }
      });
    });
  }

  return {
    feasible: !!(results && results.feasible),
    message: results && results.feasible
      ? 'Tim thay phuong an toi uu'
      : 'Khong tim thay phuong an dap ung rang buoc',
    result: results && Number.isFinite(results.result) ? results.result : null,
    raw: results || null,
    allocation
  };
}

// -------------------------------------------------------------
// 2. Chọn NCC có đơn giá thấp nhất cho từng dòng nhu cầu
// -------------------------------------------------------------

export function giaiBaiToanMuaHang_min(demand : DemandItem[], Material_suppliers: MaterialSupplier[]): DemandItem[] {

  demand.forEach(item => {
    if(item.MinTime) return;
    
    console.log('Supplier for', item);
    item.CUR_CODE='';
    item.UNIT_PRICE=null ;
    item.UNIT_COST_MIN=null ;
    item.DATECODE=null ;
    item.EXPIRY_DATE=null ;
    item.LEADTIME=null ;
    item.MFR_NAME=null ;
    item.MOQ=null ;
    item.NCNR=null ;
    item.SPQ=null ;
    item.SUP_ID=null ;
    item.UNIT_COST=null ;
    item.NAME=null ;

    const supplier = Material_suppliers.filter(sup => sup.QMA_SIP === item.QMA_SIP && sup.DESCRIPTION === item.DESCRIPTION && sup.UNIT_PRICE > 0)
        .sort((a, b) => a.UNIT_PRICE - b.UNIT_PRICE)[0];
    if (supplier) {
      item.MATERIAL_CODE=supplier.MATERIAL_CODE || item.MATERIAL_CODE;
      item.CUR_CODE=supplier ? supplier.CUR_CODE : 'VND';
      item.UNIT_PRICE=supplier.UNIT_PRICE* (100+item.PROFIT_MARGIN)/100 ;
      item.UNIT_COST_MIN=supplier.MIN_PRICE ;
      item.DATECODE=supplier.DATECODE ;
      item.EXPIRY_DATE=supplier.EXPIRY_DATE ;
      item.LEADTIME=supplier.LEADTIME ;
      item.MFR_NAME=supplier.MFR_NAME ;
      item.MOQ=supplier.MOQ ;
      item.NCNR=supplier.NCNR ;
      item.SPQ=supplier.SPQ ;
      item.SUP_ID=supplier.SUP_ID ;
      item.UNIT_COST=supplier.UNIT_PRICE ;
      item.NAME=supplier.SUPPLIERS_NAME ;
      //console.log('Selected supplier for', item.NAME, supplier.SUPPLIERS_NAME);
    }
  });
  return demand
}