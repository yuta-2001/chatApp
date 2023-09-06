"use client";
import { useEffect, useState } from 'react';
import axios from '../../../libs/axios'
import { handleErrorResponse } from '../../../utils/handle-error-response'
import { useToastUpdate } from '../../../contexts/ToastProvider'

export default function FriendPage() {
  const [users, setUsers] = useState([]);
  const setToast = useToastUpdate();

  useEffect(() => {
    axios.get('/api/friends').then((res) => {
      setUsers(res.data.data);
    }).catch((err) => {
      handleErrorResponse(err.response, setToast);
    })
  }, []);

  return (
    <div className="p-4">
      <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700">
        {
          users.map((user) => {
            return (
              <li className="p-3 sm:pb-4" key={user.id}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                      <img className="w-10 h-10 rounded-full" src={user.icon} alt="Neil image" />
                  </div>
                  <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {user.email}
                      </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <button onClick={(event) => {}} className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      show detail
                    </button>
                  </div>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}