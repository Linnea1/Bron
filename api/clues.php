<?php
require_once("functions.php");

$filename = "data/users.json";
$directory = "data";
$users = json_decode(file_get_contents($filename), true);
$input = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if ($users != []) {
        foreach ($users as &$user) {
            if ($user["userId"] == $input["userId"]) {
               
                $user["clues"][] = $input["clueId"];
                
                file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
               
                send_JSON($user, 200);
            }
        }
    }
    // If userId not found, send error response
    send_JSON(["message" => "User not found"], 404);
} else {
    // If request method is not POST, send error response
    send_JSON(["message" => "Wrong method"], 405);
}
?>
