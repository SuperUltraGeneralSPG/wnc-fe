import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate();
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');

    // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const handleInputId = (e) => {
        setInputId(e.target.value);
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    // login 버튼 클릭 이벤트
    const onClickLogin = () => {
        if (inputId === "0000" && inputPw === "0000") {
            navigate('/');
        } else {
            alert('id 또는 password가 잘못되었습니다.');
        }
    }

    const onClickJoin = () => {
        navigate('/join');
    }

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor='input_id'>ID : </label>
                <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
            </div>
            <div>
                <label htmlFor='input_pw'>PW : </label>
                <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
            </div>
            <div>
                <button type='button' onClick={onClickLogin}>Login</button>
                <button type='button' onClick={onClickJoin}>Join</button>
            </div>
        </div>
    )
}

export default Auth;