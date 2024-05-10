import { useState } from "react";
import { useLocation } from 'react-router-dom'
import styled from "styled-components";
import Office from "./Office.jsx";
import Divider from "../Divider.jsx";
import Floor from "./Floor.jsx";
import Posts from "./Posts.jsx";
import { PostFAB } from "../PostFAB.jsx"


export default function Tabs({ buildingInfo }) {
    const location = useLocation();
    const [selectedTab, setSelectedTab] = useState(location.state === null ? "home" : location.state.tab);
    const selectTabHandler = (content) => {
        setSelectedTab(content);
    }

    return (
        <>
            <TabContainer id="tab-container">
                <Tab onClick={() => selectTabHandler("home")} className={selectedTab === "home" ? "focused" : null}>홈</Tab>
                <Tab onClick={() => selectTabHandler("post")} className={selectedTab === "post" ? "focused" : null}>게시물</Tab>
                <Tab onClick={() => selectTabHandler("floor")} className={selectedTab === "floor" ? "focused" : null}>층별 안내</Tab>
            </TabContainer>
            {selectedTab === "home" && (<>
                <Container id="office-container">
                    <Office buildingInfo={buildingInfo} />
                </Container>
                <Divider />
                <Container id="posts-container">
                    <Posts show={3} clickMore={selectTabHandler} />
                </Container>
                <Divider />
                <Container id="floor-container">
                    <Floor title={true} />
                </Container>
            </>
            )}
            {selectedTab === "post" && (<>
                <Posts />
                <PostFAB postMode="post" buildingId={buildingInfo.buildingId} />
            </>
            )}
            {selectedTab === "floor" && (<>
                <Floor title={false} />
            </>
            )}
            <div style={{ width: '100%', height: '34px' }}></div>
        </>
    );

}


const TabContainer = styled.div`
box-sizing: border-box;
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 16px;
width: 100%;
height: 56px;
border-bottom: 1px solid #E5E9EC;
background-color: #fff;
position:sticky;
top:56px;
`
const Tab = styled.div`
box-sizing: border-box;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 10px 0px;
height: 100%;
flex: 1;
color: #767676;

&.focused {
    color: #111111;
    border-bottom: 2px solid #000000;
}
`
const Container = styled.div`
padding: 0;
margin: 0;
width: 100%;
`
