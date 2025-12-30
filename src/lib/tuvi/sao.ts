/**
 * Định nghĩa các Sao Tử Vi
 * (c) 2016 doanguyen - Ported to TypeScript
 */

import { nguHanh } from './canChi';

export interface SaoInfo {
    saoID: number;
    saoTen: string;
    saoNguHanh: string;
    saoLoai: number;
    saoPhuongVi: string;
    saoAmDuong: number;
    vongTrangSinh: number;
    cssSao: string;
    saoDacTinh: string | null;
    saoViTriCung?: number;
}

export function createSao(
    saoID: number,
    saoTen: string,
    saoNguHanh: string,
    saoLoai: number = 2,
    saoPhuongVi: string = "",
    saoAmDuong: number = 0,
    vongTrangSinh: number = 0
): SaoInfo {
    return {
        saoID,
        saoTen,
        saoNguHanh,
        saoLoai,
        saoPhuongVi,
        saoAmDuong,
        vongTrangSinh,
        cssSao: nguHanh(saoNguHanh).css,
        saoDacTinh: null
    };
}

// ============== TỬ VI TINH HỆ (14 CHÍNH TINH) ==============
export const saoTuVi = createSao(1, "Tử vi", "O", 1, "Đế tinh", 1, 0);
export const saoLiemTrinh = createSao(2, "Liêm trinh", "H", 1, "Bắc đẩu tinh", 1, 0);
export const saoThienDong = createSao(3, "Thiên đồng", "T", 1, "Bắc đẩu tinh", 1, 0);
export const saoVuKhuc = createSao(4, "Vũ khúc", "K", 1, "Bắc đẩu tinh", -1, 0);
export const saoThaiDuong = createSao(5, "Thái dương", "H", 1, "Nam đẩu tinh", 1, 0);
export const saoThienCo = createSao(6, "Thiên cơ", "M", 1, "Nam đẩu tinh", -1, 0);

// Thiên phủ tinh hệ
export const saoThienPhu = createSao(7, "Thiên phủ", "O", 1, "Nam đẩu tinh", 1, 0);
export const saoThaiAm = createSao(8, "Thái âm", "T", 1, "Bắc đẩu tinh", -1, 0);
export const saoThamLang = createSao(9, "Tham lang", "T", 1, "Bắc đẩu tinh", -1, 0);
export const saoCuMon = createSao(10, "Cự môn", "T", 1, "Bắc đẩu tinh", -1, 0);
export const saoThienTuong = createSao(11, "Thiên tướng", "T", 1, "Nam đẩu tinh", 1, 0);
export const saoThienLuong = createSao(12, "Thiên lương", "M", 1, "Nam đẩu tinh", -1, 0);
export const saoThatSat = createSao(13, "Thất sát", "K", 1, "Nam đẩu tinh", 1, 0);
export const saoPhaQuan = createSao(14, "Phá quân", "T", 1, "Bắc đẩu tinh", -1, 0);

// ============== VÒNG THÁI TUẾ (12 SAO) ==============
export const saoThaiTue = createSao(15, "Thái tuế", "H", 15, "", 0);
export const saoThieuDuong = createSao(16, "Thiếu dương", "H", 5);
export const saoTangMon = createSao(17, "Tang môn", "M", 12);
export const saoThieuAm = createSao(18, "Thiếu âm", "T", 5);
export const saoQuanPhu3 = createSao(19, "Quan phù", "H", 12);
export const saoTuPhu = createSao(20, "Tử phù", "K", 12);
export const saoTuePha = createSao(21, "Tuế phá", "H", 12);
export const saoLongDuc = createSao(22, "Long đức", "T", 5);
export const saoBachHo = createSao(23, "Bạch hổ", "K", 12);
export const saoPhucDuc = createSao(24, "Phúc đức", "O", 5);
export const saoDieuKhach = createSao(25, "Điếu khách", "H", 12);
export const saoTrucPhu = createSao(26, "Trực phù", "K", 16);

// ============== VÒNG LỘC TỒN (13 SAO) ==============
export const saoLocTon = createSao(27, "Lộc tồn", "O", 3, "Bắc đẩu tinh");
export const saoBacSy = createSao(109, "Bác sỹ", "T", 5);
export const saoLucSi = createSao(28, "Lực sĩ", "H", 2);
export const saoThanhLong = createSao(29, "Thanh long", "T", 5);
export const saoTieuHao = createSao(30, "Tiểu hao", "H", 12);
export const saoTuongQuan = createSao(31, "Tướng quân", "M", 4);
export const saoTauThu = createSao(32, "Tấu thư", "K", 3);
export const saoPhiLiem = createSao(33, "Phi liêm", "H", 2);
export const saoHyThan = createSao(34, "Hỷ thần", "H", 5);
export const saoBenhPhu = createSao(35, "Bệnh phù", "O", 12);
export const saoDaiHao = createSao(36, "Đại hao", "H", 12);
export const saoPhucBinh = createSao(37, "Phục binh", "H", 13);
export const saoQuanPhu2 = createSao(38, "Quan phù", "H", 12);

