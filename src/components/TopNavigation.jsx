import styled from 'styled-components'
import { ReactComponent as BackArrow } from '../assets/icons/arrow_back_ios_new.svg'
import { useNavigate } from 'react-router-dom'

export function TopNavigation({ onBack }) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <>
      <Container>
        <BackArrowContainer onClick={handleBack}>
          <BackArrow />
        </BackArrowContainer>
      </Container>
      <div style={{ minHeight: 56, visibility: 'hidden' }}>hidden height</div>
    </>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff;
  width: 100vw;
`

const BackArrowContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  width: 56px;
  border: none;
  background: transparent;
`
