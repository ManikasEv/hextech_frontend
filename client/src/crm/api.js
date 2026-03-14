// In dev, Vite proxies /api/* to localhost:3001
// In prod, requests go to VITE_API_URL or same origin
const BASE = import.meta.env.PROD
    ? (import.meta.env.VITE_API_URL || '')
    : '';

export async function fetchProjects() {
    const r = await fetch(`${BASE}/api/projects`);
    if (!r.ok) throw new Error('Failed to fetch');
    return r.json();
}

export async function createProject(formData) {
    const r = await fetch(`${BASE}/api/projects`, { method: 'POST', body: formData });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
}

export async function updateProject(id, formData) {
    const r = await fetch(`${BASE}/api/projects/${id}`, { method: 'PUT', body: formData });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
}

export async function deleteProject(id) {
    const r = await fetch(`${BASE}/api/projects/${id}`, { method: 'DELETE' });
    if (!r.ok) throw new Error('Failed to delete');
    return r.json();
}
