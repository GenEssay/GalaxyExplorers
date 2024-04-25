import Image from 'next/image';
import styled from 'styled-components';

import { dropAll } from '@/store/ContentSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import copyImage from '@/assets/copyImage.svg';
import dropImage from '@/assets/dropImage.svg';

import TextArea from './TextArea';

interface LeftSiderProps {}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  gap: 1rem;
  background-color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border: none;

  &:not(:last-child) {
    margin-right: 1.5rem;
  }
`;

const LeftSider: React.FC<LeftSiderProps> = ({}) => {
  const { current, inputContent } = useAppSelector((state) => state.content);
  const dispatch = useAppDispatch();
  function getOuptut() {
    const output = current
      .map((category) => {
        let detail = category.children
          .map((lego) => {
            return lego.detail;
          })
          .join('');
        if (category.category === '行动任务') detail += inputContent;
        if (detail) return '# ' + category.category + ': \n' + detail + '\n';
        else return '';
      })
      .join('');
    return output;
  }

  const output = getOuptut();
  const copyToClipboard = () => {
    const textarea = document.createElement('textarea');
    textarea.value = output;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };
  const handleCopy = () => {
    copyToClipboard();
  };
  const handleDrop = () => {
    dispatch(dropAll());
  };
  return (
    <Container>
      <TextArea value={output} readOnly placeholder='PromptsLego' />
      <ButtonContainer>
        <Button
          style={{
            position: 'relative',
            width: '4.4rem',
            height: '2.1rem',
          }}
          onClick={handleCopy}
        >
          <Image src={copyImage} alt='' layout='fill' />
        </Button>
        <Button
          style={{
            position: 'relative',
            width: '2.1rem',
            height: '2.1rem',
          }}
          onClick={handleDrop}
        >
          <Image src={dropImage} alt='' layout='fill' />
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default LeftSider;
