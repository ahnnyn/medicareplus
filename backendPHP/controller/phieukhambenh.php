<?php
include("../model/phieukhambenh.php");
include("../helpers/sendemail.php");
class cPhieuKhamBenh {
    public function taoPhieuKhamMoi($maHoSo, $maBacSi, $maLichKham, $tenBN, $ngayKham, $khungGio, $tienSu, $chuanDoan, $lyDoKham, $donThuoc, $emailBenhNhan, $tenBacSi) {
    if (
        empty($maHoSo) || empty($maBacSi) || empty($tenBN) || empty($ngayKham) ||
        empty($tienSu) || empty($chuanDoan) || empty($lyDoKham)
    ) {
        return json_encode([
            "status" => false,
            "message" => "Dữ liệu không hợp lệ!"
        ]);
    }

    $model = new mPhieuKhamBenh(); 
    $result = $model->taoPhieuKhamBenh(
        $maHoSo,
        $maBacSi,
        $maLichKham,
        $tenBN,
        $ngayKham,
        $khungGio,
        $tienSu,
        $chuanDoan,
        $lyDoKham,
        $donThuoc,
        $emailBenhNhan,
        $tenBacSi
    );

    if (isset($result["status"]) && $result["status"] === true) {
        $thongTinPhieu = $model->layThongTinPhieuKham($maLichKham, $ngayKham, $khungGio);

        if ($thongTinPhieu) {
            if (!empty($emailBenhNhan)) {
                $emailService = new EmailService();
                $emailService->sendEmailPhieuKhamBenhChiTiet(
                    $emailBenhNhan,
                    $thongTinPhieu['hoTenBenhNhan'],
                    $tenBacSi,
                    $thongTinPhieu['ngayKham'],
                    $thongTinPhieu['khungGioKham'],
                    $thongTinPhieu['lyDoKham'],
                    $thongTinPhieu['tienSu'],
                    $thongTinPhieu['chanDoan'],
                    $thongTinPhieu['danhSachDonThuoc']
                );
            }
        }
    }

    return $result;
}

    public function getThongTinPhieuKham($maLichKham, $ngayKham, $khungGio) {
        $model = new mPhieuKhamBenh(); 
        $result = $model->layThongTinPhieuKham($maLichKham, $ngayKham, $khungGio);
        return $result;
    }

    public function updateThongTinPhieuKham($maPhieuKham, $tienSu, $chuanDoan, $lyDoKham, $donThuoc, $maLichKham, $ngayKham, $khungGio, $emailBenhNhan, $tenBacSi) {
        $model = new mPhieuKhamBenh(); 
        $result = $model->capNhatThongTinPhieuKhamBenh($maPhieuKham, $tienSu, $chuanDoan, $lyDoKham, $donThuoc, $maLichKham, $ngayKham, $khungGio, $emailBenhNhan, $tenBacSi);
        if (isset($result["status"]) && $result["status"] === true) {
        $thongTinPhieu = $model->layThongTinPhieuKham($maLichKham, $ngayKham, $khungGio);

        if ($thongTinPhieu) {

            if (!empty($emailBenhNhan)) {
                $emailService = new EmailService();
                $emailService->sendEmailPhieuKhamBenhChiTiet(
                    $emailBenhNhan,
                    $thongTinPhieu['hoTenBenhNhan'],
                    $tenBacSi,
                    $thongTinPhieu['ngayKham'],
                    $thongTinPhieu['khungGioKham'],
                    $thongTinPhieu['lyDoKham'],
                    $thongTinPhieu['tienSu'],
                    $thongTinPhieu['chanDoan'],
                    $thongTinPhieu['danhSachDonThuoc']
                );
            }
        }
    }


        return $result;
    }
    public function getAllPhieuKhamBenh($maHoSo) {
        $model = new mPhieuKhamBenh(); 
        $result = $model->layAllPhieuKhamBenh($maHoSo);
        return $result;
    }
}

