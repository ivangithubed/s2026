import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

type FaqProps = {
  items: FaqItem[];
};

const FaqItemComponent = ({ item }: { item: FaqItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 dark:border-slate-800 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-900 dark:text-white">
        <span>{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}>
          <ChevronDown size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: "16px" }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden">
            <p className="text-slate-600 dark:text-gray-300">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Faq = ({ items }: FaqProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Часті запитання
        </h2>
        <div className="max-w-3xl mx-auto">
          {items.map((item) => (
            <FaqItemComponent key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
