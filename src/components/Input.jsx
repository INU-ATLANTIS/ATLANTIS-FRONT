import styled from "styled-components";

const Icon = styled.img`
  height: 18px;
  width: 18px;
  margin-right: 8px;
`;

const InputContainer = styled.div`
  background-color: #f6f6f6;
  border: 1px solid #eeeeee;
  border-radius: ${({ $round }) => ($round ? `9999px` : `8px`)};
  color: #585858;
  font-size: 16px;
  padding: 16px;
  width: 360px;
  height: 50px;
  display: flex;
  margin: 10px 20px 20px;
`;

const StyledInput = styled.input`
  border: none;
  background-color: transparent;
  color: #585858;
  font-size: 15px;
  flex-grow: 1;

  &:focus {
    outline: none;
  }
`;

function Input({ icon, placeholder, value, onChange, type }) {
  return (
    <InputContainer>
      <Icon src={icon} alt="icon" />
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
      />
    </InputContainer>
  );
}

export default Input;