// ============== VÒNG TRÀNG SINH (12 SAO) ==============
export const saoTrangSinh = createSao(39, "Tràng sinh", "T", 5, "", 0, 1);
export const saoMocDuc = createSao(40, "Mộc dục", "T", 14, "", 0, 1);
export const saoQuanDoi = createSao(41, "Quan đới", "K", 4, "", 0, 1);
export const saoLamQuan = createSao(42, "Lâm quan", "K", 7, "", 0, 1);
export const saoDeVuong = createSao(43, "Đế vượng", "K", 5, "", 0, 1);
export const saoSuy = createSao(44, "Suy", "T", 12, "", 0, 1);
export const saoBenh = createSao(45, "Bệnh", "H", 12, "", 0, 1);
export const saoTu = createSao(46, "Tử", "H", 12, "", 0, 1);
export const saoMo = createSao(47, "Mộ", "O", 2, "", 0, 1);
export const saoTuyet = createSao(48, "Tuyệt", "O", 12, "", 0, 1);
export const saoThai = createSao(49, "Thai", "O", 14, "", 0, 1);
export const saoDuong = createSao(50, "Dưỡng", "M", 2, "", 0, 1);

// ============== LỤC SÁT (6 SAO) ==============
export const saoDaLa = createSao(51, "Đà la", "K", 11);
export const saoKinhDuong = createSao(52, "Kình dương", "K", 11);
export const saoDiaKhong = createSao(53, "Địa không", "H", 11);
export const saoDiaKiep = createSao(54, "Địa kiếp", "H", 11);
export const saoLinhTinh = createSao(55, "Linh tinh", "H", 11);
export const saoHoaTinh = createSao(56, "Hỏa tinh", "H", 11);

// ============== SAO ÂM DƯƠNG ==============
// Văn xương - Văn khúc
export const saoVanXuong = createSao(57, "Văn xương", "K", 6);
export const saoVanKhuc = createSao(58, "Văn khúc", "T", 6);

// Thiên khôi - Thiên việt
export const saoThienKhoi = createSao(59, "Thiên khôi", "H", 6);
export const saoThienViet = createSao(60, "Thiên việt", "H", 6);

// Tả phù - Hữu bật
export const saoTaPhu = createSao(61, "Tả phù", "O", 2);
export const saoHuuBat = createSao(62, "Hữu bật", "O", 2);

// Long trì - Phượng các
export const saoLongTri = createSao(63, "Long trì", "T", 3);
export const saoPhuongCac = createSao(64, "Phượng các", "O", 3);

// Tam thai - Bát tọa
export const saoTamThai = createSao(65, "Tam thai", "M", 7);
export const saoBatToa = createSao(66, "Bát tọa", "T", 7);

// Ân quang - Thiên quý
export const saoAnQuang = createSao(67, "Ân quang", "M", 3);
export const saoThienQuy = createSao(68, "Thiên quý", "O", 3);

// ============== SAO ĐÔI KHÁC ==============
export const saoThienKhoc = createSao(69, "Thiên khốc", "T", 12);
export const saoThienHu = createSao(70, "Thiên hư", "T", 12);
export const saoThienDuc = createSao(71, "Thiên đức", "H", 5);
export const saoNguyetDuc = createSao(72, "Nguyệt đức", "H", 5);
export const saoThienHinh = createSao(73, "Thiên hình", "H", 15);
export const saoThienRieu = createSao(74, "Thiên riêu", "T", 13);
export const saoThienY = createSao(75, "Thiên y", "T", 5);
export const saoQuocAn = createSao(76, "Quốc ấn", "O", 6);
export const saoDuongPhu = createSao(77, "Đường phù", "M", 4);
export const saoDaoHoa = createSao(78, "Đào hoa", "M", 8);
export const saoHongLoan = createSao(79, "Hồng loan", "T", 8);
export const saoThienHy = createSao(80, "Thiên hỷ", "T", 5);
export const saoThienGiai = createSao(81, "Thiên giải", "H", 5);
export const saoDiaGiai = createSao(82, "Địa giải", "O", 5);
export const saoGiaiThan = createSao(83, "Giải thần", "M", 5);
export const saoThaiPhu = createSao(84, "Thai phụ", "K", 6);
export const saoPhongCao = createSao(85, "Phong cáo", "O", 4);
export const saoThienTai = createSao(86, "Thiên tài", "O", 2);
export const saoThienTho = createSao(87, "Thiên thọ", "O", 5);
export const saoThienThuong = createSao(88, "Thiên thương", "O", 12);
export const saoThienSu = createSao(89, "Thiên sứ", "T", 12);
export const saoThienLa = createSao(90, "Thiên la", "O", 12);
export const saoDiaVong = createSao(91, "Địa võng", "O", 12);
export const saoHoaKhoa = createSao(92, "Hóa khoa", "T", 5);
export const saoHoaQuyen = createSao(93, "Hóa quyền", "T", 4);
export const saoHoaLoc = createSao(94, "Hóa lộc", "M", 3);
export const saoHoaKy = createSao(95, "Hóa kỵ", "T", 13);
export const saoCoThan = createSao(96, "Cô thần", "O", 13);
export const saoQuaTu = createSao(97, "Quả tú", "O", 13);
export const saoThienMa = createSao(98, "Thiên mã", "H", 3);
export const saoPhaToai = createSao(99, "Phá toái", "H", 12);
export const saoThienQuan = createSao(100, "Thiên quan", "H", 5);
export const saoThienPhuc = createSao(101, "Thiên phúc", "H", 5);
export const saoLuuHa = createSao(102, "Lưu hà", "T", 12);
export const saoThienTru = createSao(103, "Thiên trù", "O", 5);
export const saoKiepSat = createSao(104, "Kiếp sát", "H", 11);
export const saoHoaCai = createSao(105, "Hoa cái", "K", 14);
export const saoVanTinh = createSao(106, "Văn tinh", "H", 6);
export const saoDauQuan = createSao(107, "Đẩu quân", "H", 5);
export const saoThienKhong = createSao(108, "Thiên không", "T", 11);

