<?php
// Danh sách origin được phép truy cập
$allowed_origins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3003',
];

// Xử lý CORS
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, upload-type, X-Requested-With");
}

// Xử lý request OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include("../controller/upload.php");

$p = new cUpload();

// Xử lý upload ảnh
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['file'])) {
        echo json_encode(["success" => false, "message" => "Không có file nào được gửi!"]);
        exit;
    }

    if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = "../public/benhnhan/";
        $filename = time() . "_" . basename($_FILES['file']['name']);
        $uploadPath = $uploadDir . $filename;

        // Tạo thư mục nếu chưa có
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        // Kiểm tra quyền ghi
        if (!is_writable($uploadDir)) {
            echo json_encode(["success" => false, "message" => "Thư mục không có quyền ghi file!"]);
            exit;
        }

        // Lưu file
        if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadPath)) {
            $url = "/public/benhnhan/" . $filename;
            echo json_encode(["success" => true, "filename" => $filename, "url" => $url]);
        } else {
            echo json_encode(["success" => false, "message" => "Lỗi khi lưu file!"]);
        }
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Lỗi khi tải file lên! Mã lỗi: " . $_FILES['file']['error']
        ]);
    }
}
?>
