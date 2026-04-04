import { useState, useEffect, FormEvent, useRef } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../supabase';
import { LogOut, Plus, Trash2, Edit, X, Check, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

// Utility to compress image to base64 string
const compressImage = (file: File, maxWidth = 800, maxHeight = 800, quality = 0.7): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'events' | 'members'>('events');
  const [events, setEvents] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [eventForm, setEventForm] = useState({ title: '', description: '', date: '', imageUrl: '', imageUrls: [] as string[], status: 'upcoming' });
  const [memberForm, setMemberForm] = useState({ name: '', role: '', team: 'Core', registrationNumber: '', skills: '', imageUrl: '', tiktok: '', instagram: '', youtube: '' });
  
  const [eventImageFiles, setEventImageFiles] = useState<File[]>([]);
  const [memberImageFile, setMemberImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [eventsResponse, membersResponse] = await Promise.all([
        supabase.from('events').select('*').order('date', { ascending: false }),
        supabase.from('members').select('*').order('created_at', { ascending: true })
      ]);
      
      if (eventsResponse.error) throw eventsResponse.error;
      if (membersResponse.error) throw membersResponse.error;
      
      setEvents(eventsResponse.data || []);
      setMembers(membersResponse.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Event Handlers
  const handleEventSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let finalImageUrls = [...eventForm.imageUrls];
      
      if (eventImageFiles.length > 0) {
        try {
          const newImageUrls = await Promise.all(eventImageFiles.map(file => compressImage(file)));
          finalImageUrls = [...finalImageUrls, ...newImageUrls];
        } catch (uploadError) {
          console.error("Image compression failed:", uploadError);
          toast.error("Failed to process images. Please try again.");
          setIsUploading(false);
          return;
        }
      }

      // For backward compatibility, keep the first image as imageUrl if available
      const firstImageUrl = finalImageUrls.length > 0 ? finalImageUrls[0] : eventForm.imageUrl;

      const data = {
        title: eventForm.title,
        description: eventForm.description,
        date: new Date(eventForm.date).toISOString(),
        image_url: firstImageUrl,
        image_urls: finalImageUrls,
        status: eventForm.status,
      };
      
      if (editingId) {
        const { error } = await supabase.from('events').update(data).eq('id', editingId);
        if (error) throw error;
        toast.success("Event updated");
      } else {
        const { error } = await supabase.from('events').insert([data]);
        if (error) throw error;
        toast.success("Event added");
      }
      setIsEventModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Event save error:", error);
      toast.error("Failed to save event");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        const { error } = await supabase.from('events').delete().eq('id', id);
        if (error) throw error;
        toast.success("Event deleted");
        fetchData();
      } catch (error) {
        toast.error("Failed to delete event");
      }
    }
  };

  // Member Handlers
  const handleMemberSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let finalImageUrl = memberForm.imageUrl;
      
      if (memberImageFile) {
        try {
          finalImageUrl = await compressImage(memberImageFile);
        } catch (uploadError) {
          console.error("Image compression failed:", uploadError);
          toast.error("Failed to process image. Please try again.");
          setIsUploading(false);
          return;
        }
      }

      const data = {
        name: memberForm.name,
        role: memberForm.role,
        team: memberForm.team,
        registration_number: memberForm.registrationNumber,
        image_url: finalImageUrl,
        skills: memberForm.skills.split(',').map(s => s.trim()).filter(Boolean),
        social_links: {
          tiktok: memberForm.tiktok,
          instagram: memberForm.instagram,
          youtube: memberForm.youtube
        }
      };
      
      if (editingId) {
        const { error } = await supabase.from('members').update(data).eq('id', editingId);
        if (error) throw error;
        toast.success("Member updated");
      } else {
        const { error } = await supabase.from('members').insert([data]);
        if (error) throw error;
        toast.success("Member added");
      }
      setIsMemberModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Member save error:", error);
      toast.error("Failed to save member");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (confirm("Are you sure you want to delete this member?")) {
      try {
        const { error } = await supabase.from('members').delete().eq('id', id);
        if (error) throw error;
        toast.success("Member deleted");
        fetchData();
      } catch (error) {
        toast.error("Failed to delete member");
      }
    }
  };

  const openEventModal = (event?: any) => {
    if (event) {
      setEditingId(event.id);
      
      // Handle backward compatibility where only imageUrl exists
      let existingImageUrls = event.image_urls || [];
      if (existingImageUrls.length === 0 && event.image_url) {
        existingImageUrls = [event.image_url];
      }

      setEventForm({
        title: event.title,
        description: event.description,
        date: event.date.split('T')[0],
        imageUrl: event.image_url || '',
        imageUrls: existingImageUrls,
        status: event.status
      });
    } else {
      setEditingId(null);
      setEventForm({ title: '', description: '', date: '', imageUrl: '', imageUrls: [], status: 'upcoming' });
    }
    setEventImageFiles([]);
    setIsEventModalOpen(true);
  };

  const openMemberModal = (member?: any) => {
    if (member) {
      setEditingId(member.id);
      setMemberForm({
        name: member.name,
        role: member.role,
        team: member.team || 'Core',
        registrationNumber: member.registration_number || '',
        skills: member.skills?.join(', ') || '',
        imageUrl: member.image_url || '',
        tiktok: member.social_links?.tiktok || '',
        instagram: member.social_links?.instagram || '',
        youtube: member.social_links?.youtube || ''
      });
    } else {
      setEditingId(null);
      setMemberForm({ name: '', role: '', team: 'Core', registrationNumber: '', skills: '', imageUrl: '', tiktok: '', instagram: '', youtube: '' });
    }
    setMemberImageFile(null);
    setIsMemberModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Admin Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              acm
            </div>
            <h1 className="font-bold text-xl text-slate-900">Admin Dashboard</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 border-b border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab('events')}
            className={`pb-4 px-2 font-bold transition-colors ${activeTab === 'events' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Manage Events
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`pb-4 px-2 font-bold transition-colors ${activeTab === 'members' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Manage Members
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div>
            {/* Events Tab */}
            {activeTab === 'events' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Events ({events.length})</h2>
                  <button 
                    onClick={() => openEventModal()}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md font-bold"
                  >
                    <Plus size={18} /> Add Event
                  </button>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-4 font-medium text-slate-500">Title</th>
                        <th className="p-4 font-medium text-slate-500">Date</th>
                        <th className="p-4 font-medium text-slate-500">Status</th>
                        <th className="p-4 font-medium text-slate-500 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map(event => (
                        <tr key={event.id} className="border-b border-slate-200 last:border-0 hover:bg-slate-50">
                          <td className="p-4 font-medium text-slate-900">{event.title}</td>
                          <td className="p-4 text-slate-600">{new Date(event.date).toLocaleDateString()}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${event.status === 'upcoming' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                              {event.status}
                            </span>
                          </td>
                          <td className="p-4 flex justify-end gap-2">
                            <button onClick={() => openEventModal(event)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={18} /></button>
                            <button onClick={() => handleDeleteEvent(event.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                          </td>
                        </tr>
                      ))}
                      {events.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-slate-500">No events found. Add one to get started.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Members ({members.length})</h2>
                  <button 
                    onClick={() => openMemberModal()}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md font-bold"
                  >
                    <Plus size={18} /> Add Member
                  </button>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="p-4 font-medium text-slate-500">Name</th>
                        <th className="p-4 font-medium text-slate-500">Role</th>
                        <th className="p-4 font-medium text-slate-500 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map(member => (
                        <tr key={member.id} className="border-b border-slate-200 last:border-0 hover:bg-slate-50">
                          <td className="p-4 font-medium flex items-center gap-3 text-slate-900">
                            <img src={member.image_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.id}`} alt="" className="w-8 h-8 rounded-full bg-slate-200 border border-slate-200" />
                            {member.name}
                          </td>
                          <td className="p-4 text-slate-600">{member.role}</td>
                          <td className="p-4 flex justify-end gap-2">
                            <button onClick={() => openMemberModal(member)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={18} /></button>
                            <button onClick={() => handleDeleteMember(member.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                          </td>
                        </tr>
                      ))}
                      {members.length === 0 && (
                        <tr>
                          <td colSpan={3} className="p-8 text-center text-slate-500">No members found. Add one to get started.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </main>

      {/* Event Modal */}
      {isEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Event' : 'Add Event'}</h3>
              <button onClick={() => setIsEventModalOpen(false)} className="text-slate-500 hover:text-slate-900"><X size={24} /></button>
            </div>
            <form onSubmit={handleEventSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">Title</label>
                <input type="text" required value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">Description</label>
                <textarea required rows={3} value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 resize-none focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700">Date</label>
                  <input type="date" required value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700">Status</label>
                  <select value={eventForm.status} onChange={e => setEventForm({...eventForm, status: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">Event Images</label>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-4">
                    {eventForm.imageUrls.map((url, idx) => (
                      <div key={`existing-${idx}`} className="relative group">
                        <img src={url} alt={`Preview ${idx}`} className="w-16 h-16 object-cover rounded-lg border border-slate-200" />
                        <button 
                          type="button"
                          onClick={() => setEventForm({...eventForm, imageUrls: eventForm.imageUrls.filter((_, i) => i !== idx)})}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                    {eventImageFiles.map((file, idx) => (
                      <div key={`new-${idx}`} className="relative group">
                        <div className="w-16 h-16 bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-center text-blue-600 text-xs text-center p-1 overflow-hidden">
                          {file.name}
                        </div>
                        <button 
                          type="button"
                          onClick={() => setEventImageFiles(eventImageFiles.filter((_, i) => i !== idx))}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors w-max">
                    <Upload size={16} />
                    <span className="text-sm font-medium">Upload Images</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={e => {
                      if (e.target.files) {
                        setEventImageFiles([...eventImageFiles, ...Array.from(e.target.files)]);
                      }
                    }} />
                  </label>
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsEventModalOpen(false)} className="px-4 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-100">Cancel</button>
                <button type="submit" disabled={isUploading} className="px-4 py-2 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 shadow-sm disabled:opacity-70">
                  {isUploading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Check size={18} />} 
                  {isUploading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Member Modal */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-slate-200 flex-shrink-0">
              <h3 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Member' : 'Add Member'}</h3>
              <button onClick={() => setIsMemberModalOpen(false)} className="text-slate-500 hover:text-slate-900"><X size={24} /></button>
            </div>
            <form onSubmit={handleMemberSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700">Name</label>
                  <input type="text" required value={memberForm.name} onChange={e => setMemberForm({...memberForm, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700">Role (Post)</label>
                  <input type="text" required value={memberForm.role} onChange={e => setMemberForm({...memberForm, role: e.target.value})} placeholder="e.g. President" className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700">Team</label>
                  <select value={memberForm.team} onChange={e => setMemberForm({...memberForm, team: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none">
                    <option value="Core">Core (President, VP, Chair)</option>
                    <option value="Upper Cabinet">Upper Cabinet</option>
                    <option value="Lower Cabinet">Lower Cabinet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-700">Registration Number</label>
                  <input type="text" value={memberForm.registrationNumber} onChange={e => setMemberForm({...memberForm, registrationNumber: e.target.value})} placeholder="e.g. 2021-CS-123" className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">Skills (comma separated)</label>
                <input type="text" value={memberForm.skills} onChange={e => setMemberForm({...memberForm, skills: e.target.value})} placeholder="React, Python, UI/UX" className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-700">Profile Image</label>
                <div className="flex items-center gap-4">
                  {memberForm.imageUrl && !memberImageFile && (
                    <img src={memberForm.imageUrl} alt="Preview" className="w-16 h-16 object-cover rounded-full border border-slate-200" />
                  )}
                  {memberImageFile && (
                    <div className="w-16 h-16 bg-blue-50 rounded-full border border-blue-200 flex items-center justify-center text-blue-600 text-xs text-center p-1 overflow-hidden">
                      {memberImageFile.name}
                    </div>
                  )}
                  <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 transition-colors">
                    <Upload size={16} />
                    <span className="text-sm font-medium">Upload Image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        setMemberImageFile(e.target.files[0]);
                      }
                    }} />
                  </label>
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <h4 className="font-medium text-sm text-slate-500">Social Links (Optional)</h4>
                <input type="url" placeholder="TikTok URL" value={memberForm.tiktok} onChange={e => setMemberForm({...memberForm, tiktok: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="url" placeholder="Instagram URL" value={memberForm.instagram} onChange={e => setMemberForm({...memberForm, instagram: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="url" placeholder="YouTube URL" value={memberForm.youtube} onChange={e => setMemberForm({...memberForm, youtube: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="pt-4 flex justify-end gap-3 flex-shrink-0">
                <button type="button" onClick={() => setIsMemberModalOpen(false)} className="px-4 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-100">Cancel</button>
                <button type="submit" disabled={isUploading} className="px-4 py-2 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2 shadow-sm disabled:opacity-70">
                  {isUploading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Check size={18} />} 
                  {isUploading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
