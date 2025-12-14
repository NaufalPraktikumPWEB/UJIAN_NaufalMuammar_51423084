<?php
function getConnection(){
    $conn = new mysqli("localhost", "root", "", "film_db");
    if ($conn->connect_error) {
        die("Koneksi gagal");
    }
    return $conn;
}