var http = require('http');
var fs = require('fs');
var unzip = require('unzip');
var iconv = require('iconv-lite');
var path = require('path');
var cors = require('cors');
var express = require('express');
var app = express();
app.use(cors());
var zipUrl = 'download/info.zip',
		currenciesUrl = 'download/output/bm_cy.dat',
		exchangesUrl = 'download/output/bm_rates.dat';



app.get('/', function(req, res){
	res.send('index');
});

app.get('/my', function(req, res){
	res.send('12312321');
});

app.listen(3004, function(){
	console.log('Run');
});