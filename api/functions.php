<?php
function send_JSON ($data, $code = 200){
    header("Content-Type: application/json");
    http_response_code($code);
    echo json_encode($data);
    exit();
}

function tooShort ($input, $value){ // cant be too short
    if(strlen($input) < 3){
        send_JSON(["message"=>"The $value needs to be 3 characters or more"], 406); 
    }
}

function incorrectChar ($splitWord, $value){ // characters outside the english alphabet is not allowed
    $allowed = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9'];
    if($value == "email"){ // email is allowed to have @ and .
        $allowed[] = '@';
        $allowed[] = '.';}

    foreach($splitWord as $char){
        if(!in_array($char, $allowed)){
            send_JSON(["message"=>"Character not allowed in $value"], 406); 
        }
    }
}

 // universal for most "change" settings
function change ($input, $users, $filename, $field, $secondaryField = "password"){
    // field decides what will be changed
    $new = "new_";
    $new .= $field;

    if($input[$field] == $input[$new]){ // cant be the same
        send_JSON(["message"=>"New $field cannot be the same as old $field"], 406); 
    }

    foreach ($users as $index => $user) {
        if($user[$field] == $input[$field] && $user[$secondaryField] == $input[$secondaryField]){
            ////////////// time for checks...
            // first, check its not already taken

            if ($field !== "password"){ // password does not have to be "taken"
                $array = $users; 
                $copiedArray = $array; // array needs to be copied so original array isn't damaged
                array_splice($copiedArray, $index, 1);
                foreach($copiedArray as $owned){
                    if($owned[$field] == $input[$new]){
                        send_JSON(["message"=>"This $field is already taken, please try again"], 409); 
                    }
                }
            }

            if ($field == "password"){ // old password needs to be correct
                if ($input[$field] != $user["password"]) {
                    send_JSON(["message"=>"Incorrect password, please try again"], 400); 
                }
            }

            tooShort($input[$new], $field); // make sure its not too short

            $split = str_split($input[$new]); // or has illegal characters
            incorrectChar($split, $field);

            if($field == "email"){ // email needs to have @ and .
                if(!preg_match("/(@)(.)/", $input[$new])){
                    send_JSON(["message"=>"Please enter a valid email"], 406); 
                }
            }
            ////////////// checks are done, can now be changed!

            $users[$index][$field] = $input[$new];
            file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));

            // change in other databases too
            if($field == "username"){
                $favorites = json_decode(file_get_contents("data/favourites.json"), true);
                $comments = json_decode(file_get_contents("data/comments.json"), true);
                $recipes = json_decode(file_get_contents("data/recipes.json"), true);

                function changeUsername ($dataBase, $key, $filePath, $input){
                    foreach($dataBase as $index => $data){
                        if($data[$key] == $input["username"] && !isset($data["deleted"])){
                            $dataBase[$index][$key] = $input[$new];

                            file_put_contents($filePath, json_encode($dataBase, JSON_PRETTY_PRINT));
                        }
                    }
                }

            changeUsername($favorites, "username", "data/favourites.json", $input);
            changeUsername($comments, "author", "data/comments.json", $input);
            changeUsername($recipes, "author", "data/recipes.json", $input);
            }
            ///

            send_JSON(["message"=>"Successfully updated $field!"]);
        }
    }
    send_JSON(["message"=>"Problems with finding user"], 404); // if user cant be found / matched
}

$method = $_SERVER["REQUEST_METHOD"];

$filename = "data/users.json";
    
$users = json_decode(file_get_contents($filename), true);
$input = json_decode(file_get_contents("php://input"), true);

if ($method == "PATCH") {

    
    $username = $input['username']; // take out the two keys that are sent in the request
    
    foreach($users as &$userData){
        if ($userData["username"] == $username) { // find the correct user

            $userData["firstTime"] = false; //update the array of favourites 
            file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
            send_JSON($user);
            // send_JSON($userData);
        }
        
    }  
    send_JSON(["message"=>"Problems with finding user"], 404); 
    
}


if (isset($_GET["user"])) { 

    
    $username = $_GET["user"];
    
    foreach($users as &$userData){
        if ($userData["username"] == $username) { // find the correct user

            send_JSON($userData);
        }
        
    }  
    send_JSON(["message"=>"Problems with finding user"], 404); 

}

if (isset($input['content'])) {
    $username = $input['user'];
    $content = $input['content'];

    $id = 1;

    
    foreach($users as &$userData){
        if ($userData["username"] == $username) {

            $latestId = 0;
            foreach ($userData["notes"] as $note) {
                $latestId = max($latestId, $note["id"]);
            }
            
            // Beräkna nästa id-värde
            $newId = $latestId + 1;
            
            // Lägg till id i den nya anteckningen och öka sedan $latestId för nästa anteckning
            $content["id"] = $newId;
            $userData["notes"][] = $content;
            $latestId++;

            file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
            send_JSON($userData["notes"]);
        }
        
    }  
}

if ($method == "DELETE") {
    $username = $input['user'];
    $id = $input['id'];

    foreach($users as &$userData){
        if ($userData["username"] == $username) {
            foreach ($userData["notes"] as $index => $note) {
                if ($note["id"] == $id) {
                    array_splice($userData["notes"], $index, 1);
                    file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
                    send_JSON($userData["notes"]);
                }
            }
            // Om anteckningen med det angivna id inte hittas
            send_JSON(["message" => "Note with id $id not found for user $username"], 404);
        }
    }
    // Om användaren inte hittas
    send_JSON(["message" => "User $username not found"], 404);
}


?>