import React, { useState } from 'react';
import { Plus, Search, Trash2, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { useApplications } from '../context/ApplicationContext';
import ApplicationForm from '../components/ApplicationForm';

const StatusBadge = ({ status }) => {
    const styles = {
        Applied: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        Interviewing: 'bg-blue-100 text-blue-800 border-blue-200',
        Accepted: 'bg-green-100 text-green-800 border-green-200',
        Rejected: 'bg-red-100 text-red-800 border-red-200',
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
        </span>
    );
};

const Applications = () => {
    const { applications, addApplication, updateApplication, deleteApplication } = useApplications();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingApp, setEditingApp] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAdd = (app) => {
        addApplication(app);
        setIsModalOpen(false);
    };

    const handleUpdate = (app) => {
        updateApplication(editingApp.id, app);
        setEditingApp(null);
        setIsModalOpen(false);
    };

    const openAddModal = () => {
        setEditingApp(null);
        setIsModalOpen(true);
    };

    const openEditModal = (app) => {
        setEditingApp(app);
        setIsModalOpen(true);
    };

    const filteredApplications = applications.filter(app =>
        app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Applications</h1>
                    <p className="text-slate-500 mt-1">Track and manage your internship applications</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                    <Plus size={20} />
                    Add Application
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by company or role..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {applications.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus className="text-slate-400" size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">No applications yet</h3>
                        <p className="text-slate-500 mt-1 mb-6">Start tracking your internship journey by adding your first application.</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Add your first application
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-3 font-semibold text-slate-700">Company & Role</th>
                                    <th className="px-6 py-3 font-semibold text-slate-700">Status</th>
                                    <th className="px-6 py-3 font-semibold text-slate-700">Date Applied</th>
                                    <th className="px-6 py-3 font-semibold text-slate-700">Platform</th>
                                    <th className="px-6 py-3 font-semibold text-slate-700">Location</th>
                                    <th className="px-6 py-3 font-semibold text-slate-700 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredApplications.map((app) => (
                                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="font-semibold text-slate-900">{app.company}</div>
                                                <div className="text-slate-500">{app.role}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={app.status} />
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 flex items-center gap-2">
                                            <Calendar size={16} className="text-slate-400" />
                                            {app.dateApplied}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <ExternalLink size={16} className="text-slate-400" />
                                                {app.platform}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} className="text-slate-400" />
                                                {app.location || 'Remote'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(app)}
                                                    className="text-slate-400 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg"
                                                    title="Edit Application"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                </button>
                                                <button
                                                    onClick={() => deleteApplication(app.id)}
                                                    className="text-slate-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                                    title="Delete Application"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <ApplicationForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={editingApp ? handleUpdate : handleAdd}
                initialData={editingApp}
            />
        </div>
    );
};

export default Applications;
