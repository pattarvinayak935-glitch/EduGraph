import React from 'react';
import { 
  Sparkles, 
  Map, 
  UserCheck, 
  Compass, 
  BookOpen, 
  CheckSquare, 
  LifeBuoy, 
  MessageCircle, 
  ArrowRight, 
  ArrowDownRight,
  School,
  Users,
  Layers
} from 'lucide-react';

export default function LandingPage({ onStart }) {
  const agents = [
    {
      id: 'curriculum',
      icon: Map,
      title: 'Curriculum Mapping Agent',
      desc: 'Aligns the user-selected topic to standard grade-appropriate syllabus goals and learning objectives.',
      color: 'from-amber-400 to-orange-500',
      text: 'text-orange-700 bg-orange-50'
    },
    {
      id: 'profile',
      icon: UserCheck,
      title: 'Student Profile Agent',
      desc: 'Adjusts concept depth, wording, and instruction speed to match slow, average, fast, or mixed learning rates.',
      color: 'from-emerald-400 to-teal-600',
      text: 'text-emerald-700 bg-emerald-50'
    },
    {
      id: 'context',
      icon: Compass,
      title: 'Local Context Agent',
      desc: 'Injects local environment hooks (e.g. farms, coasts, forests) to ground abstract concepts in students daily lives.',
      color: 'from-cyan-400 to-blue-600',
      text: 'text-cyan-700 bg-cyan-50'
    },
    {
      id: 'generator',
      icon: BookOpen,
      title: 'Lesson Plan Generator',
      desc: 'Builds a timed lesson roadmap mapped directly to the available materials (blackboards, textbooks, no internet).',
      color: 'from-purple-400 to-indigo-600',
      text: 'text-indigo-700 bg-indigo-50'
    },
    {
      id: 'assessment',
      icon: CheckSquare,
      title: 'Assessment Agent',
      desc: 'Formulates active games, homework, and structured quizzes with regional translations to measure comprehension.',
      color: 'from-rose-400 to-pink-600',
      text: 'text-rose-700 bg-rose-50'
    },
    {
      id: 'remediation',
      icon: LifeBuoy,
      title: 'Remediation Agent',
      desc: 'Designs custom visual analogies and quick backup exercises to support students struggling with the core concept.',
      color: 'from-red-400 to-orange-600',
      text: 'text-red-700 bg-red-50'
    },
    {
      id: 'assistant',
      icon: MessageCircle,
      title: 'Teacher Assistant Agent',
      desc: 'Drafts easy-to-use blackboard outlines and practical tips to ensure smooth classroom delivery.',
      color: 'from-yellow-400 to-amber-500',
      text: 'text-amber-700 bg-amber-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-orange-50/20 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header / Brand */}
      <div className="max-w-6xl mx-auto flex items-center justify-between border-b border-orange-100 pb-6 mb-16">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-education-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-orange-200">
            <School size={22} className="stroke-[2.5]" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-slate-800">
            Edu<span className="text-education-600">Graph</span>
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-6 text-sm font-medium text-slate-600">
          <a href="#workflow" className="hover:text-education-600 transition-colors">How it Works</a>
          <span className="px-3 py-1 rounded-full bg-orange-100/50 text-education-700 font-semibold text-xs tracking-wider uppercase">
            Kaggle Agents for Good
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center mb-24">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-education-50 border border-education-200/60 text-education-800 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
          <Sparkles size={14} className="text-education-500 animate-spin" style={{ animationDuration: '4s' }} />
          Adaptive Curriculum Agent for Rural Schools
        </div>
        
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
          Empowering Rural Classrooms with <span className="bg-clip-text text-transparent bg-gradient-to-r from-education-600 via-orange-500 to-amber-500">Culturally Relevant</span> Lessons
        </h1>
        
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed mb-10">
          EduGraph helps rural school teachers convert standard curriculum topics into personalized, 
          culturally resonant lesson plans. Adapted automatically for mixed learning speeds 
          and limited physical resources.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-education-600 to-orange-500 text-white font-semibold text-lg shadow-lg hover:shadow-orange-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
          >
            Start Creating Lesson Plan
            <ArrowRight size={20} className="stroke-[2.5]" />
          </button>
          <a
            href="#workflow"
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-lg hover:bg-slate-50 transition-colors flex items-center justify-center"
          >
            How EduGraph Works
          </a>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-20">
          <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm text-left hover:shadow-md transition-shadow">
            <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center text-education-600 mb-4">
              <School size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-800 mb-1">Resource Aligned</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Plans are built for the materials you actually have—whether it is a simple blackboard, textbooks, or zero internet.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm text-left hover:shadow-md transition-shadow">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
              <Users size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-800 mb-1">Adaptive Learning Speed</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Differentiates paths for slow, average, or fast learning rates in the same classroom without extra teacher effort.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm text-left hover:shadow-md transition-shadow">
            <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
              <Layers size={20} />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-800 mb-1">Culturally Contextualized</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Brings science, math, and languages to life using familiar farming, tribal, coastal, or small town contexts.
            </p>
          </div>
        </div>
      </div>

      {/* Workflow Section */}
      <div id="workflow" className="max-w-6xl mx-auto border-t border-orange-100 pt-20 pb-12">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            How EduGraph Works
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600">
            EduGraph orchestrates a team of seven specialized AI agents working together in a pipeline to construct, translate, and verify your customized curriculum package.
          </p>
        </div>

        {/* Desktop Pipeline Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 relative">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <div key={agent.id} className="relative group">
                <div className="h-full bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:border-orange-200/50 transition-all flex flex-col items-center text-center">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-tr ${agent.color} flex items-center justify-center text-white shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={22} className="stroke-[2.5]" />
                  </div>
                  
                  <div className="absolute top-3 left-3 h-5 w-5 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">
                    {index + 1}
                  </div>

                  <h4 className="font-display font-bold text-sm text-slate-800 leading-tight mb-2">
                    {agent.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed flex-grow">
                    {agent.desc}
                  </p>
                </div>

                {/* Arrow to Next Item (Only visible on MD screens, except for last item) */}
                {index < agents.length - 1 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-orange-200 animate-pulse">
                    <ArrowDownRight size={18} className="-rotate-45" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Start Button in Footer */}
        <div className="text-center mt-16">
          <button
            onClick={onStart}
            className="px-10 py-4 rounded-xl bg-slate-900 text-white font-semibold text-lg hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center gap-2"
          >
            Create Your First Plan Now
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
