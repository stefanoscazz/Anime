import React from "react";
import styled from "styled-components";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
export const Footer = () => {
  return (
    <FooterContainer>
      App Realizzata da Stefano Scazzi
      <SocialBox>
        <GitHubIcon style={{ fontSize: "30px" }} />
        <LinkedInIcon style={{ fontSize: "40px" }} />
      </SocialBox>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100px;
  background-color: #2b2d42;
  color: white;
  font-weight: 900;
  margin-top: 80px;
`;
const SocialBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;
//
