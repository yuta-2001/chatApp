"use client";
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from '../../../libs/axios'
import { handleErrorResponse } from '../../../utils/handle-error-response'
import { useToastUpdate } from '../../../contexts/ToastProvider'

Modal.setAppElement("body");

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    zIndex: 300
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "40%",
    maxWidth: "20rem",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    borderRadius: "1rem",
    padding: "1.5rem"
  }
};

export default function FriendPage() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({}); 
  const [modalIsOpen, setIsOpen] = useState(false);
  const setToast = useToastUpdate();

  useEffect(() => {
    axios.get('/api/friends').then((res) => {
      setUsers(res.data.data);
    }).catch((err) => {
      handleErrorResponse(err.response, setToast);
    })
  }, []);

  const getUserData = (userId) => {
    axios.get(`/api/friends/${userId}`).then((res) => {
      setUserData(res.data);
    }).catch((err) => {
      handleErrorResponse(err.response, setToast);
    });
  };

  const modalOpen = (userId) => {
    getUserData(userId);
    setIsOpen(true);
  }

  const modalClose = () => {
    setUserData({});
    setIsOpen(false);
  }

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
                    <button onClick={() => modalOpen(user.id)} className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      show detail
                    </button>
                  </div>
                </div>
              </li>
            )
          })
        }
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={modalClose}
        style={modalStyle}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="mb-6">
            <img className="w-28 h-28 mb-2 rounded-full" src={userData.icon} alt="Neil image" />
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white text-center">
              {userData.name}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-sm mb-2 text-gray-500 truncate dark:text-gray-400">
              email: {userData.email || 'not registered'}
            </p>
            <p className="text-sm mb-2 text-gray-500 truncate dark:text-gray-400">
              tel: {userData.tel || 'not registered'}
            </p>
            <p className="text-sm mb-2 text-gray-500 truncate dark:text-gray-400">
              company: {userData.company || 'not registered'}
            </p>
          </div>
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            visit talk room
          </button>
        </div>
      </Modal>
    </div>
  )
}