<?php
require_once "db.php";
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") exit;

$conn = getConnection();
$action = $_GET["action"] ?? "";

$body = fn() => json_decode(file_get_contents("php://input"), true) ?: [];
$out  = fn($d, $c=200) => (http_response_code($c) || true) && exit(json_encode($d));
$int0 = fn($n) => max(0, (int)$n);

switch ($action) {

  case "getFilm":
    $res = $conn->query("SELECT * FROM film ORDER BY id DESC");
    $data = [];
    while ($r = $res->fetch_assoc()) $data[] = $r;
    $out($data);

  case "addFilm":
  case "updateFilm":
    $d = $body();

    $id     = $int0($d["id"] ?? 0);
    $judul  = trim($d["judul"] ?? "");
    $genre  = trim($d["genre"] ?? "");
    $tahun  = $int0($d["tahun"] ?? 0);
    $durasi = $int0($d["durasi"] ?? 0);
    $status = $d["status"] ?? "Plan";

    if ($judul === "") $out(["error"=>"Judul wajib diisi"], 400);
    if ($action === "updateFilm" && !$id) $out(["error"=>"ID tidak valid"], 400);

    if ($action === "addFilm") {
      $sql = "INSERT INTO film (judul, genre, tahun, durasi, status) VALUES (?,?,?,?,?)";
      $st  = $conn->prepare($sql);
      $st->bind_param("ssiss", $judul, $genre, $tahun, $durasi, $status);
    } else {
      $sql = "UPDATE film SET judul=?, genre=?, tahun=?, durasi=?, status=? WHERE id=?";
      $st  = $conn->prepare($sql);
      $st->bind_param("ssiisi", $judul, $genre, $tahun, $durasi, $status, $id);
    }

    $st->execute();
    $out(["success"=>true]);

  case "deleteFilm":
    $id = $int0($_GET["id"] ?? 0);
    if (!$id) $out(["error"=>"ID tidak valid"], 400);

    $st = $conn->prepare("DELETE FROM film WHERE id=?");
    $st->bind_param("i", $id);
    $st->execute();

    $out(["success"=>true]);

  default:
    $out([
      "message" => "API Film Aktif",
      "endpoints" => [
        "getFilm",
        "addFilm",
        "updateFilm",
        "deleteFilm&id=ID"
      ]
    ]);
}