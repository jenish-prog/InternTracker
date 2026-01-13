import React, { createContext, useContext, useState, useEffect } from 'react';

const ApplicationContext = createContext();

export const useApplications = () => {
    const context = useContext(ApplicationContext);
    if (!context) {
        throw new Error('useApplications must be used within an ApplicationProvider');
    }
    return context;
};

export const ApplicationProvider = ({ children }) => {
    const [applications, setApplications] = useState(() => {
        const saved = localStorage.getItem('internship-applications');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('internship-applications', JSON.stringify(applications));
    }, [applications]);

    const addApplication = (app) => {
        setApplications(prev => [{ ...app, id: Date.now().toString(), createdAt: new Date().toISOString() }, ...prev]);
    };

    const updateApplication = (id, updatedApp) => {
        setApplications(prev => prev.map(app => app.id === id ? { ...app, ...updatedApp } : app));
    };

    const deleteApplication = (id) => {
        setApplications(prev => prev.filter(app => app.id !== id));
    };

    // Derived Stats
    const stats = {
        total: applications.length,
        applied: applications.filter(a => a.status === 'Applied').length,
        interviewing: applications.filter(a => a.status === 'Interviewing').length,
        accepted: applications.filter(a => a.status === 'Accepted').length,
        rejected: applications.filter(a => a.status === 'Rejected').length,
    };

    return (
        <ApplicationContext.Provider value={{ applications, addApplication, updateApplication, deleteApplication, stats }}>
            {children}
        </ApplicationContext.Provider>
    );
};
