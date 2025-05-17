import { Link } from "react-router"
import { LANGUAGE_TO_FLAG } from "../constants"
import { useUnreadMessages } from '../hooks/useUnreadMessages'

const FriendCard = ({friend}) => {
  const { unreadMap } = useUnreadMessages()
  const unread = unreadMap[friend._id] || 0
  return (
    <div className="card bg-base-200 border border-base-content/30 hover:shadow-md transition-shadow">
        <div className="card-body p-4 ">

            <div className="flex items-center gap-3 mb-3 relative">
                <div className="avatar size-12 cursor-pointer relative">
                    <Link to={`/user/${friend._id}`}>
                      <img src={friend.profilePic || '/vite.svg'} alt={friend.fullName} onError={e => { e.target.onerror = null; e.target.src = '/vite.svg'; }} />
                    </Link>
                    {unread > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 border border-white shadow">{unread}</span>
                    )}
                </div>
                <h3 className="font-semibold truncate">{friend.fullName}</h3>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3 ">
                <span className="badge badge-secondary text-xs">
                    {getLanguageFlag(friend.nativeLanguage)}
                    Native: {friend.nativeLanguage}
                </span>
                <span className="badge badge-outline text-xs">
                    {getLanguageFlag(friend.learningLanguage)}
                    Learning: {friend.learningLanguage}
                </span>
            </div>

            <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">Message</Link>
        </div>
      
    </div>
  )
}

export default FriendCard

export function getLanguageFlag(language){
    if(!language){
        return null
    }

    const langLower = language.toLowerCase()
    const countryCode = LANGUAGE_TO_FLAG[langLower]

    if(countryCode){
        return (
            <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt={`${langLower} flag`}
            className="h-3 mr-1 inline-block" />
        )
    }
    return null
}