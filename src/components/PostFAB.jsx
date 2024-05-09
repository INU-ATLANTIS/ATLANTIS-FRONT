import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export function PostFAB({ postMode }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (postMode === 'marker') {
      navigate('/markerPosting')
    } else {
      navigate('/posting')
    }
  }

  return (
    <FAB onClick={handleClick}>
      {postMode === 'marker' ? '마커 등록' : '글쓰기'}
    </FAB>
  )
}

const FAB = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  padding: 0px 24px;
  position: fixed;
  bottom: 68px;
  right: 20px;
  z-index: 100;
  border: none;
  background-color: ${({ theme }) => theme.primaryColor};
  color: white;
  border-radius: 9999px;
  font-size: 20px;
  line-height: 24px;
`
