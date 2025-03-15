<?php
require_once __DIR__ . "/cors.php";
class connectdatabase {
    private $host = "localhost";
    private $dbname = "medicaredb";
    private $username = "root";
    private $password = "";

    public function connect() {
        try {
            $pdo = new PDO("mysql:host={$this->host};dbname={$this->dbname};charset=utf8", $this->username, $this->password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (PDOException $e) {
            die(json_encode(["error" => "Could not connect to the database: " . $e->getMessage()]));
        }
    }
}
?>
