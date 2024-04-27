import styled from 'styled-components'

import { Link } from 'react-router-dom'
import LogoImg from '../assets/commINUty.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 100px auto 40px;
`

const Logo = styled.img`
  margin: 16px 20px;
  width: 180px;
`

const Description = styled.div`
  color: #585858;
  margin: 20px 20px;
  font-size: 16px;
  line-height: 22px;
`

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 20px;
`

const Button = styled(Link)`
  background-color: #004a9e;
  border: none;
  border-radius: ${({ $round }) => ($round ? `9999px` : `8px`)};
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  padding: 16px;
  width: 360px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 20px 60px;
  text-decoration: none;

  &:hover,
  &:active {
    background-color: #16457a;
  }
`

const Question = styled.div`
  display: flex;
  justify-content: center;
  color: #000000;
  font-size: 14px;
  padding: 0 0 40px;
`

const Linkto = styled(Link)`
  color: #004a9e;
  text-decoration: none;
  margin-left: 5px;
`

function WelcomeSpace() {
  return (
    <Container>
      <Logo src={LogoImg} alt="LogoImg" />
      <Description>
        당신의 인천대학교 생활을 도와줄
        <br />
        위치기반 통합 서비스
      </Description>
      <BottomContainer>
        <Button to="/LoginSpace">로그인</Button>
        <Question>
          아직 회원이 아니신가요? <Linkto to="/JoinSpace">회원가입</Linkto>
        </Question>
      </BottomContainer>
    </Container>
  )
}

export default WelcomeSpace
