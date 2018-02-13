#!/usr/bin/env node

var Jimp = require('jimp')
var glob = require('glob')
var path = require('path')

var from = process.argv[2]
var to = process.argv[3]
glob(from + '/*.jpg', processImages)

function processImages ( err, images ) {
  if (err) throw err
  images.forEach( processImage )
}

function processImage ( image ) {
  console.log('processing image: ', image)
  return Jimp.read(image, createSet)
	function createSet ( err, img ) {
		if (err) throw err
		var name = path.basename(image, '.jpg')
		img.clone()
			.resize(1920, Jimp.AUTO)
			.write(to + '/' + name + '-1920' + '.jpg' )
		img.clone()
			.resize(960, Jimp.AUTO)
			.write(to + '/' + name + '-960' + '.jpg' )
		img.clone()
			.resize(480, Jimp.AUTO)
			.write(to + '/' + name + '-480' + '.jpg' )
		img.clone()
			.resize(240, Jimp.AUTO)
			.write(to + '/' + name + '-240' + '.jpg' )

	}
}




