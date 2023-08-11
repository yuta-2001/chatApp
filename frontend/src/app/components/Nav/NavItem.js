'use client'
import Link from 'next/link'

export default function NavItem({ href, icon: Icon, label, isButton, onClick }) {
  return (
    isButton ? (
      <li>
        <button type="button" onClick={onClick} className="flex text-left w-full h-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <Icon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          <span className="flex-1 ml-3 whitespace-nowrap">{label}</span>
        </button>
      </li>
    ) : (
      <li>
        <Link href={href} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <Icon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          <span className="flex-1 ml-3 whitespace-nowrap">{label}</span>
        </Link>
      </li>
    )
  )
}