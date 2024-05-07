import styled from "styled-components";
import { ReactComponent as Glass } from '../../assets/icons/magnifying_glass.svg'
import { useState } from "react";

export function SearchInput({ searchItems, activeEnter }) {
    //     const [searchInput, setSearchInput] = useState('');
    //     const searchItems = (searchValue) => {
    //         setSearchInput(searchValue)
    //     }
    //     const onSubmit = async () => {
    //         try {
    //             console.log(searchInput)
    //             if (searchInput === "") {
    //                 alert("건물 코드를 정확하게 입력해주세요");
    //                 return
    //             }
    // return 7;
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     const activeEnter = (e) => {
    //         if (e.key === "Enter") {
    //             onSubmit();
    //         }
    //     }

    return (
        <Container>
            <Glass style={{ position: "absolute", left: "20px", top: "21px", margin: "7px" }}></Glass>
            <Input
                placeholder="건물 코드를 입력하세요."
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