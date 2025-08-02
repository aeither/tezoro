import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useSwitchChain } from 'wagmi'
import { parseEther } from 'viem'
import { toast } from 'sonner'
import { quizGameABI } from '../libs/quizGameABI'
import { getContractAddresses } from '../libs/constants'
import { etherlinkTestnet } from '../wagmi'
import GlobalHeader from '../components/GlobalHeader'

interface QuizSearchParams {
  quiz?: string
}

// Quiz configurations
const QUIZ_CONFIGS = {
  'web3-basics': {
    id: 'web3-basics',
    title: 'Web3 Basics',
    description: 'Test your knowledge of blockchain fundamentals',
    questions: [
      {
        question: "What is the primary purpose of a blockchain?",
        options: ["To store data", "To create a decentralized, immutable ledger", "To process payments", "To host websites"],
        correct: 1
      },
      {
        question: "What does 'HODL' mean in cryptocurrency?",
        options: ["Hold On for Dear Life", "Hold", "High Order Data Logic", "Hash of Digital Ledger"],
        correct: 1
      },
      {
        question: "What is a smart contract?",
        options: ["A legal document", "Self-executing code on blockchain", "A cryptocurrency", "A wallet"],
        correct: 1
      }
    ]
  }
} as const

function QuizGame() {
  const navigate = useNavigate()
  const { quiz: quizId } = useSearch({ from: '/quiz-game' }) as QuizSearchParams
  const { address, chain } = useAccount()
  const { switchChain } = useSwitchChain()

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [selectedAmount, setSelectedAmount] = useState('0.1')

  const contractAddresses = chain ? getContractAddresses(chain.id) : getContractAddresses(etherlinkTestnet.id)
  const quizConfig = quizId ? QUIZ_CONFIGS[quizId as keyof typeof QUIZ_CONFIGS] : null

  // Contract operations and UI components will be added here
  
  if (!quizId || !quizConfig) {
    return (
      <div style={{ paddingTop: '80px' }}>
        <GlobalHeader />
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem", textAlign: "center" }}>
          <h2 style={{ color: "#ffffff" }}>Quiz Not Found</h2>
          <button onClick={() => navigate({ to: '/contract' })}>Back to Quiz Selection</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: '80px' }}>
      <GlobalHeader />
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
        <h1 style={{ color: "#00ff87" }}>{quizConfig.title}</h1>
        <p style={{ color: "#ffffff" }}>{quizConfig.description}</p>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/quiz-game')({
  component: QuizGame,
  validateSearch: (search): QuizSearchParams => ({
    quiz: search.quiz as string,
  }),
})