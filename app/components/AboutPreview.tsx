import { Link } from "react-router";

export const AboutPreview = () => {
  return (
    <section className="py-16 bg-slate-100 dark:bg-slate-900">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
        <img
          src="/images/author.jpg"
          alt="Фото автора курсів"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-lime-600 dark:border-lime-400 shadow-md"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Про автора
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-xl">
            Досвідчений розробник та ментор, захоплений створенням якісних
            освітніх продуктів та допомогою іншим у досягненні їхніх цілей в IT.
          </p>
          <Link
            to="/about" // We will create this page later
            className="inline-block text-lime-600 dark:text-lime-400 hover:underline text-sm font-semibold">
            Дізнатися більше →
          </Link>
        </div>
      </div>
    </section>
  );
};
