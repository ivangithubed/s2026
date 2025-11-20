import type { Route } from "./+types/courses.$courseId";
import { CourseCard, type Course } from "~/components/CourseCard";
import { LearningFormat, type LearningFormatData } from "~/components/LearningFormat";
import { Link } from "react-router";

type CourseDetailsData = {
  courses: Course[];
  learningFormats: { formats: LearningFormatData[] };
};

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL("/data/courses.json", request.url);
  const res = await fetch(url.href);
  const data = (await res.json()) as CourseDetailsData;
  return { data };
}

export default function CourseDetailsPage({ loaderData, params }: Route.ComponentProps) {
  const { data } = loaderData as { data: CourseDetailsData };
  const courseId = params.courseId;

  const course = data.courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <>
        <div>Такого курсу не знайдено.</div>
        <Link to="/courses" className="text-lime-400 underline">Повернутися до списку курсів</Link>
      </>
    )
  }

  // Якщо у курсі є learningProcess - використовуємо його, інакше - загальний формат
  const availableFormats = course.learningProcess
    ? [course.learningProcess]
    : data.learningFormats.formats.filter(format =>
      format.title.toLowerCase().trim() === course.category.toLowerCase().trim()
    );

  return (
    <div className="space-y-16">
      <CourseCard course={course} />

      <section>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Навчальний процес</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {availableFormats.map(format => (
            <LearningFormat key={format.title} format={format} />
          ))}

          {/* Кнопки в правій частині grid */}
          <div className="flex flex-col gap-4 justify-end">
            <Link
              to="/contact"
              className="px-8 py-3 bg-lime-500 hover:bg-lime-600 text-slate-900 font-semibold rounded-lg transition-colors text-center">
              Записатись (форма)
            </Link>
            <a
              href="https://t.me/profrontendua"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors text-center">
              Поставити запитання в Telegram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
