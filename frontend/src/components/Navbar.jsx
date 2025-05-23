import { Link, useLocation } from "react-router"
import useAuthUser from "../hooks/useAuthUser"
import { BellIcon, LogOutIcon, ShipWheelIcon, UserIcon, MenuIcon } from "lucide-react"
import ThemeSelector from "./ThemeSelector"
import useLogout from "../hooks/useLogout"
import { useState } from "react"

const Navbar = ({ onSidebarToggle }) => {
  const { authUser } = useAuthUser()
  const location = useLocation()
  const isChatPage = location.pathname.startsWith('/chat')
  const { logoutMutation } = useLogout()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleLogoutClick = () => setShowLogoutConfirm(true)
  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(false)
    logoutMutation()
  }
  const handleLogoutCancel = () => setShowLogoutConfirm(false)

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center w-full">
          <button className="lg:hidden btn btn-ghost btn-circle mr-2" onClick={onSidebarToggle}>
            <MenuIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
          <div className={`flex ${isChatPage ? 'lg:flex' : 'lg:hidden'}`}>
            <Link to={'/'} className="flex items-center gap-2.5">
              <ShipWheelIcon className="size-6 lg:size-9 text-primary" />
              <span className="text-2xl lg:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                LangMeet
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 ml-auto">
            <Link to={'/notifications'} className="hidden lg:inline-flex btn btn-ghost btn-circle">
              <BellIcon className="h-6 w-6 text-base-content opacity-70" />
            </Link>
            <div className="hidden lg:flex items-center gap-1">
              <ThemeSelector />
              <div className="avatar">
                <Link to="/profile">
                  <div className="size-8 rounded-full cursor-pointer border-2 border-primary">
                    <img src={authUser?.profilePic || '/vite.svg'} alt="Profile" onError={e => { e.target.onerror = null; e.target.src = '/vite.svg'; }} />
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex lg:hidden items-center gap-2">
             
              <ThemeSelector />
              <Link to="/profile">
                <div className="avatar w-8 h-8 rounded-full cursor-pointer border-2 border-primary">
                  <img src={authUser?.profilePic || '/vite.svg'} alt="Profile" onError={e => { e.target.onerror = null; e.target.src = '/vite.svg'; }} />
                </div>
              </Link>
              <button className="btn btn-ghost btn-circle" onClick={handleLogoutClick}>
                <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </div>
            <button className="hidden lg:inline-flex btn btn-ghost btn-circle" onClick={handleLogoutClick}>
              <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
            </button>
          </div>
        </div>
      </div>
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-base-100 p-6 rounded-xl shadow-xl w-80 max-w-full flex flex-col items-center">
            <div className="mb-4 text-lg font-semibold">Are you sure you want to logout?</div>
            <div className="flex gap-4 mt-2">
              <button className="btn btn-error" onClick={handleLogoutConfirm}>Logout</button>
              <button className="btn btn-ghost" onClick={handleLogoutCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
