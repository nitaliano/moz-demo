var accessId = null;
var secretKey = null;

if (!accessId || !secretKey) {
	throw new Error('You need to enter your access id and secret in auth.js');
}

module.exports = AuthService;

function AuthService() {}

AuthService.prototype.get = function () {
	return new Buffer(accessId + ':' + secretKey).toString('base64');
};