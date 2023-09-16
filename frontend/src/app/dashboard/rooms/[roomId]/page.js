"use client";
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from '../../../../libs/axios'
import { useUser } from '../../../../contexts/UserProvider'
import { useToastUpdate } from '../../../../contexts/ToastProvider';
import { handleErrorResponse } from '../../../../utils/handle-error-response'

export default function RoomDetailPage({ params }) {

  const [otherUser, setOtherUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const user = useUser();
  const setToast = useToastUpdate();

  useEffect(() => {
    axios.get(`/api/rooms/${params.roomId}`).then((res) => {
      setMessages(res.data.messages);
      setOtherUser(res.data.other_user);
    }).catch((err) => {
      handleErrorResponse(err.response);
    })
  }, []);

  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER
    });

    const channel = pusher.subscribe(`chat-${params.roomId}`);
    channel.bind('message', function(data) {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

      // クリーンアップ関数
    return () => {
      channel.unbind('message');
      pusher.unsubscribe(`chat-${params.roomId}`);
    };
  }, [params.roomId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    axios.post('/api/chats', {
      'room_id': params.roomId,
      'content': message
    }).then((res) => {
      setMessage('');
    }).catch((err) => {
      handleErrorResponse(err, setToast);
    })
  }

  console.log(messages);

  return (
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              <img src={otherUser.icon} alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full" />
            </div>
            <div className="flex flex-col leading-tight">
                <div className="text-2xl mt-1 flex items-center">
                  <span className="text-gray-700 mr-3">{otherUser.name}</span>
                </div>
            </div>
          </div>
      </div>
      <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {
          messages.map((message) => {
            return (
              message.user_id == otherUser.id ? (
                <div className="chat-message" key={message.id}>
                  <div className="flex items-end">
                      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                            {message.content}
                          </span>
                        </div>
                      </div>
                      <img src={otherUser.icon} alt="My profile" className="w-10 h-10 rounded-full order-1" />
                  </div>
                </div>
              ) : (
                <div className="chat-message" key={message.id}>
                  <div className="flex items-end justify-end">
                      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                        <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                            {message.content}
                          </span>
                        </div>
                      </div>
                      <img src={user.icon} alt="My profile" className="w-10 h-10 rounded-full order-2" />
                  </div>
                </div>
              )
            )
          })
        }
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <form onSubmit={handleSendMessage}>
            <div className="relative flex">
              <input type="text" onChange={(e) => setMessage(e.target.value)} placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-6 bg-gray-200 rounded-md py-3" value={message} />
              <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                <button className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                  <span className="font-bold">Send</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}