/**
 * Địa Bàn - 12 Cung Tử Vi
 * (c) 2016 doanguyen - Ported to TypeScript
 */

import { diaChi, dichCung, khoangCachCung } from './canChi';
import { cloneSao } from './sao';
import type { SaoInfo } from './sao';

// ============== INTERFACES ==============
export interface SaoInCung {
    saoID: number;
    saoTen: string;
    saoNguHanh: string;
    saoLoai: number;
    saoDacTinh: string | null;
    cssSao: string;
    saoPhuongVi?: string;
    saoAmDuong?: number;
    vongTrangSinh?: number;
}

export interface CungInfo {
    cungSo: number;
    cungTen: string;
    hanhCung: string;
    cungAmDuong: number;
    cungChu: string;
    cungSao: SaoInCung[];
    cungDaiHan?: number;
    cungTieuHan?: string;
    cungThan: boolean;
    tuanTrung?: boolean;
    trietLo?: boolean;
}

// ============== ĐẶC TÍNH SAO ==============
const maTranDacTinh: Record<number, (string | null)[]> = {
    1: [null, "B", "Đ", "M", "B", "V", "M", "M", "Đ", "M", "B", "V", "B"],
    2: [null, "V", "Đ", "V", "H", "M", "H", "V", "Đ", "V", "H", "M", "H"],
    3: [null, "V", "H", "M", "Đ", "H", "Đ", "H", "H", "M", "H", "H", "Đ"],
    4: [null, "V", "M", "V", "Đ", "M", "H", "V", "M", "V", "Đ", "M", "H"],
    5: [null, "H", "Đ", "V", "V", "V", "M", "M", "Đ", "H", "H", "H", "H"],
    6: [null, "Đ", "Đ", "H", "M", "M", "V", "Đ", "Đ", "V", "M", "M", "H"],
    8: [null, "V", "Đ", "H", "H", "H", "H", "H", "Đ", "V", "M", "M", "M"],
    9: [null, "H", "M", "Đ", "H", "V", "H", "H", "M", "Đ", "H", "V", "H"],
    10: [null, "V", "H", "V", "M", "H", "H", "V", "H", "Đ", "M", "H", "Đ"],
    11: [null, "V", "Đ", "M", "H", "V", "Đ", "V", "Đ", "M", "H", "V", "Đ"],
    12: [null, "V", "Đ", "V", "V", "M", "H", "M", "Đ", "V", "H", "M", "H"],
    13: [null, "M", "Đ", "M", "H", "H", "V", "M", "Đ", "M", "H", "H", "V"],
    14: [null, "M", "V", "H", "H", "Đ", "H", "M", "V", "H", "H", "Đ", "H"],
    51: [null, "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H"],
    52: [null, "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H"],
    55: [null, "H", "H", "Đ", "Đ", "Đ", "Đ", "Đ", "H", "H", "H", "H", "H"],
    56: [null, "H", "H", "Đ", "Đ", "Đ", "Đ", "Đ", "H", "H", "H", "H", "H"],
    57: [null, "H", "Đ", "H", "Đ", "H", "Đ", "H", "Đ", "H", "H", "Đ", "Đ"],
    58: [null, "H", "Đ", "H", "Đ", "H", "Đ", "H", "Đ", "H", "H", "Đ", "Đ"],
    53: [null, "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ"],
    54: [null, "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ", "H", "H", "Đ"],
    95: [null, null, "Đ", null, null, "Đ", null, null, "Đ", null, null, "Đ", null],
    36: [null, null, null, "Đ", "Đ", null, null, null, null, "Đ", "Đ", null, null],
    30: [null, null, null, "Đ", "Đ", null, null, null, null, "Đ", "Đ", null, null],
    69: [null, "Đ", "Đ", null, "Đ", null, null, "Đ", "Đ", null, "Đ", null, null],
    70: [null, "Đ", "Đ", null, "Đ", null, null, "Đ", "Đ", null, "Đ", null, null],
    98: [null, null, null, "Đ", null, null, "Đ", null, null, null, null, null, null],
    73: [null, null, null, "Đ", "Đ", null, null, null, null, "Đ", "Đ", null, null],
    74: [null, null, null, "Đ", "Đ", null, null, null, null, null, "Đ", "Đ", null],
};

export function dacTinhSao(viTriDiaBan: number, sao: SaoInfo): void {
    if (maTranDacTinh[sao.saoID]) {
        const dacTinh = maTranDacTinh[sao.saoID][viTriDiaBan];
        if (dacTinh && ["M", "V", "Đ", "B", "H"].includes(dacTinh)) {
            sao.saoDacTinh = dacTinh;
        }
    }
}

// ============== TẠO CUNG ==============
const hanhCungArr = [null, "Thủy", "Thổ", "Mộc", "Mộc", "Thổ", "Hỏa", "Hỏa", "Thổ", "Kim", "Kim", "Thổ", "Thủy"];

