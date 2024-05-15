import styled, { css } from 'styled-components'

import { Link } from 'react-router-dom'
import { useHXAP } from '../bridge/useHXAP'

export default function Welcome() {
  useHXAP()

  return (
    <Container>
      <LogoText>
        comm
        <span>INU</span>
        ty
      </LogoText>

      <BottomContainer>
        <div style={{ height: 118 }}></div>

        <Button to="/login">로그인</Button>

        <TextButton to="/join">아직 회원이 아니신가요?</TextButton>
      </BottomContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`

const LogoText = styled.h1`
  font-size: 38px;
  line-height: 46px;
  font-weight: 600;
  margin: 0px;
  margin-top: 80px;
  padding-left: 16px;

  ${({ theme }) => css`
    color: ${theme.secondaryColor};

    span {
      color: ${theme.primaryColor};
    }
  `}
`

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 118px;
  padding: 16px;
  position: fixed;
  bottom: 0px;
  left: 0px;
`

const Button = styled(Link)`
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-size: 16px;
  line-height: 24px;
  min-height: 52px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  ${({ theme }) => css`
    background-color: ${theme.primaryColor};
  `};
`

const TextButton = styled(Link)`
  padding: 8px 4px;
  font-size: 13px;
  line-height: 18px;
  color: #767676;
  margin-top: 8px;
  text-decoration: underline;
`
