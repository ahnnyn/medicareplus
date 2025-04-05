<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, upload-type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include("../controller/upload.php");

$p = new cUpload();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['file'])) {
        echo json_encode(["success" => false, "message" => "Không có file nào được gửi!"]);
        exit;
    }
    
    if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = "../public/bacsi/";
        $filename = time() . "_" . basename($_FILES['file']['name']);
        $uploadPath = $uploadDir . $filename;
    
        // Kiểm tra quyền ghi file
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
    
        if (!is_writable($uploadDir)) {
            echo json_encode(["success" => false, "message" => "Thư mục không có quyền ghi file!"]);
            exit;
        }
    
        if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadPath)) {
            $url = "/public/bacsi/" . $filename;
            echo json_encode(["success" => true, "filename" => $filename, "url" => $url]);
        } else {
            echo json_encode(["success" => false, "message" => "Lỗi khi lưu file! Vui lòng kiểm tra quyền thư mục."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Lỗi khi tải file lên! Mã lỗi: " . $_FILES['file']['error']]);
    }
}

?>
