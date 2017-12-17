<?php
namespace src\Library;

use Respect\Validation\Rules\Date;

class Helper {
    public static function generateRandomString ($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    /**
     * Checks if the given data is valid
     * @param $data - the data to check
     * @param string $type - the type that the data is supposed to be
     *        possible values: text, number, integer, date
     * @param $options
     *          for text type:
     *              maxlength - integer value, maximum length that the text should have
     *              minlength - integer value, minimum length that the text should have
     *          for number type:
     *              minvalue - minimum value that the data should have (inclusive)
     *              maxvalue - maximum value that the data should have (inclusive)
     *          for integer type:
     *              same options as number type
     *          for date type:
     *              no options available
     * @return boolean - true data is valid, false otherwise
     */
    public static function validate($data,$type = 'text', $options = null){
        switch ($type){
            default:
            case 'text':
                if (is_string($data)){
                    if (isset($options['minlength']) && strlen($data) < $options['minlength'])
                        return false;
                    if (isset($options['maxlength']) && strlen($data) > $options['maxlength'])
                        return false;
                    return true;
                }else{
                    return false;
                }
                break;
            case 'number':
                if (is_numeric($data)){
                    if (isset($options['minvalue']) && $data < $options['minvalue'])
                        return false;
                    if (isset($options['maxvalue']) && $data > $options['maxvalue'])
                        return false;
                    return true;
                }else{
                    return false;
                }
                break;
            case 'integer':
                if (ctype_digit($data)){
                    if (isset($options['minvalue']) && $data < $options['minvalue'])
                        return false;
                    if (isset($options['maxvalue']) && $data > $options['maxvalue'])
                        return false;
                    return true;
                }else{
                    return false;
                }
                break;
            case 'date':
                $date = explode(".",$data);
                if (count($date) != 3)
                    return false;
                if (checkdate($date[1], $date[0], $date[2])) {
                    return true;
                }else {
                    return false;
                }
                break;
        }
    }

    /**
     * Formats the given date string into a german date string of the format dd.mm.yyyy
     * @param $date
     * @return string
     */
    public static function formatDateToGerman($date){
        $date = new \DateTime($date);
        return $date->format("d.m.Y");
    }

    /**
     * Formats the given german date string into an international date string of the format yyyy-mm-dd
     * @param $date
     * @return string the formatted date string or false if the given date is not a valid german date string
     */
    public static function formatDateFromGerman($date){
        $date = explode(".",$date);
        if (count($date) != 3 || !checkdate($date[1], $date[0], $date[2]))
            return false;
        $date = new \DateTime("$date[2]-$date[1]-$date[0]");
        return $date->format("Y-m-d");
    }
    /**
     * Send mails via Mailgun
     * @param $mail, $amount
     * @return json
     */
    public static function sendNotificationMail($mail, $betreff, $headline, $text, $linkText, $link){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($ch, CURLOPT_USERPWD, 'api:key-f4dde55ff3f75ffaf560823462447d4e');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($ch, CURLOPT_URL,
            'https://api.mailgun.net/v3/groe.me/messages');
        $template = file_get_contents('../templates/mail/notification.html');
        $template = str_replace('{{headline}}', $headline, $template);
        $template = str_replace('{{text}}', $text, $template);
        $template = str_replace('{{linkText}}', $linkText, $template);
        $template = str_replace('{{link}}', $link, $template);
        curl_setopt($ch, CURLOPT_POSTFIELDS,
            array('from' => 'GROE <no-repley@groe.me>',
                'to' => $mail,
                'subject' => $betreff,
                'html' => $template));
        /* !!!DEV!!! */
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $result = curl_exec($ch);
        curl_close($ch);
    }

    public static function filter($filter){
        switch($filter){
            case 'limit':
                if(isset($_POST['filter']['limit'])){
                    if(isset($_POST['filter']['limitstart'])){
                        return $_POST['filter']['limit'].','.$_POST['filter']['limitstart'];
                    }else{
                        return $_POST['filter']['limit'];
                    }
                }else{
                    return 50;
                }
                break;
            case 'order':
                if(isset($_POST['filter']['order'])){
                    return $_POST['filter']['order'];
                }else{
                    return 'DESC';
                }
                break;

        }
    }
	
	public static function getArrayFromObject($object, $key = false) {
		
		$result = [];
		
		if(empty($object))
			return false;
		else{
			foreach($object as $object_elem){
				if(!empty($object_elem)){
					
					$pos = count($result);
					
					if(!$key){
						foreach($object_elem as $key => $value){
							$result[$pos] = $value;
						}
					}
					else{
						if(isset($object_elem[$key]))
							$result[$pos] = $object_elem[$key];
						else
							return false;
					}
				}
				else
					return false;
			}
			
			return ($result);
		}
	}
}