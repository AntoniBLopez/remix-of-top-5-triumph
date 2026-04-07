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
              {/* Left bracket */}
              <div className="absolute top-0 bottom-0 -left-1 w-6 flex flex-col justify-between">
                <div
                  className="h-8 w-full rounded-tl-xl"
                  style={{
                    borderTop: "2.5px solid hsl(var(--primary))",
                    borderLeft: "2.5px solid hsl(var(--primary))",
                  }}
                />
                <div
                  className="h-8 w-full rounded-bl-xl"
                  style={{
                    borderBottom: "2.5px solid hsl(var(--primary))",
                    borderLeft: "2.5px solid hsl(var(--primary))",
                  }}
                />
              </div>

              {/* Right bracket */}
              <div className="absolute top-0 bottom-0 -right-1 w-6 flex flex-col justify-between">
                <div
                  className="h-8 w-full rounded-tr-xl"
                  style={{
                    borderTop: "2.5px solid hsl(var(--primary))",
                    borderRight: "2.5px solid hsl(var(--primary))",
                  }}
                />
                <div
                  className="h-8 w-full rounded-br-xl"
                  style={{
                    borderBottom: "2.5px solid hsl(var(--primary))",
                    borderRight: "2.5px solid hsl(var(--primary))",
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
