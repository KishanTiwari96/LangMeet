import { useState } from 'react'
import { ShipWheelIcon } from 'lucide-react'
import { Link } from 'react-router'
import useSignUp from '../hooks/useSignUp'

const SignUp = () => {
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: ''
  })

  const { signupMutation, isPending, error } = useSignUp()

  const handleSignup = async (e) => {
    e.preventDefault()
    signupMutation(signupData)
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-2 p-8">
        {/* Left Side - Form */}
        <div className="bg-zinc-900 p-8 rounded-xl shadow-md">
          <div className='flex items-center gap-2'>
            <ShipWheelIcon className='text-green-500 w-10 h-10 '/>
            <h1 className="text-3xl font-bold text-green-500 mb-2 font-mono mt-2">LangMeet</h1>
          </div>

          {error && (
            <div className='alert alert-error mb-4'>
             <span>{error?.response?.data?.message || error?.message || "Signup failed"}</span>
            </div>
          )}

          <p className="text-xl text-zinc-400 mb-6">
            <span className=' font-bold'>Create an Account</span><br />
            <span className="text-xs">Join LangConnect and start your language learning journey</span>
          </p>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                value={signupData.fullName}
                onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="hello@example.com"
                className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required
              />
              <p className="text-xs text-zinc-400 mt-1">Password must be at least 6 characters long</p>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox accent-green-500" required/>
              <label className="text-sm text-zinc-400">
                I agree to the <span className="text-green-500">terms of service</span> and <span className="text-green-500">privacy policy</span>
              </label>
            </div>

            <button className="w-full py-2 bg-green-500 text-black rounded-md font-semibold hover:bg-green-400 transition">
              { isPending ? (
                <>
                  <span className='loading loading-spinner loading-xs mr-2'></span>
                  Loading...
                </>
                
              ) : "Create Account"}
            </button>
          </form>

          <p className="text-sm text-zinc-400 mt-6 text-center">
            Already have an account? <Link to='/login' className="text-green-500 cursor-pointer">Sign in</Link >
          </p>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center bg-green-900 rounded-xl p-8">
          <div className="relative">
            <img
              src="i.png"
              alt="Video Call"
              className="w-80 rounded-lg shadow-xl"
            />
          </div>
          <h2 className="text-white text-xl font-semibold mt-6 text-center">
            Connect with language partners worldwide
          </h2>
          <p className="text-zinc-200 text-center mt-2 text-sm">
            Practice conversations, make friends, and improve your language skills together
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
