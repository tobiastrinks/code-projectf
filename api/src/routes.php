<?php

use src\Middleware\Authentification;

$app->group('/login', function () use ($app, $cN) {
    $app->post('', $cN.'Login:login')->setName('login');
    $app->group('/forget', function () use ($app, $cN) {
        $app->post('/', $cN . 'Login:forget')->setName('forget');
        $app->post('/validate', $cN . 'Login:validate')->setName('validate');
        $app->post('/reset', $cN . 'Login:reset')->setName('reset');
    });
});

$app->group('/user', function () use ($app, $cN) {
	$app->get('', $cN.'User:info')->setName('info');
	$app->post('/create', $cN.'User:create')->setName('create');
	$app->post('/update', $cN.'User:update')->setName('update');
	$app->post('/search', $cN.'User:search')->setName('search');
});//->add(new Authentification($app->getContainer()));

$app->group('/project', function () use ($app, $cN) {
	$app->get('', $cN.'Project:project')->setName('project');
	$app->get('/list', $cN.'Project:list')->setName('list');
	
	$app->post('/create', $cN.'Project:create')->setName('create');
	$app->post('/delete', $cN.'Project:delete')->setName('delete');
	$app->post('/update', $cN.'Project:update')->setName('update');
	
	$app->group('/relation', function () use ($app, $cN) {
		$app->post('/create', $cN.'Project:createRelation')->setName('createRelation');
		$app->post('/delete', $cN.'Project:deleteRelation')->setName('deleteRelation');
	});
});//->add(new Authentification($app->getContainer())); LOGIN TOKEN

$app->group('/media', function () use ($app, $cN) {
	$app->post('/upload', $cN.'Media:upload')->setName('upload');
});