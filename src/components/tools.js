function get_url_parameter(parameter){
	const query_string = window.location.search
	const parameters = new URLSearchParams(query_string);
	if(parameters.has(parameter)){
		return parameters.get(parameter)
	}
	return -1
}

const colours = [[255,0,0],[255,80],[255,190,0],[255,255,0],[170,255,0],[100,255,0]]

export {colours}
export {get_url_parameter}
