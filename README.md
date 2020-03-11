## package-version-plugin

Sometimes you want to know project dependencies exact versions on production environment.

## Install

```
npm install --save-dev package-version-plugin
```

## Usage

##### webpackConfig

```
var PackageVersionPlugin = require('package-version-plugin');

var webpackConfig = {
    plugins: [
        new PackageVersionPlugin({
            registry: "http://10.100.1.25:4873/",
            outputFile: "test-version.html",
            name: "test",
            showDevDependencies:true,
            showDependencies:true,
            depFilterRegExp:/^test/,
            devDepFilterRegExp:/^\test/
        })
    ]
}
```

##### chainWebpack

```
const PackageVersionPlugin = require('package-version-plugin');

...
chainWebpack:config=>{
    	config.plugin("PackageVersionPlugin").use(PackageVersionPlugin, [
			{
                registry: "http://10.100.1.25:4873/",
                outputFile: "test-version.html",
                name: "test",
                showDevDependencies:true,
                showDependencies:true,
                depFilterRegExp:/^test/,
                devDepFilterRegExp:/^\test/
            }
		]);
}
...
```
## Feature
Plugin will collect dependencies version list and output `version.json` in the webpack bundle path
