import styled, { css } from "styled-components";
import { TopNavigation } from "../components/TopNavigation";
import client from "../lib/client";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ReactComponent as Photo } from "../assets/icons/photo.svg";
import { Image } from "antd";

export default function Posting() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { state } = useLocation();
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        const response = await client.get(`/post/${postId}`);
        titleRef.current.value = response.data.title;
        contentRef.current.value = response.data.content;
      };
      fetchPost();
    }
  }, [postId]);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await client.post(`/file/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      return "";
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files[0]) {
      const imageUrl = await uploadFile(e.target.files[0]);
      if (imageUrl) {
        setImage(imageUrl);
      }
    }
  };

  const postOrEditPost = async (isEditing = false) => {
    const url = isEditing ? `/post/${postId}` : "/post";
    const method = isEditing ? "patch" : "post";
    const payload = {
      title: titleRef.current.value,
      content: contentRef.current.value,
      imageList: image ? [image] : [],
      ...(state && { buildingId: state.buildingId }),
    };

    try {
      const response = await client[method](url, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert(
        `게시글이 성공적으로 ${isEditing ? "수정되었습니다" : "등록되었습니다"}`
      );
      navigate(-1);
    } catch (error) {
      setError(`Failed to ${isEditing ? "update" : "create"} post.`);
    }
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

      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={(event) => {
          if (event.target.files && event.target.files[0]) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => setImage(e.target.result);
            fileReader.readAsDataURL(event.target.files[0]);
          }
        }}
      />

      {image && (
        <Image
          src={image}
          style={{
            width: "50px",
            height: "50px",
            position: "fixed",
            bottom: "98px",
            left: "20px",
            zIndex: 100,
          }}
          onClick={() => fileInputRef.current.click()}
        />
      )}
      <SmallButton onClick={() => fileInputRef.current.click()}>
        <Photo />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </SmallButton>
      <BottomContainer>
        <div style={{ height: 84 }}></div>
        <Button
          variant="primary"
          onClick={() => {
            postOrEditPost(!!postId);
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
  bottom: 98px;
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
