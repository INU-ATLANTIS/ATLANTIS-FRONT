import React, { useState, useEffect, useRef } from "react";
import client from "../lib/client";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { Avatar } from "antd";
import profileImg from "../assets/profileImg.png";
import { TopNavigation } from "../components/TopNavigation";
import { BottomNavigation } from "../components/BottomNavigation";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 0 16px;
`;
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
`;

const Top = styled.div`
  padding: 20px 16px 0px;
  font-size: 24px;
  line-height: 34px;
  font-weight: 600;
  color: #111111;
`;

const ProfileImgContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 20px 0 10px;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 8px;
  border: 1px solid #eeeeee;
  background-color: #f6f6f6;
  padding: 30px 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SmallButton = styled(Link)`
  background-color: #004a9e;
  border: none;
  border-radius: ${({ $round }) => ($round ? `9999px` : `8px`)};
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  padding: 0 16px;
  width: 60px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 10px;
  text-decoration: none;

  &:hover,
  &:active {
    background-color: #16457a;
  }
`;

const Button = styled(Link)`
  color: #000000;
  cursor: pointer;
  font-size: 16px;
  padding: 25px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  text-decoration: none;
  border-bottom: 2px solid #eeeeee;
  margin: 0px;
`;

const ButtonLabel = styled.label`
  color: #000000;
  cursor: pointer;
  font-size: 16px;
  padding: 25px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  text-decoration: none;
  border-bottom: 2px solid #eeeeee;
  margin: 0px;
`;

const LogoutButton = styled(Link)`
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-size: 16px;
  line-height: 24px;
  min-height: 42px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0px;

  ${({ theme }) => css`
    background-color: ${theme.primaryColor};
  `};
`;

function LoginUserInfo() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    nickname: "",
  });
  const [Image, setImage] = useState(profileImg);
  const fileInput = useRef(null);
  const [error, setError] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const navigate = useNavigate();

  function handleFindPassword() {
    navigate("/findpassword");
  }

  const onChange = async (e) => {
    if (e.target.files[0]) {
      console.log("Selected file:", e.target.files[0]);
      const fileUrl = await uploadFile(e.target.files[0]);
      console.log("Uploaded file URL:", fileUrl);
      if (fileUrl) {
        await updateProfileImage(fileUrl);
        console.log("Profile image updated successfully");
        setImage(fileUrl);
      }
    } else {
      console.log("No file selected, reverting to default profile image");
      setImage(profileImg);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const uploadFile = async (file) => {
    console.log("Uploading file:", file);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await client.post(`/file/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Server response:", response);
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      setError(error.message);
      return "";
    }
  };

  const updateProfileImage = async (imageUrl) => {
    try {
      const token = localStorage.getItem("token");
      const response = await client.patch(
        `/user/profileimage`,
        { profileImage: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const timestamp = new Date().getTime();
      const updatedImageUrl = `${imageUrl}?t=${timestamp}`;

      setUserInfo((prevState) => ({
        ...prevState,
        profileImage: updatedImageUrl,
      }));

      setImage(updatedImageUrl);
      setUploadedImageUrl(updatedImageUrl);
    } catch (error) {
      console.error("Error updating profile image:", error);
      setError(error.message);
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files[0]) {
      const imageUrl = await uploadFile(e.target.files[0]);
      if (imageUrl) {
        setImage(imageUrl);
        setUploadedImageUrl(imageUrl); // 이미지 URL 상태 업데이트
      }
    } else {
      setError("No file selected.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const isConfirmed = window.confirm("정말로 계정을 삭제하시겠습니까?");
      if (!isConfirmed) {
        console.log("계정 삭제가 취소되었습니다.");
        return;
      }

      await client.delete(`/auth/delete-account`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting account:", error.response || error);
      alert(
        "Error deleting account: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error(
            "No token found, user must be logged in to fetch profile."
          );
          return;
        }
        const response = await client.get(`/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { email, nickname, profileImage } = response.data;
        setUserInfo({ email, nickname, profileImage });
        setImage(profileImage || profileImg);
      } catch (err) {
        const message =
          err.response?.data?.message || "Failed to fetch user information.";
        setError(message);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <Container>
      <TopNavigation />
      <Top>내 정보 </Top>
      <div style={{ height: 20 }}></div>
      <UserContainer>
        <ProfileImgContainer>
          <Avatar
            src={Image}
            size={100}
            onClick={() => {
              fileInput.current.click();
            }}
          />
          <input
            type="file"
            style={{ display: "none" }}
            name="profile_img"
            onChange={onChange}
            ref={fileInput}
          />
        </ProfileImgContainer>
        <div>
          <Row>
            <p>닉네임: {userInfo.nickname || "익명"}</p>

            <SmallButton to="/ChangeNickname">변경</SmallButton>
          </Row>
          <p>이메일: {userInfo.email || "Not provided"}</p>
        </div>
      </UserContainer>
      <Button to="/myPosts">내 게시글</Button>
      <Button to="/favoritePosts">좋아요한 게시글</Button>
      <Button to="/userNotiList">알람 조회</Button>
      <ButtonLabel onClick={handleFindPassword}>비밀번호 변경</ButtonLabel>
      <Button onClick={handleDeleteAccount}>회원 탈퇴</Button>
      <div style={{ height: 40 }}></div>

      <BottomContainer>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </BottomContainer>
      <BottomNavigation />
    </Container>
  );
}

export default LoginUserInfo;
