import styled from "@emotion/styled";

const Button = styled.button`
  -webkit-appearance: none;
  cursor: pointer;
  transition: .3s all ease-in-out;
  margin: 1rem;
  font-size: 20px;
  display: inline-block;
  padding: 0 10px;
  border: 2px #fff solid;
  min-height: 1rem;
  box-shadow: 0 0 5px #555;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #eee;
  }
  &:active {
    background-color: #ccc;
  }
`;

export default Button;
