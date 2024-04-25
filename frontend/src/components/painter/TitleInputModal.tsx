import { Input, Modal } from 'antd';
import { useState } from 'react';

import { setTitle } from '@/store/ContentSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function TitleInputModal() {
  const dispatch = useAppDispatch();
  const { globalData } = useAppSelector((state) => state.content);
  const title = globalData.dists.title;
  const [titleInput, setTitleInput] = useState('');
  return (
    <Modal
      title='请输入你的画作标题'
      centered
      open={!title}
      onOk={() => dispatch(setTitle(titleInput))}
      okText='确认'
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <OkBtn />
        </>
      )}
    >
      <Input
        onChange={(event) => setTitleInput(event.target.value)}
        value={titleInput}
      ></Input>
      <div className='draw-title-empty-warning'>
        {titleInput ? <></> : <div>标题不能为空</div>}
      </div>
    </Modal>
  );
}
