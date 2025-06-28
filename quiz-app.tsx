"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RotateCcw, Trophy, Brain } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const quizData: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    explanation: "Paris is the capital and largest city of France.",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    explanation: "Mars is called the Red Planet due to iron oxide (rust) on its surface.",
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: 1,
    explanation: "The Blue Whale is the largest animal ever known to have lived on Earth.",
  },
  {
    id: 4,
    question: "In which year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    correctAnswer: 1,
    explanation: "World War II ended in 1945 with the surrender of Japan in September.",
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
    explanation: "Au comes from the Latin word 'aurum' meaning gold.",
  },
  {
    id: 6,
    question: "Which programming language was created by Brendan Eich?",
    options: ["Python", "JavaScript", "Java", "C++"],
    correctAnswer: 1,
    explanation: "JavaScript was created by Brendan Eich in 1995 while working at Netscape.",
  },
  {
    id: 7,
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correctAnswer: 1,
    explanation: "Vatican City is the smallest sovereign state in the world by area and population.",
  },
  {
    id: 8,
    question: "Which element has the atomic number 1?",
    options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
    correctAnswer: 1,
    explanation: "Hydrogen is the first element on the periodic table with atomic number 1.",
  },
]

export default function Component() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<number[]>([])

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return

    setSelectedAnswer(answerIndex)
    setShowFeedback(true)

    const newUserAnswers = [...userAnswers]
    newUserAnswers[currentQuestion] = answerIndex
    setUserAnswers(newUserAnswers)

    if (answerIndex === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setScore(0)
    setQuizCompleted(false)
    setUserAnswers([])
  }

  const getScoreColor = () => {
    const percentage = (score / quizData.length) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreMessage = () => {
    const percentage = (score / quizData.length) * 100
    if (percentage >= 90) return "Outstanding! 🎉"
    if (percentage >= 80) return "Great job! 👏"
    if (percentage >= 70) return "Good work! 👍"
    if (percentage >= 60) return "Not bad! 📚"
    return "Keep studying! 💪"
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Quiz Completed!</CardTitle>
            <CardDescription className="text-lg">{getScoreMessage()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-6xl font-bold ${getScoreColor()}`}>
                {score}/{quizData.length}
              </div>
              <p className="text-gray-600 mt-2">{Math.round((score / quizData.length) * 100)}% Correct</p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Review Your Answers:</h3>
              {quizData.map((question, index) => (
                <div key={question.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">Question {index + 1}</span>
                  {userAnswers[index] === question.correctAnswer ? (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Correct
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="bg-red-100 text-red-800">
                      <XCircle className="w-3 h-3 mr-1" />
                      Incorrect
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            <Button onClick={restartQuiz} className="w-full" size="lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              Take Quiz Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-600" />
              <CardTitle className="text-2xl font-bold">Interactive Quiz</CardTitle>
            </div>
            <Badge variant="outline" className="text-sm">
              Question {currentQuestion + 1} of {quizData.length}
            </Badge>
          </div>
          <Progress value={((currentQuestion + 1) / quizData.length) * 100} className="w-full h-2" />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Progress: {Math.round(((currentQuestion + 1) / quizData.length) * 100)}%</span>
            <span>
              Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-6">{quizData[currentQuestion].question}</h2>

            <div className="grid gap-3">
              {quizData[currentQuestion].options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left border-2 transition-all duration-200 hover:border-blue-300"

                if (showFeedback) {
                  if (index === quizData[currentQuestion].correctAnswer) {
                    buttonClass += " border-green-500 bg-green-50 text-green-800"
                  } else if (index === selectedAnswer && index !== quizData[currentQuestion].correctAnswer) {
                    buttonClass += " border-red-500 bg-red-50 text-red-800"
                  } else {
                    buttonClass += " border-gray-200 bg-gray-50 text-gray-500"
                  }
                } else {
                  buttonClass += " border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={showFeedback}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {showFeedback && index === quizData[currentQuestion].correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      {showFeedback &&
                        index === selectedAnswer &&
                        index !== quizData[currentQuestion].correctAnswer && (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {showFeedback && (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg ${
                  selectedAnswer === quizData[currentQuestion].correctAnswer
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {selectedAnswer === quizData[currentQuestion].correctAnswer ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">Correct!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-red-800">Incorrect</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-700">{quizData[currentQuestion].explanation}</p>
              </div>

              <Button onClick={handleNextQuestion} className="w-full" size="lg">
                {currentQuestion < quizData.length - 1 ? "Next Question" : "View Results"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
