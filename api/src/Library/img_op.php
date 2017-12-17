<?php
namespace src\Library;

use Respect\Validation\Rules\Date;
use Imagick;

/*
	resize		- [ src, dest, dimensions, extra ]
	crop		- [ src, dest, widthxheight, gravity, extra ]
	dimensions	- [ src ] > return([width, height])
*/
class img_op {
	
	public static function resize( $src, $dest, $dimensions ){
		
		$new_dim 	= explode("x", $dimensions);
		$max_width 	= intval($new_dim[0]);
		$max_height = intval($new_dim[1]);
		
		try{
			$img = new Imagick();
			$img->readImageBlob(file_get_contents($src));
		}
		catch(Exception $e) {
			die('Error: ' . $e->getMessage());
		}
		
		$new_dim = img_op_max_dimensions($src, $max_width, $max_height);
		
		if($new_dim){
			$img->resizeImage($new_dim[0], $new_dim[1], 1, 1, 0);
			$img = $img->writeImage($dest);
		}
	}
	
	public static function crop( $src, $dest, $dimensions ){
		
		try{
			$img = new Imagick();
			$img->readImageBlob(file_get_contents($src));
		}
		catch(Exception $e) {
			die('Error: ' . $e->getMessage());
		}
		
		$new_dim 	= explode("x", $dimensions);
		$new_width 	= intval($new_dim[0]);
		$new_height = intval($new_dim[1]);
		
		$img->cropThumbnailImage($new_width, $new_height);
		$img = $img->writeImage($dest);
	}
	
	public static function dimensions( $src ){
		
		$result = Array();
		
		try{
			$img = new Imagick();
			$img->readImageBlob(file_get_contents($src));
		}
		catch(Exception $e) {
			die('Error: ' . $e->getMessage());
		}
		
		$result[0] = $img->getImageWidth();
		$result[1] = $img->getImageHeight();
		
		return $result;
	}
	
	public static function maxDimensions( $src, $max_width, $max_height ){
		
		$old_dim 	= $this->dimensions($src);
		$width 		= $old_dim[0];
		$height 	= $old_dim[1];
		
		$new_width 	= $width;
		$new_height = $height;
		
		if( ($max_width == 0 AND $max_height == 0) OR
			($max_width > $width AND $max_height == 0) OR
			($max_height > $height AND $max_width == 0) OR
			($max_width > $width AND $max_height > $height)){

			return (false);
		}
		else{
			
			if($max_width != 0 AND $max_height != 0){
				
				$new_width = $max_width;
				$new_height = $max_height;
			}
			else{
				if($max_width != 0 AND $new_width > $max_width){
					$new_width_cache = $new_width;
					$new_width = $max_width;
					$new_height = $height*($new_width/$new_width_cache);
				}
				
				if($max_height != 0 AND $new_height > $max_height){
					$new_height_cache = $new_height;
					$new_height = $max_height;
					$new_width = $width*($new_height/$new_height_cache);
				}
				
				$new_width = round($new_width, 0);
				$new_height = round($new_height, 0);
			}
			
			return([$new_width, $new_height]);
		}
	}
}