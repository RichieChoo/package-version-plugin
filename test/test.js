const fs = require("fs");
const path = require("path");
const getHtml = require("../lib/getHtml");
const data = require("./version.json");
const relativeDate = require("tiny-relative-date");
const fecha = require("fecha");
const result = {
	name: "test",
	buildTime: fecha.format(new Date(), "YYYY-MM-DD hh:mm:ss")
};
result.registry = data.registry.includes("registry.npmjs.org")
	? "https://www.npmjs.com/"
	: data.registry;
result.list = Object.keys(data.dependencies).map(v => ({
	name: v,
	version: data.dependencies[v],
	belong: "dependencies",
	href: result.registry
		? result.registry.includes("registry.npmjs.org")
			? "https://www.npmjs.com/package/" + v
			: path.join(result.registry, "#", "detail", v)
		: "#"
}));
fs.writeFile(
	path.join(process.cwd(), "test/test-spec.html"),
	getHtml(result),
	err => {
		if (!err) {
			console.log("test done!");
		} else {
			console.log(err);
		}
	}
);
