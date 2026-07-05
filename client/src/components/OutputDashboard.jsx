import React, { useState, useRef } from 'react';
import { 
  Copy, 
  Printer, 
  Sparkles,
  RotateCcw, 
  ArrowLeft,
  BookOpen,
  User,
  Clock,
  Compass,
  Layout,
  FileSpreadsheet,
  CheckCircle,
  HelpCircle,
  Home,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  AlertCircle,
  Save,
  History,
  FileDown
} from 'lucide-react';
import SavedPlansPanel from './SavedPlansPanel';

export default function OutputDashboard({ lessonPlan, onBack, onGenerateAgain, onLoadSaved }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [showQuizAnswers, setShowQuizAnswers] = useState({});
  const [saved, setSaved] = useState(false);
  const [exportingPDF, setExportingPDF] = useState(false);
  const [showSavedPanel, setShowSavedPanel] = useState(false);
  const dashboardRef = useRef(null);

  // 13 components map to category tags
  const tabs = [
    { id: 'all', label: 'Show All View' },
    { id: 'objectives', label: 'Objectives & Profile' },
    { id: 'lesson', label: 'Lesson Plan & Concept' },
    { id: 'classroom', label: 'Blackboard & Activities' },
    { id: 'assessment', label: 'Worksheet & Quizzes' },
    { id: 'support', label: 'Remedial & Parent Summary' }
  ];

  // Helper to copy text to clipboard
  const handleCopyText = () => {
    const rawText = JSON.stringify(lessonPlan, null, 2);
    navigator.clipboard.writeText(rawText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const toggleQuizAnswer = (index) => {
    setShowQuizAnswers(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  // Save lesson plan to localStorage
  const handleSavePlan = () => {
    const existing = JSON.parse(localStorage.getItem('edugraph_saved_plans') || '[]');
    const topic = lessonPlan.lessonPlan?.topic || lessonPlan.learningObjectives?.[0] || 'Lesson Plan';
    const newPlan = {
      id: Date.now().toString(),
      title: topic,
      subtitle: `${lessonPlan.studentProfileSummary?.slice(0, 60) || 'Custom lesson'}...`,
      savedAt: new Date().toISOString(),
      data: lessonPlan
    };
    const updated = [newPlan, ...existing].slice(0, 20); // keep last 20
    localStorage.setItem('edugraph_saved_plans', JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // Export full dashboard as PDF using html2canvas + jsPDF
  const handleExportPDF = async () => {
    setExportingPDF(true);
    try {
      const { default: jsPDF } = await import('jspdf');
      const { default: html2canvas } = await import('html2canvas');
      const element = dashboardRef.current;
      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: '#f8fafc',
        ignoreElements: (el) => el.classList.contains('no-print')
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgW = pageW;
      const imgH = (canvas.height * imgW) / canvas.width;
      let yOffset = 0;
      let remaining = imgH;
      while (remaining > 0) {
        pdf.addImage(imgData, 'PNG', 0, -yOffset, imgW, imgH);
        remaining -= pageH;
        if (remaining > 0) {
          pdf.addPage();
          yOffset += pageH;
        }
      }
      pdf.save('EduGraph-LessonPlan.pdf');
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('PDF export failed. Try using the Print button instead.');
    }
    setExportingPDF(false);
  };

  // Helper function to decide visibility based on selected tab
  const isVisible = (tabId) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'objectives' && (tabId === 'learningObjectives' || tabId === 'studentProfileSummary')) return true;
    if (activeTab === 'lesson' && (tabId === 'lessonPlan' || tabId === 'simpleExplanation' || tabId === 'localExamples')) return true;
    if (activeTab === 'classroom' && (tabId === 'blackboardNotes' || tabId === 'classActivity' || tabId === 'teacherTips')) return true;
    if (activeTab === 'assessment' && (tabId === 'worksheet' || tabId === 'quizWithAnswers' || tabId === 'homework')) return true;
    if (activeTab === 'support' && (tabId === 'remedialPlan' || tabId === 'parentFriendlySummary')) return true;
    return false;
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
      
      {/* Demo Warning Banner */}
      {lessonPlan.isDemoMode && (
        <div className="no-print mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 shadow-sm">
          <AlertCircle className="text-amber-600 shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-sm">
              {lessonPlan.apiError ? 'Temporary API Service Overload' : 'Offline Demo Mode Active'}
            </p>
            <p className="text-xs text-amber-800 mt-1">
              {lessonPlan.apiError 
                ? `The Gemini API is currently experiencing heavy load (${lessonPlan.apiError}). EduGraph has automatically adapted and loaded a high-quality curriculum package so your lesson is ready immediately.` 
                : 'EduGraph is running without a Google Gemini API Key. A highly detailed pre-configured curriculum has been loaded. Add your GEMINI_API_KEY in the server configuration to unlock real-time generation.'
              }
            </p>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="no-print flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-slate-100 pb-6">
        <div>
          <span className="text-xs font-semibold text-education-600 bg-education-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Lesson Plan Package Generated
          </span>
          <h2 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight mt-2">
            EduGraph Adaptation Output
          </h2>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition-all"
          >
            <ArrowLeft size={16} />
            Back to Form
          </button>
          
          <button
            onClick={onGenerateAgain}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition-all"
          >
            <RotateCcw size={16} />
            Generate Again
          </button>

          <button
            onClick={handleCopyText}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
              copied 
                ? 'bg-emerald-600 text-white shadow-emerald-100' 
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Copy size={16} />
            {copied ? 'Copied JSON!' : 'Copy Raw Output'}
          </button>

          <button
            onClick={handleSavePlan}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all ${
              saved
                ? 'bg-emerald-600 text-white shadow-emerald-100'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Save size={16} />
            {saved ? 'Plan Saved!' : 'Save Plan'}
          </button>

          <button
            onClick={() => setShowSavedPanel(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm rounded-xl transition-all"
          >
            <History size={16} />
            Saved Plans
          </button>

          <button
            onClick={handleExportPDF}
            disabled={exportingPDF}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-semibold text-sm rounded-xl transition-all disabled:opacity-60"
          >
            <FileDown size={16} />
            {exportingPDF ? 'Generating PDF...' : 'Export PDF'}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-education-600 to-orange-500 hover:scale-[1.01] text-white font-semibold text-sm rounded-xl shadow-md shadow-orange-100 transition-all"
          >
            <Printer size={16} />
            Print Lesson Plan
          </button>
        </div>
      </div>

      {/* Tabs Menu - Hidden when printing */}
      <div className="no-print flex overflow-x-auto gap-2 pb-3 mb-8 border-b border-slate-100 scrollbar-none">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4.5 py-2 rounded-xl text-sm font-semibold shrink-0 transition-all ${
              activeTab === tab.id
                ? 'bg-education-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Print Document Title (Shown ONLY during print output) */}
      <div className="hidden print:block mb-8 pb-4 border-b border-slate-300">
        <h1 className="text-3xl font-bold text-slate-900">EduGraph Lesson Plan Package</h1>
        <p className="text-sm text-slate-500 mt-1">Generated by Adaptive Curriculum Agent for Rural Schools</p>
      </div>

      {/* Saved Plans Slide-in Panel */}
      {showSavedPanel && (
        <SavedPlansPanel
          onClose={() => setShowSavedPanel(false)}
          onLoad={(data) => {
            setShowSavedPanel(false);
            onLoadSaved && onLoadSaved(data);
          }}
        />
      )}

      {/* Main cards grid */}
      <div ref={dashboardRef} className="print-container grid grid-cols-1 gap-8">
        
        {/* 1. Learning Objectives */}
        {isVisible('learningObjectives') && (
          <div className="print-card bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-display font-bold text-xl text-slate-800 flex items-center gap-2.5 mb-4">
              <CheckCircle className="text-education-600" size={22} />
              Learning Objectives
            </h3>
            <ul className="space-y-3 pl-1">
              {lessonPlan.learningObjectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700">
                  <span className="no-print mt-1 h-4 w-4 shrink-0 rounded border border-slate-300 flex items-center justify-center text-[10px] text-white bg-slate-50 hover:bg-education-50 hover:border-education-400 cursor-pointer"></span>
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 2. Student Profile Summary */}
        {isVisible('studentProfileSummary') && (
          <div className="print-card bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-display font-bold text-xl text-slate-800 flex items-center gap-2.5 mb-4">
              <User className="text-emerald-600" size={22} />
              Student Profile & Speed Adaptation
            </h3>
            <div className="bg-emerald-50/40 p-4.5 rounded-xl border border-emerald-100 text-slate-700 leading-relaxed text-sm">
              {lessonPlan.studentProfileSummary}
            </div>
          </div>
        )}

        {/* 3. Timed Lesson Plan Roadmap */}
        {isVisible('lessonPlan') && (
          <div className="print-card bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm print-page-break">
            <h3 className="font-display font-bold text-xl text-slate-800 flex items-center gap-2.5 mb-6">
              <Clock className="text-indigo-600" size={22} />
              Lesson Plan Roadmap
            </h3>
            <div className="relative pl-6 border-l-2 border-slate-200 space-y-8 py-2">
              {lessonPlan.lessonPlan.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <span className="absolute -left-[31px] top-1 h-4.5 w-4.5 rounded-full border-4 border-white bg-indigo-600 shadow-sm"></span>
                  
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <span className="px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold rounded-lg shrink-0 w-fit">
                      {step.time}
                    </span>
                    <div className="space-y-1.5">
                      <h4 className="font-display font-bold text-base text-slate-900">{step.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.activity}</p>
                      {step.resourcesUsed && (
                        <p className="text-xs text-slate-400 font-medium">
                          Materials: <span className="text-slate-500 font-semibold">{step.resourcesUsed}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Simple Explanation */}
        {isVisible('simpleExplanation') && (
          <div className="print-card bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-display font-bold text-xl text-slate-800 flex items-center gap-2.5 mb-4">
              <BookOpen className="text-amber-600" size={22} />
              Simple Concept Explanation
            </h3>
            <div className="relative border-l-4 border-amber-500 bg-amber-50/20 p-5 rounded-r-xl">
              <p className="text-slate-700 leading-relaxed italic font-medium">
                "{lessonPlan.simpleExplanation}"
              </p>
            </div>
          </div>
        )}

        {/* 5. Local Examples */}
        {isVisible('localExamples') && (
          <div className="print-card bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-display font-bold text-xl text-slate-800 flex items-center gap-2.5 mb-4">
              <Compass className="text-cyan-600" size={22} />
              Local & Culturally Relevant Examples
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lessonPlan.localExamples.map((ex, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl text-sm text-slate-700 leading-relaxed">
                  <span className="font-bold text-education-600 block mb-1">Example {idx + 1}</span>
                  {ex}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Blackboard Notes */}
        {isVisible('blackboardNotes') && (
          <div className="print-card bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm print-page-break">
            <h3 className="font-display font-bold text-xl text-slate-800 flex items-center gap-2.5 mb-4">
              <Layout className="text-teal-600" size={22} />
              Blackboard Notes (Layout Suggestion)
            </h3>
            
            {/* Blackboard Board Graphic */}
            <div className="p-3 bg-amber-900 rounded-xl shadow-md">
              <div className="bg-[#1e3f35] text-[#ebf3f0] font-mono text-xs sm:text-sm p-5 rounded-lg border-2 border-amber-950 overflow-x-auto whitespace-pre leading-relaxed shadow-inner">
                {lessonPlan.blackboardNotes}
              </div>
            </div>
          </div>
        )}

        {/* 7. Class Activity */}
        {isVisible('classActivity') && (
          <div className="print-card bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-display font-bold text-xl text-slate-800 flex items-center gap-2.5 mb-4">
              <Sparkles className="text-rose-600" size={22} />
              Interactive Classroom Activity
            </h3>
            <div className="p-5 bg-rose-50/30 border border-rose-100 rounded-xl text-slate-700 leading-relaxed text-sm">
              {lessonPlan.classActivity}
            </div>
          </div>
        )}

        {/* 8. Worksheet */}
        {isVisible('worksheet') && (
          <div className="print-card bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm print-page-break">
            <h3 className="font-display font-bold text-xl text-slate-800 flex items-center gap-2.5 mb-4">
              <FileSpreadsheet className="text-sky-600" size={22} />
              Classroom Worksheet
            </h3>
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50 shadow-inner font-sans text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
              {lessonPlan.worksheet}
            </div>
            <div className="no-print mt-3 text-right">
              <span className="text-xs text-slate-400 font-medium italic">
                * This section fits on a standard page when printed
              </span>
            </div>
          </div>
        )}

        {/* 9. Quiz with Answers */}
        {isVisible('quizWithAnswers') && (
          <div className="print-card bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-display font-bold text-xl text-slate-800 flex items-center gap-2.5 mb-4">
              <HelpCircle className="text-violet-600" size={22} />
              Quick Quiz & Assessment
            </h3>
            <div className="space-y-6">
              {lessonPlan.quizWithAnswers.map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-3">
                  <p className="font-semibold text-sm text-slate-800">
                    Q{idx + 1}: {item.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                    {item.options.map((opt, oIdx) => (
                      <div key={oIdx} className="text-xs text-slate-600 flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full border border-slate-300 flex items-center justify-center text-[9px] font-bold text-slate-400 bg-white">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        {opt}
                      </div>
                    ))}
                  </div>

                  {/* Toggle answers in UI, show always in print */}
                  <div className="pt-2 border-t border-slate-200/50 flex flex-col gap-1.5">
                    <button
                      onClick={() => toggleQuizAnswer(idx)}
                      className="no-print self-start text-xs font-semibold text-violet-600 hover:text-violet-800 transition-colors"
                    >
                      {showQuizAnswers[idx] ? 'Hide Answer Details' : 'Show Answer & Explanation'}
                    </button>
                    <div className={`${showQuizAnswers[idx] ? 'block' : 'hidden'} print:block text-xs text-slate-700 bg-violet-50/50 p-2.5 rounded-lg border border-violet-100/50`}>
                      <span className="font-bold text-violet-800">Correct Answer:</span> {item.correctAnswer}
                      <p className="text-slate-600 mt-1 font-medium italic"><span className="font-bold text-violet-800">Why:</span> {item.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 10. Homework */}
        {isVisible('homework') && (
          <div className="print-card bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-display font-bold text-xl text-slate-800 flex items-center gap-2.5 mb-4">
              <Home className="text-yellow-600" size={22} />
              Contextual Homework
            </h3>
            <div className="p-5 bg-yellow-50/20 border border-yellow-100/60 rounded-xl text-slate-700 leading-relaxed text-sm">
              {lessonPlan.homework}
            </div>
          </div>
        )}

        {/* 11. Remedial Plan */}
        {isVisible('remedialPlan') && (
          <div className="print-card bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm print-page-break">
            <h3 className="font-display font-bold text-xl text-slate-800 flex items-center gap-2.5 mb-4">
              <HeartHandshake className="text-red-600" size={22} />
              Remedial Support Plan
            </h3>
            <div className="p-5 bg-red-50/20 border border-red-100/60 rounded-xl text-slate-700 leading-relaxed text-sm">
              {lessonPlan.remedialPlan}
            </div>
          </div>
        )}

        {/* 12. Teacher Tips */}
        {isVisible('teacherTips') && (
          <div className="print-card bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-display font-bold text-xl text-slate-800 flex items-center gap-2.5 mb-4">
              <Lightbulb className="text-amber-500" size={22} />
              Teacher Assistant Tips
            </h3>
            <ul className="space-y-3 pl-1">
              {lessonPlan.teacherTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm">
                  <span className="h-5 w-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 13. Parent Friendly Summary */}
        {isVisible('parentFriendlySummary') && (
          <div className="print-card bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-display font-bold text-xl text-slate-800 flex items-center gap-2.5 mb-4">
              <MessageCircle className="text-teal-600" size={22} />
              Parent Collaboration Summary
            </h3>
            
            {/* Letter format */}
            <div className="p-6 bg-slate-50 border border-dashed border-slate-300 rounded-2xl font-serif text-slate-700 text-sm leading-relaxed max-w-2xl mx-auto shadow-inner relative">
              <span className="absolute top-4 right-4 text-xs font-sans text-slate-400 font-bold uppercase tracking-wider">Letter to Home</span>
              <p className="font-bold mb-4 font-sans text-xs uppercase tracking-wide text-slate-400">Dear Parents / Guardians,</p>
              <p className="whitespace-pre-wrap">{lessonPlan.parentFriendlySummary}</p>
              <p className="mt-6 font-bold font-sans text-xs uppercase tracking-wide text-slate-400">Warm regards,</p>
              <p className="font-semibold text-slate-800 mt-1 font-sans">{lessonPlan.teacherName || 'Class Teacher'}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
