<?php
return [
    'settings' => [
        'development' => false, //set false on LIVE!
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        //URL SETTINS
        'url' => [
            'api' => 'https://projectf-api.ttrks.de',
            'app' => 'https://projectf.ttrks.de',
        ],

        //DB SETTINGS LOCAL
        'db' => [
            'host' => 'localhost',
            'user' => 'root',
            'pw' => 'pRNtR_mysql99',
            'dbname' => 'code_projectf'
        ],

        // Monolog settings
        'logger' => [
            'name' => 'slim-app',
            'path' => __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],
    ],
];
