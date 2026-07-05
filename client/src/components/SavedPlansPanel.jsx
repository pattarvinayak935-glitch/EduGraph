import React, { useState, useEffect } from 'react';
import { Clock, Trash2, BookOpen, ChevronRight, X, History } from 'lucide-react';

export default function SavedPlansPanel({ onLoad, onClose }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('edugraph_saved_plans') || '[]');
    setPlans(stored);
  }, []);

  const handleDelete = (id) => {
    const updated = plans.filter(p => p.id !== id);
    localStorage.setItem('edugraph_saved_plans', JSON.stringify(updated));
    setPlans(updated);
  };

  const handleClearAll = () => {
    if (window.confirm('Delete all saved lesson plans?')) {
      localStorage.removeItem('edugraph_saved_plans');
      setPlans([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm">
      <div className="h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-education-50 flex items-center justify-center">
              <History size={18} className="text-education-600" />
            </div>
            <div>
              <h2 className="font-display font-bold text-slate-900">Saved Lesson Plans</h2>
              <p className="text-xs text-slate-500">{plans.length} plan{plans.length !== 1 ? 's' : ''} saved</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        {/* Plan List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {plans.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 text-slate-400">
              <BookOpen size={40} className="mb-3 opacity-30" />
              <p className="font-semibold text-slate-500">No saved plans yet</p>
              <p className="text-xs mt-1">Generate a lesson plan and click "Save Plan" to store it here.</p>
            </div>
          ) : (
            plans.map(plan => (
              <div
                key={plan.id}
                className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-education-200 hover:bg-education-50/30 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{plan.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{plan.subtitle}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <Clock size={11} className="text-slate-400" />
                      <span className="text-xs text-slate-400">{new Date(plan.savedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="w-8 h-8 rounded-lg hover:bg-red-50 hover:text-red-500 text-slate-400 flex items-center justify-center transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                    <button
                      onClick={() => onLoad(plan.data)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-education-600 text-white text-xs font-semibold rounded-lg hover:bg-education-700 transition-colors"
                    >
                      Load <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {plans.length > 0 && (
          <div className="p-4 border-t border-slate-100">
            <button
              onClick={handleClearAll}
              className="w-full py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors"
            >
              Clear All Saved Plans
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
