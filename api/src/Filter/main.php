<?php
$this->addRule('user')->not([
    'password'
])->append('permissions', 'permission');
$this->addRule()->only();
?>