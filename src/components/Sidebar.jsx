import React from 'react';
import { LayoutDashboard, FileText, PieChart, Briefcase } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const navItems = [
        { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
        { label: 'Applications', icon: <Briefcase size={20} />, path: '/applications' },
        { label: 'Analytics', icon: <PieChart size={20} />, path: '/analytics' },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-slate-100 min-h-screen flex flex-col fixed left-0 top-0">
            <div className="p-6 border-b border-slate-700">
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <FileText className="text-blue-400" />
                    <span>InternTracker</span>
                </h1>
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
                    © 2026 InternTracker MVP
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
