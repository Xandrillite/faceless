<template>
  <div ref="editorform" style="height: 300px" class="ace-editor"></div>
</template>

<script>
import { watch, onMounted, onBeforeUnmount, ref} from "vue";
import ace from "ace-builds";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-emmet";
import "ace-builds/src-noconflict/snippets/html";

export default {
  name: "EditorPage",
  emits: ["update:value"],
  props: {
    id: {
      type: String,
      default: 'editor',
    },
    // content from parent
    value: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    // language type from parent
    language: {
      type: String,
      default: "html",
    },
    // theme from parent
    theme: {
      type: String,
      default: "chaos",
    },
  },
  setup(props, { emit }) {
    let editor = null;
    const editorform = ref(null);
    let options = {
      theme: "ace/theme/" + (props.theme ? props.theme : "chaos"),
      mode: "ace/mode/" + (props.language ? props.language : "html"),
      tabSize: 2,
      maxLines: 25,
      minLines: 25,
      showPrintMargin: false,
      fontSize: 14,
      readOnly: props.readonly ? props.readonly : false,
    };
    //切换语言
    //editor.getSession().setMode(modelPath)

    function initialize() {
      if (editor) {
        //实例销毁
        editor.destroy();
      }
      //初始化
      editor = ace.edit(editorform.value, options);
      //代码提示和自动补全
      editor.setOptions({
        enableSnippets: true,
        enableLiveAutocompletion: true,
        enableBasicAutocompletion: true,
      });
      editor.getSession().setUseWrapMode(true);
      // 支持双向绑定
      editor.on("change", () => {
        if (emit) {
          emit("update:value", editor.getValue());
        }
      });
      //快捷键
      editor.commands.addCommand({
        name: 'formatter',
        bindKey: { win: 'Ctrl-Shift-F', mac: 'Command-Shift-F' },
        exec: () => emit('formatter', editor)
      })
      editor.setValue(props.value ? props.value : "");
    }
    watch(
        () => props.id,
        () => {
          initialize();
        }
    );
    watch(
        () => props.value,
        (newProps) => {
          //解决光标移动问题
          const position = editor.getCursorPosition();
          editor.getSession().setValue(newProps);
          editor.clearSelection();
          editor.moveCursorToPosition(position);
        }
    );
    onMounted(() => {
      initialize();
    });
    onBeforeUnmount(() => {
      editor.destroy();
    });
    return {
      editorform,
    };
  },
}
</script>

<style scoped>

</style>
