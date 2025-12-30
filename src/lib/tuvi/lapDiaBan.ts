/**
 * Lập Lá Số Tử Vi - Main Function
 * Combines all modules to generate complete Tử Vi chart
 */

import {
    thienCan, nguHanh, dichCung,
    ngayThangNam, canChiNgay, ngayThangNamCanChi,
    timCuc, timTuVi, timTrangSinh, timHoaLinh,
    timThienKhoi, timThienViet, timThienQuanThienPhuc,
    timCoThan, timQuaTu, timThienMa, timPhaToai,
    timTriet, timTuan, timLuuTru
} from './canChi';
import { DiaBan } from './diaBan';
import type { CungInfo } from './diaBan';
import { lapThienBan } from './thienBan';
import type { ThienBanInfo } from './thienBan';
import * as Sao from './sao';

// ============== RESULT TYPE ==============
export interface LasoResult {
    thienBan: ThienBanInfo;
    diaBan: {
        thapNhiCung: CungInfo[];
    };
}

// ============== MAIN FUNCTION ==============
export function lapLaSo(
    ngay: number,
    thang: number,
    nam: number,
    gio: number,
    gioiTinh: number,
    ten: string,
    duongLich: boolean = true,
    timeZone: number = 7
): LasoResult {
    // Chuyển đổi ngày dương sang âm
    const [ngayAm, thangAm, namAm] = ngayThangNam(ngay, thang, nam, duongLich, timeZone);

    // Tính Can Chi
    const [canNam, chiNam] = ngayThangNamCanChi(ngayAm, thangAm, namAm, false, timeZone);
    const [canNgay, chiNgay] = canChiNgay(ngay, thang, nam, duongLich, timeZone);

    // Tạo Địa Bàn
    const diaBanObj = new DiaBan(thangAm, gio);

    // Lập Thiên Bàn
    const thienBan = lapThienBan(ngay, thang, nam, gio, gioiTinh, ten, diaBanObj, duongLich, timeZone);

    // Tính Cục
    const cucStr = timCuc(diaBanObj.cungMenh, canNam);
    const cucSo = nguHanh(cucStr).cuc;

    // Âm dương năm sinh (để tính Hỏa Linh)
    const amDuongNamSinhVal = chiNam % 2 === 1 ? 1 : -1;
    const gioiTinhVal = gioiTinh === 1 ? 1 : -1;

    // ============== AN SAO TỬ VI TINH HỆ ==============
    const viTriTuVi = timTuVi(cucSo, ngayAm);
    diaBanObj.nhapSao(viTriTuVi, Sao.saoTuVi);
    diaBanObj.nhapSao(dichCung(viTriTuVi, -1), Sao.saoLiemTrinh);
    diaBanObj.nhapSao(dichCung(viTriTuVi, -2), Sao.saoThienDong);
    diaBanObj.nhapSao(dichCung(viTriTuVi, -3), Sao.saoVuKhuc);
    diaBanObj.nhapSao(dichCung(viTriTuVi, -4), Sao.saoThaiDuong);
    diaBanObj.nhapSao(dichCung(viTriTuVi, -5), Sao.saoThienCo);

    // ============== AN SAO THIÊN PHỦ TINH HỆ ==============
    // Tử Vi và Thiên Phủ đối xứng qua trục Dần-Thân
    const viTriThienPhu = dichCung(3, 3 - viTriTuVi); // Đối xứng qua cung Dần
    diaBanObj.nhapSao(viTriThienPhu, Sao.saoThienPhu);
    diaBanObj.nhapSao(dichCung(viTriThienPhu, 1), Sao.saoThaiAm);
    diaBanObj.nhapSao(dichCung(viTriThienPhu, 2), Sao.saoThamLang);
    diaBanObj.nhapSao(dichCung(viTriThienPhu, 3), Sao.saoCuMon);
    diaBanObj.nhapSao(dichCung(viTriThienPhu, 4), Sao.saoThienTuong);
    diaBanObj.nhapSao(dichCung(viTriThienPhu, 5), Sao.saoThienLuong);
    diaBanObj.nhapSao(dichCung(viTriThienPhu, 6), Sao.saoThatSat);
    diaBanObj.nhapSao(dichCung(viTriThienPhu, 10), Sao.saoPhaQuan);

    // ============== AN VÒNG TRÀNG SINH ==============
    const viTriTrangSinh = timTrangSinh(cucSo);
    const trangSinhSao = [
        Sao.saoTrangSinh, Sao.saoMocDuc, Sao.saoQuanDoi, Sao.saoLamQuan,
        Sao.saoDeVuong, Sao.saoSuy, Sao.saoBenh, Sao.saoTu,
        Sao.saoMo, Sao.saoTuyet, Sao.saoThai, Sao.saoDuong
    ];
    for (let i = 0; i < 12; i++) {
        const viTri = dichCung(viTriTrangSinh, i * gioiTinhVal);
        diaBanObj.nhapSao(viTri, trangSinhSao[i]);
    }

    // ============== AN LỘC TỒN VÀ VÒNG LỘC TỒN ==============
    const viTriLocTon = thienCan[canNam]?.vitriDiaBan || 3;
    diaBanObj.nhapSao(viTriLocTon, Sao.saoLocTon);

    // Kình Dương, Đà La
    diaBanObj.nhapSao(dichCung(viTriLocTon, 1), Sao.saoKinhDuong);
    diaBanObj.nhapSao(dichCung(viTriLocTon, -1), Sao.saoDaLa);

    // Vòng Lộc Tồn (Bác sĩ đi thuận/nghịch)
    const locTonSaoThuan = [
        Sao.saoBacSy, Sao.saoLucSi, Sao.saoThanhLong, Sao.saoTieuHao,
        Sao.saoTuongQuan, Sao.saoTauThu, Sao.saoPhiLiem, Sao.saoHyThan,
        Sao.saoBenhPhu, Sao.saoDaiHao, Sao.saoPhucBinh, Sao.saoQuanPhu2
    ];
    for (let i = 0; i < 12; i++) {
        const viTri = dichCung(viTriLocTon, i * gioiTinhVal * amDuongNamSinhVal);
        diaBanObj.nhapSao(viTri, locTonSaoThuan[i]);
    }

    // ============== AN VÒNG THÁI TUẾ ==============
    const thaiTueSao = [
        Sao.saoThaiTue, Sao.saoThieuDuong, Sao.saoTangMon, Sao.saoThieuAm,
        Sao.saoQuanPhu3, Sao.saoTuPhu, Sao.saoTuePha, Sao.saoLongDuc,
        Sao.saoBachHo, Sao.saoPhucDuc, Sao.saoDieuKhach, Sao.saoTrucPhu
    ];
    for (let i = 0; i < 12; i++) {
        const viTri = dichCung(chiNam, i);
        diaBanObj.nhapSao(viTri, thaiTueSao[i]);
    }

    // ============== AN VĂN XƯƠNG, VĂN KHÚC ==============
    // Văn xương: Khởi Tuất đếm nghịch theo giờ
    const viTriVanXuong = dichCung(11, -(gio - 1));
    diaBanObj.nhapSao(viTriVanXuong, Sao.saoVanXuong);

    // Văn khúc: Khởi Thìn đếm thuận theo giờ
    const viTriVanKhuc = dichCung(5, gio - 1);
    diaBanObj.nhapSao(viTriVanKhuc, Sao.saoVanKhuc);

    // ============== AN TẢ PHÙ, HỮU BẬT ==============
    // Tả phù: Khởi Thìn đếm thuận theo tháng
    const viTriTaPhu = dichCung(5, thangAm - 1);
    diaBanObj.nhapSao(viTriTaPhu, Sao.saoTaPhu);

    // Hữu bật: Khởi Tuất đếm nghịch theo tháng
    const viTriHuuBat = dichCung(11, -(thangAm - 1));
    diaBanObj.nhapSao(viTriHuuBat, Sao.saoHuuBat);

    // ============== AN THIÊN KHÔI, THIÊN VIỆT ==============
    const viTriThienKhoi = timThienKhoi(canNam);
    const viTriThienViet = timThienViet(canNam);
    diaBanObj.nhapSao(viTriThienKhoi, Sao.saoThienKhoi);
    diaBanObj.nhapSao(viTriThienViet, Sao.saoThienViet);

    // ============== AN HỎA TINH, LINH TINH ==============
    const [viTriHoaTinh, viTriLinhTinh] = timHoaLinh(chiNam, gio, gioiTinhVal, amDuongNamSinhVal);
    diaBanObj.nhapSao(viTriHoaTinh, Sao.saoHoaTinh);
    diaBanObj.nhapSao(viTriLinhTinh, Sao.saoLinhTinh);

    // ============== AN ĐỊA KHÔNG, ĐỊA KIẾP ==============
    // Địa không: Khởi Hợi đếm nghịch theo giờ
    const viTriDiaKhong = dichCung(12, -(gio - 1));
    diaBanObj.nhapSao(viTriDiaKhong, Sao.saoDiaKhong);

    // Địa kiếp: Khởi Hợi đếm thuận theo giờ
    const viTriDiaKiep = dichCung(12, gio - 1);
    diaBanObj.nhapSao(viTriDiaKiep, Sao.saoDiaKiep);

    // ============== AN CÁC SAO KHÁC ==============
    // Thiên hình: Khởi Dậu đếm thuận theo tháng
    const viTriThienHinh = dichCung(10, thangAm - 1);
    diaBanObj.nhapSao(viTriThienHinh, Sao.saoThienHinh);

    // Thiên riêu: Khởi Dậu đếm thuận theo tháng (cùng Thiên hình)
    diaBanObj.nhapSao(viTriThienHinh, Sao.saoThienRieu);

    // Thiên y: Khởi tháng giêng tại Tỵ
    const viTriThienY = dichCung(6, thangAm - 1);
    diaBanObj.nhapSao(viTriThienY, Sao.saoThienY);

    // Đào hoa
    const daoHoaPos = [0, 10, 7, 4, 1, 10, 7, 4, 1, 10, 7, 4, 1];
    diaBanObj.nhapSao(daoHoaPos[chiNam], Sao.saoDaoHoa);

    // Hồng loan (Mão nghịch về theo chi năm)
    const viTriHongLoan = dichCung(4, -(chiNam - 1));
    diaBanObj.nhapSao(viTriHongLoan, Sao.saoHongLoan);

    // Thiên hỷ (đối xứng Hồng loan)
    const viTriThienHy = dichCung(viTriHongLoan, 6);
    diaBanObj.nhapSao(viTriThienHy, Sao.saoThienHy);

    // Cô thần, Quả tú
    const viTriCoThan = timCoThan(chiNam);
    const viTriQuaTu = timQuaTu(chiNam);
    diaBanObj.nhapSao(viTriCoThan, Sao.saoCoThan);
    diaBanObj.nhapSao(viTriQuaTu, Sao.saoQuaTu);

    // Thiên mã
    const viTriThienMa = timThienMa(chiNam);
    diaBanObj.nhapSao(viTriThienMa, Sao.saoThienMa);

    // Phá toái
    const viTriPhaToai = timPhaToai(chiNam);
    diaBanObj.nhapSao(viTriPhaToai, Sao.saoPhaToai);

    // Thiên quan, Thiên phúc
    const [viTriThienQuan, viTriThienPhuc] = timThienQuanThienPhuc(canNam);
    diaBanObj.nhapSao(viTriThienQuan, Sao.saoThienQuan);
    diaBanObj.nhapSao(viTriThienPhuc, Sao.saoThienPhuc);

    // Lưu hà, Thiên trù
    const [viTriLuuHa, viTriThienTru] = timLuuTru(canNam);
    diaBanObj.nhapSao(viTriLuuHa, Sao.saoLuuHa);
    diaBanObj.nhapSao(viTriThienTru, Sao.saoThienTru);

    // Thiên khốc, Thiên hư
    const viTriThienKhoc = dichCung(7, chiNam - 1);
    const viTriThienHu = dichCung(7, -(chiNam - 1));
    diaBanObj.nhapSao(viTriThienKhoc, Sao.saoThienKhoc);
    diaBanObj.nhapSao(viTriThienHu, Sao.saoThienHu);

    // Thiên đức, Nguyệt đức
    const viTriThienDuc = dichCung(10, thangAm - 1);
    const viTriNguyetDuc = dichCung(6, thangAm - 1);
    diaBanObj.nhapSao(viTriThienDuc, Sao.saoThienDuc);
    diaBanObj.nhapSao(viTriNguyetDuc, Sao.saoNguyetDuc);

    // Thiên la, Địa võng
    diaBanObj.nhapSao(5, Sao.saoThienLa);  // Thìn
    diaBanObj.nhapSao(11, Sao.saoDiaVong); // Tuất

    // Long trì, Phượng các
    const viTriLongTri = dichCung(5, chiNam - 1);
    const viTriPhuongCac = dichCung(11, -(chiNam - 1));
    diaBanObj.nhapSao(viTriLongTri, Sao.saoLongTri);
    diaBanObj.nhapSao(viTriPhuongCac, Sao.saoPhuongCac);

    // Tam thai, Bát tọa (theo ngày)
    const viTriTamThai = dichCung(viTriTaPhu, ngayAm - 1);
    const viTriBatToa = dichCung(viTriHuuBat, -(ngayAm - 1));
    diaBanObj.nhapSao(viTriTamThai, Sao.saoTamThai);
    diaBanObj.nhapSao(viTriBatToa, Sao.saoBatToa);

    // Ân quang, Thiên quý (theo ngày)
    const viTriAnQuang = dichCung(viTriVanXuong, -(ngayAm - 1));
    const viTriThienQuyy = dichCung(viTriVanKhuc, ngayAm - 1);
    diaBanObj.nhapSao(viTriAnQuang, Sao.saoAnQuang);
    diaBanObj.nhapSao(viTriThienQuyy, Sao.saoThienQuy);

    // Quốc ấn, Đường phù
    const viTriQuocAn = dichCung(diaBanObj.cungMenh, 1);
    const viTriDuongPhu = dichCung(diaBanObj.cungMenh, 5);
    diaBanObj.nhapSao(viTriQuocAn, Sao.saoQuocAn);
    diaBanObj.nhapSao(viTriDuongPhu, Sao.saoDuongPhu);

    // Thai phụ, Phong cáo
    const viTriThaiPhu = dichCung(10, thangAm - 1);
    const viTriPhongCao = dichCung(4, -(thangAm - 1));
    diaBanObj.nhapSao(viTriThaiPhu, Sao.saoThaiPhu);
    diaBanObj.nhapSao(viTriPhongCao, Sao.saoPhongCao);

    // Thiên giải, Địa giải
    const viTriThienGiai = dichCung(9, thangAm - 1);
    diaBanObj.nhapSao(viTriThienGiai, Sao.saoThienGiai);
    diaBanObj.nhapSao(viTriThienGiai, Sao.saoDiaGiai); // Cùng vị trí

    // Giải thần
    const viTriGiaiThan = dichCung(9, thangAm - 1);
    diaBanObj.nhapSao(viTriGiaiThan, Sao.saoGiaiThan);

    // Thiên tài, Thiên thọ
    const viTriThienTai = dichCung(diaBanObj.cungMenh, gio - 1);
    const viTriThienTho = dichCung(diaBanObj.cungThan, gio - 1);
    diaBanObj.nhapSao(viTriThienTai, Sao.saoThienTai);
    diaBanObj.nhapSao(viTriThienTho, Sao.saoThienTho);

    // Thiên thương, Thiên sứ
    diaBanObj.nhapSao(diaBanObj.cungNoboc, Sao.saoThienThuong);
    diaBanObj.nhapSao(diaBanObj.cungTatAch, Sao.saoThienSu);

    // Kiếp sát
    const kiepSatPos = [0, 6, 3, 12, 9, 6, 3, 12, 9, 6, 3, 12, 9];
    diaBanObj.nhapSao(kiepSatPos[chiNam], Sao.saoKiepSat);

    // Hoa cái
    const hoaCaiPos = [0, 5, 2, 11, 8, 5, 2, 11, 8, 5, 2, 11, 8];
    diaBanObj.nhapSao(hoaCaiPos[chiNam], Sao.saoHoaCai);

    // Thiên không
    const viTriThienKhong = dichCung(chiNam, 1);
    diaBanObj.nhapSao(viTriThienKhong, Sao.saoThienKhong);

    // ============== AN TRIỆT, TUẦN ==============
    const [triet1, triet2] = timTriet(canNam);
    diaBanObj.nhapTriet(triet1, triet2);

    const [tuan1, tuan2] = timTuan(canNgay, chiNgay);
    diaBanObj.nhapTuan(tuan1, tuan2);

    // ============== NHẬP ĐẠI HẠN ==============
    diaBanObj.nhapDaiHan(cucSo, gioiTinhVal);

    // Sắp xếp sao trong mỗi cung (chính tinh lên trước)
    for (const cung of diaBanObj.thapNhiCung) {
        cung.cungSao.sort((a, b) => a.saoLoai - b.saoLoai);
    }

    return {
        thienBan,
        diaBan: {
            thapNhiCung: diaBanObj.thapNhiCung
        }
    };
}
