exports.handler = async (event: any) => {
	const body = JSON.parse(event.body);
	
	console.log('BODY ITEMS!');
	console.log(event.body);
	console.log('PARSED BODY ITEMS!');
	console.log(JSON.stringify(body.line_items));

	const response = {
		statusCode: 200,
		body,
	};

	return response;
};