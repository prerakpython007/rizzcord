import React, { useEffect, useState } from 'react'
import { useThemeStore } from '../store/useThemeStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { Users, Menu, X } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { getUsers, selectedUser, users, setSelectedUser, isUsersLoading } = useChatStore()
    const onlineUsers = [];

    useEffect(() => {
        getUsers()
    }, [getUsers]);

    if(isUsersLoading) return <SidebarSkeleton />
    
    return (
        <>
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-base-200 rounded-full"
            >
                {isExpanded ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <aside className={`fixed lg:relative h-full 
                ${isExpanded ? 'w-72' : 'w-0 lg:w-72'} 
                border-r border-base-300 flex flex-col 
                transition-all duration-300 bg-base-100 
                overflow-hidden z-40`}>
                
                <div className="border-b border-base-300 w-full p-5">
                    <div className="flex items-center gap-2 mt-8 lg:mt-0">
                        <Users className="size-6" />
                        <span className="font-medium">Contacts</span>
                    </div>
                </div>

                <div className="overflow-y-auto w-full py-3">
                    {users.map((user) => (
                        <button
                            key={user._id}
                            onClick={() => {
                                setSelectedUser(user);
                                setIsExpanded(false); // Close sidebar on mobile after selection
                            }}
                            className={`
                                w-full p-3 flex items-center gap-3
                                hover:bg-base-300 transition-colors
                                ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                            `}
                        >
                            <div className="relative">
                                <img
                                    src={user.profilePic || "/avatar.png"}
                                    alt={user.name}
                                    className="size-12 object-cover rounded-full"
                                />
                                {onlineUsers.includes(user._id) && (
                                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 
                                        rounded-full ring-2 ring-zinc-900"
                                    />
                                )}
                            </div>

                            <div className="text-left min-w-0">
                                <div className="font-medium truncate">{user.fullName}</div>
                                <div className="text-sm text-base-content">
                                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </aside>
            
            {isExpanded && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsExpanded(false)}
                />
            )}
        </>
    )
}

export default Sidebar
