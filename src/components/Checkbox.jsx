import styled from "styled-components";

const StyledInput = styled.input`
  appearance: none;
  border: 1.5px solid #eeeeee;
  border-radius: 0.35rem;
  width: 24px;
  height: 24px;
  background-color: #f6f6f6;
  margin: 10px 10px 10px 20px;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #004a9e;
  }
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
`;

function Checkbox({ children, disabled, checked, onChange }) {
  return (
    <StyledLabel>
      <StyledInput
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={({ target: { checked } }) => onChange(checked)}
      />
      {children}
    </StyledLabel>
  );
}

export default Checkbox;
