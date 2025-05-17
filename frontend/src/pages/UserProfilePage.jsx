import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { getUserById } from '../lib/api'
import { LoaderIcon, CameraIcon } from 'lucide-react'

const UserProfilePage = () => {
  const { id } = useParams()
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    enabled: !!id
  })

  if (isLoading) return <div className="flex justify-center py-12"><LoaderIcon className="animate-spin size-8 text-primary" /></div>
  if (error || !user) return <div className="text-center py-12 text-error">User not found.</div>

  return (
    <div className="flex items-center justify-center px-4 min-h-[100dvh] bg-base-200">
      <div className="w-full max-w-xl bg-base-100 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>
        <div className="flex flex-col items-center mb-6">
          {user.profilePic ? (
            <img src={user.profilePic} alt="Profile" className="w-24 h-24 rounded-full border-4 border-primary object-cover" onError={e => { e.target.onerror = null; e.target.src = '/vite.svg'; }} />
          ) : (
            <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center">
              <CameraIcon className="size-12 text-base-content opacity-40" />
            </div>
          )}
        </div>
        <div className="space-y-2 text-center">
          <div><span className="font-semibold">Name:</span> {user.fullName}</div>
          <div><span className="font-semibold">Bio:</span> {user.bio || <span className="opacity-60">No bio</span>}</div>
          <div><span className="font-semibold">Native Language:</span> {user.nativeLanguage}</div>
          <div><span className="font-semibold">Learning Language:</span> {user.learningLanguage}</div>
          <div><span className="font-semibold">Location:</span> {user.location}</div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage
