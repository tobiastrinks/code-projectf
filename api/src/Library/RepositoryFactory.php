<?php
namespace src\Library;

class RepositoryFactory {

    private $DB;

    private $container;

    public function __construct ($DB,$container) {
        $this->DB = $DB;
        $this->container = $container;
    }

    public function loadRepository ($name) {
        $repositoryName = 'src\Repository\\' . $name;
        return new $repositoryName($this->DB, $this->container);
    }
}