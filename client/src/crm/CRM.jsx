import { useState, useEffect } from 'react';
import { fetchProjects, createProject, updateProject, deleteProject } from './api';
import ProjectForm from './ProjectForm';

export default function CRM() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(null);   // project object or null
    const [adding, setAdding] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const load = async () => {
        try {
            setLoading(true);
            const data = await fetchProjects();
            setProjects(data);
        } catch {
            setError('Failed to load projects from database.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const flash = (msg, isError = false) => {
        if (isError) setError(msg); else setSuccess(msg);
        setTimeout(() => { setError(''); setSuccess(''); }, 3500);
    };

    const handleAdd = async (fd) => {
        setSaving(true);
        try {
            const created = await createProject(fd);
            setProjects(p => [...p, created].sort((a, b) => a.sort_order - b.sort_order));
            setAdding(false);
            flash('Project added successfully!');
        } catch (e) { flash(e.message, true); }
        finally { setSaving(false); }
    };

    const handleUpdate = async (fd) => {
        setSaving(true);
        try {
            const updated = await updateProject(editing.id, fd);
            setProjects(p => p.map(x => x.id === updated.id ? updated : x).sort((a, b) => a.sort_order - b.sort_order));
            setEditing(null);
            flash('Project updated!');
        } catch (e) { flash(e.message, true); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
        try {
            await deleteProject(id);
            setProjects(p => p.filter(x => x.id !== id));
            flash('Project deleted.');
        } catch (e) { flash(e.message, true); }
    };

    return (
        <div className="min-h-screen bg-[#000a16] text-white font-mono">
            {/* Top bar */}
            <header className="border-b border-primary/20 bg-[#000a16] sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <a href="/" className="text-primary font-bold text-xl hover:opacity-80 transition-opacity">HEXTECH</a>
                    <span className="text-gray-600">/</span>
                    <span className="text-gray-400 text-sm">Projects CRM</span>
                </div>
                <div className="flex items-center gap-3">
                    <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">← Back to Site</a>
                    <button
                        onClick={() => { setAdding(true); setEditing(null); }}
                        className="bg-primary text-secondary font-bold px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Add Project
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Flash messages */}
                {success && (
                    <div className="mb-6 p-4 bg-green-900/30 border border-green-500/40 rounded-lg text-green-400 flex items-center gap-2">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        {success}
                    </div>
                )}
                {error && (
                    <div className="mb-6 p-4 bg-red-900/30 border border-red-500/40 rounded-lg text-red-400 flex items-center gap-2">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        {error}
                    </div>
                )}

                {/* Add form */}
                {adding && (
                    <div className="mb-8 bg-[#0a1628] border border-primary/20 rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-primary mb-5">New Project</h2>
                        <ProjectForm onSave={handleAdd} onCancel={() => setAdding(false)} loading={saving} />
                    </div>
                )}

                {/* Edit form */}
                {editing && (
                    <div className="mb-8 bg-[#0a1628] border border-primary/30 rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-primary mb-5">Edit — {editing.title}</h2>
                        <ProjectForm initial={editing} onSave={handleUpdate} onCancel={() => setEditing(null)} loading={saving} />
                    </div>
                )}

                {/* Stats bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Projects', value: projects.length },
                        { label: 'Websites', value: projects.filter(p => p.type === 'Website').length },
                        { label: 'Software', value: projects.filter(p => p.type === 'Software').length },
                        { label: 'With Live Link', value: projects.filter(p => p.link).length },
                    ].map(s => (
                        <div key={s.label} className="bg-[#0a1628] border border-primary/10 rounded-xl p-4 text-center">
                            <div className="text-3xl font-bold text-primary">{s.value}</div>
                            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Project table */}
                {loading ? (
                    <div className="text-center py-20 text-gray-500">Loading projects…</div>
                ) : (
                    <div className="bg-[#0a1628] border border-primary/10 rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-primary/10 text-xs text-gray-500 uppercase tracking-wider">
                                        <th className="text-left px-5 py-4">#</th>
                                        <th className="text-left px-5 py-4">Image</th>
                                        <th className="text-left px-5 py-4">Title</th>
                                        <th className="text-left px-5 py-4">Type</th>
                                        <th className="text-left px-5 py-4">Description</th>
                                        <th className="text-left px-5 py-4">Link</th>
                                        <th className="text-right px-5 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((p, i) => (
                                        <tr key={p.id} className="border-b border-primary/5 hover:bg-white/3 transition-colors group">
                                            <td className="px-5 py-4 text-gray-600 text-sm">{p.sort_order}</td>
                                            <td className="px-5 py-4">
                                                {(p.image_data || p.image_url) ? (
                                                    <img
                                                        src={p.image_data || p.image_url}
                                                        alt={p.title}
                                                        className="w-16 h-12 object-cover rounded-lg border border-primary/20"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-12 rounded-lg bg-white/5 border border-primary/10 flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-5 py-4 font-semibold text-white">{p.title}</td>
                                            <td className="px-5 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.type === 'Website' ? 'bg-primary/20 text-primary' : 'bg-purple-500/20 text-purple-300'}`}>
                                                    {p.type}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-gray-400 text-sm max-w-xs">
                                                <p className="truncate">{p.description}</p>
                                            </td>
                                            <td className="px-5 py-4 text-sm">
                                                {p.link ? (
                                                    <a href={p.link} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate block max-w-[140px]">
                                                        {p.link.replace('https://', '')}
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-600">—</span>
                                                )}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => { setEditing(p); setAdding(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(p.id, p.title)}
                                                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {projects.length === 0 && (
                                        <tr><td colSpan={7} className="text-center py-16 text-gray-600">No projects yet. Click "Add Project" to get started.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
