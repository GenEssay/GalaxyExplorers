import styled from 'styled-components';

import Choices from './Choices';
import Navigator from './Navigator';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border: 3px solid var(--color-grey-900);
  border-radius: 10px 10px 30px 30px;
  overflow: hidden;
  width: 450px;
  height: 450px;
  background-color: #fbead8;
`;
const ChoiceContainer = styled.div`
  padding: 10px;
  height: 100%;
`;
const ChoiceDiv = styled.div`
  overflow-y: auto;
  height: 100%;
  padding: 10px;
`;

interface RightSiderProps {}

const RightSider: React.FC<RightSiderProps> = ({}) => {
  return (
    <Container>
      <Navigator />
      <ChoiceContainer>
        <ChoiceDiv>
          <Choices />
          <div style={{ height: '40px' }}></div>
        </ChoiceDiv>
      </ChoiceContainer>

      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '20px',
          bottom: '0px',
          background: 'linear-gradient(to top, #FBEAD8, transparent)',
          zIndex: '100000',
        }}
      ></div>
    </Container>
  );
};

export default RightSider;
