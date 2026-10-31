import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isoWeek from 'dayjs/plugin/isoWeek'
dayjs.extend(customParseFormat)
dayjs.extend(isoWeek)

 function formatCurrency(value: number, currencyCode: string) {
    switch (currencyCode) {
        case "VND":
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(Math.round(value || 0)));
        case "USD":
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0));
        case "EUR":
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(value || 0)); 
        case "JPY":
            return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(Number(value || 0)); 
        case "GBP":
            return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(Number(value || 0)); 
        case "CNY":
            return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(Number(value || 0));
        default:
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value || 0));
    }
}

function readVietnameseNumber(num: number) {
    if (num === 0) return "không";

    const units = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];
    const digits = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];

    // Hàm đọc nhóm 3 chữ số (ví dụ: 105 -> một trăm linh năm)
    function readThreeDigits(n: number, isLastGroup: boolean) {
        let res = "";
        let hundreds = Math.floor(n / 100);
        let tens = Math.floor((n % 100) / 10);
        let ones = n % 10;

        // Đọc hàng trăm
        if (hundreds > 0 || !isLastGroup) {
            res += digits[hundreds] + " trăm ";
        }

        // Đọc hàng chục
        if (tens > 0) {
            if (tens === 1) res += "mười ";
            else res += digits[tens] + " mươi ";
        } else if (hundreds > 0 && ones > 0) {
            res += "linh "; // Hoặc "lẻ " tùy vùng miền
        }

        // Đọc hàng đơn vị
        if (tens > 0 && ones > 0) {
            if (ones === 1 && tens > 1) res += "mốt";
            else if (ones === 5) res += "lăm";
            else res += digits[ones];
        } else if (ones > 0) {
            res += digits[ones];
        }

        return res.trim();
    }

    let res = "";
    let groupIndex = 0;
    let strNum = Math.floor(Math.abs(num)).toString();

    // Chia số thành từng nhóm 3 chữ số từ phải sang trái
    while (strNum.length > 0) {
        let chunk = "";
        if (strNum.length > 3) {
            chunk = strNum.slice(-3);
            strNum = strNum.slice(0, -3);
        } else {
            chunk = strNum;
            strNum = "";
        }

        let chunkInt = parseInt(chunk);
        if (chunkInt > 0) {
            let chunkWords = readThreeDigits(chunkInt, strNum === "");
            res = chunkWords + " " + units[groupIndex] + " " + res;
        } else if (groupIndex === 3 && chunkInt === 0 && strNum.length > 0) {
            // Xử lý riêng trường hợp đơn vị "tỷ"
            res = units[groupIndex] + " " + res;
        }

        groupIndex++;
    }

    // Xử lý số âm
    if (num < 0) res = "âm " + res;

    return res.trim().replace(/\s+/g, ' ');
}

function numberToWordsWithDecimals(n: number) {
    // Tách số thành phần nguyên và phần thập phân (lấy 2 chữ số)
    const parts = n.toString().split(".");
    const integerPart = parseInt(parts[0]);
    const decimalPart = parts[1] ? parts[1].substring(0, 2) : null;

    // Sử dụng lại hàm readVietnameseNumber đã viết ở trên cho phần nguyên
    let result = readVietnameseNumber(integerPart);

    // Xử lý phần thập phân
    if (decimalPart) {
        const ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
        result += " point";

        // Đọc từng chữ số một cách riêng biệt (quy tắc chuẩn tiếng Anh)
        for (let char of decimalPart) {
            result += " " + ones[parseInt(char)];
        }
    }

    return result;
}

function numberToWords(num: number) {
    if (num === 0) return "zero";

    const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];

    const scales = ["", "thousand", "million", "billion"];

    // Hàm xử lý nhóm 3 chữ số (ví dụ: 123 -> one hundred twenty three)
    function helper(n: number) {
        let str = "";
        if (n >= 100) {
            str += ones[Math.floor(n / 100)] + " hundred ";
            n %= 100;
        }
        if (n >= 10 && n <= 19) {
            str += teens[n - 10] + " ";
        } else if (n >= 20) {
            str += tens[Math.floor(n / 10)] + " " + ones[n % 10] + " ";
        } else if (n > 0) {
            str += ones[n] + " ";
        }
        return str.trim();
    }

    let result = "";
    let scaleIndex = 0;

    while (num > 0) {
        let chunk = num % 1000;
        if (chunk !== 0) {
            let chunkStr = helper(chunk);
            result = chunkStr + (scales[scaleIndex] ? " " + scales[scaleIndex] : "") + " " + result;
        }
        num = Math.floor(num / 1000);
        scaleIndex++;
    }

    return result.trim();
}

