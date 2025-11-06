// app/home/page.tsx (Server Component)
import Link from 'next/link';

interface DataItem {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function HomePage() {
  // Simulating dummy data directly
  const data: DataItem[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'User' },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Dashboard</h1>
          <Link
            href="#"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition"
          >
            Create New
          </Link>
        </div>

        {/* Data Grid */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{item.id}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{item.email}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{item.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                    <Link
                      href={`/edit/${item.id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/delete/${item.id}`}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
