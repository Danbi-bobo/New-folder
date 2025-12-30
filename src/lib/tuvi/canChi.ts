/**
 * Thiên Can, Địa Chi, Ngũ Hành và các hàm tính toán
 * (c) 2016 doanguyen - Ported to TypeScript
 */

import { S2L, L2S, jdFromDate } from './calendar';

// ============== THIÊN CAN ==============
export interface ThienCanInfo {
    id: number;
    chuCaiDau: string | null;
    tenCan: string | null;
    nguHanh: string | null;
    nguHanhID: number | null;
    vitriDiaBan: number | null;
    amDuong: number | null;
}

export const thienCan: ThienCanInfo[] = [
    { id: 0, chuCaiDau: null, tenCan: null, nguHanh: null, nguHanhID: null, vitriDiaBan: null, amDuong: null },
    { id: 1, chuCaiDau: "G", tenCan: "Giáp", nguHanh: "M", nguHanhID: 2, vitriDiaBan: 3, amDuong: 1 },
    { id: 2, chuCaiDau: "A", tenCan: "Ất", nguHanh: "M", nguHanhID: 2, vitriDiaBan: 4, amDuong: -1 },
    { id: 3, chuCaiDau: "B", tenCan: "Bính", nguHanh: "H", nguHanhID: 4, vitriDiaBan: 6, amDuong: 1 },
    { id: 4, chuCaiDau: "D", tenCan: "Đinh", nguHanh: "H", nguHanhID: 4, vitriDiaBan: 7, amDuong: -1 },
    { id: 5, chuCaiDau: "M", tenCan: "Mậu", nguHanh: "O", nguHanhID: 5, vitriDiaBan: 6, amDuong: 1 },
    { id: 6, chuCaiDau: "K", tenCan: "Kỷ", nguHanh: "O", nguHanhID: 5, vitriDiaBan: 7, amDuong: -1 },
    { id: 7, chuCaiDau: "C", tenCan: "Canh", nguHanh: "K", nguHanhID: 1, vitriDiaBan: 9, amDuong: 1 },
    { id: 8, chuCaiDau: "T", tenCan: "Tân", nguHanh: "K", nguHanhID: 1, vitriDiaBan: 10, amDuong: -1 },
    { id: 9, chuCaiDau: "N", tenCan: "Nhâm", nguHanh: "T", nguHanhID: 3, vitriDiaBan: 12, amDuong: 1 },
    { id: 10, chuCaiDau: "Q", tenCan: "Quý", nguHanh: "T", nguHanhID: 3, vitriDiaBan: 1, amDuong: -1 },
];

// ============== ĐỊA CHI ==============
export interface DiaChiInfo {
    id: number;
    tenChi: string;
    tenHanh: string;
    menhChu?: string;
    thanChu?: string;
    amDuong: number;
}

export const diaChi: DiaChiInfo[] = [
    { id: 0, tenChi: "Hem có", tenHanh: ":D", amDuong: 0 },
    { id: 1, tenChi: "Tý", tenHanh: "T", menhChu: "Tham lang", thanChu: "Linh tinh", amDuong: 1 },
    { id: 2, tenChi: "Sửu", tenHanh: "O", menhChu: "Cự môn", thanChu: "Thiên tướng", amDuong: -1 },
    { id: 3, tenChi: "Dần", tenHanh: "M", menhChu: "Lộc tồn", thanChu: "Thiên lương", amDuong: 1 },
    { id: 4, tenChi: "Mão", tenHanh: "M", menhChu: "Văn khúc", thanChu: "Thiên đồng", amDuong: -1 },
    { id: 5, tenChi: "Thìn", tenHanh: "O", menhChu: "Liêm trinh", thanChu: "Văn xương", amDuong: 1 },
    { id: 6, tenChi: "Tỵ", tenHanh: "H", menhChu: "Vũ khúc", thanChu: "Thiên cơ", amDuong: -1 },
    { id: 7, tenChi: "Ngọ", tenHanh: "H", menhChu: "Phá quân", thanChu: "Hỏa tinh", amDuong: 1 },
    { id: 8, tenChi: "Mùi", tenHanh: "O", menhChu: "Vũ khúc", thanChu: "Thiên tướng", amDuong: -1 },
    { id: 9, tenChi: "Thân", tenHanh: "K", menhChu: "Liêm trinh", thanChu: "Thiên lương", amDuong: 1 },
    { id: 10, tenChi: "Dậu", tenHanh: "K", menhChu: "Văn khúc", thanChu: "Thiên đồng", amDuong: -1 },
    { id: 11, tenChi: "Tuất", tenHanh: "O", menhChu: "Lộc tồn", thanChu: "Văn xương", amDuong: 1 },
    { id: 12, tenChi: "Hợi", tenHanh: "T", menhChu: "Cự môn", thanChu: "Thiên cơ", amDuong: -1 },
];

