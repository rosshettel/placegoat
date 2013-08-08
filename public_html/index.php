<?php

/**
* PLACEGOAT. For all your goat placeholder needs.
* @author Ross Hettel
* @version 0.1 beta
*/

require '../Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim(array(
    'debug'=>true,
    'templates.path'=>'../templates'
));

$app->goatCountFile = "../goatcount.txt";

// Add an application-wide condition to width/height parameters
\Slim\Route::setDefaultConditions(array(
    'width'=>'[\d]*',
    'height'=>'[\d]*'
));

///////////
// Homepage
$app->get('/', function() use($app) {
    $app->render('homeTemplate.php', array('count'=>getNumberOfGoatsServed($app->goatCountFile)));
});

/////////////
// Goat, see?
$app->get('/goatse/:width', function($width) use($app) {
    //redirect to the goatse width & height route
    $app->response()->redirect("/goatse/$width/$width", 303);
});

$app->get('/goatse/:width/:height', function($width, $height) use($app) {
    if($width > 1500 || $height > 1500) {
        echo "Slow down, buddy. We don't have that many goats.";
        die();
    }

    $goat = "./goatsee.jpg";
    resizeAndServe($goat, $width, $height);
});

/////////////////
// Normal Goats
$app->get('/:width', function($width) use($app) {
    //just redirect them to the width & height route 
    $app->response()->redirect("/$width/$width", 303);
});

$app->get('/:width/:height', function($width, $height) use($app) {
    if($width > 1500 || $height > 1500) {
        echo "Slow down, buddy. We don't have that many goats."; 
        die();
    }

    $goat = grabAGoat();
    resizeAndServe($goat, $width, $height);
    
});


function resizeAndServe($imagePath, $newWidth, $newHeight) {
    //read original image, get it's dimensions
    $sourceImage = imagecreatefromjpeg($imagePath);
    $sourceX = imagesx($sourceImage);
    $sourceY = imagesy($sourceImage);

    $destImage = imagecreatetruecolor($newWidth, $newHeight);
    //imagecopyresampled will cut a rectangle out of the source image
    imagecopyresampled($destImage, $sourceImage, 0, 0, 0, 0, $newWidth, $newHeight, $sourceX, $sourceY);

    //send the image header
    $app = \Slim\Slim::getInstance();
    $response = $app->response();
    $response['Content-Type'] = 'image/jpeg';

    //update the goat count
    updateGoatServedLog($app->$goatCountFile);

    //send out the file contents to the browser
    imagejpeg($destImage);
}

function updateGoatServedLog($file) {
    $currentGoatCount = getNumberOfGoatsServed($file);
    
    $currentGoatCount++;
    file_put_contents($file, $currentGoatCount);
}

function getNumberOfGoatsServed($file) {
    $currentGoatCount = (int) file_get_contents($file);
    return $currentGoatCount;
}

function grabAGoat($dir = 'goats') {
    $goats = glob($dir.'/*.*');
    $goat = array_rand($goats);
    return $goats[$goat];
};

$app->run();
