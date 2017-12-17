<?php
// DIC configuration

$controllers = [
    'layout'
];

$container = $app->getContainer();

$container['errors'] = [
        'INVALID_TOKEN' => 1,
        'TOKEN_NOT_SPECIFIED' => 2,
        'NO_DATABASE_CONNECTION' => 3,
        'UNKNOWN_MAIL' => 4,
        'INVALID_PASSWORD' => 5,
        'UNKNOWN_USER_ID' => 6,
        'DATABASE_ERROR' => 7,
        'ACCESS_DENIED' => 8,
        'DATA_INVALID' => 9,
        'UNKNOWN_PROJECT_ID' => 10,
        'UNKNOWN_SUBJECT_ID' => 11,
        'UNKNOWN_YEAR_ID' => 12,
        'PAYEVER_API_ERROR' => 13,
        'PAYMENT_AMOUNT_ERROR' => 14,
        'PROTOCOL_ALREADY_EXIST' => 15
];

//disable on production environment
$container['debug'] = true;

$container['db'] = function ($c){
    try {
        $db = $c['settings']['db'];
        $pdo = new PDO("mysql:host=" . $db['host'] . ";dbname=" . $db['dbname'], $db['user'], $db['pw']);
        $pdo -> exec("set names utf8");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $pdo;
    }catch (PDOException $e){
        echo json_encode(['error' => 1, 'code' => $c['errors']['NO_DATABASE_CONNECTION'], 'logout' => 1]);
        die();
    }
};

foreach ($controllers as $controller) {
    $controllerName = $cN . $controller;
    $container[$controllerName] = function ($c) use ($controllerName) {
        return new $controllerName($c);
    };
}

// view renderer
$container['renderer'] = function ($c) {
    $settings = $c->get('settings')['renderer'];
    return new Slim\Views\PhpRenderer($settings['template_path']);
};

// monolog
$container['logger'] = function ($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
    return $logger;
};

//$container['aws'] = function ($c) {
//    $awsConfig = $c->get('settings')['aws'];
//    return new \src\Library\Aws\AwsFactory($awsConfig);
//};

$container['repository'] = function ($c) {
    return new \src\Library\RepositoryFactory($c['db'],$c);
};

$container['filter'] = function ($c) {
    return new \src\Library\Filter();
};
