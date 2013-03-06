<?php

/**
* PLACEGOAT. For all your goat placeholder needs.
* @author Ross Hettel
* @version 0.1 beta
*/


/**
 * Step 1: Require the Slim Framework
 */
require 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();

/**
 * Step 2: Instantiate a Slim application
 */
$app = new \Slim\Slim(array(
    'debug'=>true,
    'templates.path'=>'./templates'
));

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, and `Slim::delete`
 * is an anonymous function.
 */

// Homepage
$app->get('/', function() use($app) {
    $app->render('homeTemplate.php', array('test'=>'this is a test'));
});

// Width & Height
$app->get('/:width/:height', function($width, $height) use($app) {
    if($width > 1500 || $height > 1500) 
        echo "Slow down, buddy. We don't have that many goats."; die();

    echo "$width X $height";
});

// Width only
$app->get('/:width', function($width) use($app) {
    //just redirect them to the width & height route 
    $app->response()->redirect("/$width/$width", 303);
});


/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
