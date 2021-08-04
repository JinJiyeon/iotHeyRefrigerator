import React, {useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import HomeCard from '../../components/Home';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Divider,
} from '@material-ui/core';
import { CommonContext } from '../../context/CommonContext';

// 간단한 카드 스타일링
const imgStyle = {
  height: 0,
  paddingTop: '56.25%', // 16:9
  margin: 20,
};
const cardStyle = {
  margin: 50,
};

// 로그인 상태에 따라 MyPage, 로그인 로그아웃 보여주기
const MyPageBtn = () => {
  let history = useHistory();

  const onClickBtn = () => {
    history.push('/MyPage');
  };


  return (
    <div>
      <Button onClick={onClickBtn}>
        MyPage
      </Button>
      <Button>
        LogOut
      </Button>
    </div>
  );
};

const Home = () => {

  const [visible, setVisible] = useState('로그인안했음');
  const visibleHandler = () => {
    setVisible('로그인했음');
  };
  const invisibleHandler = () => {
    setVisible('로그인안했음');
  };

  return (
    <div>
      <p>로그인에 따른
        <Button onClick={visibleHandler}>
          visible
        </Button>
        <Button onClick={invisibleHandler}>
          invisible
        </Button>
      </p>
      <Divider />
      {visible === '로그인했음' && <MyPageBtn /> }
      {visible === '로그인안했음' && <Button>LogIn</Button>}

      <h1>7링바이브</h1>
    <HomeCard />
    </div>
  );
};

export default Home;