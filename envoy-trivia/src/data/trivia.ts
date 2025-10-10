export interface TriviaQuestion {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number;
  explanation?: string;
}

export const triviaQuestions: TriviaQuestion[] = [
  {
    id: 1,
    question: "What is Larry Gadea's middle name?",
    answers: ["Michael", "James", "David", "Robert"],
    correctAnswer: 0,
    explanation: "Larry's full name is Larry Michael Gadea - he goes by Larry, but Michael is his middle name!"
  },
  {
    id: 2,
    question: "What year was Envoy founded?",
    answers: ["2013", "2014", "2015", "2016"],
    correctAnswer: 0,
    explanation: "Envoy was founded in 2013 by Larry Gadea to revolutionize the workplace experience."
  },
  {
    id: 3,
    question: "What was Envoy's original name?",
    answers: ["VisitorHub", "Receptionist", "CheckMate", "Envoy has always been Envoy"],
    correctAnswer: 1,
    explanation: "Envoy was originally called 'Receptionist' before rebranding to Envoy!"
  },
  {
    id: 4,
    question: "Where is Envoy's headquarters located?",
    answers: ["New York City", "San Francisco", "Austin", "Seattle"],
    correctAnswer: 1,
    explanation: "Envoy is headquartered in San Francisco, California - the heart of tech innovation!"
  },
  {
    id: 5,
    question: "What inspired Larry to create Envoy?",
    answers: ["A bad haircut", "A frustrating visitor sign-in experience", "A coffee shop", "His pet dog"],
    correctAnswer: 1,
    explanation: "Larry was inspired to create Envoy after experiencing the archaic visitor sign-in process at tech companies."
  },
  {
    id: 6,
    question: "How many cups of coffee does the average Envoy employee drink per day?",
    answers: ["1-2 cups", "3-4 cups", "5-6 cups", "We survive on vibes"],
    correctAnswer: 1,
    explanation: "The average Envoy team member drinks 3-4 cups of coffee per day to stay energized!"
  },
  {
    id: 7,
    question: "What is Envoy's signature color?",
    answers: ["Blue", "Red", "Green", "Purple"],
    correctAnswer: 1,
    explanation: "Envoy Red (#FF4B4B) is the signature color that represents energy, warmth, and welcome!"
  },
  {
    id: 8,
    question: "What's the most common snack in Envoy's office?",
    answers: ["Granola bars", "Trail mix", "Pizza", "Fruit"],
    correctAnswer: 0,
    explanation: "Granola bars are the go-to snack for busy Envoy employees on the move!"
  },
  {
    id: 9,
    question: "Which famous company was NOT an early Envoy customer?",
    answers: ["Dropbox", "Pinterest", "McDonald's", "Slack"],
    correctAnswer: 2,
    explanation: "Tech companies like Dropbox, Pinterest, and Slack were early adopters. McDonald's... not so much!"
  },
  {
    id: 10,
    question: "What does Envoy's logo represent?",
    answers: ["A door", "A handshake", "A building", "A wave"],
    correctAnswer: 1,
    explanation: "Envoy's logo represents a handshake, symbolizing the warm welcome and connection we provide!"
  },
  {
    id: 11,
    question: "How many visitors has Envoy processed worldwide?",
    answers: ["1 million", "10 million", "100 million+", "500 thousand"],
    correctAnswer: 2,
    explanation: "Envoy has processed over 100 million visitors worldwide! That's a lot of hellos!"
  },
  {
    id: 12,
    question: "What's the unofficial Envoy office pet name?",
    answers: ["Sir Barks-a-Lot", "Office dogs vary", "No pets allowed", "Mr. Whiskers"],
    correctAnswer: 1,
    explanation: "Envoy is dog-friendly! Multiple furry friends join the team, making every day a bit more pawsome!"
  }
];
