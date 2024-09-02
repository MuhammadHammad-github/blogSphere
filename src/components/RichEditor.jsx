import {
  convertFromRaw,
  convertToRaw,
  Editor,
  EditorState,
  RichUtils,
} from "draft-js";
import React, { useEffect, useState } from "react";
import "draft-js/dist/Draft.css";

const RichEditor = ({ setDescription, callSave, defaultValue = null }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const saveContent = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    setDescription(rawContent);
  };
  useEffect(() => {
    if (callSave) saveContent();
  }, [callSave]);
  useEffect(() => {
    if (!defaultValue) return;
    const parsedDesc = JSON.parse(defaultValue);
    const contentState = convertFromRaw(parsedDesc);
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);
  }, [defaultValue]);
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };
  return (
    <div className="w-full border border-sage min-h-[50vh] p-2">
      <div className="toolbar sticky top-0 left-0 z-50 bg-white py-3">
        <button type="button" onClick={() => toggleBlockType("header-three")}>
          H3
        </button>{" "}
        <button type="button" onClick={() => toggleBlockType("header-four")}>
          H4
        </button>
        <button type="button" onClick={() => toggleBlockType("header-five")}>
          H5
        </button>{" "}
        <button type="button" onClick={() => toggleBlockType("header-six")}>
          H6
        </button>
        <button
          type="button"
          onClick={() => toggleBlockType("unordered-list-item")}
        >
          UL
        </button>
        <button
          type="button"
          onClick={() => toggleBlockType("ordered-list-item")}
        >
          OL
        </button>
        <button type="button" onClick={() => toggleInlineStyle("BOLD")}>
          Bold
        </button>
        <button type="button" onClick={() => toggleInlineStyle("ITALIC")}>
          Italic
        </button>
        <button type="button" onClick={() => toggleInlineStyle("UNDERLINE")}>
          Underline
        </button>
      </div>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Start Writing Here..."
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  );
};

export default RichEditor;
