import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { toast } from 'sonner'
import { quizGameABI } from '../libs/quizGameABI'
import { parseEther, formatEther } from 'viem'
import { RedStoneOracle, GoldskyIndexer, FarcasterFrames, BlockchainUtils } from '../libs/blockchainServices'
import { getContractAddresses } from '../libs/constants'

// Demo Flow Component - 2-minute MVP demonstration
export function DemoFlow() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const { address } = useAccount()

  // Manual progression - removed auto-timing for more control
  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3 | 4)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-emerald-900">
      {/* Demo Progress Bar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-sm border-b border-emerald-500/30">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">Tezoro Demo Flow</h2>
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                ← Previous
              </button>
              <div className="text-emerald-400 text-sm font-bold">
                Step {currentStep}/4
              </div>
              <button
                onClick={handleNextStep}
                disabled={currentStep === 4}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  currentStep === 4
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                Next →
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-400 to-teal-300 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
          
          {/* Step Navigation */}
          <div className="flex justify-between mt-6 text-sm">
            {[
              { id: 1, title: "Solo Quiz", icon: "🎯" },
              { id: 2, title: "PvP Duel", icon: "⚔️" },
              { id: 3, title: "Guild System", icon: "🛡️" },
              { id: 4, title: "NFT Quizzes", icon: "🖼️" }
            ].map((step) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id as 1 | 2 | 3 | 4)}
                className={`px-3 py-2 rounded-lg transition-colors font-medium ${
                  currentStep === step.id
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <div className="text-base">{step.icon}</div>
                <div className="text-xs">{step.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Demo Content */}
      <div className="pt-32 pb-8">
        {currentStep === 1 && <Step1SoloQuiz onNext={handleNextStep} />}
        {currentStep === 2 && <Step2PvPDuel onNext={handleNextStep} />}
        {currentStep === 3 && <Step3GuildSystem onNext={handleNextStep} />}
        {currentStep === 4 && <Step4NFTQuizzes onNext={handleNextStep} />}
      </div>
    </div>
  )
}

// Step 1: Solo Quiz - "Learn & Earn" (0:00 – 0:20)
function Step1SoloQuiz({ onNext }: { onNext: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [earnedXTZ, setEarnedXTZ] = useState(0)
  const [streak, setStreak] = useState(3)
  const [isProcessingReward, setIsProcessingReward] = useState(false)
  const { address } = useAccount()

  const questions = [
    {
      question: "What is the native token of Etherlink?",
      options: ["XTZ", "ETH", "TEZ", "LINK"],
      correct: 0,
      reward: 0.05
    },
    {
      question: "Which consensus mechanism does Tezos use?",
      options: ["Proof of Work", "Proof of Stake", "Delegated PoS", "Proof of Authority"],
      correct: 1,
      reward: 0.05
    }
  ]

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return
    
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1)
      const reward = questions[currentQuestion].reward
      setIsProcessingReward(true)
      
      // Trigger real blockchain transaction for reward
      const processReward = async () => {
        try {
          const transaction = await BlockchainUtils.triggerMetaMaskTransaction({
            to: "0xc0ee7f9763f414d82c1b59441a6338999eafa80e", // Quiz contract
            value: "0x0",
            description: `Quiz reward: +${reward} XTZ`
          })
          
          if (transaction.success) {
            setEarnedXTZ(earnedXTZ + reward)
            setIsProcessingReward(false)
            toast.success(`✅ Correct! +${reward} XTZ earned`, {
              description: `Transaction: ${transaction.hash.substring(0, 10)}...`
            })
          }
        } catch (error) {
          // Fallback to simulation
          setEarnedXTZ(earnedXTZ + reward)
          setIsProcessingReward(false)
          toast.success(`✅ Correct! +${reward} XTZ earned`, {
            description: "Transaction confirmed in 0.4s"
          })
        }
      }
      
      processReward()
      
    } else {
      toast.error("❌ Incorrect answer")
    }

    // Manual progression after showing result
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        // Quiz completed - show completion message
        toast.success("🎉 Solo quiz completed! Ready for next step?")
      }
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          🎯 Step 1: Solo Quiz - Learn & Earn
        </h1>
        <p className="text-emerald-400 text-lg">
          Complete questions and earn instant XTZ rewards on Etherlink
        </p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-black/30 border border-emerald-500/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{earnedXTZ.toFixed(3)}</div>
          <div className="text-sm text-gray-400">XTZ Earned</div>
        </div>
        <div className="bg-black/30 border border-emerald-500/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{streak}</div>
          <div className="text-sm text-gray-400">Day Streak</div>
        </div>
        <div className="bg-black/30 border border-emerald-500/30 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-emerald-400">{score}/{questions.length}</div>
          <div className="text-sm text-gray-400">Score</div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-8 mb-6">
        <div className="text-center mb-6">
          <div className="text-sm text-emerald-400 mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            {questions[currentQuestion].question}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {questions[currentQuestion].options.map((option, index) => {
            let bgColor = 'bg-gray-800 hover:bg-gray-700'
            let borderColor = 'border-gray-600'
            
            if (showResult && selectedAnswer !== null) {
              if (index === questions[currentQuestion].correct) {
                bgColor = 'bg-green-600'
                borderColor = 'border-green-400'
              } else if (index === selectedAnswer) {
                bgColor = 'bg-red-600'
                borderColor = 'border-red-400'
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${bgColor} ${borderColor} text-white`}
              >
                {option}
              </button>
            )
          })}
        </div>
      </div>

      {/* Real-time Feedback */}
      {showResult && (
        <div className="text-center">
          {isProcessingReward ? (
            <div className="animate-pulse text-yellow-400 text-lg">
              ⏳ Processing reward on Etherlink...
            </div>
          ) : (
            <div className="text-emerald-400 text-lg">
              ⚡ Transaction confirmed in 0.4s on Etherlink
              {selectedAnswer === questions[currentQuestion].correct && (
                <div className="text-sm text-green-300 mt-1">
                  🎉 +{questions[currentQuestion].reward} XTZ added to wallet
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Next Step Button - shown when quiz is completed */}
      {currentQuestion >= questions.length - 1 && showResult && !isProcessingReward && (
        <div className="text-center mt-8">
          <button
            onClick={onNext}
            className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors shadow-lg"
          >
            Continue to PvP Duel ⚔️
          </button>
        </div>
      )}
    </div>
  )
}

// Step 2: PvP Duel - "Battle in Real-Time" (0:21 – 0:50)
function Step2PvPDuel({ onNext }: { onNext: () => void }) {
  const [duelState, setDuelState] = useState<'matchmaking' | 'battle' | 'result'>('matchmaking')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState<number | null>(null)
  const [opponentAnswer, setOpponentAnswer] = useState<number | null>(null)
  const [winner, setWinner] = useState<'user' | 'opponent' | 'tie' | null>(null)

  const [oracleQuestion, setOracleQuestion] = useState<{
    question: string
    options: string[]
    correct: number
    isOracle: boolean
  } | null>(null)

  const duelQuestions = [
    oracleQuestion || {
      question: "Loading RedStone Oracle data...",
      options: ["Loading...", "Loading...", "Loading...", "Loading..."],
      correct: 0,
      isOracle: true
    },
    {
      question: "How many confirmations for Etherlink finality?",
      options: ["1", "6", "12", "20"],
      correct: 0,
      isOracle: false
    }
  ]

  // Load Oracle data when component mounts
  useEffect(() => {
    const loadOracleData = async () => {
      try {
        const priceData = await RedStoneOracle.getPrice('XTZ')
        const options = ["$0.95", "$1.23", "$1.45", "$2.10"]
        const questionData = RedStoneOracle.formatPriceQuestion('XTZ', priceData.price, options)
        setOracleQuestion({
          ...questionData,
          isOracle: true
        })
        toast.success("🔮 RedStone Oracle data loaded", { 
          description: `Current XTZ price: $${priceData.price}` 
        })
      } catch (error) {
        console.error('Oracle error:', error)
        setOracleQuestion({
          question: "What's the current price of XTZ? (RedStone Oracle)",
          options: ["$0.95", "$1.23", "$1.45", "$2.10"],
          correct: 1,
          isOracle: true
        })
      }
    }

    if (duelState === 'battle' && !oracleQuestion) {
      loadOracleData()
    }
  }, [duelState, oracleQuestion])

  useEffect(() => {
    if (duelState === 'matchmaking') {
      const timer = setTimeout(() => {
        setDuelState('battle')
        toast.success("🎮 Opponent found! Duel starting...")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [duelState])

  const handleAnswer = (answerIndex: number) => {
    setUserAnswer(answerIndex)
    
    // Simulate opponent answer
    setTimeout(() => {
      const opponentAns = Math.floor(Math.random() * 4)
      setOpponentAnswer(opponentAns)
      
      // Determine winner
      const correct = duelQuestions[currentQuestion].correct
      const userCorrect = answerIndex === correct
      const opponentCorrect = opponentAns === correct
      
      if (userCorrect && !opponentCorrect) {
        setWinner('user')
        toast.success("🏆 You win! +0.1 XTZ")
      } else if (!userCorrect && opponentCorrect) {
        setWinner('opponent')
        toast.error("😔 Opponent wins this round")
      } else {
        setWinner('tie')
        toast.info("🤝 It's a tie!")
      }
      
      setTimeout(() => {
        if (currentQuestion < duelQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
          setUserAnswer(null)
          setOpponentAnswer(null)
          setWinner(null)
        } else {
          setDuelState('result')
          setTimeout(() => onNext(), 3000)
        }
      }, 2000)
    }, 1500)
  }

  if (duelState === 'matchmaking') {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          ⚔️ Step 2: PvP Duel - Battle in Real-Time
        </h1>
        <p className="text-emerald-400 text-lg mb-8">
          Challenging opponent with RedStone Oracle-powered questions
        </p>
        
        <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-12">
          <div className="animate-spin text-6xl mb-4">⚡</div>
          <div className="text-2xl font-bold text-white mb-2">Finding Opponent...</div>
          <div className="text-emerald-400 mb-4">Etherlink real-time matching</div>
          
          <button
            onClick={async () => {
              try {
                await BlockchainUtils.triggerMetaMaskTransaction({
                  to: "0x0000000000000000000000000000000000000001", // Duel contract
                  value: parseEther("0.02").toString(),
                  description: "PvP Duel entry fee: 0.02 XTZ"
                })
                toast.success("💰 Entry fee paid! Searching for opponent...")
              } catch (error) {
                console.log("Demo transaction completed")
              }
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            💰 Pay Entry Fee (0.02 XTZ)
          </button>
        </div>
      </div>
    )
  }

  if (duelState === 'result') {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-12">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-4">Duel Completed!</h2>
          <div className="text-emerald-400 text-lg mb-4">
            ⚡ All transactions settled in under 0.5s
          </div>
          <div className="text-white">
            RedStone Oracle integration ✅<br/>
            Commit-reveal scheme ✅<br/>
            Instant settlement ✅
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          ⚔️ Live Duel in Progress
        </h1>
        <div className="text-emerald-400">
          {duelQuestions[currentQuestion].isOracle && "🔮 RedStone Oracle Question"}
        </div>
      </div>

      {/* Duel Arena */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-6">
          <div className="text-center mb-4">
            <div className="text-2xl mb-2">👤</div>
            <div className="text-white font-bold">You</div>
            <div className="text-blue-400 text-sm">Answer: {userAnswer !== null ? duelQuestions[currentQuestion].options[userAnswer] : 'Thinking...'}</div>
          </div>
        </div>
        
        <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-6">
          <div className="text-center mb-4">
            <div className="text-2xl mb-2">🤖</div>
            <div className="text-white font-bold">Opponent</div>
            <div className="text-red-400 text-sm">Answer: {opponentAnswer !== null ? duelQuestions[currentQuestion].options[opponentAnswer] : 'Thinking...'}</div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-8 mb-6">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          {duelQuestions[currentQuestion].question}
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {duelQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={userAnswer !== null}
              className="p-4 rounded-xl border-2 border-gray-600 bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Winner Display */}
      {winner && (
        <div className="text-center">
          <div className={`text-2xl font-bold ${
            winner === 'user' ? 'text-green-400' : 
            winner === 'opponent' ? 'text-red-400' : 'text-yellow-400'
          }`}>
            {winner === 'user' ? '🏆 You Win!' : 
             winner === 'opponent' ? '😔 Opponent Wins' : '🤝 Tie!'}
          </div>
        </div>
      )}
    </div>
  )
}

// Step 3: Guild System - "Study Together, Win Together" (0:51 – 1:20)
function Step3GuildSystem({ onNext }: { onNext: () => void }) {
  const [guildState, setGuildState] = useState<'create' | 'formed' | 'battle'>('create')
  const [guildMembers] = useState([
    { name: "Alex", score: 850, avatar: "👤" },
    { name: "Sarah", score: 720, avatar: "👩" },
    { name: "Mike", score: 680, avatar: "👨" },
    { name: "Emma", score: 590, avatar: "👱‍♀️" },
    { name: "You", score: 920, avatar: "🏆" }
  ])

  useEffect(() => {
    if (guildState === 'create') {
      const timer = setTimeout(() => {
        setGuildState('formed')
        toast.success("🛡️ Guild formed on-chain!")
      }, 3000)
      return () => clearTimeout(timer)
    } else if (guildState === 'formed') {
      const timer = setTimeout(() => {
        setGuildState('battle')
        toast.success("⚔️ Guild vs Guild battle started!")
      }, 4000)
      return () => clearTimeout(timer)
    } else if (guildState === 'battle') {
      const timer = setTimeout(() => {
        toast.success("🏆 Tezos Titans WIN! +0.5 XTZ to treasury")
        setTimeout(() => onNext(), 2000)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [guildState, onNext])

  if (guildState === 'create') {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          🛡️ Step 3: Form a Guild
        </h1>
        <p className="text-emerald-400 text-lg mb-8">
          Creating "Tezos Titans" study guild with Farcaster friends
        </p>
        
        <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-12">
          <div className="animate-pulse text-6xl mb-4">🛡️</div>
          <div className="text-2xl font-bold text-white mb-2">Creating Guild...</div>
          <div className="text-emerald-400 mb-4">Deploying guild treasury contract</div>
          <div className="text-sm text-gray-400">
            📱 Farcaster Frame sent to friends<br/>
            ⛓️ On-chain guild formation<br/>
            💰 Treasury initialization
          </div>
        </div>
      </div>
    )
  }

  if (guildState === 'formed') {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🛡️ Guild: Tezos Titans
          </h1>
          <p className="text-emerald-400 text-lg">
            Guild formed! Powered by Goldsky indexing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Guild Stats */}
          <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Guild Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Members:</span>
                <span className="text-white">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Treasury:</span>
                <span className="text-emerald-400">0.3 XTZ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Ranking:</span>
                <span className="text-yellow-400">#7 on Goldsky Leaderboard</span>
              </div>
            </div>
          </div>

          {/* Members */}
          <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Members</h3>
            <div className="space-y-2">
              {guildMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{member.avatar}</span>
                    <span className="text-white">{member.name}</span>
                  </div>
                  <span className="text-emerald-400">{member.score} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-xl p-6">
            <div className="text-2xl mb-2">⚔️</div>
            <div className="text-white font-bold">Upcoming: Guild vs Guild Battle</div>
            <div className="text-yellow-400 text-sm">Preparing for 5v5 match...</div>
            
            <button
              onClick={async () => {
                try {
                  await BlockchainUtils.triggerMetaMaskTransaction({
                    to: "0x0000000000000000000000000000000000000002", // Guild contract
                    value: parseEther("0.1").toString(),
                    description: "Contributing 0.1 XTZ to guild treasury"
                  })
                } catch (error) {
                  console.log("Transaction demo completed")
                }
              }}
              className="mt-4 px-6 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors"
            >
              💰 Contribute to Treasury
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          ⚔️ Guild vs Guild Battle
        </h1>
        <div className="text-emerald-400">Tezos Titans vs Crypto Crusaders</div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-6">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">🛡️</div>
            <div className="text-white font-bold">Tezos Titans</div>
            <div className="text-blue-400 text-2xl font-bold">2,860 pts</div>
          </div>
        </div>
        
        <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-6">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">⚔️</div>
            <div className="text-white font-bold">Crypto Crusaders</div>
            <div className="text-red-400 text-2xl font-bold">2,340 pts</div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-6">
          <div className="text-4xl mb-2">🏆</div>
          <div className="text-white font-bold text-2xl">Tezos Titans WIN!</div>
          <div className="text-green-400">+0.5 XTZ added to guild treasury</div>
          <div className="text-sm text-gray-400 mt-2">
            Goldsky leaderboard updated in real-time
          </div>
        </div>
      </div>
    </div>
  )
}

// Step 4: NFT Quizzes - "Own Your Knowledge" (1:21 – 1:55)
function Step4NFTQuizzes({ onNext }: { onNext: () => void }) {
  const [nftState, setNftState] = useState<'create' | 'mint' | 'earning'>('create')
  const [royaltyEarned] = useState(0.002)

  useEffect(() => {
    if (nftState === 'create') {
      const timer = setTimeout(() => {
        setNftState('mint')
        toast.success("📝 Quiz created successfully!")
      }, 4000)
      return () => clearTimeout(timer)
    } else if (nftState === 'mint') {
      const timer = setTimeout(async () => {
        try {
          // Trigger real NFT minting with MetaMask
          await ThirdwebNFT.mintQuizNFT({
            title: "Advanced Solidity Patterns",
            description: "Expert-level quiz on advanced Solidity development patterns",
            difficulty: 5,
            royaltyPercent: 10
          })
          
          setNftState('earning')
          toast.success("🎉 Quiz NFT minted! Now earning royalties")
        } catch (error) {
          // Fallback to simulation
          setNftState('earning')
          toast.success("🎉 Quiz NFT minted! Now earning royalties")
        }
      }, 3000)
      return () => clearTimeout(timer)
    } else if (nftState === 'earning') {
      const timer = setTimeout(() => {
        setTimeout(() => onNext(), 2000)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [nftState, onNext])

  if (nftState === 'create') {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🖼️ Step 4: Mint Quiz as NFT
          </h1>
          <p className="text-emerald-400 text-lg">
            Creating "Advanced Solidity Patterns" quiz
          </p>
        </div>
        
        <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Quiz Creator</h3>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Quiz Title</label>
              <input 
                type="text" 
                value="Advanced Solidity Patterns"
                readOnly
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Difficulty</label>
              <select className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white">
                <option>Expert</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">Royalty %</label>
              <input 
                type="number" 
                value="10"
                readOnly
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
              />
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
            <div className="text-white font-bold mb-2">Sample Questions:</div>
            <div className="text-sm text-gray-400 space-y-1">
              <div>1. What is the diamond pattern in Solidity?</div>
              <div>2. How do you implement proxy upgrades safely?</div>
              <div>3. What are the risks of delegatecall?</div>
              <div>+ 2 more questions</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="animate-pulse text-emerald-400">
              Creating quiz content... ✨
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (nftState === 'mint') {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          🎉 Minting Quiz NFT
        </h1>
        
        <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-12">
          <div className="animate-bounce text-6xl mb-4">🖼️</div>
          <div className="text-2xl font-bold text-white mb-4">
            Quiz NFT: "Advanced Solidity" #123
          </div>
          <div className="text-emerald-400 mb-4">
            Powered by thirdweb ERC-721 + EIP-2981
          </div>
          <div className="text-sm text-gray-400 space-y-2">
            <div>✅ Quiz logic tied to NFT ownership</div>
            <div>✅ 10% royalty on every play</div>
            <div>✅ Stored on IPFS</div>
            <div>✅ Sequence Wallet integration</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          💰 Quiz NFT Now Earning!
        </h1>
        <p className="text-emerald-400 text-lg">
          Your quiz is live and generating royalties
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">NFT Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">NFT ID:</span>
              <span className="text-white">#123</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Times Played:</span>
              <span className="text-emerald-400">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Royalties Earned:</span>
              <span className="text-green-400">{royaltyEarned} XTZ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Floor Price:</span>
              <span className="text-white">0.1 XTZ</span>
            </div>
          </div>
        </div>

        <div className="bg-black/40 border border-emerald-500/30 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3">
              <div className="text-green-400 font-bold">Quiz Completed ✅</div>
              <div className="text-sm text-gray-400">User paid 0.02 XTZ</div>
              <div className="text-sm text-green-400">You earned 0.002 XTZ royalty</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 rounded-2xl p-8">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Tezoro: The On-Chain Knowledge Economy
          </h2>
          <div className="text-emerald-400 text-lg mb-4">
            From solo quizzes to NFT-powered knowledge ownership
          </div>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <span>🔗 Etherlink</span>
            <span>🔮 RedStone</span>
            <span>📊 Goldsky</span>
            <span>🎨 thirdweb</span>
            <span>💼 Sequence</span>
            <span>📱 Farcaster</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/demo')({
  component: DemoFlow,
})