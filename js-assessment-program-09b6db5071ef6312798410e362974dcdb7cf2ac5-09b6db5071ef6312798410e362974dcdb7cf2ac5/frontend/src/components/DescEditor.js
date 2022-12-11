import { Editor } from "react-draft-wysiwyg";
import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
const DescEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const dispatch = useDispatch();
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHtml();
  };
  const convertContentToHtml = () => {
    let currentContentAsHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    dispatch({
      type: "saveBody",
      payload: currentContentAsHtml,
    });
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  );
};

export default DescEditor;