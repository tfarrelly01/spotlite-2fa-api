module.exports = {
	extendApp : extendApp,
	extendResponse : extendResponse
}

function extendResponse(res) {
	res.api = function(err, result) {
		
		res.send({
			status: err ? 'error' : 'ok',
			error: ((err || {}).message || err ),
			result: result
		});
	}
	
	res.api.promise = function(promise) {
		//bind handlers
		promise.then(items => res.api(null, items))
		.catch(err => res.api(err));
	}
}

function extendApp(app) {
	app.use((req, res, next) => {
		extendResponse(res);
		next();
	})
}