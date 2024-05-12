import styled from "styled-components";
import { ReactComponent as Glass } from '../../assets/icons/magnifying_glass.svg'

export function SearchInput({ searchItems, activeEnter }) {
    return (
        <Container>
            <Glass style={{ position: "absolute", left: "20px", top: "21px", margin: "7px" }}></Glass>
            <Input
                placeholder="건물 코드 및 건물명을 입력하세요."
                onChange={(e) => searchItems(e.target.value)}
                onKeyDown={(e) => activeEnter(e)}
            />
        </Container>
    )
}

const Container = styled.div`
  position: absolute;
  z-index: 10;
  width: 100vw;
  height:auto;
  display: flex;
`

const Input = styled.input`
margin: 20px 16px; 
width: 100%;
height: 40px;
background: #F6F6F6;
border-radius: 8px;
border: none;
padding: 0 0 0 48px;
`