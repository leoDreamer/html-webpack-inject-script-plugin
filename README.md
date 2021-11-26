# html-webpack-inject-script-plugin

[![node](https://img.shields.io/node/v/html-webpack-inject-script-plugin.svg)](https://www.npmjs.com/package/html-webpack-inject-script-plugin)
[![npm](https://img.shields.io/npm/v/html-webpack-inject-script-plugin.svg)](https://www.npmjs.com/package/html-webpack-inject-script-plugin)
[![license](https://img.shields.io/npm/l/html-webpack-inject-script-plugin.svg)](https://github.com/kagawagao/html-webpack-inject-script-plugin/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/kagawagao/html-webpack-inject-script-plugin.svg?branch=master)](https://travis-ci.org/leoDreamer/html-webpack-inject-script-plugin)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)

> Insert script and link tags in headTags output by alterAssetTagGroups(html-webpack-plugin) into HTML through javascript code and rewrite src and href attribute with `PUBLIC_PATH` + `src` or `href`.

> Please define `PUBLIC_PATH` variable first in window

## Installation

```bash
npm install --save-dev html-webpack-inject-script-plugin
```

## Usage

Require the plugin in your webpack config

```javascript
import HtmlWebpackInjectPlugin from 'html-webpack-inject-script-plugin'
// or
const HtmlWebpackInjectPlugin =
  require('html-webpack-inject-script-plugin').default
```

Add the plugin to your webpack config as follows

```javascript
plugins: [new HtmlWebpackInjectScriptPlugin()]
```

## Options

- `externals: <HTMLTagObject>[]`: external [HTMLTagObject](https://github.com/jantimon/html-webpack-plugin/blob/6e17a0cd7e99c08fdf6eb6e79b88f589af35c645/typings.d.ts#L238-L260) which you want to add
