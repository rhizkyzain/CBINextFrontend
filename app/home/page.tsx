// app/home/page.tsx
// import Link from 'next/link';

export default function HomePage() {
  const userName = 'User'; // placeholder, nanti bisa diganti pakai data dari backend

  return (
    <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-start">
      <div className="max-w-3xl w-full text-center mt-20">
        {/* Greeting */}
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Hi, {userName} 👋</h1>
        <p className="text-gray-700 text-lg mb-6">
          Welcome to your <span className="font-semibold">Next.js Simple CRUD Website</span>!
        </p>

        {/* Description / Features */} 
        <div className="bg-white p-6 rounded-lg shadow space-y-4 text-left">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">What you can do here:</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Manage users: create, read, update, delete user data.</li>
            <li>See user details in a simple table layout.</li>
            <li>Navigate between different pages of the website.</li>
            <li>Learn and explore how Next.js 13 App Router works.</li>
          </ul>
        </div>

        
      </div>
    </main>
  );
}
