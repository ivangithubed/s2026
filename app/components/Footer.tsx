import { PlaySquare, SendHorizonal, MessageSquare } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-6 text-center text-slate-500 dark:text-gray-400">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://www.youtube.com/@itmentor" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-400"><PlaySquare /></a>
          <a href="https://t.me/profrontendua" target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-400"><SendHorizonal /></a>
        </div>
        <p>&copy; {currentYear} Навчаємося Разом. Всі права захищено.</p>
        <p className="text-sm mt-2">Зроблено з ❤️ для найкращих студентів</p>
      </div>
    </footer>
  );
};
