/**
 * Thiên Bàn - Thông tin tổng quan lá số
 * (c) 2016 doanguyen - Ported to TypeScript
 */

import { jdFromDate } from './calendar';
import {
    thienCan, diaChi, nguHanh, nguHanhNapAm, sinhKhac,
    ngayThangNam, canChiNgay, ngayThangNamCanChi, timCuc
} from './canChi';
import { DiaBan } from './diaBan';

export interface ThienBanInfo {
    ten: string;
    gioiTinh: number;
    namNu: string;
    gioSinh: string;
    chiGioSinh: string;
    canGioSinh: number;
    ngayDuong: number;
    thangDuong: number;
    namDuong: number;
    ngayAm: number;
    thangAm: number;
    namAm: number;
    thangNhuan: number;
    canThang: number;
    canNam: number;
    chiNam: number;
    canThangTen: string;
    canNamTen: string;
    chiThangTen: string;
    chiNamTen: string;
    canNgay: number;
    chiNgay: number;
    canNgayTen: string;
    chiNgayTen: string;
    amDuongNamSinh: string;
    amDuongMenh: string;
    hanhCuc: number;
    tenCuc: string;
    menhChu: string;
    thanChu: string;
    menh: string;
    banMenh: string;
    sinhKhac: string;
    timeZone: number;
}

export function lapThienBan(
    nn: number,
    tt: number,
    nnnn: number,
    gioSinh: number,
    gioiTinh: number,
    ten: string,
    diaBan: DiaBan,
    duongLich: boolean = true,
    timeZone: number = 7
): ThienBanInfo {
    const gioiTinhVal = gioiTinh === 1 ? 1 : -1;
    const namNu = gioiTinhVal === 1 ? "Nam" : "Nữ";

    // Tính Can Chi giờ sinh
    const chiGioSinhInfo = diaChi[gioSinh];
    let canGioSinh = ((jdFromDate(nn, tt, nnnn) - 1) * 2 % 10 + gioSinh) % 10;
    if (canGioSinh === 0) canGioSinh = 10;
    const gioSinhStr = `${thienCan[canGioSinh]?.tenCan || ''} ${chiGioSinhInfo?.tenChi || ''}`;

    // Chuyển đổi ngày dương sang âm nếu cần
    let ngayAm: number, thangAm: number, namAm: number, thangNhuan: number;
    if (duongLich) {
        [ngayAm, thangAm, namAm, thangNhuan] = ngayThangNam(nn, tt, nnnn, true, timeZone);
    } else {
        ngayAm = nn;
        thangAm = tt;
        namAm = nnnn;
        thangNhuan = 0;
    }

    // Tính Can Chi năm, tháng
    const [canThang, canNam, chiNam] = ngayThangNamCanChi(ngayAm, thangAm, namAm, false, timeZone);
    const canThangTen = thienCan[canThang]?.tenCan || '';
    const canNamTen = thienCan[canNam]?.tenCan || '';
    const chiThangTen = diaChi[thangAm]?.tenChi || '';
    const chiNamTen = diaChi[chiNam]?.tenChi || '';

    // Tính Can Chi ngày
    const [canNgay, chiNgay] = canChiNgay(nn, tt, nnnn, duongLich, timeZone);
    const canNgayTen = thienCan[canNgay]?.tenCan || '';
    const chiNgayTen = diaChi[chiNgay]?.tenChi || '';

    // Âm dương của Mệnh và năm sinh
    const cungAmDuong = diaBan.cungMenh % 2 === 1 ? 1 : -1;
    const amDuongNamSinh = chiNam % 2 === 1 ? "Dương" : "Âm";
    const amDuongMenh = cungAmDuong * gioiTinhVal === 1 ? "Âm dương thuận lý" : "Âm dương nghịch lý";

    // Tính Cục
    const cuc = timCuc(diaBan.cungMenh, canNam);
    const hanhCuc = nguHanh(cuc).id;
    const tenCuc = nguHanh(cuc).tenCuc;

    // Mệnh chủ, Thân chủ
    const menhChu = diaChi[canNam]?.menhChu || '';
    const thanChu = diaChi[canNam]?.thanChu || '';

    // Bản mệnh
    const menh = nguHanhNapAm(chiNam, canNam);
    const menhId = nguHanh(menh).id;
    const menhCucResult = sinhKhac(menhId, hanhCuc);

    let sinhKhacStr: string;
    if (typeof menhCucResult === 'number') {
        if (menhCucResult === 1) sinhKhacStr = "Bản Mệnh sinh Cục";
        else if (menhCucResult === -1) sinhKhacStr = "Bản Mệnh khắc Cục";
        else sinhKhacStr = "Cục hòa Bản Mệnh";
    } else {
        if (menhCucResult.i === -1) sinhKhacStr = "Cục khắc Bản Mệnh";
        else sinhKhacStr = "Cục sinh Bản mệnh";
    }

    const banMenh = nguHanhNapAm(chiNam, canNam, true);

    return {
        ten,
        gioiTinh: gioiTinhVal,
        namNu,
        gioSinh: gioSinhStr,
        chiGioSinh: chiGioSinhInfo?.tenChi || '',
        canGioSinh,
        ngayDuong: nn,
        thangDuong: tt,
        namDuong: nnnn,
        ngayAm,
        thangAm,
        namAm,
        thangNhuan,
        canThang,
        canNam,
        chiNam,
        canThangTen,
        canNamTen,
        chiThangTen,
        chiNamTen,
        canNgay,
        chiNgay,
        canNgayTen,
        chiNgayTen,
        amDuongNamSinh,
        amDuongMenh,
        hanhCuc,
        tenCuc,
        menhChu,
        thanChu,
        menh,
        banMenh,
        sinhKhac: sinhKhacStr,
        timeZone
    };
}
