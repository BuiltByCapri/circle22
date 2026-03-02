const questions = [
    // THE NEEDLE (How You Show Up) - Q1-Q3, Q17-Q18
    {
        id: 1,
        element: "The Needle",
        elementLabel: "How You Show Up",
        text: "In early conversations, you usually:",
        type: "single",
        options: [
            { value: "A", text: "Open up quickly and honestly" },
            { value: "B", text: "Warm up gradually, let curiosity grow" },
            { value: "C", text: "Match the other person's energy" },
            { value: "D", text: "Keep things light at first" }
        ]
    },
    {
        id: 2,
        element: "The Needle",
        elementLabel: "How You Show Up",
        text: "You feel most engaged when:",
        type: "single",
        options: [
            { value: "A", text: "The conversation flows easily" },
            { value: "B", text: "You're exchanging thoughtful ideas" },
            { value: "C", text: "Humor and play are present" },
            { value: "D", text: "There's emotional depth" }
        ]
    },
    {
        id: 3,
        element: "The Needle",
        elementLabel: "How You Show Up",
        text: "In one-on-one moments, you tend to:",
        type: "single",
        options: [
            { value: "A", text: "Ask more questions than you answer" },
            { value: "B", text: "Share openly once invited" },
            { value: "C", text: "Be expressive and animated" },
            { value: "D", text: "Be reflective and measured" }
        ]
    },
    
    // THE ROSE (Energy & Tempo) - Q4-Q6, Q19-Q20
    {
        id: 4,
        element: "The Rose",
        elementLabel: "Energy & Tempo",
        text: "Your conversational pace is usually:",
        type: "single",
        options: [
            { value: "A", text: "Slow and spacious" },
            { value: "B", text: "Steady and flowing" },
            { value: "C", text: "Energetic and dynamic" }
        ]
    },
    {
        id: 5,
        element: "The Rose",
        elementLabel: "Energy & Tempo",
        text: "During a night out socially, you usually:",
        type: "single",
        options: [
            { value: "A", text: "Move across the venue, being seen" },
            { value: "B", text: "Move between a few conversations" },
            { value: "C", text: "Let the night unfold organically" },
            { value: "D", text: "Find a cozy spot and plant yourself for the evening" }
        ]
    },
    {
        id: 6,
        element: "The Rose",
        elementLabel: "Energy & Tempo",
        text: "You feel most at ease with:",
        type: "single",
        options: [
            { value: "A", text: "Clear interest and direction" },
            { value: "B", text: "Mutual curiosity without pressure" },
            { value: "C", text: "Subtlety and understatement" }
        ]
    },
    
    // THE BEARING (What Draws You In) - Q7-Q10
    {
        id: 7,
        element: "The Bearing",
        elementLabel: "What Draws You In",
        text: "You tend to notice first:",
        type: "single",
        options: [
            { value: "A", text: "Warmth and friendliness" },
            { value: "B", text: "Curiosity and intellect" },
            { value: "C", text: "Confidence and presence" },
            { value: "D", text: "Ease and comfort in the moment" }
        ]
    },
    {
        id: 8,
        element: "The Bearing",
        elementLabel: "What Draws You In",
        text: "You're most intrigued by people who are: (select up to two)",
        type: "multiple",
        maxSelections: 2,
        options: [
            { value: "A", text: "Thoughtful and introspective" },
            { value: "B", text: "Warm and expressive" },
            { value: "C", text: "Grounded and steady" },
            { value: "D", text: "Curious and exploratory" }
        ]
    },
    {
        id: 9,
        element: "The Bearing",
        elementLabel: "What Draws You In",
        text: "In connection, you most value: (select up to 2)",
        type: "multiple",
        maxSelections: 2,
        options: [
            { value: "A", text: "Emotional intelligence" },
            { value: "B", text: "Humor" },
            { value: "C", text: "Depth of thought" },
            { value: "D", text: "Ease and presence" }
        ]
    },
    {
        id: 10,
        element: "The Bearing",
        elementLabel: "What Draws You In",
        text: "Differences that feel energizing (not challenging):",
        type: "single",
        options: [
            { value: "A", text: "Background or culture" },
            { value: "B", text: "Communication style" },
            { value: "C", text: "Perspective on life" },
            { value: "D", text: "I usually prefer similarity" }
        ]
    },
    
    // THE ANCHOR (How You Hold Connection) - Q11-Q13, Q21-Q22
    {
        id: 11,
        element: "The Anchor",
        elementLabel: "How You Hold Connection",
        text: "When a connection feels promising, you usually:",
        type: "single",
        options: [
            { value: "A", text: "Lean in" },
            { value: "B", text: "Take your time" },
            { value: "C", text: "Let the other person set the pace" },
            { value: "D", text: "Stay curious without expectation" }
        ]
    },
    {
        id: 12,
        element: "The Anchor",
        elementLabel: "How You Hold Connection",
        text: "When something isn't clicking, you tend to:",
        type: "single",
        options: [
            { value: "A", text: "Gently step back" },
            { value: "B", text: "Try to adjust" },
            { value: "C", text: "Name it directly" },
            { value: "D", text: "Let it fade naturally" }
        ]
    },
    {
        id: 13,
        element: "The Anchor",
        elementLabel: "How You Hold Connection",
        text: "In new conversations, you feel most satisfied by:",
        type: "single",
        options: [
            { value: "A", text: "Sharing stories and experiences" },
            { value: "B", text: "Exploring ideas or perspectives" },
            { value: "C", text: "Laughing and lightheartedness" },
            { value: "D", text: "Feeling mutual understanding" }
        ]
    },
    
    // Open Text Questions - Q14-Q16
    {
        id: 14,
        element: "Open Response",
        elementLabel: "Help Us Understand You",
        text: "You tend to feel most at ease with people who...",
        type: "text",
        placeholder: "Share what helps you feel comfortable..."
    },
    {
        id: 15,
        element: "Open Response",
        elementLabel: "Help Us Understand You",
        text: "You're least compatible with people who...",
        type: "text",
        placeholder: "Share what doesn't work for you..."
    },
    {
        id: 16,
        element: "Open Response",
        elementLabel: "Help Us Understand You",
        text: "What's one thing about you that wouldn't come across in a typical dating app profile?",
        type: "text",
        placeholder: "This helps us understand you beyond the Compass scores...",
        helperText: "Your answer won't affect your results, but it will help us match you with compatible guests."
    },
    
    // NEW QUESTIONS - Q17-Q22
    {
        id: 17,
        element: "The Needle",
        elementLabel: "How You Show Up",
        text: "When you're interested in someone, you tend to:",
        type: "single",
        options: [
            { value: "A", text: "Show it through your attention and presence" },
            { value: "B", text: "Make your interest known verbally" },
            { value: "C", text: "Wait to see if they're interested first" },
            { value: "D", text: "Let it build naturally without forcing it" }
        ]
    },
    {
        id: 18,
        element: "The Needle",
        elementLabel: "How You Show Up",
        text: "Your sense of humor tends to be:",
        type: "single",
        options: [
            { value: "A", text: "Playful and teasing" },
            { value: "B", text: "Dry and observational" },
            { value: "C", text: "Warm and self-deprecating" },
            { value: "D", text: "Quick-witted and clever" }
        ]
    },
    {
        id: 19,
        element: "The Rose",
        elementLabel: "Energy & Tempo",
        text: "After a long day, you're more likely to:",
        type: "single",
        options: [
            { value: "A", text: "Recharge alone with a book, show, or quiet activity" },
            { value: "B", text: "Process the day with a friend or partner" },
            { value: "C", text: "Stay active - work out, walk, or keep moving" },
            { value: "D", text: "Do something creative or hands-on" }
        ]
    },
    {
        id: 20,
        element: "The Rose",
        elementLabel: "Energy & Tempo",
        text: "In social settings, you're usually:",
        type: "single",
        options: [
            { value: "A", text: "The first to arrive, last to leave" },
            { value: "B", text: "Happiest in smaller groups or one-on-one" },
            { value: "C", text: "Energized by meeting new people" },
            { value: "D", text: "Comfortable but prefer depth over breadth" }
        ]
    },
    {
        id: 21,
        element: "The Anchor",
        elementLabel: "How You Hold Connection",
        text: "When conflict arises, you tend to:",
        type: "single",
        options: [
            { value: "A", text: "Address it directly and calmly" },
            { value: "B", text: "Need time to process before talking" },
            { value: "C", text: "Prefer to resolve it in the moment" },
            { value: "D", text: "Let minor things go, address only what matters" }
        ]
    },
    {
        id: 22,
        element: "The Anchor",
        elementLabel: "How You Hold Connection",
        text: "You feel most cared for when someone:",
        type: "single",
        options: [
            { value: "A", text: "Shows up consistently and reliably" },
            { value: "B", text: "Remembers the small details about you" },
            { value: "C", text: "Makes time even when life gets busy" },
            { value: "D", text: "Expresses affection openly" }
        ]
    }
];
