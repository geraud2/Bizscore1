import { motion } from "framer-motion";

interface ScoreDialProps {
  score: number;
  size?: number;
}

export const ScoreDial = ({ score, size = 180 }: ScoreDialProps) => {
  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const targetDash = (score / 100) * circumference * 0.75;

  const getColor = (s: number) => {
    if (s < 40) return "#EF4444";
    if (s < 65) return "#F59E0B";
    if (s < 80) return "#22C55E";
    return "#16A34A";
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-[135deg]">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={10}
          strokeDasharray={`${circumference * 0.75} ${circumference}`}
          strokeLinecap="round"
          className="text-muted"
          opacity={0.3}
        />
        {/* Score arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#scoreGrad-${size})`}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={`${targetDash} ${circumference}`}
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${targetDash} ${circumference}` }}
          transition={{ duration: 1.5, ease: [0.32, 0.72, 0, 1], delay: 0.3 }}
        />
        <defs>
          <linearGradient id={`scoreGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-5xl font-black tracking-tighter"
          style={{ color: getColor(score), fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {score}
        </motion.span>
        <span className="text-xs font-semibold text-muted-foreground mt-1">/ 100</span>
      </div>
    </div>
  );
};
