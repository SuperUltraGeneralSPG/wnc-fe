import React, { useState, useEffect } from "react";
import Button from "../components/common/Button";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import TutorList from "../components/common/TutorList";

const Board = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user_id = sessionStorage.getItem('user_id');
    if (!user_id) {
      navigate('/auth');
    }
  }, [])

  return (
    <div>
      <TutorList />
      <div className="boardBtns">
        <Button onClick={() => navigate('/addboard')}>과외 추가</Button>
      </div>
    </div>
  );
};

export default Board;
