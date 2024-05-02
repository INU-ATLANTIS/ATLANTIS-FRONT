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
    <Container>
      <BackArrowContainer onClick={handleBack}>
        <BackArrow />
      </BackArrowContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
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
