import React from 'react';
import { useApplications } from '../context/ApplicationContext';
import { Briefcase, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-slate-500 text-xs sm:text-sm font-medium">{title}</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 sm:mt-2">{value}</h3>
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon size={24} />
            </div>
        </div>
        {trend && (
            <div className="mt-4 flex items-center text-sm text-green-600 gap-1">
                <TrendingUp size={16} />
                <span>{trend}</span>
            </div>
        )}
    </div>
);

const Dashboard = () => {
    const { stats, applications } = useApplications();
    const recentApps = applications.slice(0, 5);

    return (
        <div className="space-y-6 sm:space-y-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Dashboard</h1>
                <p className="text-slate-500 mt-1 text-sm sm:text-base">Welcome back, keep applying!</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                <StatCard
                    title="Total Applications"
                    value={stats.total}
                    icon={Briefcase}
                    color="bg-blue-50 text-blue-600"
                    trend="Keep going!"
                />
                <StatCard
                    title="Interviewing"
                    value={stats.interviewing}
                    icon={Clock}
                    color="bg-yellow-50 text-yellow-600"
                />
                <StatCard
                    title="Accepted"
                    value={stats.accepted}
                    icon={CheckCircle}
                    color="bg-green-50 text-green-600"
                />
                <StatCard
                    title="Rejected"
                    value={stats.rejected}
                    icon={XCircle}
                    color="bg-red-50 text-red-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-800">Recent Applications</h2>
                        <Link to="/applications" className="text-blue-600 text-sm font-medium hover:underline">
                            View All
                        </Link>
                    </div>

                    {recentApps.length > 0 ? (
                        <div className="space-y-4">
                            {recentApps.map(app => (
                                <div key={app.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                                    <div>
                                        <h4 className="font-semibold text-slate-900">{app.company}</h4>
                                        <p className="text-slate-500 text-sm">{app.role}</p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${app.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                                            app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                app.status === 'Interviewing' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-yellow-100 text-yellow-700'}`}>
                                        {app.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 text-slate-400">
                            No recent activity.
                        </div>
                    )}
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white text-center flex flex-col items-center justify-center">
                    <h2 className="text-xl font-bold mb-2">Goal: 100 Applications</h2>

                    <div className="relative w-32 h-32 my-6 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="60"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-blue-500/30"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="60"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={377}
                                strokeDashoffset={377 - (377 * Math.min(stats.total, 100)) / 100}
                                className="text-white transition-all duration-1000 ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-3xl font-bold">{Math.min(stats.total, 100)}%</span>
                        </div>
                    </div>

                    <p className="text-blue-100 text-sm">You applied to {stats.total} jobs. Keep pushing!</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
