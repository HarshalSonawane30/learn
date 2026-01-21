import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Send, Smile, Paperclip, Image as ImageIcon, File, Download, X, ArrowLeft, Phone, Video, Info, Search, MoreVertical } from 'lucide-react';
import Navbar from '../components/common/Navbar';

const Chat = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [callType, setCallType] = useState(''); // 'voice' or 'video'
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '✨', '💯', '👏', '🙏', '🤔', '😍', '🎯', '💪', '🚀', '📚', '✅', '⭐'];

  useEffect(() => {
    fetchConversations();
    const userId = searchParams.get('user');
    if (userId) {
      openChatWithUser(userId);
    }
  }, [searchParams]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = () => {
    // TODO: Replace with actual API call
    const mockConversations = [
      {
        id: 1,
        user: {
          name: 'Sarah Johnson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
          online: true
        },
        lastMessage: 'Thanks for the session!',
        timestamp: '2m ago',
        unread: 2
      },
      {
        id: 2,
        user: {
          name: 'Michael Chen',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
          online: false
        },
        lastMessage: 'When can we schedule the next class?',
        timestamp: '1h ago',
        unread: 0
      },
      {
        id: 3,
        user: {
          name: 'Emily Rodriguez',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
          online: true
        },
        lastMessage: 'Great! See you then',
        timestamp: '3h ago',
        unread: 0
      }
    ];
    setConversations(mockConversations);
  };

  const openChatWithUser = (userId) => {
    // TODO: Replace with actual API call
    const conversation = conversations.find(c => c.id === parseInt(userId)) || conversations[0];
    
    // Guard against undefined conversation
    if (!conversation || !conversation.id) {
      console.warn('No conversation found for user:', userId);
      return;
    }
    
    setActiveChat(conversation);
    
    const mockMessages = [
      {
        id: 1,
        senderId: conversation.id,
        text: 'Hi! I saw your profile and I\'m interested in learning React',
        timestamp: '10:30 AM',
        isSent: false
      },
      {
        id: 2,
        senderId: 'me',
        text: 'Hello! That\'s great! I\'d be happy to help you learn React 😊',
        timestamp: '10:32 AM',
        isSent: true
      },
      {
        id: 3,
        senderId: conversation.id,
        text: 'Can we schedule a session this week?',
        timestamp: '10:33 AM',
        isSent: false
      },
      {
        id: 4,
        senderId: 'me',
        text: 'Sure! I\'m available on Wednesday and Friday',
        timestamp: '10:35 AM',
        isSent: true
      },
      {
        id: 5,
        senderId: 'me',
        type: 'file',
        fileName: 'React_Course_Outline.pdf',
        fileSize: '2.5 MB',
        timestamp: '10:36 AM',
        isSent: true
      }
    ];
    setMessages(mockMessages);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      senderId: 'me',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSent: true
    };

    setMessages([...messages, message]);
    setNewMessage('');
    setShowEmojiPicker(false);
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage(newMessage + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const message = {
        id: messages.length + 1,
        senderId: 'me',
        type: 'file',
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSent: true
      };
      setMessages([...messages, message]);
      setShowFileMenu(false);
    }
  };

  const handleStartCall = (type) => {
    setCallType(type);
    setShowCallModal(true);
  };

  const handleEndCall = () => {
    setShowCallModal(false);
    setCallType('');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pb-4 sm:pb-20 pt-16">
        {/* Chat List View (Mobile) */}
        {!activeChat && (
          <div>
            {/* Enhanced Header */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-6 mb-2">
              <div className="max-w-2xl mx-auto">
                <h1 className="text-xl sm:text-2xl font-bold mb-2">Messages</h1>
                <p className="text-blue-100 text-sm">{conversations.length} conversations</p>
              </div>
            </div>

            <div className="max-w-2xl mx-auto px-2 sm:px-4">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => openChatWithUser(conversation.id)}
                className="flex items-center gap-4 p-4 mx-2 my-2 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-blue-300 cursor-pointer transition-all"
              >
                <div className="relative">
                  <img
                    src={conversation.user.avatar}
                    alt={conversation.user.name}
                    className="w-14 h-14 rounded-full"
                  />
                  {conversation.user.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{conversation.user.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="notification-badge">
                    {conversation.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat View */}
      {activeChat && (
        <div className="flex flex-col h-screen">
          {/* Chat Header */}
          <header className="bg-gradient-to-r from-blue-600 to-teal-600 fixed top-16 left-0 right-0 z-40 shadow-lg">
            <div className="max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setActiveChat(null)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <img
                src={activeChat.user.avatar}
                alt={activeChat.user.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer border-2 sm:border-3 border-white hover:scale-105 transition-transform shadow-lg"
                onClick={() => navigate(`/profile/${activeChat.id}`)}
              />
              <div className="flex-1 min-w-0">
                <h3
                  className="font-bold text-white cursor-pointer hover:text-blue-100 transition-colors text-base sm:text-lg truncate"
                  onClick={() => navigate(`/profile/${activeChat.id}`)}
                >
                  {activeChat.user.name}
                </h3>
                <p className="text-xs font-medium flex items-center gap-1">
                  {activeChat.user.online ? (
                    <>
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm"></span>
                      <span className="text-green-100">Online</span>
                    </>
                  ) : (
                    <span className="text-blue-100">Offline</span>
                  )}
                </p>
              </div>
              {/* Call Buttons */}
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => handleStartCall('voice')}
                  className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all hover:scale-110 shadow-lg"
                  title="Voice Call (Requires Internet)"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => handleStartCall('video')}
                  className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all hover:scale-110 shadow-lg"
                  title="Video Call (Requires Internet)"
                >
                  <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  className="hidden sm:flex p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all hover:scale-110 items-center justify-center"
                  title="More Options"
                >
                  <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Messages Area */}
          <div className="fixed top-[136px] sm:top-[144px] bottom-[88px] sm:bottom-[96px] left-0 right-0 overflow-y-auto bg-gradient-to-b from-blue-50 to-gray-50">
            <div className="max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'file' ? (
                    <div className={`max-w-xs p-4 rounded-2xl shadow-md ${
                      message.isSent ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white' : 'bg-white border border-gray-200'
                    }`}>
                      <div className="flex items-center gap-3">
                        <File className="w-10 h-10" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{message.fileName}</p>
                          <p className="text-xs opacity-80">{message.fileSize}</p>
                        </div>
                        <button className="hover:opacity-80">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-xs opacity-80 mt-2">{message.timestamp}</p>
                    </div>
                  ) : (
                    <div className="max-w-[85%] sm:max-w-xs">
                      <div className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl shadow-sm ${
                        message.isSent 
                          ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-br-md' 
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                      }`}>
                        <p className="text-sm leading-relaxed break-words">{message.text}</p>
                      </div>
                      <p className={`text-xs text-gray-500 mt-1.5 px-1 ${
                        message.isSent ? 'text-right' : 'text-left'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="fixed bottom-28 sm:bottom-32 right-2 sm:right-4 left-2 sm:left-auto z-50 bg-white rounded-xl shadow-2xl p-3 sm:p-4 max-w-xs animate-slideUp">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Select Emoji</h3>
                <button
                  onClick={() => setShowEmojiPicker(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleEmojiSelect(emoji)}
                    className="text-2xl hover:bg-gray-100 rounded-lg p-2 transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* File Menu */}
          {showFileMenu && (
            <div className="fixed bottom-28 sm:bottom-32 left-2 sm:left-4 bg-white rounded-xl shadow-lg p-2 z-50">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg w-full text-left"
              >
                <ImageIcon className="w-5 h-5 text-primary" />
                <span className="font-medium">Image</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg w-full text-left"
              >
                <File className="w-5 h-5 text-secondary" />
                <span className="font-medium">Document</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
          )}

          {/* Message Input */}
          <div className="fixed bottom-16 sm:bottom-16 left-0 right-0 bg-white border-t-2 border-blue-100 shadow-lg">
            <div className="max-w-2xl mx-auto p-3 sm:p-4 pb-4 sm:pb-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    setShowFileMenu(!showFileMenu);
                    setShowEmojiPicker(false);
                  }}
                  className="p-2 sm:p-2.5 rounded-full bg-gray-100 text-blue-600 hover:bg-blue-50 transition-colors flex-shrink-0"
                  title="Attach file"
                >
                  <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <div className="flex-1 relative min-w-0">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="w-full px-4 sm:px-5 py-2.5 sm:py-3.5 pr-12 sm:pr-14 bg-gray-100 border-2 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-200 transition-all text-sm"
                  />
                  <button
                    onClick={() => {
                      setShowEmojiPicker(!showEmojiPicker);
                      setShowFileMenu(false);
                    }}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-blue-600 transition-colors"
                    title="Add emoji"
                  >
                    <Smile className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-2.5 sm:p-3.5 rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 flex-shrink-0"
                  title="Send message"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-teal-600 z-50 flex flex-col items-center justify-center p-4">
          {/* Call Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <img
                src={activeChat?.user.avatar}
                alt={activeChat?.user.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-2xl"
              />
              {callType === 'video' && (
                <div className="absolute inset-0 rounded-full bg-black/20 flex items-center justify-center">
                  <Video className="w-12 h-12 text-white" />
                </div>
              )}
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{activeChat?.user.name}</h2>
            <p className="text-blue-100 text-lg font-medium">
              {callType === 'video' ? '📹 Video Call' : '📞 Voice Call'}
            </p>
            <p className="text-blue-200 text-sm mt-2">⚠️ Requires Internet Connection</p>
          </div>

          {/* Call Animation */}
          <div className="mb-12">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
              <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>

          {/* Call Info */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
            <div className="text-center space-y-3">
              <p className="text-white font-semibold text-lg">Connecting...</p>
              <div className="flex items-center justify-center gap-2 text-blue-100 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Secure Connection</span>
              </div>
              <p className="text-blue-200 text-xs">
                Make sure you have a stable internet connection for the best experience
              </p>
            </div>
          </div>

          {/* Call Controls */}
          <div className="flex items-center gap-6">
            <button
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all backdrop-blur-lg"
              title="Mute"
            >
              <Phone className="w-6 h-6" />
            </button>
            {callType === 'video' && (
              <button
                className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all backdrop-blur-lg"
                title="Toggle Camera"
              >
                <Video className="w-6 h-6" />
              </button>
            )}
            <button
              onClick={handleEndCall}
              className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all shadow-2xl hover:scale-110"
              title="End Call"
            >
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Call Tips */}
          <div className="mt-8 text-center">
            <p className="text-blue-100 text-sm">
              💡 Tip: Use headphones for better audio quality
            </p>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Chat;
