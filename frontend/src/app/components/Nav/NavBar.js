'use client'
import { FiLogOut } from 'react-icons/fi'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { RxDashboard } from 'react-icons/rx'
import { FaUserFriends } from 'react-icons/fa'
import { AiFillSetting } from 'react-icons/ai'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import NavItem from './NavItem'
import { useUser } from '../../../contexts/UserProvider'
import { removeTokenFromLocalStorage } from '../../../utils/handle-authorization-header'

export default function NavBar() {
  const user = useUser()

  const router = useRouter()
  const handleLogOut = async (e) => {
    e.preventDefault()
    const res = await axios.post('/api/logout')
    if (res.status === 200) {
      removeTokenFromLocalStorage()
      router.push('/login')
    } else {
      console.log(res)
      alert('Logout failed')
    }
  }

  const handleDeleteAccount = async (e) => {
    e.preventDefault()
    const res = await axios.delete('/api/logout')
    if (res.status === 200) {
      removeTokenFromLocalStorage()
      router.push('/login')
    } else {
      console.log(res)
      alert('Delete account failed')
    }
  }

  const links = [
    {
      href: '/dashboard',
      icon: RxDashboard,
      label: 'Dashboard',
      isButton: false,
      onClick: null
    },
    {
      href: '/dashboard/friends',
      icon: FaUserFriends,
      label: 'Friends',
      inButton: false,
      onClick: null
    },
    {
      href: '/dashboard/rooms',
      icon: BsFillChatDotsFill,
      label: 'Messages',
      isButton: false,
      onClick: null
    },
    {
      href: '/dashboard/setting',
      icon: AiFillSetting,
      label: 'Setting',
      isButton: false,
      onClick: null
    },
    {
      href: false,
      icon: FiLogOut,
      label: 'Logout',
      isButton: true,
      onClick: handleLogOut
    },
    {
      href: false,
      icon: BsFillTrash3Fill,
      label: 'Delete Account',
      isButton: true,
      onClick: handleDeleteAccount
    }
  ]

  return(
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li className="mb-4" key='1'>
                <span href="#" className="flex items-center p-2 text-gray-900 rounded-lg">
                  <img src={user.icon} width={30} height={30} className="w-12 h-12 rounded-full" />
                  <span className="ml-3">{user.name}</span>
                </span>
            </li>
            {links.map((link, index) => {
              return (
                <NavItem
                  key={index}
                  href={link.href}
                  icon={link.icon} 
                  label={link.label} 
                  isButton={link.isButton} 
                  onClick={link.onClick} 
                />
              )
            })}
          </ul>
      </div>
    </aside>
  )
}