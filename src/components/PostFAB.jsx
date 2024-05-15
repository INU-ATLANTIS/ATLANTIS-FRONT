import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export function PostFAB({ postMode, buildingId }) {
  const navigate = useNavigate()
  const handleClick = () => {
    if (postMode === 'marker') {
      navigate('/markerPosting')
    }
    if (postMode === 'alarm') {
      navigate('/markerAlarmPosting')
    } else {
      if (buildingId) {
        navigate(`/posting`, { state: { buildingId } })
      } else navigate('/posting')
    }
  }

  return (
    <FAB
      onClick={handleClick}
      style={{ bottom: postMode === 'alarm' ? 120 : 68 }}
    >
      {postMode === 'marker'
        ? '마커 등록'
        : postMode === 'alarm'
        ? '마커 알람 등록'
        : '글쓰기'}
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
  right: 20px;
  z-index: 100;
  border: none;
  background-color: ${({ theme }) => theme.primaryColor};
  color: white;
  border-radius: 9999px;
  font-size: 20px;
  line-height: 24px;
`
