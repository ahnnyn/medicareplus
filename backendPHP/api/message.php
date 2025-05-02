<?php
$allowed_origins = [
    'http://localhost:3000',
    'http://localhost:3002',
    'http://localhost:3001',
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); // Dừng xử lý nếu là preflight request
}

include("../controller/CMessage.php");

$p = new cMessage();

if (isset($_GET["action"])) {
    switch ($_GET["action"]) {
        case "tao-phong-tu-van":
            $p->createTroChuyen();
            break;
        
            default:
                echo json_encode(["error" => "Thao tác không hợp lệ"]);
        }
} else {
    echo json_encode(["error" => "Thiếu tham số action"]);
}
?>
