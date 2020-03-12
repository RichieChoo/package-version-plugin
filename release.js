const fs = require("fs");
const path = require("path");
const validator = require("validator");
const exec = require("child_process").exec;

const getNewVersion = (package, versions, filterByFirstVersionNum = true) => {
	let resultVersion = false;
	if (versions.length === 0) return package.version;
	const bigVersion = package.version.split(".")[0];
	let newVersions = versions;
	if (filterByFirstVersionNum) {
		newVersions = newVersions.filter(v => v.split(".")[0] === bigVersion);
	}
	if (!package.version) return resultVersion;
	if (newVersions.length === 0) {
		resultVersion = Number(bigVersion) + 1 + ".0.0";
	} else {
		resultVersion = newVersions[newVersions.length - 1];
	}
	return resultVersion;
};

const publish = beginTime => {
	exec("npm publish", (error, stdout, stderr) => {
		if (error) {
			console.error(stderr);
		} else {
			console.log(
				`${stdout.replace(/(\r\n\t|\n|\r\t)/gm, "")}\n\nPublished Success in ${(new Date() - beginTime)/1000}s!`
			);
		}
	});
};

const patch = (currentPath, callback) => {
	const beginTime = new Date();
	process.chdir(currentPath);
	const packagePath = path.join(currentPath, "package.json");
	if (!fs.existsSync(packagePath)) {
		console.err(`Not found: ${currentPath} not contains a package.json`);
	}
	fs.readFile(packagePath, (err, data) => {
		if (!err) {
			if (validator.isJSON(data.toString())) {
				const package = JSON.parse(data.toString());
				const getLatest = `npm view ${package.name} versions --json`;
				const versionPatch = `npm version --no-git-tag-version patch`;
				// get latest version of item
				exec(getLatest, (error, stdout, stderr) => {
					if (!error) {
						//npm view version will sort the version array
						let versions = JSON.parse(stdout.replace(/(\r\n\t|\n|\r\t)/gm, ""));
						if (versions.length === 0) {
							console.err(
								`Not Exists: Can not find ${package.name} in current npm registry`
							);
						}
						const newVersion = getNewVersion(package, versions);

						if (!newVersion) {
							console.err(
								`Not Exists: Can not find version in '${packagePath}'`
							);
						}
						package.version = newVersion;
						const result = JSON.stringify(package, null, 2);
						fs.writeFile(packagePath, result, err => {
							if (!err) {
								//npm version patch
								exec(versionPatch, (error, stdout, stderr) => {
									if (!error) {
										const newVersion = stdout.replace(
											/(\r\n\t|\n|\r\t|v)/gm,
											""
										);
										console.log(
											`Get "${package.name}" latest version "${package.version}" and updated it to "${newVersion}"!`
										);
										callback && callback(beginTime);
									} else {
										console.err(
											`Executed command "${versionPatch}" fail! \n\n${error}`
										);
									}
								});
							} else {
								console.err(
									`Write "${package.name}" latest version fail !\n\nFile path: "${packagePath}"]"`
								);
							}
						});
					} else {
					}
				});
			} else {
				console.err(`Not JSON: "${packagePath}" is not a right json file`);
			}
		} else {
			console.err(err);
		}
	});
};

patch(process.cwd(), publish);
