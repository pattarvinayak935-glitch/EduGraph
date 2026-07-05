import React, { useState } from 'react';
import { 
  User, 
  School, 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Languages, 
  Globe, 
  Users, 
  AlertTriangle,
  Play,
  ClipboardList
} from 'lucide-react';

export default function TeacherForm({ onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    teacherName: '',
    schoolType: 'Rural',
    grade: '6',
    subject: 'Science',
    topic: '',
    studentLevel: 'Mixed',
    language: 'English',
    localContext: '',
    resources: ['blackboard', 'textbook'],
    duration: '40',
    studentsCount: '30',
    constraints: ''
  });

  const [errors, setErrors] = useState({});

  // Pre-fill demo data
  const handleLoadDemo = () => {
    setFormData({
      teacherName: 'Demo Teacher',
      schoolType: 'Rural',
      grade: '6',
      subject: 'Science',
      topic: 'Water Cycle',
      studentLevel: 'Slow',
      language: 'English + simple Kannada',
      localContext: 'farming village',
      resources: ['blackboard', 'textbook', 'no internet'],
      duration: '40',
      studentsCount: '35',
      constraints: 'mixed attention span, limited teaching materials'
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleResourceChange = (resource) => {
    setFormData(prev => {
      const current = [...prev.resources];
      const index = current.indexOf(resource);
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(resource);
      }
      return { ...prev, resources: current };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.teacherName.trim()) newErrors.teacherName = 'Teacher Name is required';
    if (!formData.topic.trim()) newErrors.topic = 'Lesson topic is required';
    if (!formData.localContext.trim()) newErrors.localContext = 'Community local context is required';
    if (!formData.studentsCount || parseInt(formData.studentsCount) <= 0) {
      newErrors.studentsCount = 'Please specify a valid student count';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    } else {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      const element = document.getElementsByName(firstError)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      {/* Header and Action controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            Curriculum Planner
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Fill in the parameters below. The agent swarm will prepare a custom lesson plan pack.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleLoadDemo}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-dashed border-education-500 bg-education-50/50 text-education-700 font-semibold text-sm hover:bg-education-50 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            <Play size={16} className="fill-current" />
            Try Demo Example
          </button>
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* Main form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Row 1: Teacher & School Details */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <h3 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-100">
            <School size={18} className="text-education-600" />
            1. Teacher & School Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Teacher Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <User size={15} className="text-slate-400" />
                Teacher Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="teacherName"
                value={formData.teacherName}
                onChange={handleChange}
                placeholder="e.g. Mrs. Rajeshwari Patil"
                className={`w-full px-4 py-3 rounded-xl border ${errors.teacherName ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-education-100 focus:border-education-500'} focus:outline-none focus:ring-4 transition-all`}
              />
              {errors.teacherName && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <AlertTriangle size={12} /> {errors.teacherName}
                </p>
              )}
            </div>

            {/* School Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <School size={15} className="text-slate-400" />
                School Type
              </label>
              <select
                name="schoolType"
                value={formData.schoolType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-education-100 focus:border-education-500 transition-all bg-white"
              >
                <option value="Rural">Rural School</option>
                <option value="Semi-urban">Semi-urban School</option>
                <option value="Urban">Urban School</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 2: Curriculum Information */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <h3 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-100">
            <BookOpen size={18} className="text-education-600" />
            2. Curriculum Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Grade */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <GraduationCap size={15} className="text-slate-400" />
                Grade / Class
              </label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-education-100 focus:border-education-500 transition-all bg-white"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i+1} value={i+1}>Grade {i+1}</option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <BookOpen size={15} className="text-slate-400" />
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-education-100 focus:border-education-500 transition-all bg-white"
              >
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Social Studies">Social Studies</option>
                <option value="English">English</option>
                <option value="Kannada">Kannada</option>
                <option value="Hindi">Hindi</option>
                <option value="Environmental Studies">Environmental Studies</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <Clock size={15} className="text-slate-400" />
                Lesson Duration
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-education-100 focus:border-education-500 transition-all bg-white"
              >
                <option value="30">30 Minutes</option>
                <option value="40">40 Minutes</option>
                <option value="60">60 Minutes</option>
              </select>
            </div>
          </div>

          {/* Topic */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Topic of the Lesson <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="e.g. Water Cycle / Fractions / Friction / Life in Vijayanagara Empire"
              className={`w-full px-4 py-3 rounded-xl border ${errors.topic ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-education-100 focus:border-education-500'} focus:outline-none focus:ring-4 transition-all`}
            />
            {errors.topic && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <AlertTriangle size={12} /> {errors.topic}
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Class Profile & Community Context */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <h3 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Globe size={18} className="text-education-600" />
            3. Student Profile & Community Context
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Learning level */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <Users size={15} className="text-slate-400" />
                Student Learning Level
              </label>
              <select
                name="studentLevel"
                value={formData.studentLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-education-100 focus:border-education-500 transition-all bg-white"
              >
                <option value="Slow">Slow Speed Learners</option>
                <option value="Average">Average Speed Learners</option>
                <option value="Fast">Fast Speed Learners</option>
                <option value="Mixed">Mixed Ability (Slow & Fast)</option>
              </select>
            </div>

            {/* Instruction Language */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <Languages size={15} className="text-slate-400" />
                Preferred Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-education-100 focus:border-education-500 transition-all bg-white"
              >
                <optgroup label="── South India ──">
                  <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                  <option value="Telugu">Telugu (తెలుగు)</option>
                  <option value="Tamil">Tamil (தமிழ்)</option>
                  <option value="Malayalam">Malayalam (മലയാളം)</option>
                </optgroup>
                <optgroup label="── North India ──">
                  <option value="Hindi">Hindi (हिन्दी)</option>
                  <option value="Marathi">Marathi (मराठी)</option>
                  <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                  <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
                  <option value="Rajasthani">Rajasthani (राजस्थानी)</option>
                  <option value="Bhojpuri">Bhojpuri (भोजपुरी)</option>
                </optgroup>
                <optgroup label="── East India ──">
                  <option value="Bengali">Bengali (বাংলা)</option>
                  <option value="Odia">Odia (ଓଡ଼ିଆ)</option>
                  <option value="Assamese">Assamese (অসমীয়া)</option>
                </optgroup>
                <optgroup label="── Other ──">
                  <option value="Urdu">Urdu (اردو)</option>
                  <option value="Sanskrit">Sanskrit (संस्कृतम्)</option>
                  <option value="English">English</option>
                </optgroup>
                <optgroup label="── Bilingual Combinations ──">
                  <option value="English + simple Kannada">English + Kannada (Bilingual)</option>
                  <option value="English + simple Hindi">English + Hindi (Bilingual)</option>
                  <option value="English + simple Telugu">English + Telugu (Bilingual)</option>
                  <option value="English + simple Tamil">English + Tamil (Bilingual)</option>
                  <option value="English + simple Bengali">English + Bengali (Bilingual)</option>
                  <option value="English + simple Marathi">English + Marathi (Bilingual)</option>
                </optgroup>
              </select>
            </div>

            {/* Number of Students */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <Users size={15} className="text-slate-400" />
                Number of Students in Class
              </label>
              <input
                type="number"
                name="studentsCount"
                value={formData.studentsCount}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-education-100 focus:border-education-500 transition-all"
              />
              {errors.studentsCount && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <AlertTriangle size={12} /> {errors.studentsCount}
                </p>
              )}
            </div>

            {/* Local context */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <Globe size={15} className="text-slate-400" />
                Local Community Context <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="localContext"
                value={formData.localContext}
                onChange={handleChange}
                placeholder="e.g. farming village / coastal area / tribal area / small town"
                className={`w-full px-4 py-3 rounded-xl border ${errors.localContext ? 'border-red-400 focus:ring-red-100' : 'border-slate-200 focus:ring-education-100 focus:border-education-500'} focus:outline-none focus:ring-4 transition-all`}
              />
              {errors.localContext && (
                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                  <AlertTriangle size={12} /> {errors.localContext}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Row 4: Classroom Resources & Constraints */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <h3 className="font-display font-bold text-lg text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-100">
            <ClipboardList size={18} className="text-education-600" />
            4. Classroom Resources & Constraints
          </h3>

          {/* Resources checklist */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Available Classroom Resources (Select all that apply)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { id: 'blackboard', label: 'Blackboard & Chalk' },
                { id: 'textbook', label: 'Student Textbooks' },
                { id: 'mobile', label: 'Teacher Mobile' },
                { id: 'projector', label: 'Classroom Projector' },
                { id: 'internet', label: 'Internet Access' },
                { id: 'no internet', label: 'No Internet Access' }
              ].map(resource => (
                <button
                  key={resource.id}
                  type="button"
                  onClick={() => handleResourceChange(resource.id)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold text-left border transition-all flex items-center justify-between ${
                    formData.resources.includes(resource.id)
                      ? 'border-education-500 bg-education-50/50 text-education-800 ring-2 ring-education-500/20'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {resource.label}
                  {formData.resources.includes(resource.id) && (
                    <span className="h-2 w-2 rounded-full bg-education-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Constraints and special needs */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Special Needs or Classroom Constraints (Optional)
            </label>
            <textarea
              name="constraints"
              rows="3"
              value={formData.constraints}
              onChange={handleChange}
              placeholder="e.g. mixed attention span, limited physical teaching aids, electricity blackouts, three visually impaired children..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-education-100 focus:border-education-500 transition-all"
            />
          </div>
        </div>

        {/* Generate Trigger */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-education-600 to-orange-500 text-white font-bold text-lg shadow-lg hover:shadow-orange-200 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            Generate Lesson Plan Pack
          </button>
        </div>
      </form>
    </div>
  );
}
