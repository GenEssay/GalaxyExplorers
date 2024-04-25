import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { data } from '../components/painter/lego/data/data';
import { DataType } from '../components/painter/lego/data/DataType';

const categories = ['质量', '绘画', '画面效果', '容貌', '构图'];

export type LegoType = {
  keyWord: string;
  detail: string;
  useTime: number;
  color: string;
  varNum: number;
};

// 为 slice state 定义一个类型
interface ContentState {
  inputContent: string;
  selectCategory: string;
  current: { category: string; children: LegoType[] }[];
  globalData: DataType;
}

// 使用该类型定义初始 state
const initialState: ContentState = {
  inputContent: '',
  selectCategory: '容貌',
  current: categories.map((category) => {
    return {
      category: category,
      children: [],
    };
  }),
  globalData: data,
};

export const contentSlice = createSlice({
  name: 'content',
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {
    setSpining: (state, action: PayloadAction<boolean>) => {
      state.globalData.dists.spining = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.globalData.dists.title = action.payload;
    },
    selectCategory: (state, action: PayloadAction<string>) => {
      state.selectCategory = action.payload;
    },
    dropAll: (state) => {
      state.inputContent = initialState.inputContent;
      state.current = initialState.current;
    },
    choose: (state, action: PayloadAction<LegoType>) => {
      // 查看目前选中的类型是否有对应的 category
      const targetCategory = state.current.find(
        (item) => item.category === state.selectCategory
      );
      if (targetCategory) {
        // 如果有，将当前选中的内容添加到该 category 中
        // 查看该 category 中是否有相同的内容
        const sameLego = targetCategory.children.find(
          (item) => item.keyWord === action.payload.keyWord
        );
        if (sameLego) return;
        // 如果没有，将当前选中的内容添加到该 category 中
        targetCategory.children.push(action.payload);
      }
    },
    drop: (state, action: PayloadAction<LegoType>) => {
      state.current.map((category) => {
        category.children = category.children.filter(
          (lego) =>
            lego.keyWord !== action.payload.keyWord ||
            lego.color !== action.payload.color
        );
      });
    },
    edit: (state, action: PayloadAction<LegoType>) => {
      state.current.map((category) => {
        const target_lego = category.children.find(
          (lego) => lego.keyWord === action.payload.keyWord
        );
        if (target_lego) {
          target_lego.detail = action.payload.detail;
        }
      });
    },
    input: (state, action: PayloadAction<string>) => {
      state.inputContent = action.payload;
    },
    editApiKey: (state, action: PayloadAction<string>) => {
      state.globalData.dists.apiKey = action.payload;
    },
    openChatModal: (state) => {
      state.globalData.dists.chatModalOpen = true;
    },
    closeChatModal: (state) => {
      state.globalData.dists.chatModalOpen = false;
    },
    sendUserChat: (state) => {
      if (state.globalData.dists.chatMux == 'user') {
        state.globalData.chats.push({
          speaker: 'user',
          content: state.globalData.dists.prompt,
        });
        state.globalData.dists.prompt = '';
        state.globalData.dists.chatMux = 'ai';
      }
    },
    addAIChat: (state, action: PayloadAction<string>) => {
      if (state.globalData.dists.chatMux == 'ai') {
        state.globalData.chats.push({
          speaker: 'ai',
          content: action.payload,
        });
        state.globalData.dists.chatMux = 'user';
      }
    },
    editPrompt: (state, action: PayloadAction<string>) => {
      state.globalData.dists.prompt = action.payload;
    },
    setPainting: (state, action: PayloadAction<string>) => {
      state.globalData.dists.painting = action.payload;
    },
    setPainterState: (state, action: PayloadAction<string>) => {
      if (action.payload == 'canvas') {
        state.globalData.dists.painterState = 'canvas';
      } else if (action.payload == 'prompt') {
        state.globalData.dists.painterState = 'prompt';
      } else {
        state.globalData.dists.painterState = 'none';
      }
    },
    setGenImageUrl: (state, action: PayloadAction<string>) => {
      state.globalData.dists.genImageUrl = action.payload;
    },
  },
});

export const {
  selectCategory,
  dropAll,
  choose,
  drop,
  edit,
  input,
  editApiKey,
  openChatModal,
  closeChatModal,
  sendUserChat,
  addAIChat,
  editPrompt,
  setTitle,
  setPainting,
  setPainterState,
  setGenImageUrl,
  setSpining,
} = contentSlice.actions;

export default contentSlice.reducer;
