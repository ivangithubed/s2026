import type { Route } from "./+types/courses";
import { motion } from 'framer-motion';
import { CourseSummaryCard } from "~/components/CourseSummaryCard";
import type { Course } from "~/components/CourseCard";

type CoursesLoaderData = {
  courses: Course[];
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL("/data/courses.json", request.url);
  const res = await fetch(url.href);
  const data = (await res.json()) as { courses: Course[] };
  return { courses: data.courses };
}

export default function CoursesPage({ loaderData }: Route.ComponentProps) {
  const { courses } = loaderData as CoursesLoaderData;

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 text-center">Всі курси</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <CourseSummaryCard course={course} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

