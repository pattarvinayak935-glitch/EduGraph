const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper for Mock Responses
function getMockResponse(data) {
  const isWaterCycle = data.topic && data.topic.toLowerCase().includes('water cycle');
  
  if (isWaterCycle) {
    return {
      isDemoMode: true,
      learningObjectives: [
        "Understand how water changes forms (evaporation, condensation, precipitation) using simple local examples from a farming village.",
        "Identify the role of rain and water bodies in farming and our environment.",
        "Relate the cycle of water to seasonal rain and irrigation patterns in a village."
      ],
      studentProfileSummary: `Designed for Grade ${data.grade} slow-paced learners in a rural school. Pacing is slow and structured, with concepts explained in simple English mixed with simple Kannada terms to aid comprehension. Adjustments made for ${data.studentsCount || 35} students with mixed attention span and limited materials.`,
      lessonPlan: [
        { 
          time: "10 mins", 
          title: "Introduction & Local Context Hook", 
          activity: "Teacher asks students: 'Where does the water in our fields go after it rains?' and 'How does water get into the clouds?'. Explain that water goes on a journey. Draw a small lake and farm on the blackboard.", 
          resourcesUsed: "Blackboard, chalk" 
        },
        { 
          time: "15 mins", 
          title: "Core Concept: The Three Stages", 
          activity: "Explain evaporation (water turning to vapor due to sun heat, like water drying on the fields), condensation (vapor turning to clouds, like steam cooling on a lid), and precipitation (rain). Write terms on the board with simple Kannada translations (e.g., Evaporation = Aaviyaaguvike).", 
          resourcesUsed: "Blackboard, textbook" 
        },
        { 
          time: "10 mins", 
          title: "Interactive Activity: Hand-Water Cycle", 
          activity: "Perform a brief role-play. Let students mimic the sun (hands high, saying 'Hot! Evaporate!'), then mimic clouds (clumping together, saying 'Cool! Condense!'), then mimic rain (tapping fingers on desks, saying 'Pitter-patter! Rain!'). This addresses the mixed attention span and keeps them active.", 
          resourcesUsed: "None" 
        },
        { 
          time: "5 mins", 
          title: "Wrap-up & Assessment Quick Check", 
          activity: "Summarize the three stages on the board. Ask students to repeat the terms. Distribute homework details.", 
          resourcesUsed: "Blackboard" 
        }
      ],
      simpleExplanation: "Water is like a traveler. It lives in lakes, wells, and wet farm soils. When the hot sun shines, the water turns into invisible vapor (like steam from a cooking pot) and climbs into the sky. This is Evaporation. Up high in the cold air, the vapors join hands to form clouds. This is Condensation. When the clouds get too heavy with water, they fall down as rain to water our crops. This is Precipitation. The cycle starts all over again!",
      localExamples: [
        "Water drying up on mud roads after a rain shower (Evaporation).",
        "Dew drops forming on ragi or paddy leaves early in the morning (Condensation).",
        "The seasonal monsoon rains filling the local village pond or lake (Precipitation)."
      ],
      blackboardNotes: `+-------------------------------------------------------------+
|                   THE WATER CYCLE (JALA CHAKRA)            |
|                                                             |
|  1. SUN (Soorya)  == heats ==>  2. WATER (Neeru)            |
|     - Evaporation (Aaviyaaguvike): Liquid turns to Gas.      |
|                                                             |
|  3. CLOUDS (Moda)  == cools ==> 4. RAIN (Male)               |
|     - Condensation (Saneevanegolluvike): Gas turns to Liquid.|
|     - Precipitation (Malepaatha): Rain falls on farms.      |
|                                                             |
|           [Sun]                                             |
|          ~ ~ ~ ~                                            |
|       *Condensation* ---> [Clouds]                          |
|       ^                      |                              |
|  *Evaporation*         *Precipitation* (Rain)               |
|       |                      v                              |
|   [Village Pond] ------> [Farms]                            |
+-------------------------------------------------------------+`,
      classActivity: "The Water Cycle Hand-mimic game. Since attention span is mixed, get the students to stand up. Lead them in acting: 1) Heat: Rub hands together to feel warmth. 2) Evaporation: Rise up on tiptoes and wave hands up like steam. 3) Condensation: Cross arms and hug shoulders to represent vapor cooling into clouds. 4) Precipitation: Drum fingers on desks or clap to simulate rain falling on dry crops.",
      worksheet: `EduGraph Worksheet - Grade 6 Science (Water Cycle)

Name: ______________________

1. Fill in the blanks:
   a. When sun heats water in the pond, it goes up as ___________ (Evaporation / Condensation).
   b. Clouds release water as rain through the process of ___________ (Precipitation / Evaporation).
   c. Dew drops on grass leaves in the morning show the process of ___________ (Condensation / Evaporation).

2. Draw a small line matching the terms:
   - Evaporation       * Monsoon Rain
   - Condensation      * Wet clothes drying in sun
   - Precipitation     * Steam forming droplets on cold steel plate`,
      quizWithAnswers: [
        { 
          question: "What is the process where water turns into gas/vapor due to sun's heat?", 
          options: ["Condensation", "Evaporation", "Precipitation", "Freezing"], 
          correctAnswer: "Evaporation", 
          explanation: "Sun's heat warms up surface water and changes it into gaseous vapor, which rises into the sky." 
        },
        { 
          question: "Which local event is an example of Condensation?", 
          options: ["Rain falling on the farm", "A puddle drying up in the afternoon", "Morning dew on ragi crop leaves", "River water flowing"], 
          correctAnswer: "Morning dew on ragi crop leaves", 
          explanation: "Water vapor in the cool morning air cools down and turns back into liquid droplets on plant leaves." 
        },
        { 
          question: "Why is the Water Cycle important for rural farmers?", 
          options: ["It provides seasonal monsoons to water crops", "It makes the sun shine brighter", "It stops water from flowing", "It keeps the soil dry"], 
          correctAnswer: "It provides seasonal monsoons to water crops", 
          explanation: "The Water Cycle continuously recycles water and returns it as rain, which is essential to irrigate crops and fill village wells." 
        }
      ],
      homework: "Ask your parents how they collect rain water at home, or visit the nearest pond/lake with an elder and write down 2 sentences on where the water comes from and how it helps the village. Draw a simple drawing of a cloud and rain watering a plant.",
      remedialPlan: "For students struggling to catch the concepts, hold a 5-minute session using a metal cup with ice/cold water. Show them how 'fog' forms on the outside of the cup. Explain that the invisible water vapor in air turned into water droplets when touching the cold cup—this is Condensation, just like cloud formation.",
      teacherTips: [
        "Use regional translations for scientific terms to keep children connected.",
        "Keep explanations short. Break lessons into 10-minute active chunks to maintain attention.",
        "Use physical objects (like a wet chalkboard that dries under the fan) to demonstrate evaporation in real-time."
      ],
      parentFriendlySummary: "Your child learned about the Jala Chakra (Water Cycle) today! They learned how water from our wells and ponds rises to the sky because of the sun's heat, turns into clouds, and falls back as rain. Please ask your child to explain how rain is formed and help them identify how they can save water in your household."
    };
  }

  // Dynamic generic mock response
  return {
    isDemoMode: true,
    learningObjectives: [
      `Understand the fundamental concepts of ${data.topic || 'the topic'} in the context of ${data.subject || 'the subject'}.`,
      `Identify local and practical applications of ${data.topic || 'the topic'} within a ${data.localContext || 'rural community'}.`,
      `Demonstrate basic knowledge of ${data.topic || 'the topic'} by answering quiz questions.`
    ],
    studentProfileSummary: `Adapted for Grade ${data.grade || 'N/A'} students at a ${data.schoolType || 'Rural'} school. Designed for a learning level of '${data.studentLevel || 'Mixed'}' in '${data.language || 'English'}'. Accounted for ${data.studentsCount || '30'} students with constraints: '${data.constraints || 'limited materials'}'.`,
    lessonPlan: [
      {
        time: "10 mins",
        title: "Introduction and Local Hook",
        activity: `Introduce ${data.topic || 'the topic'} by drawing parallels to daily life in ${data.localContext || 'the local area'}. Ask students open-ended questions.`,
        resourcesUsed: "Blackboard"
      },
      {
        time: `${Math.round(data.duration * 0.5) || 20} mins`,
        title: "Core Teaching & Modeling",
        activity: `Explain the central ideas of ${data.topic || 'the topic'} using simple language. Use available resources (${data.resources || 'blackboard, textbook'}) to illustrate concepts.`,
        resourcesUsed: data.resources || "Blackboard, textbook"
      },
      {
        time: `${Math.round(data.duration * 0.25) || 10} mins`,
        title: "Interactive Classroom Activity",
        activity: `Engage students in a small group activity that does not require internet or high-cost resources. E.g., student-to-student pair sharing or board-writing relay.`,
        resourcesUsed: "Blackboard"
      },
      {
        time: "5 mins",
        title: "Wrap-up and Homework Assignment",
        activity: "Summarize the core takeaways. Assign a contextualized homework task.",
        resourcesUsed: "Blackboard"
      }
    ],
    simpleExplanation: `Imagine ${data.topic || 'the topic'} as something we see in our everyday life here in the ${data.localContext || 'village'}. It explains how objects, systems, or numbers around us work, making it easy to understand and use.`,
    localExamples: [
      `How ${data.topic || 'this concept'} relates to local work or agriculture.`,
      `An everyday example seen in a ${data.localContext || 'rural household'}.`,
      `A seasonal or environmental observation familiar to students.`
    ],
    blackboardNotes: `+-------------------------------------------------------------+
|               ${(data.topic || 'Topic').toUpperCase()} - GRADE ${data.grade || '6'}               |
|                                                             |
|   Main Concept:                                             |
|   - Simple explanation of the core concept.                  |
|                                                             |
|   Key Terms:                                                |
|   - Term 1: Local definition or translation.                |
|   - Term 2: Core science/math/social definition.            |
|                                                             |
|   Local Examples:                                           |
|   - 1. Community connection.                                |
|   - 2. Household/Farming connection.                        |
+-------------------------------------------------------------+`,
    classActivity: `A local group game where students sit in a circle and pass around a local object (like a seed or stone) representing a key part of ${data.topic || 'the topic'}, answering a question when it stops.`,
    worksheet: `EduGraph Worksheet: ${data.topic || 'Topic'}

1. True or False:
   - This concept is useful for our local community. (True/False)
   
2. Answer in your own words:
   - Give one example of ${data.topic || 'the topic'} that you see around you.
   _________________________________________________________`,
    quizWithAnswers: [
      {
        question: `What is the primary purpose of ${data.topic || 'the topic'}?`,
        options: ["Option A: To help our local community", "Option B: To stay dry", "Option C: To study other countries", "Option D: None of the above"],
        correctAnswer: "Option A: To help our local community",
        explanation: `Understanding ${data.topic || 'the topic'} helps us relate classroom learning to real-world applications in our daily lives.`
      },
      {
        question: `Which of these is a resource we used in today's lesson on ${data.topic || 'the topic'}?`,
        options: ["Textbook or Blackboard", "Virtual Reality headset", "High-speed laboratory", "Computers for every student"],
        correctAnswer: "Textbook or Blackboard",
        explanation: "We designed this lesson to work with low-cost, locally available resources like blackboard and textbooks."
      }
    ],
    homework: `Observe one instance of ${data.topic || 'the topic'} in your home or surrounding village today. Write 2 sentences about it and show it to your parents.`,
    remedialPlan: `Provide additional one-on-one visual analogies (e.g., using pebbles or drawing basic shapes) to explain the foundations of ${data.topic || 'the topic'} for slower learners.`,
    teacherTips: [
      "Keep explanations extremely simple.",
      "Check understanding after each small step.",
      "Incorporate local dialects/translations where students struggle."
    ],
    parentFriendlySummary: `Today, your child learned about ${data.topic || 'the topic'} in school. They learned how this connects to our local environment and how it helps them solve problems. You can support them by asking what they learned and checking their homework.`
  };
}

