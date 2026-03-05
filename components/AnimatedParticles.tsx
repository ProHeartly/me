"use client";

export default function AnimatedParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid background */}
      <div 
        className="absolute inset-0 opacity-10 animate-grid"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Floating particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            background: `rgba(${Math.random() > 0.5 ? '59, 130, 246' : '6, 182, 212'}, ${0.3 + Math.random() * 0.4})`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
            boxShadow: `0 0 ${4 + Math.random() * 6}px rgba(59, 130, 246, 0.5)`,
          }}
        />
      ))}
      
      {/* Gradient orbs with glow */}
      <div 
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-gradient animate-glow"
        style={{
          top: '10%',
          left: '10%',
          background: 'linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6)',
        }}
      />
      <div 
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-20 animate-gradient"
        style={{
          bottom: '10%',
          right: '10%',
          background: 'linear-gradient(225deg, #06b6d4, #3b82f6, #8b5cf6)',
          animationDelay: '2s',
        }}
      />
      
      {/* Diagonal lines */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-linear-to-r from-transparent via-blue-400 to-transparent"
            style={{
              top: `${20 + i * 20}%`,
              left: '-10%',
              right: '-10%',
              transform: `rotate(-15deg)`,
              animation: `slide-in-right ${2 + i * 0.5}s ease-out`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
