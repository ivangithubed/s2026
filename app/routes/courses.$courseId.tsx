import type { Route } from "./+types/courses.$courseId";
import { CourseCard, type Course } from "~/components/CourseCard";
import { LearningFormat, type LearningFormatData } from "~/components/LearningFormat";

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
    return <div>Курс не знайдено.</div>; // Or a proper 404 component
  }

  const availableFormats = data.learningFormats.formats.filter(format => 
    course.learningFormatsAvailable.includes(format.title)
  );

  return (
    <div className="space-y-16">
      <CourseCard course={course} />
      
      <section>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Формати навчання, доступні для цього курсу</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {availableFormats.map(format => (
            <LearningFormat key={format.title} format={format} />
          ))}
        </div>
      </section>
    </div>
  );
}
