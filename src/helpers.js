export const flattenObject = function (ob) {
	const toReturn = {};

	for (let i in ob) {
		if (!Object.prototype.hasOwnProperty.call(ob, i)) continue;
		if ((typeof ob[i]) == 'object') {
			let flatObject = flattenObject(ob[i]);
			for (let x in flatObject) {
				if (!Object.prototype.hasOwnProperty.call(flatObject, x)) continue;

				toReturn[i + '.' + x] = flatObject[x];
			}
		} else {
			toReturn[i] = ob[i];
		}
	}
	return toReturn;
};

export const sortDataAscending = (data, key) => {
	return data.sort(function (a, b) {
		if (a[key] < b[key]) { return -1; }
		if (a[key] > b[key]) { return 1; }
		return 0;
	})
}

export const sortDataDescending = (data, key) => {
	return data.sort(function (a, b) {
		if (a[key] < b[key]) { return 1; }
		if (a[key] > b[key]) { return -1; }
		return 0;
	})
}

export const splitArrayIntoChunksOfLen = (arr, len) => {
	let chunks = [], i = 0, n = arr.length;
	while (i < n) {
		chunks.push(arr.slice(i, i += len));
	}
	return chunks;

}