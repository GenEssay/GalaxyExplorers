export type DataType = {
  categories: {
    name: string;
    color: string;
  }[];
  tables: {
    category: string;
    minorCategories: {
      name: string;
      number: number;
      legos: {
        keyWord: string;
        detail: string;
        useTime: number;
        color: string;
        varNum: number;
      }[];
    }[];
  }[];
  chats: {
    speaker: string;
    content: string;
  }[];
  dists: {
    apiKey: string;
    chatModalOpen: boolean;
    prompt: string;
    chatMux: string;
    title: string;
    painting: string;
    painterState: 'none' | 'canvas' | 'prompt';
    genImageUrl: string;
    spining: boolean;
  };
};
