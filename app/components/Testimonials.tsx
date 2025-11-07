import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { Pagination } from "./Pagination";

export type Testimonial = {
  id: number;
  name: string;
  city: string;
  courseName: string;
  text: string;
};

type TestimonialsProps = {
  testimonials: Testimonial[];
};

const ITEMS_PER_PAGE = 4;

export const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentTestimonials = testimonials.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <motion.section
      className="py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Що кажуть студенти
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage} // This key is crucial for AnimatePresence to detect changes
            className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[500px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            {currentTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-slate-100 dark:bg-slate-900 p-6 rounded-lg shadow-lg flex flex-col border border-slate-200 dark:border-slate-800">
                <Quote className="w-8 h-8 text-lime-600 dark:text-lime-400 mb-4" />
                <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">
                  {testimonial.text}
                </p>
                <div className="mt-auto">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.city} | {testimonial.courseName}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </motion.section>
  );
};
