'use client'
import { useEffect, useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { BsFillChatDotsFill } from 'react-icons/bs'
import { RxDashboard } from 'react-icons/rx'
import { FaUserFriends } from 'react-icons/fa'
import { AiFillSetting } from 'react-icons/ai'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import axios from '../../libs/axios'
import { removeTokenFromLocalStorage } from '../../utils/handle-authorization-header'

export default function NavBar() {
  const [user, setUser] = useState({})

  async function getUserData () {
    await axios.get('/api/users/me')
    .then(res => {
      setUser(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getUserData()
  }, [])

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

  return(
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
                <span href="#" className="flex items-center p-2 text-gray-900 rounded-lg">
                  <img src={user.icon} width={30} height={30} className="w-12 h-12 rounded-full" />
                  <span className="ml-3">{user.name}</span>
                </span>
            </li>
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <RxDashboard className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ml-3">Dashboard</span>
                </a>
            </li>
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <FaUserFriends className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ml-3 whitespace-nowrap">Friends</span>
                </a>
            </li>
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <BsFillChatDotsFill className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ml-3 whitespace-nowrap">Messages</span>
                </a>
            </li>
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <AiFillSetting className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ml-3 whitespace-nowrap">Setting</span>
                </a>
            </li>
            <li>
                <button type="button" onClick={handleLogOut} className="flex text-left w-full h-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <FiLogOut className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
                </button>
            </li>
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <BsFillTrash3Fill className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ml-3 whitespace-nowrap">Delete Account</span>
                </a>
            </li>
          </ul>
      </div>
    </aside>
  )
}