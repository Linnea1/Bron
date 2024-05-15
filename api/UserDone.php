<?php

function send_JSON ($data, $code = 200){
    header("Content-Type: application/json");
    http_response_code($code);
    echo json_encode($data);
    exit();
}
$method = $_SERVER["REQUEST_METHOD"];

$filename = "data/users.json";
    
$users = json_decode(file_get_contents($filename), true);
$input = json_decode(file_get_contents("php://input"), true);

if ($method == "PATCH") {

    $username = $input['username']; 
   
    foreach($users as &$userData){
        if ($userData['username'] == $username) {

            $userData['done'] = true; 
            file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
            send_JSON($userData);
        }
        
    }  
    send_JSON(["message"=>"Problems with finding user"], 404); 
    
}
?>
