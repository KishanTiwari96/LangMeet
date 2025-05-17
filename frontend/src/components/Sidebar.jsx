import { Link, useLocation } from "react-router"
import useAuthUser from "../hooks/useAuthUser"
import { BellIcon, HomeIcon, ShipWheelIcon, UserIcon, XIcon } from "lucide-react"

const Sidebar = ({ isOpen, onClose }) => {
  const { authUser } = useAuthUser()
  const location = useLocation()
  const currentPath = location.pathname
  return (
    <>
      {/* Overlay for mobile */}
      <div className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity lg:hidden ${isOpen ? '' : 'hidden'}`} onClick={onClose}></div>
      <aside className={`fixed z-50 top-0 left-0 h-full w-64 bg-base-200 border-r border-base-300 flex flex-col transition-transform duration-200 lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isOpen ? '' : 'lg:flex hidden'}`}>
        {/* Close button for mobile */}
        <button className="lg:hidden p-4 self-end" onClick={onClose}>
          <XIcon className="h-6 w-6 text-base-content opacity-70" />
        </button>
        <div className="p-5 border-b border-base-300">
          <Link to={'/'} className="flex items-center gap-2.5">
            <ShipWheelIcon className='size-9 text-primary' />
            <span className="text-3xl font-bold fonnt-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">LangMeet</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link to={'/'} className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/' ? "btn-active" : ""}`}>
            <HomeIcon className="size-5 text-base-content opacity-70" />
            <span>Home</span>
          </Link>
          
          <Link to={'/friends'} className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/friends' ? "btn-active" : ""}`}>
            <UserIcon className="size-5 text-base-content opacity-70" />
            <span>Friends</span>
          </Link>
          
          <Link to={'/notifications'} className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === '/notifications' ? "btn-active" : ""}`}>
            <BellIcon className="size-5 text-base-content opacity-70" />
            <span>Notifications</span>
          </Link>
        </nav> 

        <div className="p-4 border-t border-base-300 mt-auto">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={authUser?.profilePic || '/vite.svg'} alt="Profile" onError={e => { e.target.onerror = null; e.target.src = '/vite.svg'; }} />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{authUser?.fullName}</p>
              <p className="text-xs text-success flex items-center gap-1">
                <span className="size-2 rounded-full bg-success inline-block" />
                Online
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
