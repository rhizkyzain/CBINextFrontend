'use client'

import { useEffect, useState } from 'react'

interface DataItem {
  id: number
  name: string
  email: string
  role: string
}

export default function UserPage() {
  const [data, setData] = useState<DataItem[]>([])
  const [token] = useState<string | null>(() => localStorage.getItem('token'))

  const [showModal, setShowModal] = useState(false)
  const [editingUserId, setEditingUserId] = useState<number | null>(null)

  const [formData, setFormData] = useState({ name: '', email: '', role: '' })

  // Fetch users
  useEffect(() => {
    if (!token) return
    fetch('http://localhost:8080/api/data', {
      method: 'GET',
      headers: { Authorization: token },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text())
        return res.json()
      })
      .then(setData)
      .catch((err) => alert('Fetch data failed: ' + err.message))
  }, [token])

  // Open modal for new user
  const openNewUserModal = () => {
    setEditingUserId(null)
    setFormData({ name: '', email: '', role: '' })
    setShowModal(true)
  }

  // Open modal for editing user
  const openEditUserModal = (user: DataItem) => {
    setEditingUserId(user.id)
    setFormData({ name: user.name, email: user.email, role: user.role })
    setShowModal(true)
  }

  // Save user (create or edit)
  const handleSave = async () => {
    if (!token) return
    const { name, email, role } = formData
    if (!name || !email || !role) {
      alert('All fields are required')
      return
    }

    try {
      if (editingUserId !== null) {
        // Edit
        const res = await fetch(`http://localhost:8080/api/data/${editingUserId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: token },
          body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error(await res.text())
        const updated = await res.json()
        setData(data.map((d) => (d.id === editingUserId ? updated : d)))
      } else {
        // Create
        const res = await fetch('http://localhost:8080/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: token },
          body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error(await res.text())
        const created = await res.json()
        setData([...data, created])
      }
      setShowModal(false)
    } catch (err: unknown) {
      if (err instanceof Error) console.error('Save failed:', err.message)
      else console.error('Unknown error', err)
    }
  }

  // Delete user
  const handleDelete = async (id: number) => {
    if (!token) return
    if (!confirm('Are you sure you want to delete this user?')) return
    try {
      const res = await fetch(`http://localhost:8080/api/data/${id}`, {
        method: 'DELETE',
        headers: { Authorization: token },
      })
      if (!res.ok) throw new Error(await res.text())
      setData(data.filter((d) => d.id !== id))
    } catch (err: unknown) {
      if (err instanceof Error) console.error('Delete failed:', err.message)
      else console.error('Unknown error', err)
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">User Management</h1>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition"
            onClick={openNewUserModal}
          >
            Create New User
          </button>
        </div>

        {/* User Table */}
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
              {data.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{user.id}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-sm transition"
                      onClick={() => openEditUserModal(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No users available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingUserId !== null ? 'Edit User' : 'Create New User'}
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border px-3 py-2 text-gray-500 rounded w-full"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border px-3 py-2 text-gray-500 rounded w-full"
              />
              <input
                type="text"
                placeholder="Role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="border px-3 py-2 text-gray-500 rounded w-full"
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
