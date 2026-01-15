import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';


const ApplicationContext = createContext();

export const useApplications = () => {
    const context = useContext(ApplicationContext);
    if (!context) {
        throw new Error('useApplications must be used within an ApplicationProvider');
    }
    return context;
};

export const ApplicationProvider = ({ children }) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    // Initialize Guest ID and fetch applications
    useEffect(() => {
        const initializeSession = async () => {
            let guestId = localStorage.getItem('guest_id');
            if (!guestId) {
                guestId = crypto.randomUUID();
                localStorage.setItem('guest_id', guestId);
            }
            setUserId(guestId);
            fetchApplications(guestId);
        };

        initializeSession();
    }, []);

    const fetchApplications = async (currentUserId) => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('applications')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Normalize data: Supabase returns lowercase column names
            const normalizedData = (data || []).map(app => ({
                ...app,
                dateApplied: app.dateapplied || app.dateApplied // Handle both cases just in case
            }));

            setApplications(normalizedData);
        } catch (error) {
            console.error('Error fetching applications:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const addApplication = async (app) => {
        try {
            const { data, error } = await supabase
                .from('applications')
                .insert([{
                    company: app.company,
                    role: app.role,
                    status: app.status,
                    dateapplied: app.dateApplied, // Match Supabase column name
                    platform: app.platform,
                    link: app.link,
                    location: app.location,
                    notes: app.notes,
                    user_id: userId
                }])
                .select();

            if (error) throw error;

            const newApp = {
                ...data[0],
                dateApplied: data[0].dateapplied
            };

            setApplications(prev => [newApp, ...prev]);
            return { data, error: null };
        } catch (error) {
            console.error('Error adding application:', error.message);
            return { data: null, error };
        }
    };

    const updateApplication = async (id, updatedApp) => {
        try {
            // Normalize update data to match Supabase column names
            const dbData = {
                company: updatedApp.company,
                role: updatedApp.role,
                status: updatedApp.status,
                dateapplied: updatedApp.dateApplied, // Map to snake_case
                platform: updatedApp.platform,
                link: updatedApp.link, // Ensure link is included
                location: updatedApp.location,
                notes: updatedApp.notes
            };

            const { error } = await supabase
                .from('applications')
                .update(dbData)
                .eq('id', id);

            if (error) throw error;
            setApplications(prev => prev.map(app => app.id === id ? { ...app, ...updatedApp } : app));
            return { error: null };
        } catch (error) {
            console.error('Error updating application:', error.message);
            return { error };
        }
    };

    const deleteApplication = async (id) => {
        try {
            const { error } = await supabase
                .from('applications')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setApplications(prev => prev.filter(app => app.id !== id));
            return { error: null };
        } catch (error) {
            console.error('Error deleting application:', error.message);
            return { error };
        }
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
        <ApplicationContext.Provider value={{ applications, addApplication, updateApplication, deleteApplication, stats, loading }}>
            {children}
        </ApplicationContext.Provider>
    );
};
