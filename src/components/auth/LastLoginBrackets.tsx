import { motion, AnimatePresence } from "framer-motion";

interface LastLoginBracketsProps {
  isHighlighted: boolean;
  children: React.ReactNode;
  label: string;
}

const LastLoginBrackets = ({ isHighlighted, children, label }: LastLoginBracketsProps) => {
  return (
    <div className="relative">
      <AnimatePresence>
        {isHighlighted && (
          <motion.div
            className="absolute -inset-[3px] pointer-events-none z-10 rounded-2xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Soft glowing corners using radial gradients */}
            {/* Top-left */}
            <div
              className="absolute -top-4 -left-4 w-20 h-20"
              style={{
                background: "radial-gradient(circle at center, hsl(var(--primary) / 0.55) 0%, hsl(var(--primary) / 0.15) 40%, transparent 70%)",
                filter: "blur(6px)",
              }}
            />
            {/* Top-right */}
            <div
              className="absolute -top-4 -right-4 w-20 h-20"
              style={{
                background: "radial-gradient(circle at center, hsl(var(--primary) / 0.55) 0%, hsl(var(--primary) / 0.15) 40%, transparent 70%)",
                filter: "blur(6px)",
              }}
            />
            {/* Bottom-left */}
            <div
              className="absolute -bottom-4 -left-4 w-20 h-20"
              style={{
                background: "radial-gradient(circle at center, hsl(var(--primary) / 0.55) 0%, hsl(var(--primary) / 0.15) 40%, transparent 70%)",
                filter: "blur(6px)",
              }}
            />
            {/* Bottom-right */}
            <div
              className="absolute -bottom-4 -right-4 w-20 h-20"
              style={{
                background: "radial-gradient(circle at center, hsl(var(--primary) / 0.55) 0%, hsl(var(--primary) / 0.15) 40%, transparent 70%)",
                filter: "blur(6px)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};

export default LastLoginBrackets;
