var request = require('request');
var rest_api = require('../../config/rest_api');

module.exports = {

    uploadProfilePicture: function(callback) {

		  request.post(rest_api.uploadProfilePicture, {json:true}, function(err, res, body) {
		    if (err){
		      callback(err,null);
		      return;
		    }
		    if (res.statusCode === 200) {
		      callback(null, body);
		      return;
		    }
		    if (res.statusCode !== 200) {
		      callback(null, null);
		      return;
		    }
		  });
		}
}
;
