export interface BlogPost {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    publishedAt: string;
    readingTime: string;
    category: "tier1" | "tier2" | "tier3";
    excerpt: string;
    content: BlogSection[];
    faqs?: { question: string; answer: string }[];
    relatedLanguage?: string;
}

export interface BlogSection {
    type: "h2" | "h3" | "p" | "ul" | "cta" | "quote";
    content: string | string[];
}

export const posts: BlogPost[] = [
    {
        slug: "duolingo-alternative-for-conversation-practice",
        title: "The Best Duolingo Alternative for Real Conversation Practice in 2026",
        metaTitle: "Best Duolingo Alternative for Conversation Practice | ALYA",
        metaDescription:
            "Tired of drills you can't use in real conversations? Here are the best Duolingo alternatives in 2026 for understanding and practicing real Spanish.",
        publishedAt: "2026-06-01",
        readingTime: "7 min read",
        category: "tier1",
        excerpt:
            "Duolingo is great for streaks. It's not great for understanding natives. Here are the best alternatives if you want real comprehension.",
        content: [
            {
                type: "p",
                content:
                    "Duolingo made language learning feel like a game. Streaks, hearts, leaderboards, genuinely fun. But users say the same thing after months: they still can't understand a real conversation.",
            },
            {
                type: "p",
                content:
                    "That's structural. Duolingo optimizes for retention with drills. Understanding natives requires immersion: hearing real people, with help built in so you don't get lost.",
            },
            {
                type: "h2",
                content: "Why Drills Don't Build Understanding",
            },
            {
                type: "p",
                content:
                    "Translating 'the bear drinks milk' builds recognition. It doesn't train your ear for speed, slang, mumbling, or real situations. Comprehension comes from comprehensible input, real language you can almost understand, with support.",
            },
            {
                type: "quote",
                content:
                    '"The gap between finishing a drill course and understanding a native is the most common frustration in language learning."',
            },
            {
                type: "h2",
                content: "The Best Duolingo Alternatives in 2026",
            },
            {
                type: "h3",
                content: "1. alya, Spanish Immersion Feed (Best for Understanding)",
            },
            {
                type: "p",
                content:
                    "alya is a vertical feed of short native Spanish videos. Every clip has a synchronized transcript, English translation, per-word glosses, and native audio. Tap anything you miss. Save words. Earn stars. Beginner to advanced.",
            },
            {
                type: "ul",
                content: [
                    "Real native clips from day one, not quiz sentences",
                    "Tap-to-translate + per-word glosses in context",
                    "0.75x–1.5x playback, hear every word clearly",
                    "20 topics + Explore filters by level, grammar, source",
                    "Free to download, Plus for unlimited",
                ],
            },
            {
                type: "h3",
                content: "2. italki, Human Tutors",
            },
            {
                type: "p",
                content:
                    "The gold standard for speaking, a real person, live. Costs $10–50/hour and needs scheduling. Use alya daily for input, italki monthly for output.",
            },
            {
                type: "h3",
                content: "3. HelloTalk, Language Exchange",
            },
            {
                type: "p",
                content:
                    "Free exchange with natives. Great once you understand enough to hold a chat. Before that, immersion builds the comprehension exchange requires.",
            },
            {
                type: "h3",
                content: "4. Pimsleur, Audio Lessons",
            },
            {
                type: "p",
                content:
                    "Strong for pronunciation via listen-and-repeat. No real-video component. A good complement to an immersion feed.",
            },
            {
                type: "h3",
                content: "5. Babbel, Structured Curriculum",
            },
            {
                type: "p",
                content:
                    "Better grammar structure than Duolingo, still lesson-based. Good for syllabus; immersion is better for ear training.",
            },
            {
                type: "h2",
                content: "What to Look for in an Alternative",
            },
            {
                type: "ul",
                content: [
                    "Does it use real native content, or sentences written for quizzes?",
                    "Can you understand everything instantly (transcript + translation)?",
                    "Can you tap individual words for meaning and audio?",
                    "Does it match your level and topics you care about?",
                    "Will you actually open it daily?",
                ],
            },
            {
                type: "cta",
                content:
                    "Ready to understand real Spanish? Try alya free, scroll the feed today.",
            },
        ],
        faqs: [
            {
                question: "What is the best alternative to Duolingo?",
                answer:
                    "For real understanding, alya, a Spanish immersion feed with tap-to-translate instead of drills. For human tutors, italki. For curriculum structure, Babbel.",
            },
            {
                question: "Why do people stop using Duolingo?",
                answer:
                    "The gap between drill progress and real-world understanding. Gamification becomes a chore, and natives still sound too fast. Immersion with built-in support closes that gap.",
            },
            {
                question: "Is there a free Duolingo alternative?",
                answer:
                    "Yes. alya is free to download with a 7-day trial when eligible. YouTube has free native content (without translations). Combined, they beat drills alone.",
            },
            {
                question: "Can you become fluent using only Duolingo?",
                answer:
                    "Unlikely. Duolingo builds vocabulary and habits, not comprehension of fast native speech. Add daily immersion, even 10 minutes of video with translations, for real progress.",
            },
        ],
    },

    {
        slug: "best-ai-language-learning-app-2026",
        title: "Best AI Spanish App in 2026",
        metaTitle: "Best AI Spanish App in 2026 | ALYA",
        metaDescription:
            "Looking for the best AI Spanish app in 2026? Here's why immersion feeds beat chatboxes and drills, and how to pick.",
        publishedAt: "2026-05-19",
        readingTime: "8 min read",
        category: "tier1",
        excerpt:
            "AI changed language learning. But not all AI apps are equal. Here's how to pick one for comprehension, not just quizzes.",
        content: [
            {
                type: "p",
                content:
                    "In 2026 the best learners aren't grinding flashcards, they're scrolling native content with AI support. But dozens of apps claim 'AI' while serving the same drills.",
            },
            {
                type: "h2",
                content: "What Makes a Great AI Spanish App?",
            },
            {
                type: "ul",
                content: [
                    "Real native content, not generated sentences",
                    "Instant understanding: transcript + translation + glosses",
                    "Tap any word for meaning and native audio",
                    "Matched to your level, filterable by topic",
                    "Something you'll open daily",
                ],
            },
            {
                type: "h2",
                content: "The Best AI Spanish Apps in 2026",
            },
            {
                type: "h3",
                content: "1. alya, Immersion Feed",
            },
            {
                type: "p",
                content:
                    "Scroll short native videos. Every clip arrives pre-transcribed and translated with word timing. Tap, listen, save, earn stars, grow your companion. Free to download.",
            },
            {
                type: "ul",
                content: [
                    "Beginner to advanced, 20 topics",
                    "Explore filters: level, grammar, source, Shorts vs Videos",
                    "Save vocabulary with video context",
                    "Companion, streaks, achievements",
                    "Plus: Unlimited Immersion, Instant Explanations, Your Evolving Companion",
                ],
            },
            {
                type: "h3",
                content: "2. Duolingo with AI Features",
            },
            {
                type: "p",
                content:
                    "Still drills at its core. Good for habits and basic vocab. Not built for understanding fast natives.",
            },
            {
                type: "h3",
                content: "3. ChatGPT (with prompting)",
            },
            {
                type: "p",
                content:
                    "Powerful if you engineer prompts every session. No feed, no levels, no saved words, no companion. A tool, not a routine.",
            },
            {
                type: "h3",
                content: "4. Babbel",
            },
            {
                type: "p",
                content:
                    "Solid curriculum and grammar path. Lesson-based, not immersion-based. Better for structure than ear training.",
            },
            {
                type: "h2",
                content: "Why Immersion-Based AI Works",
            },
            {
                type: "p",
                content:
                    "Linguists call it comprehensible input: language you can almost understand, with support. Every alya clip is exactly that, real Spanish made understandable by transcript, translation, and glosses. That's why 10 minutes of scrolling beats 10 minutes of multiple choice.",
            },
            {
                type: "quote",
                content:
                    "\"You don't learn a language by studying it. You learn it by understanding it, over and over.\"",
            },
            {
                type: "cta",
                content:
                    "Try alya free, scroll real Spanish today.",
            },
        ],
        faqs: [
            {
                question: "What is the best AI app for learning Spanish?",
                answer:
                    "For real comprehension, alya, an immersion feed with tap-to-translate, levels, topics, and a companion. Free to download to start.",
            },
            {
                question: "Is AI language learning effective?",
                answer:
                    "Yes, when it delivers comprehensible input: real language made understandable. Pre-transcribed video with translations and glosses is the most scalable way to do that.",
            },
            {
                question: "Can you become fluent with an AI app?",
                answer:
                    "You can build strong comprehension with daily immersion. Most consistent scrollers understand everyday clips within weeks. Advanced fluency also needs speaking practice with humans.",
            },
            {
                question: "What is the best free AI Spanish app?",
                answer:
                    "alya is free to download, real videos with translations, 7-day trial when eligible. Duolingo is also free but drill-based rather than immersion-based.",
            },
        ],
    },

    {
        slug: "how-to-learn-spanish-fast",
        title: "How to Learn Spanish Fast: The Immersion Method",
        metaTitle: "How to Learn Spanish Fast in 2026 | ALYA",
        metaDescription:
            "Learn Spanish fast with immersion. Scroll real videos daily, tap what you miss, save words. Here's a 3-month plan.",
        publishedAt: "2026-05-05",
        readingTime: "7 min read",
        category: "tier1",
        excerpt:
            "The fastest way to learn Spanish isn't drills, it's daily immersion you actually understand. Here's a 3-month plan.",
        relatedLanguage: "learn-spanish",
        content: [
            {
                type: "p",
                content:
                    "Spanish is the world's second-most spoken language and very accessible for English speakers. With immersion, you can understand basic clips in weeks, not years.",
            },
            {
                type: "h2",
                content: "Why Most People Learn Slowly",
            },
            {
                type: "ul",
                content: [
                    "Flashcards: words without context you can't recognize in speech",
                    "Grammar courses: rules you can't access at native speed",
                    "Drill apps: quiz sentences natives never say",
                    "Textbooks: formal Spanish that sounds stiff in real life",
                ],
            },
            {
                type: "h2",
                content: "The Immersion Method: Understand Real Spanish Daily",
            },
            {
                type: "p",
                content:
                    "Watch natives, with support: transcript, translation, tap-to-translate, slowdown. Your brain maps sound to meaning, the skill drills skip.",
            },
            {
                type: "h2",
                content: "A 3-Month Immersion Plan",
            },
            {
                type: "h3",
                content: "Month 1: Understand the Everyday (Beginner)",
            },
            {
                type: "p",
                content:
                    "Greetings, food, travel, numbers, in real clips, with full translations. 5–15 min/day. Tap everything. Save 5–10 words a day.",
            },
            {
                type: "h3",
                content: "Month 2: Expand (Intermediate)",
            },
            {
                type: "p",
                content:
                    "Vlogs, interviews, culture clips. Answer contextual prompts. Filter Explore by grammar you want (Past tense, Questions). Notice patterns, don't memorize tables.",
            },
            {
                type: "h3",
                content: "Month 3: Speed Up",
            },
            {
                type: "p",
                content:
                    "Native speed, slang, humor. Use 1x, rewind, tap less. Add shows and music. By month 3, everyday clips should feel comfortable.",
            },
            {
                type: "h2",
                content: "Phrases You'll Hear First",
            },
            {
                type: "ul",
                content: [
                    "¿Cómo estás?: How are you?",
                    "¿Dónde está...?: Where is...?",
                    "¿Cuánto cuesta?: How much?",
                    "Quisiera..., I would like...",
                    "No entiendo, I don't understand",
                    "¿Puedes repetir?: Can you repeat?",
                ],
            },
            {
                type: "quote",
                content:
                    "\"The best time to start understanding Spanish was yesterday. The second best time is your next scroll.\"",
            },
            {
                type: "cta",
                content:
                    "Start your immersion today with alya, free to download.",
            },
        ],
        faqs: [
            {
                question: "How long does it take to learn Spanish?",
                answer:
                    "Basic comprehension in weeks with daily immersion (5–30 min/day). Comfortable everyday understanding in 3–6 months. Full fluency takes longer, but immersion gets you understanding fast.",
            },
            {
                question: "What is the fastest way to learn Spanish?",
                answer:
                    "Daily comprehensible input: real videos with transcripts and translations. Tap unknown words, save them, review. Consistency beats intensity.",
            },
            {
                question: "Can I learn Spanish in 3 months?",
                answer:
                    "You can understand everyday clips and handle travel basics in 3 months of daily immersion. Native-level fluency takes longer, but 3 months changes everything.",
            },
            {
                question: "Is Spanish hard for English speakers?",
                answer:
                    "One of the easiest: phonetic spelling, shared vocabulary (-tion → -ción), straightforward basics. The hard part is speed, which immersion trains directly.",
            },
        ],
    },

    {
        slug: "spanish-conversation-practice-scenarios",
        title: "8 Real-Life Spanish Situations You'll Meet in Videos",
        metaTitle: "8 Spanish Situations to Understand Before You Travel | ALYA",
        metaDescription: "Don't freeze on your trip. Learn these 8 real Spanish situations, café, hotel, doctor, market, with key phrases for each.",
        publishedAt: "2026-06-06",
        readingTime: "9 min read",
        category: "tier1",
        excerpt: "Ordering food, asking directions, handling an emergency, the worst time to meet these is for the first time. Preview them here.",
        content: [
            { type: "p", content: "Apps teach 'the bear drinks milk.' Travel needs '¿Para aquí o para llevar?' Scenario immersion closes that gap: you hear whole situations, with translations, before you live them." },
            { type: "h2", content: "8 Situations to Understand First" },
            { type: "h3", content: "1. The Café" },
            { type: "ul", content: [
                "¿Me pone un café con leche, por favor?: A coffee with milk, please?",
                "¿Cuánto es?: How much?",
                "La cuenta, por favor., The bill, please.",
            ]},
            { type: "h3", content: "2. The Airport" },
            { type: "ul", content: [
                "¿Dónde está la puerta de embarque?: Where is the gate?",
                "Mi maleta no ha llegado., My suitcase didn't arrive.",
            ]},
            { type: "h3", content: "3. The Market" },
            { type: "ul", content: [
                "¿A cuánto está el kilo?: How much per kilo?",
                "¿Me lo puede rebajar?: Can you lower it a bit?",
            ]},
            { type: "h3", content: "4. The Hotel" },
            { type: "ul", content: [
                "Tengo una reserva a nombre de..., Reservation under...",
                "El aire no funciona., The AC isn't working.",
                "¿A qué hora es el desayuno?: What time is breakfast?",
            ]},
            { type: "h3", content: "5. The Doctor" },
            { type: "ul", content: [
                "Me duele aquí.: It hurts here.",
                "Soy alérgico a...: I'm allergic to...",
                "Necesito un médico que hable inglés.: I need an English-speaking doctor.",
            ]},
            { type: "h3", content: "6. Directions" },
            { type: "ul", content: [
                "¿Cómo llego a...?: How do I get to...?",
                "Gira a la izquierda / derecha., Turn left / right.",
                "Sigue recto., Go straight.",
            ]},
            { type: "h3", content: "7. The Restaurant" },
            { type: "ul", content: [
                "¿Tienen mesa para dos?: Table for two?",
                "¿Cuál es el plato del día?: What's today's special?",
                "Sin mariscos, por favor., No seafood, please.",
            ]},
            { type: "h3", content: "8. Meeting People" },
            { type: "ul", content: [
                "¿De dónde eres?: Where are you from?",
                "¿Cuánto tiempo llevas aquí?: How long have you been here?",
                "Me ha encantado conocerte., Great to meet you.",
            ]},
            { type: "h2", content: "How to Learn These with alya" },
            { type: "p", content: "Search Explore by topic, Travel, Food, Shopping, Health, and watch natives in these exact situations. Tap phrases, save them, hear them slowed down. By trip day, you've heard each situation dozens of times." },
            { type: "quote", content: "\"Confidence comes from recognizing the situation. Immersion lets you rehearse dozens before you travel.\"" },
            { type: "cta", content: "Preview all 8 situations in the alya feed, free." },
        ],
        faqs: [
            {
                question: "What Spanish should I learn before traveling?",
                answer: "Café/restaurant ordering, directions, hotel phrases, introductions, plus survival lines: No entiendo, ¿Puede repetir?, ¿Habla inglés?, Necesito ayuda.",
            },
            {
                question: "How do I practice Spanish before a trip?",
                answer: "Watch topic-filtered clips daily (15–20 min, 2–4 weeks out). Tap and save phrases. Slow down audio. You'll recognize the patterns live.",
            },
            {
                question: "What are the most important Spanish travel phrases?",
                answer: "¿Cuánto cuesta?, ¿Dónde está...?, Uno/a..., por favor, No entiendo, Necesito ayuda, La cuenta por favor, Me duele + body part.",
            },
            {
                question: "Is Spanish useful for South America travel?",
                answer: "Essential, official in 19 Latin American countries plus Mexico and Spain, 500M+ natives. Even basic comprehension transforms food, prices, and connections.",
            },
        ],
    },

    {
        slug: "learn-spanish-vocabulary-spaced-repetition",
        title: "The Best Way to Learn Spanish Vocabulary (That Actually Sticks)",
        metaTitle: "Best Way to Learn Spanish Vocabulary | ALYA",
        metaDescription: "Stop cramming lists. Save words from videos you love and review them, here's how video-context vocabulary sticks.",
        publishedAt: "2026-06-05",
        readingTime: "7 min read",
        category: "tier1",
        excerpt: "Study 50 words, remember 10? It's not effort, it's method. Words from videos stick because they come with a memory.",
        relatedLanguage: "learn-spanish",
        content: [
            { type: "p", content: "You study 50 words, feel good, return in three days, remember 10. Not a memory problem, a context problem. Words learned in real moments stick. Words from lists evaporate." },
            { type: "h2", content: "Why Video Context Wins" },
            { type: "p", content: "A word saved from a clip carries a face, a situation, a sound, an emotion. 'Aprovechar' from a travel vlog beats 'aprovechar = to take advantage of' on a card. Context is the mnemonic." },
            { type: "h2", content: "The Right Way to Build Vocabulary" },
            { type: "h3", content: "1. Save Words Where You Find Them" },
            { type: "p", content: "In alya, tap any word in any clip to save it. It remembers the video, the sentence, and the gloss, far more recallable than an isolated list." },
            { type: "h3", content: "2. High-Frequency First" },
            { type: "p", content: "Top 1,000 words cover ~85% of conversation. Top 3,000 cover nearly everything daily. Save from Travel, Food, Work, your domains, not rare literary words." },
            { type: "h3", content: "3. Review Briefly, Daily" },
            { type: "p", content: "5 minutes of review beats weekly marathons. With Plus, vocabulary is unlimited, save everything, review what matters." },
            { type: "h3", content: "4. Re-hear Every Word" },
            { type: "p", content: "Tap to hear native pronunciation (Aura-2 selena-es). Slow to 0.75x. Mimic. Hearing + seeing + saving triples retention." },
            { type: "h2", content: "How Many Words Do You Need?" },
            { type: "ul", content: [
                "500 words: survival phrases and simple clips",
                "1,000 words: casual conversation on familiar topics",
                "3,000 words: most everyday situations and media",
                "5,000 words: professionally fluent",
                "10,000+: near-native",
            ]},
            { type: "p", content: "At 500 words you already understand a lot, with translations filling the rest. Don't wait to start watching." },
            { type: "quote", content: "\"Vocabulary is the flesh of language. Get it from living content, not lists.\"" },
            { type: "cta", content: "Build vocabulary from real videos with alya, free." },
        ],
        faqs: [
            {
                question: "How many Spanish words per day?",
                answer: "Save 5–15 from clips you watch. Review daily for 5 minutes. Consistency beats quantity, 5/day every day beats 100 once a week.",
            },
            {
                question: "Best way to memorize Spanish vocabulary?",
                answer: "Learn in video context, save with the sentence, re-hear native audio, review briefly daily. Context + audio + repetition is the validated trio.",
            },
            {
                question: "How many words for conversational Spanish?",
                answer: "1,000–2,000 for comfortable casual topics. The top 1,000 cover ~85% of conversation. Start watching at 500, translations cover the rest.",
            },
            {
                question: "Flashcards or videos?",
                answer: "Videos first, review second. Videos supply context and pronunciation; review locks it in. alya does both: save from clips, review anytime.",
            },
        ],
    },

    {
        slug: "spanish-grammar-cards-guide",
        title: "Spanish Grammar Guide: 7 Rules You'll Hear in Real Videos",
        metaTitle: "Spanish Grammar Guide: 7 Rules in Real Videos | ALYA",
        metaDescription: "Stop memorizing tables. Here are the 7 Spanish rules that trip up English speakers, learned by hearing them in real clips.",
        publishedAt: "2026-06-04",
        readingTime: "8 min read",
        category: "tier1",
        excerpt: "Grammar tables don't survive native speed. Hearing rules in real videos does. Here are the 7 that matter most.",
        relatedLanguage: "learn-spanish",
        content: [
            { type: "p", content: "You can ace a conjugation quiz and blank when a native speaks. Rules in isolation don't transfer. Rules heard 50 times in context do." },
            { type: "h2", content: "7 Rules That Trip Up English Speakers" },
            { type: "h3", content: "1. Ser vs. Estar" },
            { type: "ul", content: [
                "Soy estudiante. (identity → ser)",
                "Estoy cansado. (state → estar)",
            ]},
            { type: "h3", content: "2. Por vs. Para" },
            { type: "ul", content: [
                "Te llamo por teléfono. (means → por)",
                "Esto es para ti. (recipient → para)",
            ]},
            { type: "h3", content: "3. The Subjunctive" },
            { type: "p", content: "Quiero que vengas. Ojalá llueva. Desire, wishes, doubt, everywhere in native speech. You'll hear it before you can explain it, and that's fine." },
            { type: "h3", content: "4. Me gusta (Indirect Objects)" },
            { type: "p", content: "'Me gusta el café' = 'coffee pleases me.' Backwards from English, but after 20 clips, it feels natural." },
            { type: "h3", content: "5. Reflexives (levantarse, llamarse)" },
            { type: "p", content: "Constant in vlogs and routines. Filter Morning Routine + intermediate and you'll drown in them (usefully)." },
            { type: "h3", content: "6. Gender Agreement" },
            { type: "p", content: "El libro / la mesa. Adjectives follow. Exposure beats rules, tap and notice." },
            { type: "h3", content: "7. Preterite vs. Imperfect" },
            { type: "ul", content: [
                "Comí pizza ayer. (done → preterite)",
                "Comía pizza los viernes. (habit → imperfect)",
            ]},
            { type: "h2", content: "How to Learn These in alya" },
            { type: "p", content: "Filter Explore by grammar, Questions, Present/Past tense, Commands, Polite phrases, Conversation. Watch natives use the rule, tap the words, save examples. Pattern first, name second." },
            { type: "quote", content: "\"Grammar isn't memorized. It's recognized, after enough real examples.\"" },
            { type: "cta", content: "Hear grammar in real clips with alya, free." },
        ],
        faqs: [
            {
                question: "Hardest Spanish grammar for English speakers?",
                answer: "The subjunctive, desire, doubt, emotion, hypotheticals. Best learned by hearing it in dozens of clips, not memorizing conjugations first.",
            },
            {
                question: "How long to learn Spanish grammar?",
                answer: "Core patterns (gender, basic tenses, reflexives) feel natural in 2–3 months of daily immersion. Subjunctive and por/para take 6–12 months of exposure.",
            },
            {
                question: "Ser vs. estar?",
                answer: "Ser = identity, origin, profession, time. Estar = states, location, mood. 'Ser for identity, estar for state.' Then hear 50 examples.",
            },
            {
                question: "Learn grammar before watching?",
                answer: "No. Watch first with translations. Notice patterns. Look up the name later. Usage before terminology is faster.",
            },
        ],
    },

    {
        slug: "how-to-learn-a-language-with-ai",
        title: "How Immersion + AI Actually Makes You Fluent",
        metaTitle: "How Immersion + AI Makes You Fluent in 2026 | ALYA",
        metaDescription:
            "Why AI immersion works: comprehensible input, instant support, infinite patience. Here's the science and how to use it.",
        publishedAt: "2026-04-21",
        readingTime: "9 min read",
        category: "tier1",
        excerpt:
            "AI immersion isn't hype. Here's the science (Krashen's input hypothesis) and how pre-translated video makes it daily-usable.",
        content: [
            {
                type: "p",
                content:
                    "A year ago AI language learning meant chatbots. In 2026 it means immersion at scale: thousands of native clips, each transcribed, translated, and glossed, so you understand real Spanish from day one.",
            },
            {
                type: "h2",
                content: "The Science: Comprehensible Input",
            },
            {
                type: "p",
                content:
                    "Krashen's Input Hypothesis: we acquire language from messages slightly above our level that we can still understand. alya manufactures exactly that, real videos + transcript + translation + tap-to-translate = understandable input at any level.",
            },
            {
                type: "h2",
                content: "What AI Immersion Gets Right",
            },
            {
                type: "ul",
                content: [
                    "Real content, pre-supported, no blank chatbox, no prompting",
                    "Available whenever you have 5 minutes",
                    "No embarrassment, rewind and re-tap freely",
                    "Level-matched + topic-filtered",
                    "Infinite patience, same clip 20 times, zero judgment",
                    "Companion + streaks keep you consistent",
                ],
            },
            {
                type: "h2",
                content: "How to Use It",
            },
            {
                type: "h3",
                content: "1. Set Level + Topics Honestly",
            },
            {
                type: "p",
                content:
                    "Beginner + Travel/Food beats Advanced + random. The feed meets you where you are.",
            },
            {
                type: "h3",
                content: "2. Daily Beats Marathon",
            },
            {
                type: "p",
                content:
                    "10 minutes daily consolidates overnight. 2 hours weekly doesn't. Reminders (morning → night) help.",
            },
            {
                type: "h3",
                content: "3. Tap Shamelessly",
            },
            {
                type: "p",
                content:
                    "Every tap is a learning event. Slow to 0.75x. Save the word. Taps predict progress.",
            },
            {
                type: "h3",
                content: "4. Answer the Prompts",
            },
            {
                type: "p",
                content:
                    "Input builds comprehension; prompts build production. Respond in Spanish when nudged, short answers count.",
            },
            {
                type: "h3",
                content: "5. Follow Your Plan",
            },
            {
                type: "p",
                content:
                    "Onboarding sets clips, words, and sessions/week from your minutes and goals. Trust it for a month, then adjust.",
            },
            {
                type: "quote",
                content:
                    "\"Fluency is understanding, repeated thousands of times. AI just made the repetitions fun.\"",
            },
            {
                type: "cta",
                content:
                    "Start your immersion loop with alya, free.",
            },
        ],
        faqs: [
            {
                question: "Can you really learn with AI immersion?",
                answer:
                    "Yes, it's Krashen's hypothesis at scale. Real messages you understand, slightly above your level, daily. Pre-translated video delivers that without a tutor on call.",
            },
            {
                question: "How does alya's AI work?",
                answer:
                    "Clips are transcribed, translated, and word-aligned in advance with timing, glosses, levels, and topics, so playback shows prepared learning data instantly. Pronunciation uses Deepgram Aura-2.",
            },
            {
                question: "Is immersion better than Duolingo?",
                answer:
                    "For comprehension, yes. Duolingo builds habits and vocab. Immersion builds the ear. Most serious learners do both, drills plus daily video.",
            },
            {
                question: "What can I learn with alya?",
                answer:
                    "Spanish comprehension from beginner to advanced, 20 topics, 3 levels, grammar filters, with a companion that rewards consistency.",
            },
        ],
    },

    {
        slug: "alya-plus-trial-billing-explained",
        title: "ALYA Plus Explained: Trial, Billing, and What's Included",
        metaTitle: "ALYA Plus: Trial, Billing, What's Included | ALYA",
        metaDescription:
            "ALYA Plus in 2 minutes: 7-day free trial when eligible, Annual or Monthly via App Store, and the 3 Plus features.",
        publishedAt: "2026-06-10",
        readingTime: "3 min read",
        category: "tier1",
        excerpt:
            "Plus in 2 minutes: what's included, how the 7-day trial works, and how billing works.",
        content: [
            {
                type: "p",
                content:
                    "ALYA is free to download on iOS. Plus membership is required to use the feed. Here's the short version.",
            },
            {
                type: "h2",
                content: "What's included",
            },
            {
                type: "ul",
                content: [
                    "Unlimited Immersion, every clip, picked for your level",
                    "Instant Explanations, tap any phrase to understand it in context",
                    "Your Evolving Companion, complete clips and save words to grow ALYA",
                ],
            },
            {
                type: "h2",
                content: "Trial and billing",
            },
            {
                type: "ul",
                content: [
                    "7 days free when eligible, paywall shows Start Free Trial only then",
                    "Annual (best value) or Monthly, price shown in the App Store",
                    "Via App Store, iOS only",
                    "Renews automatically, cancel anytime before it ends",
                    "Already subscribed? Tap Restore in the paywall",
                ],
            },
            {
                type: "h2",
                content: "If you cancel",
            },
            {
                type: "p",
                content:
                    "You keep Plus until the end of the billing period. Words, stars, and companion progress stay saved.",
            },
            {
                type: "cta",
                content:
                    "Start with the 7-day trial when eligible, download alya.",
            },
        ],
        faqs: [
            {
                question: "Is ALYA free?",
                answer:
                    "Free to download on iOS. Plus membership is required to use the feed, with a 7-day free trial when eligible.",
            },
            {
                question: "What does ALYA Plus include?",
                answer:
                    "Unlimited Immersion, Instant Explanations, and Your Evolving Companion.",
            },
            {
                question: "How do I cancel or restore?",
                answer:
                    "Manage or cancel from Settings → Billing or your Apple ID subscriptions. Already subscribed on a new device? Tap Restore in the paywall.",
            },
        ],
    },
];
