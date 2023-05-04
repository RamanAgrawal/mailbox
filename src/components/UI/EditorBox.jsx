import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import "/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./EditorBox.css";

const EditorBox = (props) => {
  let toolBarClassname = "toolbar";

  if (props.hideToolBar) {
    toolBarClassname = "toolbar-hidden";
  }

  function changeEditorState(textFormat) {
    if (!props.hideToolBar) {
      //?Because we are not receiving onChangeHandler from MailBoxModal
      const textStyleObject = convertToRaw(textFormat.getCurrentContent());
      props.onChangeHandler(textFormat, textStyleObject);
    }
  }

  return (
    <>
      <Editor
        editorState={props.state}
        wrapperClassName="wrapper"
        editorClassName="editor"
        toolbarClassName={toolBarClassname}
        onEditorStateChange={changeEditorState}
      />
    </>
  );
};

export default EditorBox;

//! Important Lines
// const [editorState, setEditorState] = useState(
//   EditorState.createWithContent(convertFromRaw(EditorInitialValue))
// EditorState.createEmpty()
// );

// setEditorState(textFormat);
// console.log(JSON.stringify(convertToRaw(textFormat.getCurrentContent())));

//Default Object to display from rar
// export const EditorInitialValue = {
//   blocks: [
//     {
//       key: "",
//       text: "",
//       type: "unstyled",
//       depth: 0,
//       inlineStyleRanges: [],
//       entityRanges: [],
//       data: {},
//     },
//   ],
//   entityMap: {},
// };
