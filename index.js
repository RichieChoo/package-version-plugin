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
		let result = {};
		const { showDevDependencies, showDependencies } = this.options;
		if (showDependencies) {
			result.dependencies = dependencies;
			Object.keys(dependencies).forEach(v => {
				const versionPath = path.join(
					context,
					"node_modules",
					v,
					"package.json"
				);
				const { version } = JSON.parse(fs.readFileSync(versionPath));
				result.dependencies[v] = version;
			});
		}
		if (showDevDependencies) {
			result.devDependencies = devDependencies;
			Object.keys(devDependencies).forEach(v => {
				const versionPath = path.join(
					context,
					"node_modules",
					v,
					"package.json"
				);
				const { version } = JSON.parse(fs.readFileSync(versionPath));
				result.devDependencies[v] = version;
			});
		}

		return JSON.stringify(result, null, 2);
	}
	getSize(data) {
		return new Blob([data]).size;
	}
	apply(compiler) {
		const { hooks, context } = compiler;
		hooks.emit.tap(pluginName, compilation => {
			compilation.assets["version.json"] = {
				source: this.getData(context),
				size: this.getSize(data)
			};
		});
	}
}

module.exports = VersionListWebpackPlugin;
