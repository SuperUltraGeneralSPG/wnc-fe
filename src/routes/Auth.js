
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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
        let url = `http://44.195.135.43/login?loginId=${inputId}&password=${inputPw}`;
        console.log(url);
        axios.post(url).then(response => {
            const { data } = response;
            if (data.response_code === "SUCCESS") {
                sessionStorage.setItem('user_id', response.data.user_id);
                navigate('/');
            }
        }).catch(
            function (error) {
                const { response } = error;
                if (response.status === 555) {
                    const { data } = response;
                    alert(data.error_message);
                }
            }
        );
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
