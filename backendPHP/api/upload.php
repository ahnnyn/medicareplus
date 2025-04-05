<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

include("../model/upload.php");

$p = new cUpload();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        echo json_encode(["success" => false, "message" => "Không có file hoặc file bị lỗi!"]);
        exit;
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        var_dump($_FILES); // In ra thông tin file
        file_put_contents("debug_log.txt", print_r($_FILES, true)); // Ghi log
    }
    

    $file = $_FILES['file'];
    $uploadDir = "../public/bacsi/";
    $filename = time() . "_" . basename($file['name']); // Đổi tên file tránh trùng
    $uploadPath = $uploadDir . $filename;

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true); // Tạo thư mục nếu chưa có
    }

    if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
        echo json_encode(["success" => true, "filename" => $filename]);
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi lưu file!"]);
    }
}
?>
