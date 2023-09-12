import React, { useState } from "react";
import ReactQuill from "react-quill";
import Button from "./Button";
import { useFetch } from "../helpers";
import { InputDefault } from "./actions";

/**
 * for berita editor
 */

export default function Editor(props) {
   const [editorHtml, setEditorHtml] = useState("");
   const [title, setTitle] = useState("");

   const { postData, fetchIsLoading, fetchIsSuccess } = useFetch();

   function handleChange(html) {
      setEditorHtml(html);
   }

   async function handleUpload() {
      await postData(
         "/berita",
         {
            title,
            description: editorHtml,
         },
         {
            "content-Type": "application/json",
         }
      );

      if (fetchIsSuccess) {
         setEditorHtml("");
      }
   }

   return (
      <div className="space-y-4">
         <InputDefault
            placeholder="title berita"
            onChange={(e) => setTitle(e.target.value)}
         />
         <ReactQuill
            theme={"snow"}
            onChange={handleChange}
            value={editorHtml}
            modules={Editor.modules}
            formats={Editor.formats}
            placeholder={props.placeholder}
         />
         <Button onClick={handleUpload} isLoading={fetchIsLoading}>
            Upload
         </Button>
      </div>
   );
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
   toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
         { list: "ordered" },
         { list: "bullet" },
         { indent: "-1" },
         { indent: "+1" },
      ],
      ["link"],
      ["clean"],
   ],
   clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
   },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
   "header",
   "font",
   "size",
   "bold",
   "italic",
   "underline",
   "strike",
   "blockquote",
   "list",
   "bullet",
   "indent",
   "link",
];
