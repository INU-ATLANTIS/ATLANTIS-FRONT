import styled from "styled-components";

export default function Post({ post }) {
    return (
        <Div>
            <Title>{post.title}</Title>
            <Content>{post.content}</Content>
        </Div>
    );
}

const Div = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 16px;
gap: 12px;
box-sizing: border-box;
width: 100%;
height: 92px;
`

const Title = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 500;
font-size: 16px;
color: #000000;
margin:0;
`

const Content = styled.p`
font-weight: 400;
font-size: 14px;
color: #505050;
margin: 0;
`