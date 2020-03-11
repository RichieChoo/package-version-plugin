const fs = require("fs");
const os = require("os");
const path = require("path");
const pluginName = "PackageVersionPlugin";
const getHtml = require("./lib/getHtml");
const pkg = require("./package.json");
const isRegExp = require("lodash.isregexp");
class PackageVersionPlugin {
	constructor(options) {
		const defaultOptions = {
			showDevDependencies: false,
			showDependencies: true,
			name: pkg.name,
			outputFile: "version.html",
			registry: "https://registry.npmjs.org/"
		};
		this.options = Object.assign(defaultOptions, options);
	}

	getPkgVersion(key, context) {
		const versionPath = path.join(context, "node_modules", key, "package.json");
		const { version } = JSON.parse(fs.readFileSync(versionPath));
		return version;
	}

	getDepAndDevDep({ result, key, keyObj, context, detailPath, regexp }) {
		if (key === "dependencies") {
			result.list = [];
		}
		Object.keys(keyObj).forEach(v => {
			let item = {
				name: v,
				belong: key,
				version: this.getPkgVersion(v, context),
				href: path.join(detailPath, v).replace(path.sep, "/")
			};
			if (isRegExp(regexp)) {
				regexp.lastIndex = 0;
				if (regexp.test(v)) {
					result.list.push(item);
				}
			} else {
				result.list.push(item);
			}
		});
	}
	getData(context) {
		const packagePath = path.join(context, "package.json");
		const { dependencies = {}, devDependencies = {} } = JSON.parse(
			fs.readFileSync(packagePath)
		);
		const {
			showDevDependencies,
			showDependencies,
			depFilterRegExp,
			devDepFilterRegExp,
			registry,
			...rest
		} = this.options;
		let result = {
			registry: registry.includes("registry.npmjs.org")
				? "https://www.npmjs.com/"
				: registry,
			...rest
		};
		const curRegistryDetailPath = registry
			? registry.includes("registry.npmjs.org")
				? "https://www.npmjs.com/package/"
				: path.join(registry, "/#/detail/").replace(path.sep, "/")
			: false;
		if (showDependencies) {
			this.getDepAndDevDep({
				result,
				key: "dependencies",
				keyObj: dependencies,
				context,
				detailPath: curRegistryDetailPath,
				regexp: depFilterRegExp
			});
		}
		if (showDevDependencies) {
			this.getDepAndDevDep({
				result,
				key: "devDependencies",
				keyObj: devDependencies,
				context,
				detailPath: curRegistryDetailPath,
				regexp: devDepFilterRegExp
			});
		}
		return result;
	}
	apply(compiler) {
		const { hooks, context } = compiler;
		hooks.emit.tap(pluginName, compilation => {
			const data = getHtml(this.getData(context));
			const { outputFile } = this.options;
			compilation.assets[outputFile] = {
				source: () => data,
				size: () => Buffer.byteLength(data, "utf8")
			};
		});
	}
}

module.exports = PackageVersionPlugin;
