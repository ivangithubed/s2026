import { Link } from "react-router";
import { motion } from "framer-motion";
import type { Course } from "~/components/CourseCard"; // Re-using the type

type CourseSummaryCardProps = {
  course: Course;
};

const getCategoryStyles = (category: string) => {
  const baseClasses = "inline-block text-xs font-semibold mb-4 px-2.5 py-0.5 rounded-md";
  switch (category) {
    case 'група онлайн':
      return `${baseClasses} bg-lime-600 text-white dark:bg-lime-400 dark:text-slate-950`;
    case 'з менторством':
      return `${baseClasses} bg-sky-600 text-white dark:bg-sky-400 dark:text-slate-950`;
    case 'без менторства':
      return `${baseClasses} bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950`;
    case 'індивідуально':
      return `${baseClasses} bg-violet-600 text-white dark:bg-violet-400 dark:text-slate-950`;
    default:
      return `${baseClasses} bg-slate-500 text-white dark:bg-slate-400 dark:text-slate-950`;
  }
};

export const CourseSummaryCard = ({ course }: CourseSummaryCardProps) => {
  return (
    <motion.div
      className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 flex flex-col h-full border border-slate-200 dark:border-slate-800"
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}>
      <div className="flex justify-end items-start gap-2">
        {course.age && (
          <span className="inline-block bg-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-md dark:bg-slate-700 dark:text-slate-300">
            {course.age}
          </span>
        )}
        <span className={getCategoryStyles(course.category)}>
          {course.category}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-lime-600 dark:text-lime-400 mb-3">
        {course.title}
      </h3>
      <p className="text-slate-500 dark:text-gray-400 mb-2">
        Особливості: {course.spec}
      </p>
      {course.schedule && (
        <div className="text-slate-500 dark:text-gray-400 mb-4 text-sm">
          <p className="font-semibold">Розклад:</p>
          <div className="flex flex-wrap gap-x-4">
            {course.schedule.map((s, i) => (
              <p key={i}>{s.day}: {s.time}</p>
            ))}
          </div>
        </div>
      )}
      <p className="text-slate-700 dark:text-gray-300 mb-6 grow">
        {course.summary}
      </p>
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold text-slate-900 dark:text-lime-400">
            {course.priceInfo}
          </p>
          {course.startDate && (
            <p className="text-sm text-slate-500 dark:text-gray-400">
              Старт: {course.startDate}
            </p>
          )}
        </div>
        <Link
          to={`/courses/${course.id}`}
          className="block w-full text-center bg-lime-600 hover:bg-lime-700 dark:bg-lime-400 dark:hover:bg-lime-500 text-white dark:text-slate-950 font-bold py-3 px-6 rounded-lg transition">
          Більше інформації
        </Link>
      </div>
    </motion.div>
  );
};
