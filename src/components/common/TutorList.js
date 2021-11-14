import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ListItem from "./ListItem";
import axios from "axios";

const TutorListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const TutorList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://44.195.135.43/list");
        setData(response.data); //여기 수정
        setId(response.data[id]);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  //대기중일때
  if (loading) {
    return <TutorListBlock> loading... </TutorListBlock>;
  }
  //렌더링시 데이터 갱신 안됐을때
  if (!data) {
    return null;
  }

  //data값이 유효할 경우
  return (
    <TutorListBlock>
      {data.map((item) => (
        <ListItem key={id} item={item} />
      ))}
    </TutorListBlock>
  );
};

export default TutorList;
