import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Button from '../components/common/Button';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user_id = sessionStorage.getItem('user_id');
    if (!user_id) {
      navigate('/auth');
    }
  }, [])

  return (<div>
    Home
    <div>
      <Button onClick={() => navigate('/auth')}>로그인</Button>
      <Button onClick={() => navigate('/profile')}>프로필</Button>
      <Button onClick={() => navigate('/join')}>회원가입</Button>
    </div>
  </div>);
};

export default Home;
