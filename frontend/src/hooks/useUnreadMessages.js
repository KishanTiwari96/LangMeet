// Returns a map of friendId to unread count for the current user
import { useQuery } from '@tanstack/react-query'
import { StreamChat } from 'stream-chat'
import useAuthUser from '../hooks/useAuthUser'

export function useUnreadMessages() {
  const { authUser } = useAuthUser()
  const { data: unreadMap, isLoading } = useQuery({
    queryKey: ['unreadCounts', authUser?._id],
    queryFn: async () => {
      if (!authUser) return {}
      const apiKey = import.meta.env.VITE_STREAM_API_KEY
      const token = localStorage.getItem('stream_token')
      if (!apiKey || !token) return {}
      
      const client = new StreamChat(apiKey)
      await client.connectUser({ id: authUser._id }, token)
      const channels = await client.queryChannels(
        {
          type: 'messaging',
          members: { $in: [authUser._id] }
        },
        { last_message_at: -1 },
        { watch: false, state: true }
      )
      const map = {}
      channels.forEach(ch => {
        const otherId = Object.keys(ch.state.members).find(uid => uid !== authUser._id)
        if (otherId) {
          map[otherId] = ch.countUnread()
        }
      })
      await client.disconnectUser()
      return map
    },
    enabled: !!authUser
  })
  return { unreadMap: unreadMap || {}, isLoading }
}
