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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Applications</h1>
                    <p className="text-slate-500 mt-1 text-sm sm:text-base">Track and manage your internship applications</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm w-full sm:w-auto"
                >
                    <Plus size={20} />
                    <span>Add Application</span>
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
                        {/* Table */}
                        <table className="w-full min-w-[640px]">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Company</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Role</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Platform</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredApplications.length > 0 ? (
                                    filteredApplications.map(app => (
                                        <tr key={app.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => openEditModal(app)}>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4">
                                                <div className="font-semibold text-slate-900 text-sm">{app.company}</div>
                                                {app.location && (
                                                    <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                                                        <MapPin size={12} />
                                                        {app.location}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-sm text-slate-700">{app.role}</td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4">
                                                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                                    <ExternalLink size={14} />
                                                    {app.platform || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4">
                                                <StatusBadge status={app.status} />
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4">
                                                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                                    <Calendar size={14} />
                                                    {app.dateApplied}
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteApplication(app.id);
                                                        }}
                                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center gap-2 text-slate-400">
                                                <Briefcase size={48} className="opacity-30" />
                                                <p className="text-sm">
                                                    {searchTerm ? 'No applications match your search.' : 'No applications yet. Click "Add Application" to get started!'}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
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
