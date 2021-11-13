
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import CareerList from '../components/join/CareerList';

const Join = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userCategory, setUserCategory] = useState('');

    const [idOverlapped, setIdOverlapped] = useState(false);

    const [careerList, setCareerList] = useState([]);
    const [careerInput, setCareerInput] = useState('');

    const changeUserName = (e) => {
        setUserName(e.target.value);
    }

    const changeUserId = (e) => {
        setUserId(e.target.value);
    }

    const changeUserPw = (e) => {
        setUserPw(e.target.value);
    }

    const changeUserCategory = (e) => {
        setUserCategory(e.target.value);
    }

    const changeCareerInput = (e) => {
        setCareerInput(e.target.value);
    }

    const pushCareer = () => {
        setCareerList([...careerList, careerInput]);
        setCareerInput('');
    }

    const checkIdOverlap = () => {
        axios.post('http://44.195.135.43/overlap', {
            id: userId
        }).then(response => {
            console.log(response);
            if (response === 'FAIL') {
                setIdOverlapped(false);
            } else {
                setIdOverlapped(true);
            }
        });
    }

    const deleteCareer = idx => {
        setCareerList(careerList.filter((_, i) => i !== idx));
    }

    const registerNewUser = () => {
        axios.post('http://44.195.135.43/register', {
            career: careerList,
            id: userId,
            memberType: userCategory,
            password: userPw
        }).then(response => {
            navigate('/');
            console.log(response)
        });
    }

    return (
        <div>
            <h2>Join</h2>
            <div>
                <label htmlFor='user_category'>분류 : </label>
                <input name='user_category' type="radio" value="teacher" onChange={changeUserCategory} />선생님
                <input name='user_category' type="radio" value="student" onChange={changeUserCategory} />학생
            </div>
            <div>
                <label htmlFor='user_name'>이름 : </label>
                <input type='text' name='user_name' value={userName} onChange={changeUserName} />
            </div>
            <div>
                <label htmlFor='user_id'>ID : </label>
                <input type='text' name='user_id' value={userId} onChange={changeUserId} />
                <button onClick={checkIdOverlap}>중복확인</button>
                {idOverlapped ? <p className="warning">중복된 아이디입니다.</p> : <></>}
            </div>
            <div>
                <label htmlFor='user_pw'>PW : </label>
                <input type='password' name='user_pw' value={userPw} onChange={changeUserPw} />
            </div>
            {userCategory === 'teacher' ? (
                <div>
                    <div>
                        <label htmlFor='career'>경력 추가 : </label>
                        <input type='text' name='user_id' value={careerInput} onChange={changeCareerInput} />
                        <button onClick={pushCareer}>추가</button>
                    </div>
                    <div>
                        경력 사항
                        <CareerList careerList={careerList} deleteCareer={deleteCareer} />
                    </div>
                </div>
            ) : <></>}
            <button onClick={registerNewUser}>가입하기</button>
        </div >
    )
}
export default Join;
