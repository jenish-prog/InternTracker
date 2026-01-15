import React, { useState } from 'react';
import { LayoutDashboard, FileText, PieChart, Briefcase, X, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
        { label: 'Applications', icon: <Briefcase size={20} />, path: '/applications' },
        { label: 'Analytics', icon: <PieChart size={20} />, path: '/analytics' },
    ];

    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-slate-900 text-slate-100 h-screen flex-col fixed left-0 top-0 z-50">
                <div className="p-6 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain" />
                        <span className="font-bold text-2xl tracking-tight leading-none">InternTracker</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`
                            }
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-700">
                    <div className="text-xs text-slate-500 text-center">
                        Guest Mode • V 1.0
                    </div>
                </div>
            </aside>

            {/* Mobile Top Bar */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center px-4">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain" />
                    <span className="font-bold text-2xl tracking-tight text-slate-900 leading-none">InternTracker</span>
                </div>
            </div>

            {/* Mobile Bottom Navigation (WhatsApp Style) */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 pb-safe">
                <div className="flex justify-around items-center h-16">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive
                                    ? 'text-green-600'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`
                            }
                        >
                            <div className="relative">
                                {item.icon}
                                {/* Notification badge example - can be made dynamic later */}
                                {/* <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span> */}
                            </div>
                            <span className="text-[12px] font-medium">{item.label}</span>

                            {/* Active Indicator Line (Optional, strictly WhatsApp doesn't have this, but adds nice touch) */}
                            {/* <div className={`h-0.5 w-12 rounded-full absolute top-0 ${isActive ? 'bg-green-600' : 'bg-transparent'}`} /> */}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