// POST endpoint to generate lesson plan
app.post('/api/generate-lesson', async (req, res) => {
  const {
    teacherName,
    schoolType,
    grade,
    subject,
    topic,
    studentLevel,
    language,
    localContext,
    resources,
    duration,
    studentsCount,
    constraints
  } = req.body;

  // Validation
  if (!teacherName || !schoolType || !grade || !subject || !topic || !studentLevel || !language || !localContext) {
    return res.status(400).json({ error: 'Missing required fields in request body.' });
  }

  // Check Gemini API Key
  const apiKey = process.env.GEMINI_API_KEY;
  const isKeyMissing = !apiKey || apiKey === '' || apiKey.startsWith('your_');

  if (isKeyMissing) {
    console.log('Gemini API key is missing or is placeholder. Falling back to Mock response.');
    const mockData = getMockResponse(req.body);
    // Simulate slight backend network latency for realistic loader experience
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return res.json(mockData);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const systemInstructions = `You are a group of specialized virtual AI agents collaborating to build an adaptive, personalized, culturally relevant lesson plan for rural school classrooms.
The team of virtual agents includes:
1. **Curriculum Mapping Agent**: Maps standard curriculum topic (e.g. topic: "${topic}", subject: "${subject}", grade: "${grade}") into clear, realistic learning objectives.
2. **Student Profile Agent**: Adapts content complexity, pacing, and explanation to student learning level "${studentLevel}" and language "${language}".
3. **Local Context Agent**: Adapts the lessons to local context: "${localContext}" and uses locally available materials based on resources: "${resources}". Builds cultural relevance.
4. **Lesson Plan Generator Agent**: Formulates a step-by-step timed timeline. Keeps duration to ${duration} minutes.
5. **Teacher Assistant Agent**: Generates simple explanations using local analogies, blackboard notes (clear structural text using ascii-art/box formatting), and teacher tips.
6. **Assessment Agent**: Creates classroom interactive activities, worksheets, and short quiz questions.
7. **Remediation Agent**: Develops a remedial plan for students who struggle.
8. **Parent Collaboration Agent**: Summarizes the lesson into a simple parent-friendly summary.`;

    const userPrompt = `Generate a customized lesson plan for:
- Teacher: ${teacherName}
- School Type: ${schoolType}
- Grade: ${grade}
- Subject: ${subject}
- Topic: ${topic}
- Student Learning Level: ${studentLevel}
- Instruction Language: ${language}
- Local Community Context: ${localContext}
- Available Classroom Resources: ${resources}
- Time Duration: ${duration} minutes
- Total Number of Students: ${studentsCount}
- Special Needs/Constraints: ${constraints || 'None'}

Deliver the lesson plan as a valid, structured JSON object matching the requested schema. Avoid markdown formatting inside the JSON strings except plain line breaks where necessary. Ensure to integrate Kannada or regional translations/analogies if requested in the instruction language.`;

    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: `${systemInstructions}\n\n${userPrompt}` }] }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'object',
          properties: {
            learningObjectives: {
              type: 'array',
              items: { type: 'string' },
              description: 'Clear, realistic learning objectives mapped from standard curriculum.'
            },
            studentProfileSummary: {
              type: 'string',
              description: 'Summary of the learning level adjustments and profile customizations made.'
            },
            lessonPlan: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  time: { type: 'string', description: 'e.g. "10 mins"' },
                  title: { type: 'string', description: 'Step title' },
                  activity: { type: 'string', description: 'Detailed action of teacher and students' },
                  resourcesUsed: { type: 'string', description: 'Materials used in this step' }
                },
                required: ['time', 'title', 'activity', 'resourcesUsed']
              },
              description: 'Step-by-step timed lesson roadmap.'
            },
            simpleExplanation: {
              type: 'string',
              description: 'Concept explanation using village/farming/coastal analogies.'
            },
            localExamples: {
              type: 'array',
              items: { type: 'string' },
              description: 'Culturally relevant real-life examples.'
            },
            blackboardNotes: {
              type: 'string',
              description: 'ASCII text format of blackboard layout to draw on board.'
            },
            classActivity: {
              type: 'string',
              description: 'Low-cost interactive classroom game or activity.'
            },
            worksheet: {
              type: 'string',
              description: 'A printable/copiable worksheet text with questions.'
            },
            quizWithAnswers: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  question: { type: 'string' },
                  options: { type: 'array', items: { type: 'string' } },
                  correctAnswer: { type: 'string' },
                  explanation: { type: 'string' }
                },
                required: ['question', 'options', 'correctAnswer', 'explanation']
              },
              description: '3 assessment questions.'
            },
            homework: {
              type: 'string',
              description: 'Contextual homework assignments.'
            },
            remedialPlan: {
              type: 'string',
              description: 'Simple remedial activities for slower learners.'
            },
            teacherTips: {
              type: 'array',
              items: { type: 'string' },
              description: 'Instruction tips and classroom management guidelines.'
            },
            parentFriendlySummary: {
              type: 'string',
              description: 'A summary for parents to understand and support student at home.'
            }
          },
          required: [
            'learningObjectives',
            'studentProfileSummary',
            'lessonPlan',
            'simpleExplanation',
            'localExamples',
            'blackboardNotes',
            'classActivity',
            'worksheet',
            'quizWithAnswers',
            'homework',
            'remedialPlan',
            'teacherTips',
            'parentFriendlySummary'
          ]
        }
      }
    });

    const responseText = result.response.text();
    const lessonPlanJSON = JSON.parse(responseText);
    
    // Add isDemoMode: false to distinguish real AI generation
    lessonPlanJSON.isDemoMode = false;

    res.json(lessonPlanJSON);
  } catch (error) {
    console.error('Gemini API execution failed. Automatically falling back to high-fidelity mock response:', error);
    const mockData = getMockResponse(req.body);
    mockData.isDemoMode = true;
    mockData.apiError = error.message;
    res.json(mockData);
  }
});

// Serve basic status endpoint
app.get('/api/status', (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const isKeyMissing = !apiKey || apiKey === '' || apiKey.startsWith('your_');
  res.json({
    status: 'online',
    mode: isKeyMissing ? 'Demo / Mock Fallback Mode' : 'Gemini Connected',
    port: PORT
  });
});

app.listen(PORT, () => {
  console.log(`EduGraph server is running on port ${PORT}`);
});
