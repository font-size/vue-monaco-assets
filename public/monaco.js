// require ('../node_modules/monaco-editor/min/vs/loader.js')
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
