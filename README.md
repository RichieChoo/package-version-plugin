## version-list-webpack-plugin

Sometimes you want to know project dependencies exact versions on production environment.

## Install

```
npm install --save-dev version-list-webpack-plugin
```

## Usage

##### webpackConfig

```
var VersionListWebpackPlugin = require('version-list-webpack-plugin');

var webpackConfig = {
    plugins: [
        new VersionListWebpackPlugin({
            showDevDependencies: false,
            showDependencies: true,
        })
    ]
}
```

##### chainWebpack

```
const VersionListWebpackPlugin = require('version-list-webpack-plugin');

...
chainWebpack:config=>{
    	config.plugin("VersionListWebpackPlugin").use(VersionListWebpackPlugin, [
			{ showDevDependencies: true, showDependencies: true }
		]);
}
...
```
