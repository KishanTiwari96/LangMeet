import { useState } from 'react'
import { ShipWheelIcon } from 'lucide-react'
import { Link } from 'react-router'
import useLogin from '../hooks/useLogin';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const { isPending, error, loginMutation } = useLogin()

  const handleLogin = async (e) => {
    e.preventDefault(),
      loginMutation(loginData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-2 p-8">
        {/* Left Side - Form */}
        <div className="bg-zinc-900 p-8 rounded-xl shadow-md">
          <div className='flex items-center gap-2'>
            <ShipWheelIcon className='text-green-500 w-10 h-10' />
            <h1 className="text-3xl font-bold text-green-500 mb-2 font-mono mt-2">LangMeet</h1>
          </div>
          <p className="text-xl text-zinc-400 mb-6">
            <span className='font-bold'>Welcome Back</span><br />
            <span className="text-xs">Login to continue your language learning journey</span>
          </p>

          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error?.response?.data?.message || error?.message || "Login failed"}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="hello@example.com"
                className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>

            <button className="w-full py-2 bg-green-500 text-black rounded-md font-semibold hover:bg-green-400 transition">
              {isPending ? (
                <>
                  <span className='loading loading-spinner loading-xs mr-2'></span>
                  Signing in...
                </>
              ) : 'Login'}
            </button>
          </form>

          <p className="text-sm text-zinc-400 mt-6 text-center">
            Don't have an account? <Link to='/signup' className="text-green-500 cursor-pointer">Sign up</Link>
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
            Reconnect with your learning community
          </h2>
          <p className="text-zinc-200 text-center mt-2 text-sm">
            Dive back into language practice with your global partners
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
