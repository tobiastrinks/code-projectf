<?php
namespace src\Middleware;

use Slim\Http\Request;
use Slim\Http\Response;

/**
 * Validate sent parameters with validation definitions
 * @package src\Middleware
 */
class Validation {

    private $rules = [];

    public function __construct ($path) {
        $this->loadAllValidationFiles($path);
    }

    /**
     * Load all Validation files in folder "Validations" and merge them to $rules array
     * @param $path string
     */
    private function loadAllValidationFiles ($path) {
        if ($handle = opendir($path)) {
            while (false !== ($entry = readdir($handle))) {
                if ($entry !== '.' && $entry !== '..' && is_file($path . '/' . $entry)) {
                    $this->rules = array_merge($this->rules, (include $path . '/' . $entry));
                }
            }
            closedir($handle);
        }
    }

    /**
     * Get recent route name with it's validation definitions and validate it.
     * If Validation fails, error code from validation definition will be pushed to errorCode array
     *
     * @param $request Request
     * @param $response Response
     * @param $next
     * @return mixed Response
     */
    public function __invoke ($request, $response, $next) {
        //Get recent route name and validation rules
        if ($request->getAttribute('route')->getName() != '') {
            $routeName = $request->getAttribute('route')->getName();
            if (array_key_exists($routeName, $this->rules)) {
                $validationRules = array_merge($this->rules[$routeName], $this->rules['*']);
            } else {
                $validationRules = $this->rules['*'];
            }
        } else { //If not set, set default
            $validationRules = $this->rules['*'];
        }
        $errorCodes = [];
        foreach ($validationRules as $paramName => $paramRules) {
            foreach ($validationRules[$paramName] as $ruleCode => $rule) {
                if (!$rule->validate($request->getParam($paramName))) {
                    $errorCodes[] = $ruleCode;
                }
            }
        }
        if (empty($errorCodes)) {
            $response = $next($request, $response);
        }
        return $response;
    }

}