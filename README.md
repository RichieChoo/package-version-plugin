## packages-version-webpack-plugin

Sometimes you want to know project dependencies exact versions on production environment.

## Install

```
npm install --save-dev packages-version-webpack-plugin
```

## Usage

##### webpackConfig

```
var PackagesVersionWebpackPlugin = require('packages-version-webpack-plugin');

var webpackConfig = {
    plugins: [
        new PackagesVersionWebpackPlugin({
            showDevDependencies: false,
            showDependencies: true,
        })
    ]
}
```

##### chainWebpack

```
const PackagesVersionWebpackPlugin = require('packages-version-webpack-plugin');

...
chainWebpack:config=>{
    	config.plugin("PackagesVersionWebpackPlugin").use(PackagesVersionWebpackPlugin, [
			{ showDevDependencies: true, showDependencies: true }
		]);
}
...
```
## Feature
Plugin will collect dependencies version list and output `version.json` in the webpack bundle path
