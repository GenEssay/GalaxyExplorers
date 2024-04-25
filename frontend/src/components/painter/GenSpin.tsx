import { Spin } from 'antd';

import { useAppSelector } from '@/store/hooks';

export default function GenSpin() {
  const { globalData } = useAppSelector((state) => state.content);
  return (
    <Spin
      spinning={globalData.dists.spining}
      fullscreen
      style={{ zIndex: '100005' }}
    />
  );
}
