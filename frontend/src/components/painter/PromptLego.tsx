import Image from 'next/image';
import styled from 'styled-components';

import logo from '@/assets/Logo.svg';
import bottomLogo from '@/assets/version.svg';

import CenterContent from './lego/CenterContent';
import LeftSider from './lego/LeftSider';
import RightSider from './lego/RightSider';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;

const AppLayout = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr;
  grid-template-rows: 5rem auto 3rem;
  height: 600px;
  width: 1000px;
  pointer-events: all;
  background-color: white;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Header = styled.header`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  padding-left: 1rem;
`;
const Footer = styled.footer`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 1rem;
`;

const Logo = styled.div`
  height: 50%;
`;

const BottomLogo = styled.div`
  height: 50%;
`;

export default function PromptLego() {
  return (
    <Container>
      <AppLayout>
        <Header>
          <Logo>
            <Image src={logo} alt=''></Image>
          </Logo>
        </Header>
        <LeftSider />
        <CenterContent />
        <RightSider />
        <Footer>
          <BottomLogo>
            <Image src={bottomLogo} alt=''></Image>
          </BottomLogo>
        </Footer>
      </AppLayout>
    </Container>
  );
}
