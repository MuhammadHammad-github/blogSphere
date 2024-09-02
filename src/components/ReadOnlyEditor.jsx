import { convertFromRaw, Editor, EditorState } from "draft-js";
import React, { useEffect, useState } from "react";

const ReadOnlyEditor = ({ description }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    if (!description) return;
    const parsedDesc = JSON.parse(description);
    const contentState = convertFromRaw(parsedDesc);
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);
  }, [description]);
  return <Editor editorState={editorState} readOnly={true} />;
};

export default ReadOnlyEditor;
