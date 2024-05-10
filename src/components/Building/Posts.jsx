import styled from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostListItem } from "../PostListItem.jsx";
import { fetchPosts } from "../../http.js";

export default function Posts({ show, clickMore }) {
    const [postList, setPostList] = useState(null);
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const buildingId = useParams().buildingId;

    useEffect(() => {
        setIsFetching(true);
        const fetchPostList = async () => {
            try {
                const list = await fetchPosts(buildingId);
                if (list.code === "SU") {
                    setPostList(list.buildingPostList);
                    setIsFetching(false);
                } else {
                    setError(list.message);
                    setIsFetching(false);
                }
            } catch (err) {
                setError(err);
                setIsFetching(false);
            }
        };

        fetchPostList();
    }, []);

    if (error !== null) {
        return <div>{error}</div>
    }

    const postElement = []

    if (!isFetching && postList !== null) {
        const iter = (show !== undefined ? (postList.length < 3 ? postList.length : show) : postList.length);

        for (let i = 0; i < iter; i++) {
            const post = postList[i];
            postElement.push(
                <PostListItem {...post} />
            );
        }
    }


    return (
        <>
            <Title>
                <h2>게시글 <StyledSpan>
                    {!isFetching && postList !== null ? postList?.length : 0}개
                </StyledSpan>
                </h2>
            </Title>
            {isFetching && <p>...Loading</p>}
            <PostList>
                {postElement}
            </PostList>
            {!isFetching && show !== undefined && postList?.length !== 0 && (
                <>
                    <div style={{ margin: "0px 10px" }}>
                        <Button onClick={() => clickMore("post")}>더보기</Button>
                    </div>
                    <div id="spacing" style={{ padding: '48px 0 0 0' }}></div>

                </>
            )}
        </>
    );
}

const Title = styled.div`
padding: 24px 16px 40px 16px;

h2 {
    font-weight: 600;
    font-size: 18px;
    margin: 0;
}
`

const StyledSpan = styled.span`
font-weight: 500;
font-size: 14px;
line-height: 18px;
color: #767676;
`
const Button = styled.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0;
gap: 8px;
width: 100%;
height: 52px;
background: #F7F7FB;
border-radius: 12px;
border: none;
`

const PostList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  padding-bottom: 80px;
  width: 100vw;

  li {
    padding: 16px;
    border-top: 1px solid #f1f1f5;
  }
`