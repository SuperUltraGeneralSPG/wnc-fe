import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Button from '../components/common/Button';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/board');
  }, [])

  return (<div>
    Home
  </div>);
};

export default Home;
