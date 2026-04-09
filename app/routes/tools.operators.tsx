import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OperatorSearch } from '~/components/tools/operators/OperatorSearch';
import { OperatorDetail } from '~/components/tools/operators/OperatorDetail';

export default function OperatorsTool() {
    const [selectedOperator, setSelectedOperator] = useState<string | null>(null);

    return (
        <div className="min-h-full transition-colors relative">
            <AnimatePresence mode="wait">
                {!selectedOperator ? (
                    <motion.div
                        key="search"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <OperatorSearch onSelectOperator={setSelectedOperator} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="detail"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <OperatorDetail
                            operator={selectedOperator}
                            onClose={() => setSelectedOperator(null)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
