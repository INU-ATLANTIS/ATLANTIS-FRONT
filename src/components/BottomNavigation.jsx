import styled, { css } from "styled-components";

import { ReactComponent as OtherHouses } from "../assets/icons/other_houses.svg";
import { ReactComponent as EventNote } from "../assets/icons/event_note.svg";
import { ReactComponent as LocationCity } from "../assets/icons/location_city.svg";
import { Link, useLocation } from "react-router-dom";

export function BottomNavigation() {
  const { pathname } = useLocation();

  return (
    <>
      <Spacing></Spacing>

      <Container>
        <NavItem active={pathname.includes("home")} to="/home">
          <OtherHouses />

          <Label>홈</Label>
        </NavItem>
        <NavItem active={pathname.includes("posts")} to="/posts">
          <EventNote />

          <Label>게시글</Label>
        </NavItem>
        <NavItem active={pathname.includes("building")} to="/building">
          <LocationCity />

          <Label>강의실</Label>
        </NavItem>
        <NavItem
          active={pathname.includes('loginUserInfo')}
          to="/loginUserInfo"
        >
          <LocationCity />

          <Label>내 정보</Label>
        </NavItem>
      </Container>
    </>
  );
}

const Spacing = styled.div`
  height: 48px;
`;

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 48px;
  display: flex;
  border-top: 1px solid #f1f1f5;
  background-color: #ffffff;
`;

const NavItem = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
  background-color: transparent;
  text-decoration: none;

  ${({ active }) =>
    active
      ? css`
          color: #111111;
        `
      : css`
          svg {
            color: #999999;
          }

          color: #767676;
        `}
`;

const Label = styled.label`
  font-size: 12px;
  line-height: 18px;
  color: inherit;
`;
