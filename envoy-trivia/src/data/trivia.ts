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
    question: "What year was Envoy founded?",
    answers: ["2013", "2014", "2015", "2016"],
    correctAnswer: 0,
    explanation: "Envoy was founded in 2013 by Larry Gadea."
  },
  {
    id: 2,
    question: "What is Envoy's primary product?",
    answers: ["Visitor Management", "Employee Scheduling", "Office Security", "Meeting Rooms"],
    correctAnswer: 0,
    explanation: "Envoy's flagship product is visitor management software for modern offices."
  },
  {
    id: 3,
    question: "Which company acquired Envoy in 2021?",
    answers: ["Microsoft", "Google", "Salesforce", "Amazon"],
    correctAnswer: 2,
    explanation: "Salesforce acquired Envoy in 2021 to expand their workplace solutions."
  },
  {
    id: 4,
    question: "What does Envoy's logo represent?",
    answers: ["A door", "A handshake", "A building", "A wave"],
    correctAnswer: 1,
    explanation: "Envoy's logo represents a handshake, symbolizing connection and welcome."
  },
  {
    id: 5,
    question: "How many employees does Envoy have?",
    answers: ["50-100", "100-200", "200-500", "500+"],
    correctAnswer: 2,
    explanation: "Envoy has grown to over 200 employees across multiple offices."
  },
  {
    id: 6,
    question: "What is Envoy's company motto?",
    answers: ["Welcome to the future", "Making offices work", "Connect better", "Workplace reimagined"],
    correctAnswer: 1,
    explanation: "Envoy's mission is 'Making offices work' by simplifying workplace operations."
  },
  {
    id: 7,
    question: "Which feature is NOT part of Envoy's platform?",
    answers: ["Visitor check-in", "Package delivery", "Room booking", "Email marketing"],
    correctAnswer: 3,
    explanation: "Envoy focuses on workplace operations, not marketing tools."
  },
  {
    id: 8,
    question: "What color is Envoy's primary brand color?",
    answers: ["Blue", "Red", "Green", "Purple"],
    correctAnswer: 1,
    explanation: "Envoy's signature color is red (#FF4B4B), representing energy and welcome."
  },
  {
    id: 9,
    question: "What is the name of Envoy's visitor management app?",
    answers: ["Envoy Protect", "Envoy Visitors", "Envoy Check-in", "Envoy Welcome"],
    correctAnswer: 0,
    explanation: "Envoy Protect is the main visitor management platform that helps offices manage guests."
  },
  {
    id: 10,
    question: "Which industry does Envoy primarily serve?",
    answers: ["Healthcare", "Education", "Corporate Offices", "Retail"],
    correctAnswer: 2,
    explanation: "Envoy primarily serves corporate offices and modern workplaces with visitor management solutions."
  },
  {
    id: 11,
    question: "What feature helps with package delivery management?",
    answers: ["Envoy Deliveries", "Package Tracking", "Delivery Notifications", "All of the above"],
    correctAnswer: 3,
    explanation: "Envoy offers comprehensive package delivery management including tracking and notifications."
  },
  {
    id: 12,
    question: "Which company is NOT a competitor of Envoy?",
    answers: ["Proxy", "The Receptionist", "iLobby", "Slack"],
    correctAnswer: 3,
    explanation: "Slack is a communication platform, not a visitor management competitor."
  }
];