// ============== MẢNG TẤT CẢ SAO ==============
export const allSao: Record<number, SaoInfo> = {
    1: saoTuVi, 2: saoLiemTrinh, 3: saoThienDong, 4: saoVuKhuc,
    5: saoThaiDuong, 6: saoThienCo, 7: saoThienPhu, 8: saoThaiAm,
    9: saoThamLang, 10: saoCuMon, 11: saoThienTuong, 12: saoThienLuong,
    13: saoThatSat, 14: saoPhaQuan, 15: saoThaiTue, 16: saoThieuDuong,
    17: saoTangMon, 18: saoThieuAm, 19: saoQuanPhu3, 20: saoTuPhu,
    21: saoTuePha, 22: saoLongDuc, 23: saoBachHo, 24: saoPhucDuc,
    25: saoDieuKhach, 26: saoTrucPhu, 27: saoLocTon, 28: saoLucSi,
    29: saoThanhLong, 30: saoTieuHao, 31: saoTuongQuan, 32: saoTauThu,
    33: saoPhiLiem, 34: saoHyThan, 35: saoBenhPhu, 36: saoDaiHao,
    37: saoPhucBinh, 38: saoQuanPhu2, 39: saoTrangSinh, 40: saoMocDuc,
    41: saoQuanDoi, 42: saoLamQuan, 43: saoDeVuong, 44: saoSuy,
    45: saoBenh, 46: saoTu, 47: saoMo, 48: saoTuyet, 49: saoThai,
    50: saoDuong, 51: saoDaLa, 52: saoKinhDuong, 53: saoDiaKhong,
    54: saoDiaKiep, 55: saoLinhTinh, 56: saoHoaTinh, 57: saoVanXuong,
    58: saoVanKhuc, 59: saoThienKhoi, 60: saoThienViet, 61: saoTaPhu,
    62: saoHuuBat, 63: saoLongTri, 64: saoPhuongCac, 65: saoTamThai,
    66: saoBatToa, 67: saoAnQuang, 68: saoThienQuy, 69: saoThienKhoc,
    70: saoThienHu, 71: saoThienDuc, 72: saoNguyetDuc, 73: saoThienHinh,
    74: saoThienRieu, 75: saoThienY, 76: saoQuocAn, 77: saoDuongPhu,
    78: saoDaoHoa, 79: saoHongLoan, 80: saoThienHy, 81: saoThienGiai,
    82: saoDiaGiai, 83: saoGiaiThan, 84: saoThaiPhu, 85: saoPhongCao,
    86: saoThienTai, 87: saoThienTho, 88: saoThienThuong, 89: saoThienSu,
    90: saoThienLa, 91: saoDiaVong, 92: saoHoaKhoa, 93: saoHoaQuyen,
    94: saoHoaLoc, 95: saoHoaKy, 96: saoCoThan, 97: saoQuaTu,
    98: saoThienMa, 99: saoPhaToai, 100: saoThienQuan, 101: saoThienPhuc,
    102: saoLuuHa, 103: saoThienTru, 104: saoKiepSat, 105: saoHoaCai,
    106: saoVanTinh, 107: saoDauQuan, 108: saoThienKhong, 109: saoBacSy
};

// Clone sao để tránh mutation
export function cloneSao(sao: SaoInfo): SaoInfo {
    return { ...sao };
}
