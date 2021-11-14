
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '../components/common/Button';

import CareerList from '../components/join/CareerList';

const Join = () => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userCategory, setUserCategory] = useState('');

    const [idOverlapped, setIdOverlapped] = useState(null);

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
        if (careerInput.length > 0) {
            setCareerList([...careerList, careerInput]);
            setCareerInput('');
        } else {
            alert('경력을 입력해주세요.');
        }
    }

    const checkIdOverlap = () => {
        if (userId.length > 0) {
            axios.post(`http://44.195.135.43/overlap?loginId=${userId}`).then(response => {
                if (response.data === 'FAIL') {
                    setIdOverlapped(false);
                } else {
                    setIdOverlapped(true);
                }
            });
        } else {
            alert('아이디를 입력해주세요.');
        }
    }

    const deleteCareer = idx => {
        setCareerList(careerList.filter((_, i) => i !== idx));
    }

    const modifyCareer = (newCareer, idx) => {
        setCareerList(careerList.map((career, i) => i === idx ? newCareer : career));
    }

    const registerNewUser = () => {
        let url = 'http://44.195.135.43/register?';
        if (careerList) {
            url = careerList.reduce((_url, career) => _url + 'career=' + career + "&", url)
        }
        url += `loginId=${userId}&name=${userName}&password=${userPw}&userType=${userCategory}`;
        axios.post(url).then(response => {
            navigate('/auth');
        });
    }

    return (
        <div class="wrapper" id="joinWrapper">
            <h2>Join</h2>
            <div class="authBox" id="join_AuthBox"> 
            <div class="infoBox user_category" id="category">
                <label htmlFor='user_category'>분류 : </label>
                <input name='user_category' type="radio" value="TEACHER" onChange={changeUserCategory} />선생님
                <input name='user_category' type="radio" value="STUDENT" onChange={changeUserCategory} />학생
            </div>
            <div class="infoBox user_name">
                <label htmlFor='user_name'>이름 : </label>
                <input type='text' name='user_name' value={userName} onChange={changeUserName} />
            </div>
            <div class="infoBox user_id">
                <label htmlFor='user_id'>ID : </label>
                <input type='text' name='user_id' value={userId} onChange={changeUserId} />
                <Button onClick={checkIdOverlap}>중복확인</Button>
                {idOverlapped === true ? <p>사용가능한 아이디입니다.</p> : idOverlapped === false ? <p className="warning">중복된 아이디입니다.</p> : <></>}
            </div>
            <div class="infoBox user_pw">
                <label htmlFor='user_pw'>PW : </label>
                <input type='password' name='user_pw' value={userPw} onChange={changeUserPw} />
            </div>
            {userCategory === 'TEACHER' ? (
                <div>
                    <div class="infoBox addCareer">
                        <label htmlFor='career'>경력 추가 : </label>
                        <input type='text' name='user_id' value={careerInput} onChange={changeCareerInput} />
                        <Button onClick={pushCareer}>추가</Button>
                    </div>
                    <div class="infoBox careerList">
                        {/* <div>경력 사항</div> */}
                        경력 사항
                        <CareerList careerList={careerList} deleteCareer={deleteCareer} modifyCareer={modifyCareer} />
                    </div>
                </div>
            ) : <></>}
            
            </div>
            <Button id="joinButton" onClick={registerNewUser}>가입하기</Button>
        </div >
    )
}
export default Join;
