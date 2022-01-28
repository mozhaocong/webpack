//plugins/MyPlugin.js
class MyPlugin2 {
    constructor() {
        console.log("MyPlugin2被创建了");
    }
    apply (compiler) {
        // compiler.hooks.compilation.tap("MyPlugin2", (compilation) => {
        //     console.log('MyPlugin2 6')
        //     compilation.hooks.buildModule.tap('MyPlugin2', callback => {
        //         console.log('MyPlugin2 additionalAssets')
        //     })
        // })


        compiler.hooks.entryOption.tap("MyPlugin2", (compilation, callback) => {
            console.log("MyPlugin2 1");

        });
        compiler.hooks.afterPlugins.tap("MyPlugin2", (compilation) => {
            console.log("MyPlugin2 2" );
        });
        compiler.hooks.compilation.tap("MyPlugin2", (compilation) => {
            console.log("MyPlugin2 3");
        });
        compiler.hooks.emit.tapAsync("MyPlugin2", (compilation, callback) => {
            // console.log(compilation.assets['main.js'].source())
            console.log("MyPlugin2 4");
            let str = ''
            for (let filename in compilation.assets){
                str += `文件:${filename}  大小${compilation.assets[filename]['size']()}\n`
            }
            // 通过compilation.assets可以获取打包后静态资源信息，同样也可以写入资源
            compilation.assets['fileSize.md'] = {
                source:function(){
                    return str
                },
                size:function(){
                    return str.length
                }
            }
            callback()
        });
        compiler.hooks.done.tap("MyPlugin2", (compilation) => {
            console.log("MyPlugin2 5");

        });
    }
}
module.exports = MyPlugin2;
