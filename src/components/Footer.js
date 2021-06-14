import React from "react";
import styled from "styled-components";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
export const Footer = () => {
  return (
    <FooterContainer>
      App Realizzata da Stefano Scazzi
      <SocialBox>
        <GitHubIcon />
        <LinkedInIcon />
      </SocialBox>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: rgb(51, 51, 51);
  height: 15vh;
  background-color: rgb(49, 0, 82);
  color: white;
`;
const SocialBox = styled.div`
  margin: 10px;
`;
