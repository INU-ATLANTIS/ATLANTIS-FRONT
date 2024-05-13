import styled, { css } from "styled-components";
import { TopNavigation } from "../components/TopNavigation";
import client from "../lib/client";
import { useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ReactComponent as Photo } from "../assets/icons/photo.svg";

export default function Posting() {
  const navigate = useNavigate();

  const { postId } = useParams();
  const { state } = useLocation();
  console.log(state);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    client.interceptors.request.use((config) => {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };

      return config;
    });
  }, []);

  useEffect(() => {
    const setPostAsync = async () => {
      const response = await client.get(`/post/${postId}`);

      titleRef.current.value = response.data.title;
      contentRef.current.value = response.data.content;
    };

    if (postId) {
      setPostAsync();
    }
  }, [postId]);

  const handlePostEdit = async () => {
    await client.patch(`/post/${postId}`, {
      title: titleRef.current.value,
      content: contentRef.current.value,
    });

    alert("게시글이 성공적으로 수정되었어요");
    navigate(-1);
  };

  const handlePost = async () => {
    if (state) {
      await client.post("/post", {
        title: titleRef.current.value,
        content: contentRef.current.value,
        imageList: [],
        buildingId: state.buildingId,
      });
    } else {
      await client.post("/post", {
        title: titleRef.current.value,
        content: contentRef.current.value,
        imageList: [],
      });
    }

    alert("게시글이 성공적으로 등록되었어요");
    navigate(-1);
  };

  return (
    <Container>
      <TopNavigation />

      <TitleContainer size="large">
        <span>게시글 {postId ? "수정" : "작성"}</span>
      </TitleContainer>

      <InputContainer>
        <Label>글 제목</Label>
        <Input type="text" autoFocus ref={titleRef} />
        <InputBottomLine />
      </InputContainer>

      <ContentTextarea ref={contentRef} />
      <SmallButton>
        <Photo />
      </SmallButton>
      <BottomContainer>
        <div style={{ height: 84 }}></div>

        <Button
          variant="primary"
          onClick={() => {
            if (postId) {
              handlePostEdit();
            } else {
              handlePost();
            }
          }}
        >
          {postId ? "수정하기" : "등록하기"}
        </Button>
      </BottomContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  height: 58px;
  align-items: flex-end;
  padding-left: 16px;
  margin-bottom: 40px;

  span {
    color: #111111;
    font-weight: 600;

    ${({ size }) =>
      size === "large"
        ? css`
            font-size: 28px;
            line-height: 38px;
          `
        : css`
            font-size: 24px;
            line-height: 34px;
          `}
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0px 16px;
`;

const Label = styled.label`
  font-size: 12px;
  line-height: 18px;
  color: #505050;
`;

const Input = styled.input`
  border: none;
  font-size: 24px;
  line-height: 34px;
  color: #111111;
  margin: 0;

  &::placeholder {
    color: #999999;
  }
`;

const InputBottomLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #f1f1f5;
`;

const Button = styled.button`
  border: none;
  border-radius: 12px;
  height: 52px;
  min-height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  width: 100%;
  background-color: ${({ theme }) => theme.primaryColor};
  color: #ffffff;
`;

const SmallButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  padding: 20px 24px;
  position: fixed;
  bottom: 168px;
  right: 20px;
  z-index: 100;
  border: none;
  background-color: ${({ theme }) => theme.primaryColor};
  color: white;
  border-radius: 9999px;
  font-size: 18px;
  line-height: 24px;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 84px;
  padding: 16px;
  position: fixed;
  bottom: 0px;
  left: 0px;
`;

const ContentTextarea = styled.textarea`
  width: calc(100vw - 32px);
  margin: 0px auto;
  height: 300px;
  margin-top: 32px;
  background-color: #f7f7fb;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  line-height: 24px;
  resize: none;
`;
