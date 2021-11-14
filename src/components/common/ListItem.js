import React from "react";
import styled from "styled-components";

const ListItemBlock = styled.div`
  border: 5px solid #060b26;
  padding: 10px;
  .contents {
    h2 {
      margin: 0;
      a {
        color: black;
      }
    }
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }
  }

  & + & {
    margin-top: 3rem;
  }
`;

const ListItem = ({ item }) => {
  const { title, description, id } = item;
  console.log(title);
  console.log(id);
  console.log(description);
  return (
    <ListItemBlock>
      <div className="contents">
        <h2>{item["title"]}</h2>
      </div>

      <h4>선생님 id : {item["id"]}</h4>
      <div>{item["description"]}</div>
    </ListItemBlock>
  );
};

export default ListItem;
