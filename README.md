# 🏛️ Tezoro

a game-like learning app where users earn rewards by answering quizzes and challenging others turning study into friendly competition, with real benefits for every correct answer

## Overview

We're building a fun, game-like learning app where you earn rewards for answering quizzes and challenging others. Think of it as studying meets competition, and every question you get right brings real benefits

**The Future of Decentralized Learning & Earning**

Tezoro transforms education into a gamified experience where knowledge acquisition directly translates to real rewards. Built for the Tezos Etherlink ecosystem, we're bridging the gap between traditional learning and Web3 incentives.

## 🎯 The Problem

### Current State of Education
- **Low Engagement**: Traditional learning platforms struggle to maintain user motivation
- **No Real Rewards**: Learners complete courses but gain nothing tangible
- **Isolated Experience**: Learning happens in silos without community or competition
- **Web2 Limitations**: Centralized platforms control user data and rewards

### Market Opportunity
- **$250B+ Global EdTech Market** growing at 16% annually
- **Web3 Education** is the next frontier with $50B+ potential
- **Gamification** increases learning retention by 60%
- **Tokenized Rewards** create sustainable engagement loops

## 💡 The Solution

### Tezoro: Learn-to-Earn Platform
Tezoro combines **interactive quizzes**, **gamified quests**, and **blockchain rewards** to create the most engaging learning experience in Web3.

**Core Value Proposition:**
- **Earn While You Learn**: Complete quizzes and quests to earn Yuzu Points
- **Competitive Learning**: Real-time leaderboards drive engagement
- **Seasonal Rewards**: Structured competitions with clear incentives
- **Web3 Native**: Seamless wallet integration and on-chain rewards

## 🏗️ Architecture

### Technical Stack
```
Frontend: React + TypeScript + Vite
Database: PostgreSQL + Drizzle ORM
Web3: Wagmi + Viem + Etherlink Testnet
UI: Tailwind CSS + Custom Design System
Deployment: Vercel + Railway
```

### Smart Contract Integration
- **QuizGame.sol**: On-chain quiz management and reward distribution
- **QuizDuel.sol**: PvP battle system with escrow and reward distribution
- **Token Integration**: Yuzu Points → XTZ tokens conversion
- **Season Management**: Automated reward cycles and leaderboards
- **Farcaster Integration**: Social learning with Frame SDK

### Database Schema
```sql
-- Core Learning System
users (wallet_address, total_points, quizzes_completed)
quizzes (title, category, difficulty, questions, points_reward)
quiz_attempts (user_id, quiz_id, score, points_earned)

-- Gamification Layer
quests (title, category, points_reward, requirements)
leaderboard_entries (user_id, season_id, rank, points)
seasons (name, start_date, end_date, is_active)

-- PvP Duel System
quiz_duels (id, challenger_id, opponent_id, topic, entry_fee, status, winner_id)
duel_results (duel_id, user_id, score, time_spent, rewards_earned)
```

## 🚀 Key Features

### 📚 Learning Engine
- **Personalized Quizzes**: AI-driven content based on user progress
- **Multi-Category Content**: Math, Science, History, Web3, and more
- **Adaptive Difficulty**: Questions adjust to user skill level
- **Real-time Feedback**: Immediate explanations and learning tips

### 🎮 Gamification System
- **Daily Challenges**: Consistent engagement through daily quests
- **Seasonal Competitions**: 3-month cycles with escalating rewards
- **Achievement Badges**: NFT-based milestones and accomplishments
- **Social Leaderboards**: Community-driven competitive learning

### 💰 Reward Economy
- **Yuzu Points**: Earned through learning activities
- **XTZ Token Conversion**: Points convert to Etherlink XTZ tokens
- **Seasonal Rewards**: Bonus distributions for top performers
- **NFT Achievements**: On-chain proof of learning milestones

### ⚔️ PvP Quiz Duels (Coming Q2 2024)
- **Simple Duel Flow**: Connect → Pick Topic → Challenge → Earn
- **On-Chain Battles**: Direct wallet-to-wallet quiz competitions
- **Topic Selection**: Choose from Math, Science, Web3, History, and more
- **Winner Takes All**: Loser pays entry fee, winner gets rewards + opponent's stake
- **Social Features**: Challenge friends, share results, build reputation

## 🎯 Vision & Roadmap

### Phase 1: Foundation (Q1 2024) ✅
- [x] Core quiz platform with Farcaster integration
- [x] Basic reward system and leaderboards
- [x] Smart contract deployment on Etherlink Testnet
- [x] Initial user acquisition and testing

### Phase 2: Growth (Q2 2024)
- [ ] Advanced AI-powered content personalization
- [ ] **PvP On-Chain Quiz Duels** - Simple duel flow: connect → pick topic → challenge → earn
- [ ] Multi-chain reward distribution
- [ ] Mobile app development
- [ ] Partnership with educational institutions

### Phase 3: Scale (Q3-Q4 2024)
- [ ] Global expansion with localized content
- [ ] Advanced analytics and learning insights
- [ ] Enterprise solutions for organizations
- [ ] Full DAO governance implementation

### Phase 4: Ecosystem (2025+)
- [ ] Tezoro Academy: Educational content marketplace
- [ ] Cross-chain interoperability
- [ ] AI-powered learning assistants
- [ ] Metaverse learning environments

## 🏆 Competitive Advantage

### Why Tezoro Wins
1. **First-Mover Advantage**: First learn-to-earn platform on Etherlink
2. **Social Integration**: Native Farcaster integration drives viral growth
3. **Token Economics**: Sustainable reward model with real utility
4. **Community-Driven**: User-generated content and governance
5. **Technical Excellence**: Modern stack with proven scalability

### Market Positioning
- **Target Audience**: Web3 learners, crypto enthusiasts, students
- **Geographic Focus**: Global with emphasis on emerging markets
- **Revenue Model**: Platform fees, premium features, enterprise solutions
- **Growth Strategy**: Community-driven with strategic partnerships

## 🔧 Quick Start

### For Developers
```bash
# Clone and setup
git clone https://github.com/your-org/tezoro.git
cd tezoro
pnpm install

# Environment setup
cp .env.example .env.local
# Configure your environment variables

# Run development
pnpm dev
```

### For Users
1. **Connect Wallet**: Use MetaMask or WalletConnect
2. **Sign in with Farcaster**: Authenticate your social identity
3. **Start Learning**: Take daily quizzes and complete quests
4. **Earn Rewards**: Accumulate points and compete on leaderboards
5. **Convert to XTZ**: Exchange points for Etherlink XTZ tokens

### PvP Quiz Duels Flow (Q2 2024)
1. **Connect**: Link your wallet and Farcaster account
2. **Pick Topic**: Choose from Math, Science, Web3, History, etc.
3. **Challenge**: Send duel invitation to opponent (friend or random)
4. **Battle**: Both players take same quiz simultaneously
5. **Earn**: Winner gets entry fee + opponent's stake + bonus rewards
