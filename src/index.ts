import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Compilation, Compiler } from 'webpack'

class InjectSourceScript {
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(
      'InjectSourceScript',
      (compilation: Compilation) => {
        console.log('start inject source script to html...')

        HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
          'InjectSourceScript',
          (data, cb) => {
            let innerHtml = ''
            const scripts: Record<string, any>[] = []
            const styles: Record<string, any>[] = []
            data.headTags.forEach((tag) => {
              switch (tag.tagName) {
                case 'script':
                  scripts.push(tag.attributes)
                  break
                case 'link':
                  styles.push(tag.attributes)
                  break
                default:
                  break
              }
            })
            innerHtml += `
var staticSources = {
  scripts: ${JSON.stringify(scripts)},
  styles: ${JSON.stringify(styles)}
};`
            const injectTagCode = `
staticSources.scripts.forEach(function(s) {
  var node = document.createElement('script');
  for(var key in s) {
    node[key] = (key === 'src' ? PUBLIC_PATH : '') + s[key]
  }
  document.head.appendChild(node)
});
staticSources.styles.forEach(function(s) {
  var node = document.createElement('link');
  for(var key in s) {
    node[key] = (key === 'href' ? PUBLIC_PATH : '') + s[key]
  }
  document.head.appendChild(node)
});
          `
            innerHtml += injectTagCode
            cb(null, {
              ...data,
              headTags: [
                {
                  attributes: {},
                  tagName: 'script',
                  innerHTML: innerHtml,
                  voidTag: false,
                  meta: {}
                }
              ]
            })
          }
        )
      }
    )
  }
}

export default InjectSourceScript
