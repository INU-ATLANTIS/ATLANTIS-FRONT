import { format } from "date-fns/format";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Avatar } from "antd";
import profileImg from "../assets/profileImg.png";

import { ReactComponent as LikeIcon } from "../assets/icons/thumb_up.svg";
import { ReactComponent as CommentIcon } from "../assets/icons/chat.svg";

export function PostListItem({
  writerProfileImage,
  writerNickname,
  postId,
  title,
  content,
  postTitleImage,
  writeDatetime,
  likeCount,
  commentCount,
  myPost,
  onEditPost,
  onDeletePost,
}) {
  const navigate = useNavigate();

  return (
    <li
      key={postId}
      onClick={() => {
        navigate(`/post/${postId}`);
      }}
    >
      <div>
        <MainContent>
          <TextContainer>
            <Header>
              <Avatar src={writerProfileImage ?? profileImg} size={25} />
              <WriterName>{writerNickname ?? "익명"}</WriterName>
            </Header>
            <Title>{title}</Title>
            <Content>{content}</Content>
            <InfoContainer>
              <InfoText>{format(new Date(writeDatetime), "MM.dd")}</InfoText>

              {likeCount !== 0 && (
                <LikeAndCommentContainer>
                  <LikeIcon />
                  <InfoText>{likeCount}</InfoText>
                </LikeAndCommentContainer>
              )}

              {commentCount !== 0 && (
                <LikeAndCommentContainer>
                  <CommentIcon />
                  <InfoText>{commentCount}</InfoText>
                </LikeAndCommentContainer>
              )}
            </InfoContainer>
          </TextContainer>

          {postTitleImage && (
            <ImageContainer>
              <TitleImage src={postTitleImage} alt="Post image" />
            </ImageContainer>
          )}
        </MainContent>
      </div>

      {myPost && (
        <MyPostControlContainer>
          <EditButton
            onClick={(e) => {
              e.stopPropagation();
              onEditPost(postId);
            }}
          >
            수정
          </EditButton>
          <DeleteButton
            onClick={(e) => {
              e.stopPropagation();
              onDeletePost(postId);
            }}
          >
            삭제
          </DeleteButton>
        </MyPostControlContainer>
      )}
    </li>
  );
}

const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 120px;
`;

const TextContainer = styled.div`
  flex: 1;
  align-self: stretch;
`;

const ImageContainer = styled.div`
  width: 70px;
  height: 70px;
  margin-right: 10px;
  align-self: center;
`;

const TitleImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.span`
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.4px;
  color: #111111;
  font-weight: 600;
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

const Content = styled.p`
  margin: 4px 0px;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.4px;
  color: #505050;
  display: inline-block;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const InfoText = styled.span`
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.4px;
  color: #999999;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LikeAndCommentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const EditButton = styled.button`
  font-size: 16px;
  font-weight: 500;
  background-color: #f7f7fb;
  color: #505050;
  border: none;
  border-radius: 4px;
  padding: 4px 12px;
  margin-top: 12px;
  width: fit-content;
`;

const DeleteButton = styled.button`
  font-size: 16px;
  font-weight: 500;
  background-color: #e15241;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 4px 12px;
  margin-top: 12px;
  width: fit-content;
`;

const MyPostControlContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`;

const WriterName = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #111111;
  margin-left: 10px;
`;
