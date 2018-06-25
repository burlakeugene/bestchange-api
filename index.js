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

function mkDirByPathSync(targetDir, {isRelativeToScript = false} = {}) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
      console.log(`Directory ${curDir} created!`);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }

      console.log(`Directory ${curDir} already exists!`);
    }

    return curDir;
  }, initDir);
}

function getCurrinciesId(first, second){
	return new Promise((resolve, reject) => {
		fs.readFile(currenciesUrl, function(error, data){
			data = iconv.decode(data, "cp1251");
			var result = [];
			if(error) throw error;
			data = data.split('\n');
			data = data.map((item, index) => {
				item = item.split(';');
				var name = item[2],
						id = item[0];
	
				if(name === first) result[0] = {
					id: id,
					name: name,
				};
				if(name === second) result[1] = {
					id: id,
					name: name,
				};
				if(index >= data.length - 1){
					resolve(result);
				}
			});
		});
	});	
}

function getExchanges(items){
	return new Promise((resolve, reject) => {
		var from = items[0],
				to = items[1];
		fs.readFile(exchangesUrl, function(error, data){
			data = iconv.decode(data, "cp1251");
			var result = [];
			if(error) throw error;
			data = data.split('\n');
			data = data.map((item, index) => {
				item = item.split(';');
				var fromId = item[0],
						toId = item[1];
				if(fromId == from.id && toId == to.id){
					item = {
						fromName: from.name,
						toName: to.name,
						price: item[4],
						reserve: item[5]
					}
					result.push(item);
				}
				if(index >= data.length - 1){
					resolve(result);
				}
			});
		});
	});
}


function getData(){
	return new Promise((resolve, reject) => {
		mkDirByPathSync('download');
		var file = fs.createWriteStream(zipUrl);
		http.get("http://www.bestchange.ru/bm/info.zip", function(response) {
			response.pipe(file);    
		}).on('close', function () {
			mkDirByPathSync('download/output');
			fs.createReadStream(zipUrl).pipe(
				unzip.Extract({ path: 'download/output' })
			);
			setTimeout(() => {
				getCurrinciesId('Advanced Cash USD', 'Яндекс.Деньги').then((result) => {
					getExchanges(result).then((result) => {
						resolve(result);
					});
				});
			}, 1000);			
		});
	});
}

app.get('/', function(req, res){
	res.send('index');
});

app.get('/my', function(req, res){
  	getData().then((result) => {
		res.send(result);
	});
});

app.listen(3004, function(){
	console.log('Run');
});