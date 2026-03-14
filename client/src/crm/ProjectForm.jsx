import { useState, useEffect, useRef } from 'react';

const EMPTY = { title: '', description: '', type: 'Website', link: '', sort_order: '', image_url: '' };

export default function ProjectForm({ initial, onSave, onCancel, loading }) {
    const [form, setForm] = useState(initial || EMPTY);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(initial?.image_data || initial?.image_url || null);
    const [keepImage, setKeepImage] = useState(!!initial?.image_data);
    const fileRef = useRef();

    useEffect(() => {
        setForm(initial || EMPTY);
        setImageFile(null);
        setPreview(initial?.image_data || initial?.image_url || null);
        setKeepImage(!!initial?.image_data);
    }, [initial]);

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const onFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setKeepImage(false);
        const reader = new FileReader();
        reader.onload = ev => setPreview(ev.target.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('title', form.title);
        fd.append('description', form.description);
        fd.append('type', form.type);
        fd.append('link', form.link || '');
        fd.append('sort_order', form.sort_order || '999');
        fd.append('image_url', form.image_url || '');
        if (imageFile) {
            fd.append('image', imageFile);
        } else if (keepImage) {
            fd.append('keep_image', 'true');
        }
        onSave(fd);
    };

    const inputCls = "w-full bg-[#0d1829] border border-primary/30 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary transition-colors";
    const labelCls = "block text-sm font-medium text-gray-400 mb-1";

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className={labelCls}>Title *</label>
                    <input required className={inputCls} value={form.title} onChange={e => set('title', e.target.value)} placeholder="Project title" />
                </div>
                <div>
                    <label className={labelCls}>Type *</label>
                    <select required className={inputCls} value={form.type} onChange={e => set('type', e.target.value)}>
                        <option value="Website">Website</option>
                        <option value="Software">Software</option>
                    </select>
                </div>
            </div>

            <div>
                <label className={labelCls}>Description *</label>
                <textarea required className={inputCls} rows={3} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Short project description" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                    <label className={labelCls}>Live URL</label>
                    <input className={inputCls} value={form.link} onChange={e => set('link', e.target.value)} placeholder="https://example.com" />
                </div>
                <div>
                    <label className={labelCls}>Sort Order</label>
                    <input type="number" className={inputCls} value={form.sort_order} onChange={e => set('sort_order', e.target.value)} placeholder="1, 2, 3…" />
                </div>
            </div>

            {/* Image upload */}
            <div>
                <label className={labelCls}>Project Image</label>
                <div
                    className="border-2 border-dashed border-primary/30 rounded-xl p-4 text-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => fileRef.current?.click()}
                >
                    {preview ? (
                        <div className="relative">
                            <img src={preview} alt="preview" className="mx-auto max-h-48 rounded-lg object-cover" />
                            <p className="text-xs text-gray-500 mt-2">Click to change image</p>
                        </div>
                    ) : (
                        <div className="py-8">
                            <svg className="w-12 h-12 text-primary/40 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-gray-400">Click to upload image</p>
                            <p className="text-xs text-gray-600 mt-1">PNG, JPG up to 10MB</p>
                        </div>
                    )}
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
                </div>
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-primary text-secondary font-bold py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                    {loading ? 'Saving…' : initial ? 'Update Project' : 'Add Project'}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="px-6 py-3 border border-primary/30 text-gray-400 rounded-lg hover:border-primary hover:text-white transition-colors">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