// ============== NGŨ HÀNH ==============
export interface NguHanhInfo {
    id: number;
    tenHanh: string;
    cuc: number;
    tenCuc: string;
    css: string;
}

export function nguHanh(tenHanh: string): NguHanhInfo {
    if (tenHanh === "Kim" || tenHanh === "K") {
        return { id: 1, tenHanh: "Kim", cuc: 4, tenCuc: "Kim tứ Cục", css: "hanhKim" };
    } else if (tenHanh === "Moc" || tenHanh === "M") {
        return { id: 2, tenHanh: "Mộc", cuc: 3, tenCuc: "Mộc tam Cục", css: "hanhMoc" };
    } else if (tenHanh === "Thuy" || tenHanh === "T") {
        return { id: 3, tenHanh: "Thủy", cuc: 2, tenCuc: "Thủy nhị Cục", css: "hanhThuy" };
    } else if (tenHanh === "Hoa" || tenHanh === "H") {
        return { id: 4, tenHanh: "Hỏa", cuc: 6, tenCuc: "Hỏa lục Cục", css: "hanhHoa" };
    } else if (tenHanh === "Tho" || tenHanh === "O") {
        return { id: 5, tenHanh: "Thổ", cuc: 5, tenCuc: "Thổ ngũ Cục", css: "hanhTho" };
    }
    throw new Error("Tên Hành phải thuộc Kim (K), Mộc (M), Thủy (T), Hỏa (H) hoặc Thổ (O)");
}

// ============== SINH KHẮC ==============
export function sinhKhac(hanh1: number, hanh2: number): number | { i: number } {
    const matranSinhKhac: (number | null | { i: number })[][] = [
        [null, null, null, null, null, null],
        [null, 0, -1, 1, { i: -1 }, { i: 1 }],
        [null, { i: -1 }, 0, { i: 1 }, 1, -1],
        [null, { i: 1 }, 1, 0, 1, { i: -1 }],
        [null, -1, { i: 1 }, { i: -1 }, 0, 1],
        [null, 1, { i: -1 }, -1, { i: 1 }, 0]
    ];
    return matranSinhKhac[hanh1][hanh2] as number | { i: number };
}

