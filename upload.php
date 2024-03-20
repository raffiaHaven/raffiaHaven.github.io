<?php
// Check if the form is submitted and files are uploaded
$title = $_POST['title'];
$price = $_POST['price'];
$description = $_POST['description'];
$color = $_POST['color'];
$size = $_POST['size'];
$weight = $_POST['weight'];
$length = $_POST['length'];
$width = $_POST['width'];
$height = $_POST['height'];

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["images"])) {

    $targetDir = "assets/images/{$_POST['type']}/";
    $uploadOk = 1;
    if (!file_exists($targetDir)) {
        mkdir($targetDir, 0777, true); // Change permission according to your requirements
    }
    $urlList = [];
    // Loop through each uploaded file
    foreach ($_FILES["images"]["tmp_name"] as $key => $tmp_name) {
        $uploadFile = $targetDir . uniqid("{$_POST['type']}_") . "." . strtolower(pathinfo(basename($_FILES["images"]["name"][$key]), PATHINFO_EXTENSION));
        $imageFileType = strtolower(pathinfo($uploadFile, PATHINFO_EXTENSION));

        // Check if image file is a actual image or fake image
        $check = getimagesize($tmp_name);
        if ($check === false) {
            echo "Error: File is not an image.";
            $uploadOk = 0;
        }

        // Check if file already exists
        if (file_exists($uploadFile)) {
            echo "Error: Sorry, file already exists.";
            $uploadOk = 0;
        }

        // Check file size (max 5MB)
        if ($_FILES["images"]["size"][$key] > 5 * 1024 * 1024) {
            echo "Error: Sorry, your file is too large.";
            $uploadOk = 0;
        }

        // Allow certain file formats
        $allowedExtensions = array("jpg", "jpeg", "png", "gif");
        if (!in_array($imageFileType, $allowedExtensions)) {
            echo "Error: Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }

        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            echo "Error: Your file was not uploaded.";
        } else {
            // Attempt to move the uploaded file
            if (move_uploaded_file($tmp_name, $uploadFile)) {
                array_push($urlList, $uploadFile);
            } else {
                echo "Error: Sorry, there was an error uploading your file.";
            }
        }
    }
    var_dump($urlList);
    echo "<br>title : $title";
    echo "<br>price : $price";
    echo "<br>description : $description";
    echo "<br>color : $color";
    echo "<br>size : $size";
    echo "<br>weight : $weight";
    echo "<br>length : $length";
    echo "<br>width : $width";
    echo "<br>height : $height";
    echo "<hr>";
    $json = array(
        "title" => $title,
        "price" => $price,
        "badge" => "25",
        "cat" => [
            "ecoFrendly",
            "natural"
        ],
        "type" => "mirror",
        "description" => $description,
        "inventory_quantity" => 50,
        "brand" => "ExampleBrand",
        "images" => $urlList,
        "attributes" => array(
            "color" => $color,
            "size" => $size,
            "weight" => $weight,
        ),
        "ratings" => array(
            "average" => 4.5,
            "count" => 20
        ),
        "dimensions" => array(
            "length" => $length,
            "width" => $width,
            "height" => $height
        ),
        "shipping" => array(
            "weight" => $weight,
            "dimensions" => "$length x $width x $height cm"
        ),
        "manufacturer_info" => array(
            "name" => "Example Manufacturer",
            "location" => "Somewhere, Earth"
        )
    );
    // print_r($json);
    // foreach ($json as $x => $y) {
    //     if (is_array($y)) {
    //         echo "$x: <br>";
    //         foreach ($y as $key => $value) {
    //             echo "||||||||||||||||||||||||    $key: $value <br>";
    //         }
    //     } else {
    //         echo "$x: $y <br>";
    //     }
    // }



    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://eu-west-2.aws.data.mongodb-api.com/app/raffiahaven-lrlrn/endpoint/product',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => json_encode($json),
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
        ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    echo $response;
} else {
    echo "Error: No files uploaded.";
}
