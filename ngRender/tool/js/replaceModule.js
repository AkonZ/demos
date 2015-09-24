var fs = require("fs");

var ReplaceModule = function(options) {
	this.fs = fs;
	this.rootPath = options.rootPath;
	this.copyPath = options.copyPath;
	this.init();
}
ReplaceModule.prototype = {
	init: function() {
		this.readDirs(this.rootPath)	
	},
	
	each: function(data, callback) {
		var i, k;
		for(i = 0, k = data.length; i < k; i++) {
			callback.call(this, i);
		}
	},
	
	readDirs: function(dirName) {
		var _this = this;
		this.fs.readdir(dirName, function(err, dirs) {
			_this.each(dirs, function(i) {
				var newDirName = dirName + '/' + dirs[i]
				var stat = _this.fs.lstatSync(newDirName);
				if (stat.isDirectory()) {
					_this.readDirs(newDirName);
				}
				else {
					_this.writeFile(newDirName);
				}
			})
		})
	},

	getHtml: function(key) {
		var keys = key.split(/\s+/);
		var i, k, path;
		for(i = 0, k = keys.length; i < k; i++) {
			if(keys[i].indexOf('.html') > 0) {
				path = keys[i];
			}
		}
		path = this.rootPath + path;
		var data = this.fs.readFileSync(path, "utf-8");
		return data;
	},
	
	writeFile: function(fileName) {
		if(fileName.match(/\.html$/)) {
			var text = this.fs.readFileSync(fileName, "utf-8");
			var error = false;
			var errorMsg = '',
				endLength,
				startLength;
			
			var endKey = '<!-- end include -->';
			if(text.indexOf(endKey) <= 0) {
				return;
			}
			endLength = text.match(/<\s*!\s*--\s*end\s*include\s*--\s*>/g).length;
			var datas = text.split(/<\s*!\s*--\s*end\s*include\s*--\s*>/);
			var i, k, index, newText, matchKey, html, data;
			for(i = 0,k = datas.length; i < k; i++) {

			  index = datas[i].indexOf('<!-- include:');
			  newText = datas[i].substr(index);
			  matchKey = newText.match(/\<\s*!\s*--\s*include:.*--\s*\>/g);

			  if(matchKey && matchKey.length !== 1) {
			  	errorMsg = matchKey;
			  	error = true;
			  }
			  if(matchKey && matchKey[0]) {
			  	if(i > endLength - 1) {
			  		errorMsg = '(the page end not endTag)';
			  		error = true;
			  	}
			  	
			  	if(!error) {
				    try{
						html = this.getHtml(matchKey[0]);
					}catch(e){
						error = true;
						errorMsg = '(can not find the file' + matchKey[0] + ')';
					}
				    
				    datas[i] = datas[i].replace(newText, matchKey[0] + '\n' + html);
			  	}
			  }
			  else {			  	
			  	if(i < endLength) {
			  		error = true;
					errorMsg = '(The beginning tag is inconsistent with the end tag)';
			  	}
			  }
			}
			if(!error) {
				data = datas.join('\n'+endKey);
				this.copyFile(fileName, text);
				this.fs.writeFile(fileName, data, function() {
					console.log('success:', fileName);
				});
			}
			else {
				console.log('error', fileName, errorMsg);
			}
		}
	},

	copyFile: function(fileName, text) {
		var date = new Date();
		console.log(date.getFullYear())
		var date = date.getFullYear() + '_' + (date.getMonth()+1) + '_' + date.getDate()
					+ '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '_';
		var name = date + fileName.match(/\w*.html/)[0];
		var path = this.copyPath+'/'+name;
		this.fs.createWriteStream(path);
		this.fs.writeFile(path, text, function() {
			console.log('copy success:', path);
		});
	}
}
exports.ReplaceModule = ReplaceModule