// ============== NẠP ÂM ==============
const banMenh: Record<string, string> = {
    "K1": "HẢI TRUNG KIM", "T1": "GIÁNG HẠ THỦY", "H1": "TÍCH LỊCH HỎA",
    "O1": "BÍCH THƯỢNG THỔ", "M1": "TANG ĐỐ MỘC", "T2": "ĐẠI KHÊ THỦY",
    "H2": "LƯ TRUNG HỎA", "O2": "THÀNH ĐẦU THỔ", "M2": "TÒNG BÁ MỘC",
    "K2": "KIM BẠCH KIM", "H3": "PHÚ ĐĂNG HỎA", "O3": "SA TRUNG THỔ",
    "M3": "ĐẠI LÂM MỘC", "K3": "BẠCH LẠP KIM", "T3": "TRƯỜNG LƯU THỦY",
    "K4": "SA TRUNG KIM", "T4": "THIÊN HÀ THỦY", "H4": "THIÊN THƯỢNG HỎA",
    "O4": "LỘ BÀN THỔ", "M4": "DƯƠNG LIỄU MỘC", "T5": "TRUYỀN TRUNG THỦY",
    "H5": "SƠN HẠ HỎA", "O5": "ĐẠI TRẠCH THỔ", "M5": "THẠCH LỰU MỘC",
    "K5": "KIẾM PHONG KIM", "H6": "SƠN ĐẦU HỎA", "O6": "ỐC THƯỢNG THỔ",
    "M6": "BÌNH ĐỊA MỘC", "K6": "XOA XUYẾN KIM", "T6": "ĐẠI HẢI THỦY"
};

const matranNapAm: (number | string | false)[][] = [
    [0, "G", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "N", "Q"],
    [1, "K1", false, "T1", false, "H1", false, "O1", false, "M1", false],
    [2, false, "K1", false, "T1", false, "H1", false, "O1", false, "M1"],
    [3, "T2", false, "H2", false, "O2", false, "M2", false, "K2", false],
    [4, false, "T2", false, "H2", false, "O2", false, "M2", false, "K2"],
    [5, "H3", false, "O3", false, "M3", false, "K3", false, "T3", false],
    [6, false, "H3", false, "O3", false, "M3", false, "K3", false, "T3"],
    [7, "K4", false, "T4", false, "H4", false, "O4", false, "M4", false],
    [8, false, "K4", false, "T4", false, "H4", false, "O4", false, "M4"],
    [9, "T5", false, "H5", false, "O5", false, "M5", false, "K5", false],
    [10, false, "T5", false, "H5", false, "O5", false, "M5", false, "K5"],
    [11, "H6", false, "O6", false, "M6", false, "K6", false, "T6", false],
    [12, false, "H6", false, "O6", false, "M6", false, "K6", false, "T6"]
];

export function nguHanhNapAm(diaChiVal: number, thienCanVal: number, xuatBanMenh: boolean = false): string {
    const nh = matranNapAm[diaChiVal][thienCanVal];
    if (typeof nh === 'string' && ["K", "M", "T", "H", "O"].includes(nh[0])) {
        if (xuatBanMenh) {
            return banMenh[nh] || nh;
        }
        return nh[0];
    }
    throw new Error("Không thể tính Nạp Âm");
}

// ============== NGÀY THÁNG NĂM ==============
export function ngayThangNam(nn: number, tt: number, nnnn: number, duongLich: boolean = true, timeZone: number = 7): [number, number, number, number] {
    if (nn > 0 && nn < 32 && tt < 13 && tt > 0) {
        if (duongLich) {
            return S2L(nn, tt, nnnn, timeZone);
        }
        return [nn, tt, nnnn, 0];
    }
    throw new Error("Ngày, tháng, năm không chính xác.");
}

export function canChiNgay(nn: number, tt: number, nnnn: number, duongLich: boolean = true, timeZone: number = 7, thangNhuan: boolean = false): [number, number] {
    let day = nn, month = tt, year = nnnn;
    if (!duongLich) {
        [day, month, year] = L2S(nn, tt, nnnn, thangNhuan ? 1 : 0, timeZone);
    }
    const jd = jdFromDate(day, month, year);
    const canNgay = (jd + 9) % 10 + 1;
    const chiNgay = (jd + 1) % 12 + 1;
    return [canNgay, chiNgay];
}

export function ngayThangNamCanChi(nn: number, tt: number, nnnn: number, duongLich: boolean = true, timeZone: number = 7): [number, number, number] {
    let thangAm = tt, namAm = nnnn;
    if (duongLich) {
        [, thangAm, namAm] = ngayThangNam(nn, tt, nnnn, true, timeZone);
    }
    const canThang = (namAm * 12 + thangAm + 3) % 10 + 1;
    const canNamSinh = (namAm + 6) % 10 + 1;
    const chiNam = (namAm + 8) % 12 + 1;
    return [canThang, canNamSinh, chiNam];
}

