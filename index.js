const fs = require("fs");
const path = require("path");
const pluginName = "VersionListWebpackPlugin";
class VersionListWebpackPlugin {
	constructor(options) {
		const defaultOptions = {
			showDevDependencies: false,
			showDependencies: true
		};
		this.options = Object.assign(defaultOptions, options);
	}
	getData(context) {
		const packagePath = path.join(context, "package.json");
		const { dependencies = {}, devDependencies = {} } = JSON.parse(
			fs.readFileSync(packagePath)
		);
		let list = [];
		let result = {};
		const { showDevDependencies, showDependencies } = this.options;
		if (showDependencies) {
			list.push(...Object.keys(dependencies));
		}
		if (showDevDependencies) {
			list.push(...Object.keys(devDependencies));
		}
		list.forEach(v => {
			const versionPath = path.join(context, "node_modules", v, "package.json");
			const { version } = JSON.parse(fs.readFileSync(versionPath));
			result[v] = version;
		});
		return JSON.stringify(result, null, 2);
	}
	apply(compiler) {
		const { hooks, context } = compiler;
		hooks.emit.tap(pluginName, compilation => {
			const data = this.getData(context);
			compilation.assets["version.json"] = {
				source: () => data
			};
		});
	}
}

module.exports = VersionListWebpackPlugin;
