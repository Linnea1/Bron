<?php
require_once("functions.php");

$filename = "data/users.json";

if (!file_exists($filename)) {
    file_put_contents($filename, "[]");
}

$directory = "data";
if(!file_exists("data")){ // if no directory, create it
    mkdir($directory, 755);
}
if(!file_exists("data/pictures")){ // if no directory, create it
    mkdir("data/pictures", 755);
}
if(!file_exists("data/pictures/pfp")){ // if no directory, create it
    mkdir("data/pictures/pfp", 755);
}

$users = json_decode(file_get_contents($filename), true);
$input = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] == "PATCH") {
    if (isset($input["username"])) {

        // $updatedUser = $input["user"];
        // $username = $updatedUser["username"];
        
            foreach ($users as &$user) {
                if ($user["username"] == $input["username"]) {
                    if (isset($input["email"]) && $input["email"] !== "") {
                        $user["email"] = $input["email"];
                    }
                    if (isset($input["currentPassword"]) && isset($input["newPassword"])) {
                        if ($input["currentPassword"] !== "" && $input["newPassword"] !== "") {
                            if ($user["password"] === $input["currentPassword"]) {
                                $user["password"] = $input["newPassword"];
                            } else {
                                send_JSON(["message" => "Incorrect current password"], 400);
                            }
                        }
                    }
                    file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
                    send_JSON($user);
                }
            }

        send_JSON(["message" => "No matching user"], 400);
    } else {
        send_JSON(["message" => "Invalid input data"], 400);
    }
}


if($_SERVER["REQUEST_METHOD"] == "POST"){
    if($_FILES){ // change profile picture
        $source = $_FILES["pfp"]["tmp_name"];
        $destination = "api/data/pictures/pfp/".$_FILES["pfp"]["name"];
        $size = $_FILES["pfp"]["size"];
        $type = $_FILES["pfp"]["type"];
        $time = time();

        // these are needed for giving the right person the pfp
        $username = $_POST["username"];
        $password = $_POST["password"];

        $allowedFiles = ["image/jpeg", "image/png", "image/gif"]; // checking so that the filetype is allowed
        if (!in_array($type, $allowedFiles)){
            send_JSON(["message"=>"Wrong filetype"], 415);
        }

        $ending = str_replace("image/", ".", $type);
        $filePath = "api/data/pictures/pfp/";
        $name = $time . $ending;
        
        foreach($users as $index => $user){
            if($user["username"] == $username){

                $users[$index]["pfp"] = $filePath . $name;

                if(move_uploaded_file($source, "data/pictures/pfp/" . $name)){
                    $correctName =  $filePath . $name;
                    $users[$index]["pfp"] = $correctName;
                    file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));

                    // //// change in other databases too
                    // function changePfp ($dataBase, $key, $filePath, $name){
                    //     foreach($dataBase as $index => $data){
                    //         if($data[$key] == $_POST["username"] && !isset($data["deleted"])){
                    //             $dataBase[$index]["pfp"] = $name;

                    //             file_put_contents($filePath, json_encode($dataBase, JSON_PRETTY_PRINT));
                    //         }
                    //     }
                    // }

                    // changePfp($comments, "author", "data/comments.json", $correctName);
                    // ////

                    send_JSON($filePath . $name);
                    // file_put_contents($filePath, json_encode($dataBase, JSON_PRETTY_PRINT));
                } else {
                    send_JSON(["message"=>"File could not be added to server, please try again"], 409);
                }

            }
            
        }
        send_JSON(["message"=>"Problems with finding user"], 404);
    }
    send_JSON(["message"=>"Send a file"], 421);
}

?>
