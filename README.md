# vue-monaco-assets

## 简介
```
本项目是基于monaco的vue项目。
特点是通过在vue里异步引用js，避免webpack对monaco源码的打包，也避免了打包过程中出现的各种奇奇怪怪的问题。
```
<a href="http://www.lichengblog.com/demo/monaco/index.html" target="_blank">在线预览</a>

### 指南
```
1：从monaco官网下载源码包（放到项目中public或其他不会被webpack打包的目录）
2：写一个原生js挂载monaco（参照项目中public下的monaco.js）
3：在vue代码中异步引入js（参照src/components/monaco.vue）
```

### 资源

从<a href="https://microsoft.github.io/monaco-editor/" target="_blank"> monaco</a>官网下载源码

## License

<a href="https://opensource.org/licenses/MIT" target="_blank">MIT</a>
