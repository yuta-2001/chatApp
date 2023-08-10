<?php
require __DIR__ . '/../../vendor/autoload.php';
$openapi = \OpenApi\Generator::scan([__DIR__ . '/../../app']);
header('Content-Type: application/x-yaml');
echo $openapi->toYaml();
