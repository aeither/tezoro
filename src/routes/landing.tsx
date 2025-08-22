import { createFileRoute, Link } from '@tanstack/react-router'

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-8">
        {/* Hero Section */}
        <div className="text-center py-16 quiz-card rounded-3xl mb-12 animate-bounce-in">
          <div className="text-8xl mb-6 animate-pulse-glow">🏛️</div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Welcome to Tezoro
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Master Mantle blockchain knowledge through comprehensive learning paths and earn real rewards.
            From DeFi fundamentals to validator operations - become a Mantle ecosystem expert!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/contract"
              className="px-8 py-4 bg-gradient-primary text-primary-foreground rounded-2xl text-lg font-semibold 
                         quiz-button-glow hover:scale-105 transition-all duration-300 animate-bounce-in"
              style={{ animationDelay: '200ms' }}
            >
              🎮 Start Playing
            </Link>

            <Link
              to="/farcaster"
              className="px-8 py-4 bg-secondary text-secondary-foreground border-2 border-primary/50 rounded-2xl 
                         text-lg font-semibold hover:bg-primary hover:text-primary-foreground hover:scale-105 
                         transition-all duration-300 animate-bounce-in"
              style={{ animationDelay: '400ms' }}
            >
              🚀 Farcaster App
            </Link>

            <Link
              to="/contract"
              className="px-6 py-3 bg-muted text-muted-foreground border border-border rounded-xl 
                         text-base font-medium hover:bg-secondary hover:text-foreground hover:scale-105 
                         transition-all duration-300 animate-bounce-in"
              style={{ animationDelay: '600ms' }}
            >
              🔧 Debug
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <FeatureCard
          icon="🎮"
          title="Mantle Learning Paths"
          description="Progressive curriculum from Mantle basics to expert validator operations. Real crypto rewards for every milestone!"
          delay="200ms"
        />
        <FeatureCard
          icon="🏗️"
          title="DeFi & Development"
          description="Master DeFi protocols, yield farming strategies, and dApp development on Mantle's L2 architecture."
          delay="400ms"
        />
        <FeatureCard
          icon="🌐"
          title="Ecosystem Quests"
          description="Partner-sponsored quests exploring DEX protocols, bridge mechanisms, and governance participation."
          delay="600ms"
        />
        <FeatureCard
          icon="🏅"
          title="Achievement System"
          description="Earn exclusive badges and NFTs. From Mantle Newcomer to Ecosystem Champion - show your expertise!"
          delay="800ms"
        />
      </div>

      {/* How It Works */}
      <div className="quiz-card rounded-3xl p-12 text-center animate-bounce-in" style={{ animationDelay: '1000ms' }}>
        <h2 className="text-4xl font-bold text-primary mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <StepCard step="1" title="Connect" description="Connect your wallet to Mantle Sepolia Testnet" />
          <StepCard step="2" title="Learn" description="Choose from Mantle architecture, DeFi, or validator quizzes" />
          <StepCard step="3" title="Progress" description="Complete learning paths and ecosystem quests" />
          <StepCard step="4" title="Earn" description="Collect badges, NFTs, and MNT rewards for expertise!" />
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center py-16 animate-bounce-in" style={{ animationDelay: '1200ms' }}>
        <h3 className="text-3xl font-bold text-foreground mb-6">Ready to Master Mantle?</h3>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join the Tezoro community and become a certified Mantle ecosystem expert while earning real rewards!
        </p>
        <Link
          to="/contract"
          className="inline-block px-12 py-6 bg-gradient-primary text-primary-foreground rounded-3xl 
                       text-xl font-bold quiz-button-glow hover:scale-110 transition-all duration-300 
                       animate-pulse-glow"
        >
          🚀 Start Your Journey
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: {
  icon: string;
  title: string;
  description: string;
  delay: string;
}) {
  return (
    <div
      className="quiz-card rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 animate-bounce-in group"
      style={{ animationDelay: delay }}
    >
      <div className="text-5xl mb-4 group-hover:animate-celebrate">{icon}</div>
      <h3 className="text-xl font-bold text-primary mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}

function StepCard({ step, title, description }: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center group">
      <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center 
                      text-2xl font-bold mx-auto mb-4 quiz-button-glow group-hover:animate-celebrate 
                      transition-all duration-300">
        {step}
      </div>
      <h4 className="text-lg font-bold text-foreground mb-2">
        {title}
      </h4>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export const Route = createFileRoute('/landing')({
  component: LandingPage,
}) 