// ============== DỊCH CUNG ==============
export function dichCung(cungBanDau: number, ...args: number[]): number {
    let cungSauKhiDich = Math.floor(cungBanDau);
    for (const soCungDich of args) {
        cungSauKhiDich += Math.floor(soCungDich);
    }
    if (cungSauKhiDich % 12 === 0) {
        return 12;
    }
    return ((cungSauKhiDich % 12) + 12) % 12 || 12;
}

export function khoangCachCung(cung1: number, cung2: number, chieu: number = 1): number {
    if (chieu === 1) {
        return (cung1 - cung2 + 12) % 12;
    }
    return (cung2 - cung1 + 12) % 12;
}

// ============== TÌM CỤC ==============
export function timCuc(viTriCungMenhTrenDiaBan: number, canNamSinh: number): string {
    const canThangGieng = (canNamSinh * 2 + 1) % 10;
    let canThangMenh = ((viTriCungMenhTrenDiaBan - 3) % 12 + canThangGieng) % 10;
    if (canThangMenh === 0) {
        canThangMenh = 10;
    }
    return nguHanhNapAm(viTriCungMenhTrenDiaBan, canThangMenh);
}

// ============== TÌM TỬ VI ==============
export function timTuVi(cuc: number, ngaySinhAmLich: number): number {
    const cungDanBanDau = 3;
    let cucVal = cuc;
    const cucBanDau = cuc;
    if (![2, 3, 4, 5, 6].includes(cuc)) {
        throw new Error("Số cục phải là 2, 3, 4, 5, 6");
    }
    let cungDan = cungDanBanDau;
    while (cucVal < ngaySinhAmLich) {
        cucVal += cucBanDau;
        cungDan += 1;
    }
    let saiLech = cucVal - ngaySinhAmLich;
    if (saiLech % 2 === 1) {
        saiLech = -saiLech;
    }
    return dichCung(cungDan, saiLech);
}

// ============== TÌM TRÀNG SINH ==============
export function timTrangSinh(cucSo: number): number {
    if (cucSo === 6) return 3;  // Hỏa lục cục -> Dần
    if (cucSo === 4) return 6;  // Kim tứ cục -> Tỵ
    if (cucSo === 2 || cucSo === 5) return 9;  // Thủy nhị cục, Thổ ngũ cục -> Thân
    if (cucSo === 3) return 12;  // Mộc tam cục -> Hợi
    throw new Error("Không tìm được cung an sao Trường sinh");
}

// ============== TÌM HỎA LINH ==============
export function timHoaLinh(chiNamSinh: number, gioSinh: number, gioiTinh: number, amDuongNamSinh: number): [number, number] {
    let khoiCungHoaTinh: number, khoiCungLinhTinh: number;
    if ([3, 7, 11].includes(chiNamSinh)) {
        khoiCungHoaTinh = 2;
        khoiCungLinhTinh = 4;
    } else if ([1, 5, 9].includes(chiNamSinh)) {
        khoiCungHoaTinh = 3;
        khoiCungLinhTinh = 11;
    } else if ([6, 10, 2].includes(chiNamSinh)) {
        khoiCungHoaTinh = 11;
        khoiCungLinhTinh = 4;
    } else if ([12, 4, 8].includes(chiNamSinh)) {
        khoiCungHoaTinh = 10;
        khoiCungLinhTinh = 11;
    } else {
        throw new Error("Không thể khởi cung tìm Hỏa-Linh");
    }

    let viTriHoaTinh: number, viTriLinhTinh: number;
    if (gioiTinh * amDuongNamSinh === -1) {
        viTriHoaTinh = dichCung(khoiCungHoaTinh + 1, -gioSinh);
        viTriLinhTinh = dichCung(khoiCungLinhTinh - 1, gioSinh);
    } else {
        viTriHoaTinh = dichCung(khoiCungHoaTinh - 1, gioSinh);
        viTriLinhTinh = dichCung(khoiCungLinhTinh + 1, -gioSinh);
    }
    return [viTriHoaTinh, viTriLinhTinh];
}

