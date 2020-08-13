# vue-monaco-assets

## 简介
```
本项目是基于monaco的vue项目。
特点是通过在vue里异步引用js，避免webpack对monaco源码的打包，也避免了打包过程中出现的各种奇奇怪怪的问题。
```
<a href="http://www.lichengblog.com/demo/monaco/index.html" target="_blank">在线预览</a>

### 指南

1：从monaco官网下载源码包（放到项目中public或其他不会被webpack打包的目录）

2：写一个原生js挂载monaco（参照项目中public下的monaco.js）
```
require.config({ paths: { 'vs': './assets/editor/monaco/min/vs' } });
var editorArray = [];
function setMonacoMsg(e) {
    return editorArray[0].setValue(e);
};
function getMonacoMsg() {
    return editorArray[0].getValue();
};
require(['vs/editor/editor.main'], function () {

    // 初始化变量
    var fileCounter = 0;
    var defaultCode = '';
    const editorOptions = {
        selectOnLineNumbers: true, // 选择行号
        roundedSelection: false, // 圆形选择
        readOnly: false, // 只读
        cursorStyle: 'line', // 光标样式
        automaticLayout: false, // 自动布局
        glyphMargin: true, // 字形边缘
        useTabStops: false, // 使用止动块
        fontSize: 28, // 字体大小
        autoIndent: false // 自动缩进
    };
    // 定义编辑器主题
    monaco.editor.defineTheme('myTheme', {
        base: 'vs',
        inherit: true,
        rules: [{ background: 'EDF9FA' }],
        // colors: { 'editor.lineHighlightBackground': '#0000FF20' }
    });
    // monaco.editor.setTheme('myTheme');

    // 新建一个编辑器
    function newEditor(container_id, code, language) {
        var model = monaco.editor.createModel(code, language);
        var editor = monaco.editor.create(document.getElementById(container_id), {
            model: model,
            theme: 'vs-dark',
            editorOptions: editorOptions
        });
        editorArray.push(editor);
        editorArray[0].onDidChangeModelContent(function(event){
          // 传递出vaule值
          window.emitValue(editorArray[0].getValue())
        });
        return editor;
    };

    // 新建一个 div
    function addNewEditor(code, language) {
        var new_container = document.createElement("DIV");
        new_container.id = "container-" + fileCounter.toString(10);
        new_container.className = "container";
        document.getElementById("monacoroot").appendChild(new_container);
        newEditor(new_container.id, code, language);
        fileCounter += 1;
    };
    addNewEditor(defaultCode, 'html');
    
    // 语法高亮
    var languageSelected = document.querySelector('.language');    
    languageSelected.onchange = function () {
        monaco.editor.setModelLanguage(window.monaco.editor.getModels()[0], languageSelected.value)
    }
});
```
3：在vue代码中异步引入js（参照src/components/monaco.vue）
```
<template>
    <div class="monaco-editor">
      <div id="monacoroot"></div>
    </div>
</template>
<script>
export default {
  name: 'monaco',
  components: {
  },
  mounted() {
    // const me = this
   if(!window.monaco){
       this.loadScript('./assets/editor/monaco/min/vs/loader.js').then(
        () => this.loadScript('./monaco.js', true)
      ).then(()=>{
        this.setContent()
      } )
    }else {
      this.loadScript('./monaco.js')
    }
  },
  methods: {
    // 创建一个promise，加载资源里的monaco.js
    loadScript(src) {
      return new Promise(function(resolve) {
        let script = document.createElement('script');
        script.src = src;
        (document.head || document.body).appendChild(script);
        script.onload = function() {
          resolve();
        };
      });
    },
  }
};
</script>
```


### 资源

从<a href="https://microsoft.github.io/monaco-editor/" target="_blank"> monaco</a>官网下载源码

## License

<a href="https://opensource.org/licenses/MIT" target="_blank">MIT</a>
