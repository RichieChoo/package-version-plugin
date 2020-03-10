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
            showDevDependencies: false,
            showDependencies: true,
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
			{ showDevDependencies: true, showDependencies: true }
		]);
}
...
```
## Feature
Plugin will collect dependencies version list and output `version.json` in the webpack bundle path
