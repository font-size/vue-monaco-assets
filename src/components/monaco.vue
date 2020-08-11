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
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    };
  },
  watch: {
    value(newValue, oldValue) {
      if(window.editorArray.length) {
        if (newValue && (oldValue === '' || oldValue === null)) {
         this.setMsg(newValue)
        }
      }
    }
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
    window.emitValue = this.emitValue
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
    // 设置编辑器的值
    setContent(e) {
      if(window.editorArray.length && window.editorArray[0].setValue) {
       this.setMsg(e)
      } else {
        setTimeout(() =>{
          this.setContent(e);
        }, 500);
      }
    },
    setMsg(e) {
      if (e) {
        window.setMonacoMsg(e);
      } else {
        if(this.value) {
          window.setMonacoMsg(this.value);
        }
      }
    },
    emitValue(e) {
      this.$emit('input', e);
    }
  }
};
</script>
<style >
.container {
  top: 50px;
  left: 0;
  height: 600px;
  right: 0;
  margin: 0 auto;
  display: block;
  transition: 0.2s;
  overflow: hidden;
  z-index: 0;
}
</style>