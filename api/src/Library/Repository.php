<?php
namespace src\Library;

class Repository {

    protected $DB;

    protected $container;

    public function __construct ($DB, $container) {
        $this->DB = $DB;
        $this->container = $container;
    }
}