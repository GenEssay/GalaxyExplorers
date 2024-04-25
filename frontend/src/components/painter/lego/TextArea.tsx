import Image from 'next/image';
import styled from 'styled-components';

import textboxBackgroundCorner from '@/assets/textboxBackgroundCorner.png';
import textboxBackgroundHorizontal from '@/assets/textboxBackgroundHorizontal.png';
import textboxBackgroundVertical from '@/assets/textboxBackgroundVertical.png';

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  border-style: solid;
  border-color: black;
  border-radius: 10px;
  display: grid;
  overflow: hidden;
  grid-template-rows: 1.5rem auto;
  grid-template-columns: 1.5rem auto;
  grid-template-areas:
    'corner horizontal_bar'
    'vertical_bar textbox';
  background-color: #d3d3d3;
`;

function Corner() {
  return (
    <div
      style={{
        position: 'relative',
        gridArea: 'corner',
      }}
    >
      <Image src={textboxBackgroundCorner} alt='' layout='fill'></Image>
    </div>
  );
}

function HorizontalBar() {
  return (
    <div
      style={{
        position: 'relative',
        gridArea: 'horizontal_bar',
      }}
    >
      <Image src={textboxBackgroundHorizontal} alt='' layout='fill'></Image>
    </div>
  );
}

function VerticalBar() {
  return (
    <div
      style={{
        position: 'relative',
        gridArea: 'vertical_bar',
      }}
    >
      <Image src={textboxBackgroundVertical} alt='' layout='fill'></Image>
    </div>
  );
}

const Textbox = styled.div`
  grid-area: textbox;
`;

const TextAreaContent = styled.textarea`
  font-size: 1rem;
  overflow-y: auto;
  width: 95%;
  height: 95%;
  background-color: transparent;
  border: 0;
  resize: none;
  /* background-color: gray; */
`;
const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  ...props
}) => {
  return (
    <Container>
      <Corner />
      <HorizontalBar />
      <VerticalBar />
      <Textbox>
        <TextAreaContent {...props} />
      </Textbox>
    </Container>
  );
};

export default TextArea;
