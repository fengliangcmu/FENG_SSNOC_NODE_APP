var CallRest = require('../models/CallRest');

module.exports = function(_, io, passport, participants, refreshAllUsers) {
	return{

		display : function(req, res)
		{
			res.render('makeCall', {user_id_actualName: req.session.passport.user.user_name});
		},

        uploadProfilePicture: function(req, res) {

            CallRest.uploadProfilePicture(function(err,body){
                if(body){
                    res.send(body);
                }
            });

        }

	};
};