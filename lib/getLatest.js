const fs = require("fs");
const exec = require("child_process").exec;
const dayJs = require("dayjs")
const validator = require("validator");
module.exports = v => {
	return new Promise((resolve, reject) => {
		if (v.name) {
			const itemBash = `npm view ${v.name} --json`;
			exec(itemBash, (error, stdout, stderr) => {
				if (!error) {
					if (validator.isJSON(stdout)) {
						let pkg = JSON.parse(stdout);
						const time = pkg["time"]
						if(v.version && time[v.version]){
							v.versionTime = dayJs(time[v.version]).format("YYYY-MM-DD HH:mm:ss")
						}
						v.latestVersion = pkg["dist-tags"]["latest"];
						if(v.latestVersion && time[v.latestVersion]){
							v.latestTime = dayJs(time[v.latestTime]).format("YYYY-MM-DD HH:mm:ss")
						}
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
