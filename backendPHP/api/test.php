<?php
$matKhau = "123456"; 
$hashMatKhau = password_hash($matKhau, PASSWORD_BCRYPT, ["cost" => 12]);

echo "Hash mới tạo: " . $hashMatKhau . "<br>";

if (password_verify($matKhau, $hashMatKhau)) {
    echo "✅ Mật khẩu đúng!";
} else {
    echo "❌ Sai mật khẩu!";
}
?>