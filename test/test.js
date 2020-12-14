const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");
const getHtml = require("../lib/getHtml");
const getLatest = require("../lib/getLatest");
const data = require("./version.json");
const internalIp = require("internal-ip");
const urljoin = require("url-join");
const result = {
	name: "test",
	pkgVersion: "1.0.0",
	extraInfo: {
		key1: "testKey1",
		key2: "testKey2",
	},

	ip: internalIp.v4.sync(),
	buildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
};
result.registry = data.registry;
result.list = Object.keys(data.dependencies).map(v => ({
	name: v,
	version: data.dependencies[v],
	belong: "dependencies",
	href: result.registry
		? result.registry.includes("registry.npmjs.org")
			? "https://www.npmjs.com/package/" + v
			: urljoin(result.registry, "/#/", "detail", v)
		: "#",
}));
Promise.all(result.list.map(v => getLatest(v)))
	.then(res => {
		result.list = res;
		fs.writeFile(
			path.join(process.cwd(), "test/test-spec.html"),
			getHtml(result),
			err => {
				if (!err) {
					console.log("test done!");
				} else {
					console.log(err);
				}
			},
		);
	})
	.catch(err => {
		console.log(err);
	});
