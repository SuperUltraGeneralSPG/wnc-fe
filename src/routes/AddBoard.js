import React, { useState } from "react";
import Button from "../components/common/Button";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";

const InputBox = styled.input`
  font-size: 1rem;
  border: 1px solid black;
  border-bottom: 1px solid skyblue;
  padding-bottom: 0.5rem;
  outline: none;
  width: 50%;
  & + & {
    margin-top: 1rem;
  }
`;

const AddBoard = () => {
  const [title, setTitle] = useState("강의제목을 입력하세요.");
  const onChange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <div>
      <br />
      <br />
      <form>
        제목
        <br />
        <InputBox id="subjectTitle" value={title} onChange={onChange} />
        <br />
        <br />
        학생인원
        <br />
        <InputBox id="subjectStuNum" type="number" min="1" />
        <br />
        <br />
        강의방식
        <br />
        <div>
          GROUP
          <input type="radio" name="classType" value="GROUP" />
          <br />
          ONE_TO_ONE
          <input type="radio" name="classType" value="ONE_TO_ONE" />
        </div>
        <br />
        <br />
        <CKEditor
          editor={ClassicEditor}
          data="강좌내용을 입력하세요"
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
        <br />
        <Button type="submit">저장</Button>
      </form>
    </div>
  );
};

export default AddBoard;
