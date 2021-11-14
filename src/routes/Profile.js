import { useEffect, useState } from 'react';
import axios from "axios";
import Button from '../components/common/Button';
import CareerList from '../components/join/CareerList';
import { useNavigate } from 'react-router';

const Profile = () => {
  const navigate = useNavigate();
  const user_id = sessionStorage.getItem('user_id');

  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [userCategory, setUserCategory] = useState('');

  const [idOverlapped, setIdOverlapped] = useState(null);

  const [careerList, setCareerList] = useState([]);
  const [careerInput, setCareerInput] = useState('');

  useEffect(() => {
    if (!user_id) {
      navigate('/');
    }

    axios.post(`http://44.195.135.43/getInfo?userId=${user_id}`).then(response => {
      console.log(response);
      const { login_id, password, user_type, name, career } = response.data;
      setUserId(login_id);
      setUserPw(password);
      setUserCategory(user_type);
      setUserName(name);
      setCareerList(career);
    });
  }, [])

  const changeUserPw = (e) => {
    setUserPw(e.target.value);
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

  const deleteCareer = idx => {
    setCareerList(careerList.filter((_, i) => i !== idx));
  }

  const modifyCareer = (newCareer, idx) => {
    setCareerList(careerList.map((career, i) => i === idx ? newCareer : career));
  }

  const modifyUserInfo = () => {
    let url = 'http://44.195.135.43/modify?';
    if (careerList) {
      url = careerList.reduce((_url, career) => _url + 'career=' + career + "&", url)
    }
    console.log('userId', user_id);
    url += `loginId=${userId}&password=${userPw}&userId=${user_id}&userType=${userCategory}`;

    axios.put(url).then(response => {
      console.log('response', response);
      if (response === 'FAIL') {
        alert('업데이트에 실패하였습니다.');
      } else {
        alert('업데이트에 성공하였습니다.');
        navigate('/');
      }
    })
  }

  const derigisterUser = () => {
    const confirm = window.confirm("회원 탈퇴 시 모든 정보가 사라집니다. 진행하시겠습니까?");
    if (confirm) {
      axios.delete(`http://44.195.135.43/deregister?userId=${user_id}`).then(response => {
        if (response.data === "SUCCESS") {
          alert('회원 탈퇴되었습니다.')
          sessionStorage.removeItem('user_id');
          navigate('/');
        } else {
          alert('회원 탈퇴에 실패하셨습니다. 다시 시도해주세요.');
        }
      });
    }
  }

  return (
    <div class="wrapper">
      <h2>Profile</h2>
      <div class="authBox">
        <div class="infoBox user_category">
          <label htmlFor='user_category'>분류 : {userCategory}</label>
        </div>
        <div class="infoBox user_name">
          <label htmlFor='user_name'>이름 : {userName}</label>
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
              경력 사항
              <CareerList careerList={careerList} deleteCareer={deleteCareer} modifyCareer={modifyCareer} />
            </div>
          </div>
        ) : <></>}
      </div>
      <div class="infoBox buttonWrapper">
        <Button onClick={modifyUserInfo}>수정하기</Button>
        <Button onClick={derigisterUser}>탈퇴하기</Button>
      </div>
    </div >
  )
};

export default Profile;
