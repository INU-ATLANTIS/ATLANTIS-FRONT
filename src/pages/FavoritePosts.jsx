import styled from "styled-components";
import { TopNavigation } from "../components/TopNavigation";
import { useEffect, useState } from "react";
import client from "../lib/client";
import { PostListItem } from "../components/PostListItem";
import { useNavigate } from "react-router-dom";

export default function FavoritePosts() {
  const navigate = useNavigate();
  const [favoritePosts, setFavoritePosts] = useState([]);

  useEffect(() => {
    const getFavoritePosts = async () => {
      try {
        const response = await client.get("/post/my/favorite");
        if (response.data.code === "SU") {
          const posts = Array.isArray(response.data.myLikePosts)
            ? response.data.myLikePosts
            : [];
          setFavoritePosts(posts);
        } else {
          console.error(
            "Failed to fetch favorite posts:",
            response.data.message
          );
          setFavoritePosts([]);
        }
      } catch (error) {
        console.error("Error fetching favorite posts:", error);
        setFavoritePosts([]);
      }
    };

    getFavoritePosts();
  }, []);

  const handlePostDelete = async (postId) => {
    await client.delete(`/post/${postId}`);

    const response = await client.get("/post/my");
    setFavoritePosts(response.data);
  };

  const handlePostEdit = (postId) => {
    navigate(`/posting/${postId}`);
  };

  return (
    <Container>
      <TopNavigation />

      <TitleContainer>
        <span>좋아요한 게시글</span>
      </TitleContainer>

      <PostList>
        {favoritePosts.map((post) => (
          <PostListItem
            key={post.postId}
            {...post}
            onDeletePost={() => handlePostDelete(post.postId)}
            onEditPost={() => handlePostEdit(post.postId)}
          />
        ))}
      </PostList>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const TitleContainer = styled.div`
  display: flex;
  height: 58px;
  align-items: flex-end;
  padding-left: 16px;
  margin-bottom: 40px;
  margin-top: 56px;

  span {
    color: #111111;
    font-weight: 600;
    font-size: 28px;
    line-height: 38px;
  }
`;

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
`;
