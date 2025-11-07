// app/layout.tsx
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Sidebar from '../component/sidebar';
import TopNavbar from '../component/navbar';

export const metadata = {
  title: 'My Next.js App',
  description: 'A simple example app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gray-100 flex">
        <Toaster position="top-right" />
        {/* Sidebar fixed width */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          <TopNavbar />
          <main className="flex-1 w-full p-6 bg-gray-100">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
