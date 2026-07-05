import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import TeacherForm from './components/TeacherForm';
import OutputDashboard from './components/OutputDashboard';
import { School, Sparkles, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [page, setPage] = useState('landing'); // landing, form, loading, output, error
  const [formData, setFormData] = useState(null);
  const [lessonPlan, setLessonPlan] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
  // Loading state visual details
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [loadingText, setLoadingText] = useState('');

  useEffect(() => {
    let interval;
    if (page === 'loading') {
      setLoadingPercent(0);
      setLoadingText('Curriculum Mapping Agent aligning grade standards...');

      const agentTexts = [
        { limit: 20, text: 'Curriculum Mapping Agent aligning grade standards...' },
        { limit: 40, text: 'Student Profile Agent adapting explanation complexity...' },
        { limit: 60, text: 'Local Context Agent localizing lessons with regional translations...' },
        { limit: 80, text: 'Lesson Plan Generator mapping blackboard notes & schedules...' },
        { limit: 95, text: 'Assessment Agent framing worksheet and interactive activities...' },
        { limit: 100, text: 'Teacher Assistant assembling final curriculum package...' }
      ];

      interval = setInterval(() => {
        setLoadingPercent(prev => {
          const next = prev + Math.floor(Math.random() * 8) + 2;
          if (next >= 100) {
            clearInterval(interval);
            return 99; // Cap at 99 until real fetch finishes
          }
          
          // Match text matching the progress percentage
          const matchingText = agentTexts.find(t => next <= t.limit);
          if (matchingText) {
            setLoadingText(matchingText.text);
          }
          
          return next;
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [page]);

  const handleStartForm = () => {
    setPage('form');
  };

  const handleBackToLanding = () => {
    setPage('landing');
  };

  const handleGenerateLesson = async (inputs) => {
    setFormData(inputs);
    setPage('loading');
    setErrorMsg(null);

    try {
      const response = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Server returned an error generating the lesson plan.');
      }

      const data = await response.json();
      setLessonPlan(data);
      setLoadingPercent(100);
      // Give a tiny moment to show 100% complete
      setTimeout(() => {
        setPage('output');
      }, 400);

    } catch (err) {
      console.error('Request failed:', err);
      setErrorMsg(err.message || 'Unable to connect to the EduGraph generation server. Please make sure the backend server is running.');
      setPage('error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Navbar */}
      <nav className="no-print bg-white border-b border-orange-100/60 sticky top-0 z-50 shadow-sm px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
          <div 
            onClick={() => setPage('landing')} 
            className="flex items-center space-x-2.5 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-education-500 to-orange-600 flex items-center justify-center text-white shadow shadow-orange-100">
              <School size={18} className="stroke-[2.5]" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-800">
              Edu<span className="text-education-600">Graph</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-lg border border-amber-200/50">
              Capstone MVP
            </span>
          </div>
        </div>
      </nav>

      {/* Main Screen Router */}
      <main className="flex-grow">
        {page === 'landing' && (
          <LandingPage onStart={handleStartForm} />
        )}

        {page === 'form' && (
          <TeacherForm 
            onSubmit={handleGenerateLesson} 
            onBack={handleBackToLanding} 
          />
        )}

        {page === 'loading' && (
          <div className="max-w-md mx-auto py-32 px-6 text-center space-y-8 animate-float">
            <div className="h-16 w-16 bg-gradient-to-br from-education-500 to-orange-500 rounded-2xl mx-auto flex items-center justify-center text-white shadow-xl shadow-orange-100">
              <RefreshCw size={28} className="animate-spin" />
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-display font-bold text-slate-900">
                Collaborative Swarm Active
              </h3>
              <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
                Generating Adaptation Plan... {loadingPercent}%
              </p>
            </div>

            {/* Progress bar container */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="bg-gradient-to-r from-education-600 to-orange-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${loadingPercent}%` }}
              ></div>
            </div>

            <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100">
              <p className="text-sm font-semibold text-education-800 animate-pulse">
                {loadingText}
              </p>
            </div>
          </div>
        )}

        {page === 'output' && (
          <OutputDashboard 
            lessonPlan={lessonPlan} 
            onBack={() => setPage('form')} 
            onGenerateAgain={() => handleGenerateLesson(formData)} 
          />
        )}

        {page === 'error' && (
          <div className="max-w-md mx-auto py-24 px-6 text-center space-y-6">
            <div className="h-16 w-16 bg-red-50 text-red-600 rounded-2xl mx-auto flex items-center justify-center border border-red-100 shadow-sm">
              <AlertCircle size={28} />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-display font-bold text-slate-900">Generation Failed</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {errorMsg}
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => handleGenerateLesson(formData)}
                className="w-full py-3 bg-gradient-to-r from-education-600 to-orange-500 text-white font-bold rounded-xl shadow-md"
              >
                Retry Generation
              </button>
              <button
                onClick={() => setPage('form')}
                className="w-full py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl"
              >
                Modify Form Inputs
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="no-print bg-slate-900 text-slate-400 py-10 mt-20 border-t border-slate-800 text-center text-sm px-4">
        <div className="max-w-6xl mx-auto space-y-3">
          <p className="font-display font-bold text-slate-200">
            EduGraph &copy; 2026. Google Kaggle Agents for Good Capstone.
          </p>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            This project provides educational suggestions. Teachers should cross-reference outputs with local school guidelines and curriculum requirements.
          </p>
        </div>
      </footer>
    </div>
  );
}