export function createCung(cungID: number): CungInfo {
    return {
        cungSo: cungID,
        cungTen: diaChi[cungID]?.tenChi || "",
        hanhCung: hanhCungArr[cungID] || "",
        cungAmDuong: cungID % 2 === 0 ? -1 : 1,
        cungChu: "",
        cungSao: [],
        cungThan: false
    };
}

// ============== ĐỊA BÀN CLASS ==============
export class DiaBan {
    thapNhiCung: CungInfo[];
    cungMenh: number;
    cungThan: number;
    cungNoboc: number;
    cungTatAch: number;
    thangSinhAmLich: number;
    gioSinhAmLich: number;

    constructor(thangSinhAmLich: number, gioSinhAmLich: number) {
        this.thangSinhAmLich = thangSinhAmLich;
        this.gioSinhAmLich = gioSinhAmLich;
        this.thapNhiCung = [];
        for (let i = 0; i <= 12; i++) {
            this.thapNhiCung.push(createCung(i));
        }

        // Tính cung Mệnh và Thân
        this.cungThan = dichCung(3, thangSinhAmLich - 1, gioSinhAmLich - 1);
        this.cungMenh = dichCung(3, thangSinhAmLich - 1, -(gioSinhAmLich) + 1);
        this.cungNoboc = dichCung(this.cungMenh, 5);
        this.cungTatAch = dichCung(this.cungMenh, 7);

        this.nhapCungChu();
        this.nhapCungThan();
    }

    private nhapCungChu(): void {
        const cungChuList = [
            { tenCung: "Mệnh", cungSo: this.cungMenh },
            { tenCung: "Phụ mẫu", cungSo: dichCung(this.cungMenh, 1) },
            { tenCung: "Phúc đức", cungSo: dichCung(this.cungMenh, 2) },
            { tenCung: "Điền trạch", cungSo: dichCung(this.cungMenh, 3) },
            { tenCung: "Quan lộc", cungSo: dichCung(this.cungMenh, 4) },
            { tenCung: "Nô bộc", cungSo: this.cungNoboc },
            { tenCung: "Thiên di", cungSo: dichCung(this.cungMenh, 6) },
            { tenCung: "Tật ách", cungSo: this.cungTatAch },
            { tenCung: "Tài bạch", cungSo: dichCung(this.cungMenh, 8) },
            { tenCung: "Tử tức", cungSo: dichCung(this.cungMenh, 9) },
            { tenCung: "Phu thê", cungSo: dichCung(this.cungMenh, 10) },
            { tenCung: "Huynh đệ", cungSo: dichCung(this.cungMenh, 11) },
        ];

        for (const cung of cungChuList) {
            this.thapNhiCung[cung.cungSo].cungChu = cung.tenCung;
        }
    }

    private nhapCungThan(): void {
        this.thapNhiCung[this.cungThan].cungThan = true;
    }

    nhapDaiHan(cucSo: number, gioiTinh: number): void {
        for (const cung of this.thapNhiCung) {
            if (cung.cungSo === 0) continue;
            const khoangCach = khoangCachCung(cung.cungSo, this.cungMenh, gioiTinh);
            cung.cungDaiHan = cucSo + khoangCach * 10;
        }
    }

    nhapTieuHan(khoiTieuHan: number, gioiTinh: number, chiNam: number): void {
        const viTriCungTy1 = dichCung(khoiTieuHan, -gioiTinh * (chiNam - 1));
        for (const cung of this.thapNhiCung) {
            if (cung.cungSo === 0) continue;
            const khoangCach = khoangCachCung(cung.cungSo, viTriCungTy1, gioiTinh);
            cung.cungTieuHan = diaChi[khoangCach + 1]?.tenChi || "";
        }
    }

    nhapSao(cungSo: number, ...saoList: SaoInfo[]): void {
        for (const sao of saoList) {
            const saoClone = cloneSao(sao);
            dacTinhSao(cungSo, saoClone);
            this.thapNhiCung[cungSo].cungSao.push({
                saoID: saoClone.saoID,
                saoTen: saoClone.saoTen,
                saoNguHanh: saoClone.saoNguHanh,
                saoLoai: saoClone.saoLoai,
                saoDacTinh: saoClone.saoDacTinh,
                cssSao: saoClone.cssSao,
                saoPhuongVi: saoClone.saoPhuongVi,
                saoAmDuong: saoClone.saoAmDuong,
                vongTrangSinh: saoClone.vongTrangSinh
            });
        }
    }

    nhapTuan(cung1: number, cung2: number): void {
        this.thapNhiCung[cung1].tuanTrung = true;
        this.thapNhiCung[cung2].tuanTrung = true;
    }

    nhapTriet(cung1: number, cung2: number): void {
        this.thapNhiCung[cung1].trietLo = true;
        this.thapNhiCung[cung2].trietLo = true;
    }
}
