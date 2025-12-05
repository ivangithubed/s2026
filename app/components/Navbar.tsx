import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X, PlaySquare, SendHorizonal } from "lucide-react"; // Using MessageSquare for Discord as a placeholder
import { ThemeSwitcher } from "./ThemeSwitcher";
import { HiPaperClip } from "react-icons/hi";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-lime-600 dark:text-lime-400"
      : "text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white transition";

  return (
    <header className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-slate-900 dark:text-white hover:text-lime-600 dark:hover:text-lime-400 transition flex items-center gap-2">
          <HiPaperClip />
          IT-Mentor
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className={navLinkClass}>
            Головна
          </NavLink>
          <NavLink to="/courses" className={navLinkClass}>
            Курси
          </NavLink>
          <NavLink to="/reviews" className={navLinkClass}>
            Відгуки
          </NavLink>
          <NavLink to="/tools" className={navLinkClass}>
            Інструменти
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Контакти
          </NavLink>
          {/* <NavLink to="/about" className={navLinkClass}>
            Про автора
          </NavLink> */}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {/* Theme Switcher - visible on all screens */}
          <ThemeSwitcher />

          {/* Social Icons - desktop only */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://www.youtube.com/@itmentor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-400">
              <PlaySquare />
            </a>
            <a
              href="https://t.me/profrontendua"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-400">
              <SendHorizonal />
            </a>

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 dark:text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}>
              Головна
            </NavLink>
            <NavLink
              to="/courses"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}>
              Курси
            </NavLink>
            <NavLink
              to="/reviews"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}>
              Відгуки
            </NavLink>
            <NavLink
              to="/tools"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}>
              Інструменти
            </NavLink>
            <NavLink
              to="/contact"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}>
              Контакти
            </NavLink>
            {/* <NavLink
              to="/about"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}>
              Про автора
            </NavLink> */}
            <div className="flex justify-center gap-6 pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
              <a
                href="https://www.youtube.com/@itmentor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-400">
                <PlaySquare />
              </a>
              <a
                href="https://t.me/profrontendua"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-gray-400 hover:text-lime-600 dark:hover:text-lime-400">
                <SendHorizonal />
              </a>

            </div>
          </div>
        </div>
      )}
    </header>
  );
};
