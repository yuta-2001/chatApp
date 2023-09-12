"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from '../../../libs/axios'
import { handleErrorResponse } from '../../../utils/handle-error-response'

export default function RoomIndexPage({ children }) {
  const [rooms, setrooms] = useState([]);

  useEffect(() => {
    axios.get('/api/rooms').then((res) => {
      setrooms(res.data.data);
      console.log(res.data.data);
    }).catch((err) => {
      handleErrorResponse(err.response);
    })
  }, [])

  return (
    <div className="flex h-screen">
      <ul className="w-1/3 border-r-2 h-full overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {
          rooms.length === 0 && (
            <li className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      No room found
                    </p>
                </div>
              </div>
            </li>
          )
        }
        {
          rooms.map((room) => {
            return (
              <li className="py-3 sm:py-4 border-b-2 px-4" key={room.id}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                      <img className="w-10 h-10 rounded-full" src={room.other_user.icon} alt="Neil image" />
                  </div>
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {room.other_user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {room.other_user.email}
                      </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <Link
                      href={`/dashboard/rooms/${room.id}`}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      visit talk room
                    </Link>
                  </div>
                </div>
              </li>
            )
          })
        }
      </ul>
      {children}
    </div>
  )
}
