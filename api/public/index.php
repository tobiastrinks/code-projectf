<?php

header("Access-Control-Allow-Origin: *");
error_reporting(-1);
ini_set('display_errors', 'On');

if (PHP_SAPI == 'cli-server') {
    // To help the built-in PHP dev server, check if the request was actually for
    // something which should probably be served as a static file
    $url  = parse_url($_SERVER['REQUEST_URI']);
    $file = __DIR__ . $url['path'];
    if (is_file($file)) {
        return false;
    }
}

require __DIR__ . '/../vendor/autoload.php';

session_start();

//Controller Namespace
$cN = '\src\Controller\\';

// Instantiate the app
$settings = require __DIR__ . '/../src/settings.php';
$container = new \Slim\Container($settings);
$app = new \Slim\App($container);

$c = $app->getContainer();

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

//$c['errorHandler'] = function ($c) {
//    return function ($request, $response, $exception) use ($c) {
//        return $c['response']->withStatus(500)
//            ->withHeader('Content-Type', 'text/html')
//            ->write('Something went wrong!');
//    };
//};

// Set up dependencies
require __DIR__ . '/../src/dependencies.php';
// Register middleware
require __DIR__ . '/../src/middleware.php';
// Register routes
require __DIR__ . '/../src/routes.php';

// Run app
$app->run();
