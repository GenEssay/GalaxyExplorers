// services/openai.ts
import OpenAI from 'openai'; // 确保已安装并导入 OpenAI 库

// 假设有一个类型定义文件，定义了你的消息结构
import { Message } from '../lib/types';

export async function getOpenAIResponse(messages: Message[]) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    stream: true,
    temperature: 0.4,
  });
  return completion;
}
