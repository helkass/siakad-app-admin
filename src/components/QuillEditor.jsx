import React, { useState } from "react";
import ReactQuill from "react-quill";
import Button from "./Button";
import { useFetch } from "../helpers";
import { InputDefault, InputFile } from "./actions";
import * as base64Converter from "../utilities/base64Converter";
import { toastConfig } from "../constants/toastConfig";
import { toast } from "react-toastify";

/**
 * for berita editor
 */

export default function Editor(props) {
   const [editorHtml, setEditorHtml] = useState("");
   const [title, setTitle] = useState("");
   const [file, setFile] = useState(null);

   const { postData, fetchIsLoading, fetchIsSuccess } = useFetch();

   function handleChange(html) {
      setEditorHtml(html);
   }

   async function handleUpload() {
      base64Converter.getBase64(file, async (err, result) => {
         if (err.status) {
            toast.error(err.message, toastConfig);
         } else {
            await postData(
               "/berita",
               {
                  title,
                  description: editorHtml,
                  image: result,
               },
               {
                  "content-Type": "application/json",
               }
            );
         }
      });

      setTimeout(() => {
         if (fetchIsSuccess) {
            setEditorHtml("");
         }
      }, 1000);
   }

   return (
      <div className="space-y-4">
         <InputDefault
            placeholder="title berita"
            onChange={(e) => setTitle(e.target.value)}
         />
         <InputFile
            accept=".jpg, .png, .jpeg"
            onChange={(e) => setFile(e.target.files[0])}
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
