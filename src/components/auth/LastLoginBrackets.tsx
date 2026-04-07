import { motion, AnimatePresence } from "framer-motion";

interface LastLoginBracketsProps {
  isHighlighted: boolean;
  children: React.ReactNode;
  label: string;
}

const LastLoginBrackets = ({ isHighlighted, children, label }: LastLoginBracketsProps) => {
  return (
    <div className={isHighlighted ? "py-3 px-1" : ""}>
      <div className="relative">
        <AnimatePresence>
          {isHighlighted && (
            <motion.div
              className="absolute -inset-3 pointer-events-none z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Left bracket - vertical bar with rounded ends */}
              <div className="absolute top-0 bottom-0 -left-1 w-6 flex flex-col justify-between">
                {/* Top hook */}
                <div
                  className="h-8 w-full rounded-tl-xl"
                  style={{
                    borderTop: "2.5px solid hsl(var(--primary) / 0.8)",
                    borderLeft: "2.5px solid hsl(var(--primary) / 0.8)",
                    boxShadow: "-2px -2px 12px hsl(var(--primary) / 0.35), 0 0 20px hsl(var(--primary) / 0.15)",
                  }}
                />
                {/* Bottom hook */}
                <div
                  className="h-8 w-full rounded-bl-xl"
                  style={{
                    borderBottom: "2.5px solid hsl(var(--primary) / 0.8)",
                    borderLeft: "2.5px solid hsl(var(--primary) / 0.8)",
                    boxShadow: "-2px 2px 12px hsl(var(--primary) / 0.35), 0 0 20px hsl(var(--primary) / 0.15)",
                  }}
                />
              </div>

              {/* Right bracket - vertical bar with rounded ends */}
              <div className="absolute top-0 bottom-0 -right-1 w-6 flex flex-col justify-between">
                {/* Top hook */}
                <div
                  className="h-8 w-full rounded-tr-xl"
                  style={{
                    borderTop: "2.5px solid hsl(var(--primary) / 0.8)",
                    borderRight: "2.5px solid hsl(var(--primary) / 0.8)",
                    boxShadow: "2px -2px 12px hsl(var(--primary) / 0.35), 0 0 20px hsl(var(--primary) / 0.15)",
                  }}
                />
                {/* Bottom hook */}
                <div
                  className="h-8 w-full rounded-br-xl"
                  style={{
                    borderBottom: "2.5px solid hsl(var(--primary) / 0.8)",
                    borderRight: "2.5px solid hsl(var(--primary) / 0.8)",
                    boxShadow: "2px 2px 12px hsl(var(--primary) / 0.35), 0 0 20px hsl(var(--primary) / 0.15)",
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {children}
      </div>
    </div>
  );
};

export default LastLoginBrackets;
