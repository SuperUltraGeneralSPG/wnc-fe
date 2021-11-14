import { React } from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";

const StyledButton = styled.button`
  border: 3px solid #060b26;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem, 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: white;
  right: 0;
  margin-left: 65%;
  &:hover {
    background: ${palette.gray[6]};
    text-decoration: none;
  }
`;

const Button = (props) => <StyledButton {...props} />;

export default Button;
