import { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { completeOnboarding } from '../lib/api'
import { LANGUAGES } from '../constants'
import { LoaderIcon, CameraIcon, Shuffle } from 'lucide-react'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const { authUser } = useAuthUser()
  const queryClient = useQueryClient()
  const [editMode, setEditMode] = useState(false)
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || '',
    bio: authUser?.bio || '',
    nativeLanguage: authUser?.nativeLanguage || '',
    learningLanguage: authUser?.learningLanguage || '',
    location: authUser?.location || '',
    profilePic: authUser?.profilePic || '',
  })

  const { mutate: saveProfile, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success('Profile updated!')
      setEditMode(false)
      queryClient.invalidateQueries({ queryKey: ['authUser'] })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Update failed')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    saveProfile(formState)
  }

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`
    setFormState({ ...formState, profilePic: randomAvatar })
    toast.success('Avatar Changed Successfully')
  }

  if (!authUser) return <div className="p-8 text-center">Loading...</div>

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-xl bg-base-100 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Your Profile</h2>
        <div className="flex flex-col items-center mb-6">
          {formState.profilePic ? (
            <img
              src={formState.profilePic}
              alt="Profile Picture"
              className="w-24 h-24 rounded-full border-4 border-primary"
              onError={e => { e.target.onerror = null; e.target.src = '/vite.svg'; }}
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center">
              <CameraIcon className="size-12 text-base-content opacity-40" />
            </div>
          )}
          {editMode && (
            <button
              onClick={handleRandomAvatar}
              className="mt-4 px-4 py-2 bg-primary text-black rounded-md font-semibold flex items-center gap-2 hover:bg-primary/80 transition"
            >
              <Shuffle className="w-4 h-4" />
              Generate Random Avatar
            </button>
          )}
        </div>
        {!editMode ? (
          <div className="space-y-2">
            <div><span className="font-semibold">Name:</span> {authUser.fullName}</div>
            <div><span className="font-semibold">Bio:</span> {authUser.bio || <span className="opacity-60">No bio</span>}</div>
            <div><span className="font-semibold">Native Language:</span> {authUser.nativeLanguage}</div>
            <div><span className="font-semibold">Learning Language:</span> {authUser.learningLanguage}</div>
            <div><span className="font-semibold">Location:</span> {authUser.location}</div>
            <button className="btn btn-primary mt-6 w-full" onClick={() => setEditMode(true)}>Edit Profile</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label className="text-sm">Full Name</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                value={formState.fullName}
                onChange={e => setFormState({ ...formState, fullName: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm">Bio</label>
              <textarea
                rows={3}
                className="w-full mt-1 px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                value={formState.bio}
                onChange={e => setFormState({ ...formState, bio: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Native Language</label>
                <select
                  value={formState.nativeLanguage}
                  onChange={e => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className="w-full mt-1 px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                >
                  <option value="">Select your native Language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm">Learning Language</label>
                <select
                  value={formState.learningLanguage}
                  onChange={e => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="w-full mt-1 px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                >
                  <option value="">Select the language you are learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm">Location</label>
              <input
                type="text"
                className="w-full mt-1 px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                value={formState.location}
                onChange={e => setFormState({ ...formState, location: e.target.value })}
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-4 py-3 bg-primary text-black font-semibold rounded-md flex items-center justify-center gap-2 hover:bg-primary/80 transition">
              {!isPending ? (
                <>
                  <LoaderIcon className='size-5' />
                  Save Changes
                </>
              ) : (
                <>
                  <LoaderIcon className='animate-spin size-5 ' />
                  Saving...
                </>
              )}
            </button>
            <button type="button" className="btn btn-ghost w-full mt-2" onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
