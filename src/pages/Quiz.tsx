import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const Quiz = () => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes per question
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the motto of House Stark?",
      options: ["Fire and Blood", "Winter is Coming", "Hear Me Roar", "Growing Strong"],
      correct: 1,
      explanation: "Winter is Coming is the motto of House Stark, warning of hard times ahead."
    },
    {
      id: 2,
      question: "Who is known as the Mother of Dragons?",
      options: ["Cersei Lannister", "Arya Stark", "Daenerys Targaryen", "Sansa Stark"],
      correct: 2,
      explanation: "Daenerys Targaryen is called the Mother of Dragons after hatching three dragon eggs."
    },
    {
      id: 3,
      question: "What is the name of Jon Snow's direwolf?",
      options: ["Ghost", "Summer", "Lady", "Nymeria"],
      correct: 0,
      explanation: "Ghost is Jon Snow's albino direwolf, named for his silent nature."
    },
    {
      id: 4,
      question: "Which city is the capital of the Seven Kingdoms?",
      options: ["Winterfell", "Casterly Rock", "King's Landing", "Dragonstone"],
      correct: 2,
      explanation: "King's Landing is the capital city where the Iron Throne is located."
    },
    {
      id: 5,
      question: "What is Valyrian steel known for?",
      options: ["Being unbreakable", "Killing White Walkers", "Being very expensive", "All of the above"],
      correct: 3,
      explanation: "Valyrian steel is extremely rare, sharp, and most importantly, can kill White Walkers."
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, quizCompleted, showResult]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
      toast({
        title: "Correct! 🎉",
        description: questions[currentQuestion].explanation,
        duration: 2000,
      });
    } else {
      toast({
        title: "Incorrect 😔",
        description: questions[currentQuestion].explanation,
        variant: "destructive",
        duration: 2000,
      });
    }

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setTimeLeft(120);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 3000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(120);
    setQuizCompleted(false);
    setShowResult(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "🏆 Maester Level! You know Westeros well!";
    if (percentage >= 60) return "⚔️ Knight Level! Good knowledge of the realm!";
    if (percentage >= 40) return "🛡️ Squire Level! You're learning the ways!";
    return "📚 Recruit Level! Time to rewatch the series!";
  };

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <motion.section
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="pt-32 pb-20 px-6 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="card-epic"
            >
              <div className="text-6xl mb-6">
                {score >= 4 ? '👑' : score >= 3 ? '⚔️' : score >= 2 ? '🛡️' : '📚'}
              </div>
              
              <h1 className="font-display text-5xl md:text-7xl text-gold mb-6 text-glow">
                Quiz Complete!
              </h1>
              
              <div className="mb-8">
                <div className="text-6xl font-bold text-accent mb-4">
                  {score}/{questions.length}
                </div>
                <p className="font-title text-2xl text-foreground/80 mb-4">
                  {getScoreMessage()}
                </p>
              </div>

              {/* Score Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-secondary/30 rounded-xl p-6">
                  <div className="text-3xl text-green-400 mb-2">✓</div>
                  <div className="font-title text-xl">Correct</div>
                  <div className="text-2xl font-bold text-green-400">{score}</div>
                </div>
                
                <div className="bg-secondary/30 rounded-xl p-6">
                  <div className="text-3xl text-red-400 mb-2">✗</div>
                  <div className="font-title text-xl">Incorrect</div>
                  <div className="text-2xl font-bold text-red-400">{questions.length - score}</div>
                </div>
                
                <div className="bg-secondary/30 rounded-xl p-6">
                  <div className="text-3xl text-gold mb-2">%</div>
                  <div className="font-title text-xl">Score</div>
                  <div className="text-2xl font-bold text-gold">
                    {Math.round((score / questions.length) * 100)}%
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restartQuiz}
                className="btn-royal"
              >
                🔄 Take Quiz Again
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Quiz Header */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pt-32 pb-12 px-6 text-center bg-gradient-night"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-6xl text-gold mb-4 text-glow">
            Test Your Knowledge
          </h1>
          <p className="font-title text-xl text-foreground/80">
            How well do you know the world of Westeros?
          </p>
        </div>
      </motion.section>

      {/* Quiz Progress */}
      <section className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="font-title text-lg">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            
            <div className={`font-title text-xl px-4 py-2 rounded-lg ${
              timeLeft <= 30 ? 'bg-targaryen text-white pulse-glow' : 'bg-secondary text-foreground'
            }`}>
              ⏰ {formatTime(timeLeft)}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-secondary/30 rounded-full h-3 mb-8">
            <motion.div
              className="bg-gradient-gold h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </section>

      {/* Quiz Content */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={currentQuestion}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="card-epic"
              >
                <h2 className="font-title text-2xl md:text-3xl text-gold mb-8 text-center">
                  {questions[currentQuestion].question}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(index)}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        selectedAnswer === index
                          ? 'border-gold bg-gold/20 text-gold'
                          : 'border-border hover:border-gold/50 hover:bg-secondary/50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === index ? 'border-gold bg-gold text-black' : 'border-border'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="font-title text-lg">{option}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                    className={`px-8 py-4 rounded-lg font-title font-semibold transition-all duration-300 ${
                      selectedAnswer !== null
                        ? 'btn-royal'
                        : 'bg-secondary/50 text-muted-foreground cursor-not-allowed'
                    }`}
                  >
                    {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'} →
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="text-center py-20"
              >
                <div className="text-8xl mb-8">
                  {selectedAnswer === questions[currentQuestion].correct ? '🎉' : '😔'}
                </div>
                <h3 className="font-display text-4xl text-gold mb-4">
                  {selectedAnswer === questions[currentQuestion].correct ? 'Correct!' : 'Incorrect!'}
                </h3>
                <p className="font-title text-xl text-foreground/80 max-w-2xl mx-auto">
                  {questions[currentQuestion].explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Quiz;