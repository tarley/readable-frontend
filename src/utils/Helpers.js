function formatStr(number, digits=2) {
	return ("0" + number).slice(-digits);
}

export const dateFormat = (timestamp) => {
	if(!timestamp)
		return "";

	//timestamp = new Date().getTime();
	const date = new Date(timestamp);
	
	const dateValues = {
		year: date.getFullYear(),
		month: formatStr(date.getMonth()+1),
   		day: formatStr(date.getDate()),
   		hour: formatStr(date.getHours()),
   		minute: formatStr(date.getMinutes()),
   		second: formatStr(date.getSeconds())
	}

	return `${dateValues.day}/${dateValues.month}/${dateValues.year} ${dateValues.hour}:${dateValues.minute}:${dateValues.second}`;	
}

export function isNullOrEmpty(value) {
	return !value || value.trim().length === 0;
}

export const METHOD_SORT_BY_VOTE_SCORE = (a, b) => b.voteScore - a.voteScore;
export const METHOD_SORT_BY_CREATE_DATE = (a, b) => b.timestamp - a.timestamp;