const WindowOpen_CapNhatMaNL = (PartNum: string) => {
    let src = ''
    src = '/UpdateTypeMaterial?partNum=' + PartNum
    window.open(src, 'newWin', 'fullscreen=yes, scrollbars=auto,width=600,height=380, titlebar=no')
}
const Pro_Tuan = (item: string, format: string) => {
    const date = dayjs(item, format, true)
    return date.isValid() ? date.isoWeek() : null
}
const onchangefocus = (arrCtr: string[], id: string) => {
    if (!arrCtr.length) return

    let idx = -1
    arrCtr.forEach((element, index) => {
        if (element == id) { idx = index }
    });
    if (idx == arrCtr.length - 1) { idx = 0 }
    else { idx ++ }
    const nextElement = document.getElementById(arrCtr[idx]) as HTMLInputElement | null
    if (!nextElement) return;
    nextElement.focus();
    nextElement.value = ""
}
const getItemSplit = (Xau: string, textSplit: string, vitri = 0) => {
    if (Xau.split(textSplit).length > vitri) {
        return Xau.split("*")[vitri]
    } else return ""
}
const getPartNuScan = (XauScan: string) => {
    if (XauScan.includes("*")) {
        return {
            code: XauScan.split("*")[0],
            qty: XauScan.split("*")[3],
            IRL_ID: XauScan.split("*")[4]
        }
    }
    if (XauScan.includes(" ")) {
        if (XauScan.split(" ").length > 4) {
            return {
                code: XauScan.split(" ")[0],
                qty: XauScan.split(" ")[4]
            }
        } else {
            return {
                code: XauScan,
                qty: 0
            }
        }

    }
    return {
        code: XauScan.split("*")[0],
        qty: null
    }

    // let regular_tenPao=/^[0-9]{5}-[0-9]{5}-[0-9]{2}/
    // let regular_Virtium=/^[0-9]{2}-[0-9]{5}-[0-9]{2}-[0-9]/

    // let reArrayTP = regular_tenPao.exec(XauScan);
    // let reArrayVT = regular_Virtium.exec(XauScan);
    // console.log('reArrayTP',reArrayTP, 'reArrayVT',reArrayVT);
    // if (!regular_tenPao){
    //     return reArrayTP[0]
    // }
    // if(!reArrayVT ){
    //     return reArrayVT[0]
    // }
}
const objToParaString = (obj: Record<string, any>) => {
    let str = '';
    for (let key in obj) {
        str += `&${key}=${obj[key]}`;
    }
    return str.substring(1)
}

const getCONTAINER_Code = (value: string) => {
    let code = value.trim()
    switch (code.length) {
        case 1:
            code = 'CCT64000' + code
            break;
        case 2:
            code = 'CCT6400' + code
            break;
        case 3:
            code = 'CCT640' + code
            break;
        case 4:
            code = 'CCT64' + code
            break;
        default:
            break;
    }
    return code
}
const iscodeQRBo = (code_bo: string) => {
    let re = /^PBA-\d{4}-\d{6}$/// mã chính quy theo chuẩn mã PCB
    let sp = /^\d{4}-\d{5}$/
    let test = true
    if (re.test(code_bo)) {
        return re.test(code_bo)
    }
    // if(sp.test(code_bo)){
    //     return sp.test(code_bo)
    // }
    return false
}
// Xác định mã đầu của bo lớn có bộ n 
const madauQR_B = (code_bo: string, boi: number, last_num: number) => {
    let so_bo_dau = 0
    if (code_bo.length > 15) { return 0 }
    if (iscodeQRBo(code_bo) == false) { return 0 }
    else {
        so_bo_dau = Math.floor(parseInt(code_bo.substring(9, 15)) / boi)
        //console.log(so_bo_dau, last_num);
        if (so_bo_dau == last_num) {
            return 0
        } else {
            return so_bo_dau
        }
    }
}

const formatNumber = (num: number, n_FractionDigits: number) => {
    return new Intl.NumberFormat('vi-VN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: n_FractionDigits
    }).format(num);
}


const taoxauNgauNhien = (n: number) => {
    const result = Math.random().toString(36).substring(2, n)
    return result
}
export {
    WindowOpen_CapNhatMaNL,
    onchangefocus,
    getPartNuScan,
    objToParaString,
    getCONTAINER_Code,
    madauQR_B,
    iscodeQRBo,
    taoxauNgauNhien,
    getItemSplit,
    Pro_Tuan,
    formatNumber,
    numberToWords,
    numberToWordsWithDecimals,
    readVietnameseNumber,
    formatCurrency,
}