import React from 'react';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { useApplications } from '../context/ApplicationContext';

const COLORS = {
    Applied: '#FBBF24',      // yellow-400
    Interviewing: '#3B82F6', // blue-500
    Accepted: '#22C55E',     // green-500
    Rejected: '#EF4444',     // red-500
};

const Analytics = () => {
    const { applications } = useApplications();

    // Prepare Data for Status Pie Chart
    const statusCounts = applications.reduce((acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
    }, {});

    const statusData = Object.keys(statusCounts).map(status => ({
        name: status,
        value: statusCounts[status]
    }));

    // Prepare Data for Platform Bar Chart
    const platformCounts = applications.reduce((acc, app) => {
        acc[app.platform] = (acc[app.platform] || 0) + 1;
        return acc;
    }, {});

    const platformData = Object.keys(platformCounts).map(platform => ({
        name: platform,
        applications: platformCounts[platform]
    })).sort((a, b) => b.applications - a.applications); // Sort descending

    if (applications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">No Data Available</h2>
                <p className="text-slate-500">Add applications to see your analytics insights.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Analytics</h1>
                <p className="text-slate-500 mt-1 text-sm sm:text-base">Insights into your application process</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                {/* Status Distribution */}
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-4 sm:mb-6">Application Status</h2>
                    <div className="h-64 sm:h-80 w-full min-w-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#CBD5E1'} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Platform Distribution */}
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
                    <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-4 sm:mb-6">Applications by Platform</h2>
                    <div className="h-64 sm:h-80 w-full min-w-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={platformData}
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                                <RechartsTooltip />
                                <Bar dataKey="applications" fill="#4F46E5" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
