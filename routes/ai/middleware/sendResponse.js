
const sendResponse = async (req, res, next) => {

	// if both req.locals.output is null and req.locals.outputs is null, then
	// the middleware has not been executed
	if (!req.locals.output && !req.locals.outputs) {
		res.json({
			success: false,
			error: "No Content",
			message: "No Content was generated, please try again"
		})
		return
	}

	let response = { success: true, }
	if(req.locals.output){
		response.output = req.locals.output
	}
	if(req.locals.outputs){
		response.outputs = req.locals.outputs
	}
	if(req.locals.totalPages){
		response.totalPages = req.locals.totalPages
	}
	if(req.locals.bottomRange){
		response.bottomRange = req.locals.bottomRange
	}
	if(req.locals.topRange){
		response.topRange = req.locals.topRange
	}
	if(req.locals.totalItems){
		response.totalItems = req.locals.totalItems
	}
	if(req.locals.code){
		response.code =  req.locals.code
	}

	res.json(response)

}

module.exports = sendResponse
