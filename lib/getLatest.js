const fs = require("fs");
const relativeDate = require("tiny-relative-date");
const exec = require("child_process").exec;
const validator = require("validator");
module.exports = v => {
	return new Promise((resolve, reject) => {
		if (v.name) {
			const itemBash = `npm view ${v.name} --json`;
			exec(itemBash, (error, stdout, stderr) => {
				if (!error) {
					if (validator.isJSON(stdout)) {
						let pkg = JSON.parse(stdout);
						v.latestVersion = pkg["dist-tags"]["latest"];
						v.latestTime = relativeDate(pkg["time"][v.latestVersion]);
					}
					resolve(v);
				} else {
					reject(error);
				}
			});
		} else {
			reject(v);
		}

		// const itemBash = `npm view ${v.name} time --json`;
		// exec(itemBash, (error, stdout, stderr) => {
		// 	if (!error) {
		// 		let times = Object.entries(
		// 			JSON.parse(stdout.replace(/(\r\n\t|\n|\r\t)/gm, ""))
		// 		);
		// 		const [version, time] = times[times.length - 1];
		// 		v.latestVersion = version;
		// 		v.latestTime = time;
		// 		resolve(v);
		// 	} else {
		// 		reject(error);
		// 	}
		// });
	});
};
