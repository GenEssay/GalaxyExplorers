import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

import '@/styles/colors.css';
import '@/styles/globals.css';

import StoreProvider from '@/app/StoreProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AntdRegistry>
          <StoreProvider>{children}</StoreProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
