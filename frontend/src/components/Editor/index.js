import React, {useEffect, useState, useRef} from 'react'; //필요한 라이브러리 첨부
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
const toolbarOptions = [
    ["link", "image", "video"],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ]; 
  
  
  // 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
  export const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "background",
    "color",
    "link",
    "image",
    "video",
    "width",
  ];
  
  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  

const Editor = ({ placeholder, value, ...rest }) => {
    const quillRef = useRef(null);
    
      useEffect(() => {
        const handleImage = () => {
        // 이미지 핸들 로직
        }
        
        if (quillRef.current) {
          const { getEditor } = quillRef.current;
          const toolbar = quillRef.current.getEditor().getModule("toolbar");
          toolbar.addHandler("image", handleImage);
        }
      }, []);
  
  return (
    <ReactQuill
      {...rest}
      ref={quillRef}
      value={value || ""}
      theme="snow"
      modules={{
        ...modules,
      }}
      formats={formats}
      placeholder={placeholder}
      preserveWhitespace
    ></ReactQuill>
  );
};

export default Editor;
