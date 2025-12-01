import { Link } from "react-router";
import { motion } from 'framer-motion';
import type { Route } from "./+types/index";
import { AboutPreview } from "~/components/AboutPreview";
import { Testimonials } from "~/components/Testimonials";
import type { Testimonial } from "~/components/Testimonials";
import { CourseSummaryCard } from "~/components/CourseSummaryCard";
import type { Course } from "~/components/CourseCard";
import { Faq } from '~/components/Faq';
import type { FaqItem } from '~/components/Faq';
import { HtmlDayPromo } from '~/components/HtmlDayPromo';

export async function loader({ request }: Route.LoaderArgs) {
  const testimonialsUrl = new URL("/data/testimonials.json", request.url);
  const coursesUrl = new URL("/data/courses.json", request.url);
  const faqUrl = new URL("/data/faq.json", request.url);

  const [testimonialsRes, coursesRes, faqRes] = await Promise.all([
    fetch(testimonialsUrl.href),
    fetch(coursesUrl.href),
    fetch(faqUrl.href),
  ]);

  const testimonials = (await testimonialsRes.json()) as Testimonial[];
  const coursesData = (await coursesRes.json()) as { courses: Course[] };
  const faqItems = (await faqRes.json()) as FaqItem[];

  const featuredCourses = coursesData.courses.filter(course => course.featured);

  return { testimonials, featuredCourses, faqItems };
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { testimonials, featuredCourses, faqItems } = loaderData as { testimonials: Testimonial[], featuredCourses: Course[], faqItems: FaqItem[] };

  return (
    <>
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
          Навчання веб-розробці
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Опануйте HTML, CSS, JavaScript, TypeScript, React та Next.js на практичних курсах від автора YouTube-каналу <Link to="https://www.youtube.com/@itmentor" target="_blank" rel="noopener noreferrer" className="text-lime-600 dark:text-lime-400">"Навчаємося Разом"</Link>
        </p>
        <div className="space-x-4">
          <Link
            to="/courses"
            className="bg-lime-600 hover:bg-lime-700 dark:bg-lime-400 dark:hover:bg-lime-500 text-white dark:text-slate-950 font-bold py-3 px-6 rounded-lg transition"
          >
            Переглянути курси
          </Link>
        </div>
      </div>
      {/* Featured Courses Section */}
      {featuredCourses.length > 0 && (
        <motion.section
          className="py-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Обрані курси</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredCourses.slice(0, 4).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CourseSummaryCard course={course} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* HTML Day Promo Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <HtmlDayPromo />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* <AboutPreview /> */}
      </motion.div>

      {/* <Testimonials testimonials={testimonials} /> */}

      {/* <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Faq items={faqItems} />
      </motion.div> */}
    </>
  );
}
