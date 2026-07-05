# EduGraph 🌱
### Adaptive Personalized Curriculum Agent for Rural Schools

EduGraph is a **Google Kaggle Agents for Good Capstone Project**. It helps rural school teachers convert standard curriculum topics into personalized, culturally relevant lesson plans adapted to students with different learning speeds and limited classroom physical resources.

---

## 📌 Problem Statement
Rural classrooms face unique educational challenges:
1. **Diverse Learning Profiles**: Wide variance in student learning speeds (slow, average, and fast) in single multi-grade classrooms.
2. **Resource Constraints**: Limited or no access to high-speed internet, smart devices, projectors, or lab materials—often relying purely on a physical blackboard and a standard textbook.
3. **Curriculum Disconnect**: National/state curriculum examples are often abstract or based on urban settings, making them difficult for rural children to relate to.

## 💡 The EduGraph Solution
EduGraph solves this by automatically adapting standard curriculum concepts into hyper-localized, resource-aligned teaching packages. It leverages a collaborative **collaborative multi-agent swarm** to generate:
- Timed lesson roadmaps tailored to the physical materials on hand.
- Concept explanations grounded in familiar community contexts (e.g. farming, coastal, or forest settings).
- Printable, low-cost worksheets, games, quizzes, and even structured blackboard guidelines.
- Easy-to-read parent summary letters.

---

## 🤖 Orchestration of Virtual AI Agents
EduGraph is powered by seven virtual AI agents collaborating within the system prompt to build the lesson plan:
1. **Curriculum Mapping Agent**: Maps abstract topic guidelines to grade-appropriate syllabus goals and learning objectives.
2. **Student Profile Agent**: Modulates explanation depth, language, and pacing to match learning speed (slow, mixed, average, fast).
3. **Local Context Agent**: Adapts content using regional hooks (agriculture, coastal geography) and matches the resources listed by the teacher.
4. **Lesson Plan Generator**: Designs the timed structure of the classroom hour (30, 40, or 60 min blocks) matching materials.
5. **Teacher Assistant Agent**: Generates blackboard sketches, management guidelines, and interactive chalkboard layouts.
6. **Assessment Agent**: Formulates active learning games, homework, and structured quizzes with regional language options.
7. **Remediation Agent**: Re-explains concepts using physical analogies for students struggling to keep up.

---

## 🛠️ Tech Stack
- **Frontend**: React + Vite + Tailwind CSS + Lucide Icons
- **Backend**: Node.js + Express
- **AI Integration**: Google Gemini API via official `@google/generative-ai` SDK
- **Workspaces**: NPM Workspaces for unified monorepo management

---

## 🚀 Local Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) installed (v18 or higher recommended).
- A Google Gemini API Key (Optional; you can obtain one from [Google AI Studio](https://aistudio.google.com/)).

### Step 1: Install Dependencies
At the project root, run:
```bash
npm install
```
This command automatically installs dependencies for both the `client/` and `server/` subfolders using npm workspaces.

### Step 2: Configure Environment Variables
1. Copy the example environment template:
   - Create a file named `.env` in the `server/` directory (or use the one created at the root).
2. Add your Google Gemini API Key:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key
   PORT=5000
   ```
*(Note: If you leave the `GEMINI_API_KEY` blank or unmodified, EduGraph will automatically fall back to **Demo/Mock Mode** using pre-configured responses, letting you try the app offline or without a key!)*

---

## 🏃 Running the Application

To run the application locally, you will open two terminal windows (or run them sequentially):

### Terminal 1: Run Backend Server
In the root directory, run:
```bash
npm run server
```
This starts the Express server on `http://localhost:5000`.

### Terminal 2: Run Frontend Client
In the root directory, run:
```bash
npm run dev
```
This starts the Vite development server on `http://localhost:5173`. 
Open `http://localhost:5173` in your browser to experience EduGraph.

---

## 🌟 Demo Example Input
If you want to quickly test the application, click the **"Try Demo Example"** button on the teacher input form. It will automatically autofill the following parameters:
- **Teacher name**: Demo Teacher
- **School type**: Rural
- **Grade**: 6
- **Subject**: Science
- **Topic**: Water Cycle
- **Student level**: Slow
- **Language**: English + simple Kannada
- **Local context**: farming village
- **Resources**: blackboard, textbook, no internet
- **Duration**: 40 minutes
- **Students**: 35
- **Constraints**: mixed attention span, limited teaching materials

---

## 🔮 Future Scope
- **Offline Sync & PWA**: Allow teachers to download lessons offline via service workers.
- **Audio Guides**: Text-to-speech engine to read aloud simplified parent-friendly summaries in local languages.
- **Community Shared Repository**: A shared online vault where teachers can upload and rate generated lesson plans.
