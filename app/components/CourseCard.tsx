type CourseModule = {
  title: string;
  duration: string;
  topics: string[];
};

type ScheduleEntry = {
  day: string;
  time: string;
};

export type Course = {
  id: string;
  category: string;
  title: string;
  duration: string;
  schedule?: ScheduleEntry[];
  startDate?: string;
  featured: boolean;
  summary: string;
  priceInfo: string;
  learningFormatsAvailable: string[];
  description: string;
  modules: CourseModule[];
};

type CourseCardProps = {
  course: Course;
};

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div
      id={course.id}
      className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-4xl font-bold text-lime-600 dark:text-lime-400">
          {course.title}
        </h1>
        {/* <span className="text-lg font-semibold text-slate-500 dark:text-gray-300 whitespace-nowrap">{course.duration}</span> */}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6 text-lg">
        {course.startDate && (
          <p className="text-lime-600 dark:text-lime-400">
            <strong>Старт:</strong> {course.startDate}
          </p>
        )}
        {course.schedule && (
          <div>
            <p className="font-semibold text-lime-600 dark:text-lime-400"><strong>Розклад:</strong></p>
            <div className="flex flex-wrap gap-x-4 text-slate-600 dark:text-gray-300">
              {course.schedule.map((s, i) => (
                <p key={i}>{s.day}: {s.time}</p>
              ))}
            </div>
          </div>
        )}
      </div>
      <p className="text-slate-600 dark:text-gray-400 mb-6">
        {course.description}
      </p>

      <div className="space-y-6">
        {course.modules.map((module, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              {module.title}{" "}
              <span className="text-base text-slate-500 dark:text-gray-400">
                ({module.duration})
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
              {module.topics.map((topic, i) => (
                <li
                  key={i}
                  className="text-slate-600 dark:text-gray-400 list-disc list-inside">
                  {topic}
                </li>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
