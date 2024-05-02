import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export function PostFAB() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/post')
  }

  return <FAB onClick={handleClick}>글쓰기</FAB>
}

const FAB = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0px 16px;
  position: fixed;
  bottom: 68px;
  right: 20px;
  z-index: 100;
  border: none;
  background-color: ${({ theme }) => theme.primaryColor};
  color: white;
  border-radius: 9999px;
  font-size: 16px;
  line-height: 20px;
`
