'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  if (pathname === '/') return null; // hide on login page

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 py-3 px-6 flex justify-between items-center">
      <div className="text-lg font-semibold text-blue-600">
        {/* <Link href="/">MyApp</Link> */}
      </div>
      <div className="space-x-4">
        <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">
          About
        </Link>
        <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
          Logout
        </Link>
      </div>
    </nav>
  );
}


