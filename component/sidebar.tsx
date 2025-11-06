'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  if (pathname === '/') return null; // hide on login page

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-6 flex flex-col">
      <h1 className="text-xl font-bold mb-6 text-blue-600">MyApp</h1>
      <nav className="flex flex-col space-y-3">
        <Link href="/home" className={`p-2 rounded text-gray-500 hover:bg-blue-100 ${pathname === '/home' ? 'bg-blue-200 font-semibold' : ''}`}>
          Dashboard
        </Link>
        <Link href="/about" className={`p-2 rounded text-gray-500 hover:bg-blue-100 ${pathname === '/about' ? 'bg-blue-200 font-semibold' : ''}`}>
          About
        </Link>
      </nav>
    </aside>
  );
}
