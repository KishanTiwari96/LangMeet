import { CameraIcon, Globe, GlobeIcon, LoaderIcon, MapPinIcon, ShipWheelIcon, Shuffle } from 'lucide-react';
import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { completeOnboarding } from '../lib/api';
import { LANGUAGES } from '../constants';

const OnboardingPage = () => {
  const { authUser } = useAuthUser()
  const queryClient = useQueryClient()

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  })

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile Onboarded successfully")
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
    },
    onError: (error) => {
      toast.error(error.response.data.message)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onboardingMutation(formState)
  }

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

    setFormState({ ...formState, profilePic: randomAvatar })
    toast.success("Avatar Changed Successfully")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-xl bg-zinc-900 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Complete Your Profile</h2>

        <div className="flex flex-col items-center mb-6">
          {formState.profilePic ? (
            <img
              src={formState.profilePic || '/vite.svg'}
              alt="Profile Picture"
              className="w-24 h-24 rounded-full border-4 border-green-500"
              onError={e => { e.target.onerror = null; e.target.src = '/vite.svg'; }}
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center">
              <CameraIcon className="size-12 text-base-content opacity-40" />
            </div>
          )}

          <button
            onClick={handleRandomAvatar}
            className="mt-4 px-4 py-2 bg-green-500 text-black rounded-md font-semibold flex items-center gap-2 hover:bg-green-400 transition"
          >
            <Shuffle className="w-4 h-4" />
            Generate Random Avatar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="text-sm">Full Name</label>
            <input
              type="text"
              placeholder='Enter your name'
              className="w-full mt-1 px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
              value={formState.fullName}
              onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm">Bio</label>
            <textarea
              rows={3}
              placeholder="Tell others about yourself and your language learning goals"
              className="w-full mt-1 px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
              value={formState.bio}
              onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Native Language</label>
              <select
                name="nativeLanguage"
                value={formState.nativeLanguage}
                onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
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
                name="learningLanguage"
                value={formState.learningLanguage}
                onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
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
            <div className='relative'>
              <MapPinIcon className='absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-white opacity-70' />
              <input
                type="text"
                placeholder="City, Country"
                className="w-full pl-10 mt-1 px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                value={formState.location}
                onChange={(e) => setFormState({ ...formState, location: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 py-3 bg-green-500 text-black font-semibold rounded-md flex items-center justify-center gap-2 hover:bg-green-400 transition">
            {!isPending ? (
              <>
                <GlobeIcon className='size-5' />
                Completing Onboarding
              </>
            ) : (
              <>
                <LoaderIcon className='animate-spin size-5 ' />
                Onboarding...
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default OnboardingPage