// ============== TÌM THIÊN KHÔI, THIÊN VIỆT ==============
export function timThienKhoi(canNam: number): number {
    const khoiViet = [0, 2, 1, 12, 10, 8, 1, 8, 7, 6, 4];
    return khoiViet[canNam];
}

export function timThienViet(canNam: number): number {
    const viet = [0, 8, 7, 6, 4, 2, 7, 2, 1, 12, 10];
    return viet[canNam];
}

// ============== TÌM THIÊN QUAN, THIÊN PHÚC ==============
export function timThienQuanThienPhuc(canNam: number): [number, number] {
    const thienQuan = [0, 8, 5, 6, 3, 4, 10, 12, 10, 11, 7];
    const thienPhuc = [0, 10, 9, 1, 12, 4, 3, 7, 6, 7, 6];
    return [thienQuan[canNam], thienPhuc[canNam]];
}

// ============== TÌM CÔ THẦN ==============
export function timCoThan(chiNam: number): number {
    if ([12, 1, 2].includes(chiNam)) return 3;
    if ([3, 4, 5].includes(chiNam)) return 6;
    if ([6, 7, 8].includes(chiNam)) return 9;
    return 12;
}

// ============== TÌM QUẢ TÚ ==============
export function timQuaTu(chiNam: number): number {
    if ([12, 1, 2].includes(chiNam)) return 9;
    if ([3, 4, 5].includes(chiNam)) return 12;
    if ([6, 7, 8].includes(chiNam)) return 3;
    return 6;
}

// ============== TÌM THIÊN MÃ ==============
export function timThienMa(chiNam: number): number {
    const demNghich = chiNam % 4;
    if (demNghich === 1) return 3;
    if (demNghich === 2) return 12;
    if (demNghich === 3) return 9;
    if (demNghich === 0) return 6;
    throw new Error("Không tìm được Thiên mã");
}

// ============== TÌM PHÁ TOÁI ==============
export function timPhaToai(chiNam: number): number {
    const demNghich = chiNam % 3;
    if (demNghich === 0) return 6;
    if (demNghich === 1) return 10;
    if (demNghich === 2) return 2;
    throw new Error("Không tìm được Phá toái");
}

// ============== TÌM TRIỆT ==============
export function timTriet(canNam: number): [number, number] {
    if ([1, 6].includes(canNam)) return [9, 10];
    if ([2, 7].includes(canNam)) return [7, 8];
    if ([3, 8].includes(canNam)) return [5, 6];
    if ([4, 9].includes(canNam)) return [3, 4];
    if ([5, 10].includes(canNam)) return [1, 2];
    throw new Error("Không tìm được Triệt");
}

// ============== TÌM TUẦN ==============
export function timTuan(canNgay: number, chiNgay: number): [number, number] {
    // Tuần trung: 2 cung chi liền sau chi của ngày khởi đầu tuần
    const chiKhoiTuan = ((chiNgay - canNgay + 12) % 12) || 12;
    const cung1 = dichCung(chiKhoiTuan, -1);
    const cung2 = dichCung(chiKhoiTuan, -2);
    return [cung1, cung2];
}

// ============== TÌM LƯU HÀ, THIÊN TRÙ ==============
export function timLuuTru(canNam: number): [number, number] {
    const maTranLuuHa = [0, 10, 11, 8, 5, 6, 7, 9, 4, 12, 3];
    const maTranThienTru = [0, 6, 7, 1, 6, 7, 9, 3, 7, 10, 11];
    return [maTranLuuHa[canNam], maTranThienTru[canNam]];
}
