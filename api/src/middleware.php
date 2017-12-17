<?php
// Application middleware

////Adds Allow-Origin-Header
$app->add(function ($request, $response, $next) {
    $response = $next($request, $response);
    $newResponse = $response
		->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization, cache-control')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	
	return $newResponse;
});

////Validation Middleware
//$app->add(new \src\Middleware\Validation(__DIR__ . '/Validations'));