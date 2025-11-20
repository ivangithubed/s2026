import { useState } from 'react';

const contactPlaceholders: { [key: string]: string } = {
  viber: 'Ваш номер у Viber',
  whatsapp: 'Ваш номер у WhatsApp',
  telegram: 'Ваш @username або номер у Telegram',
  facebook: 'Посилання на ваш профіль Facebook',
};

export default function ContactPage() {
  const [selectedContact, setSelectedContact] = useState('');
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Маєте питання щодо курсів?
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
        Заповніть форму нижче, і я зв'яжуся з вами найближчим часом.
      </p>
      <form
        method="post"
        action="https://formspree.io/f/xpwoqwop"
        className="max-w-xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-lg border border-slate-200 dark:border-slate-800">
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Ім'я
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-400 dark:focus:border-lime-400"
            required
            placeholder="Ваше ім'я"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="_replyto"
            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-400 dark:focus:border-lime-400"
            required
            placeholder="Ваш email"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Повідомлення
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-400 dark:focus:border-lime-400"
            required
            placeholder="Ваше повідомлення"></textarea>
        </div>
        <fieldset className="mb-6">
          <legend className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
            Хочете придбати навчання для:
          </legend>
          <div className="flex flex-col gap-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="forWhom"
                value="self"
                className="w-4 h-4 text-lime-600 bg-slate-100 border-slate-300 focus:ring-lime-500 dark:focus:ring-lime-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
              />
              <span className="ml-2 text-sm text-slate-900 dark:text-gray-300">
                себе
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="forWhom"
                value="child"
                className="w-4 h-4 text-lime-600 bg-slate-100 border-slate-300 focus:ring-lime-500 dark:focus:ring-lime-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
              />
              <span className="ml-2 text-sm text-slate-900 dark:text-gray-300">
                власної дитини
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="forWhom"
                value="family"
                className="w-4 h-4 text-lime-600 bg-slate-100 border-slate-300 focus:ring-lime-500 dark:focus:ring-lime-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
              />
              <span className="ml-2 text-sm text-slate-900 dark:text-gray-300">
                для дорослого члена родини
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="forWhom"
                value="gift"
                className="w-4 h-4 text-lime-600 bg-slate-100 border-slate-300 focus:ring-lime-500 dark:focus:ring-lime-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
              />
              <span className="ml-2 text-sm text-slate-900 dark:text-gray-300">
                подарувати навчання
              </span>
            </label>
          </div>
        </fieldset>

                <fieldset className="mb-6">
          <legend className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
            Оберіть спосіб зв'язку з Вами:
          </legend>
          <div className="flex flex-wrap gap-4">
            {Object.keys(contactPlaceholders).map((method) => (
              <label key={method} className="flex items-center">
                <input
                  type="radio"
                  name="contactMethod"
                  value={method}
                  checked={selectedContact === method}
                  onChange={(e) => setSelectedContact(e.target.value)}
                  className="w-4 h-4 text-lime-600 bg-slate-100 border-slate-300 focus:ring-lime-500 dark:focus:ring-lime-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                />
                <span className="ml-2 text-sm text-slate-900 dark:text-gray-300">
                  {method.charAt(0).toUpperCase() + method.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {selectedContact && (
          <div className="mb-6">
            <label
              htmlFor="contact-detail"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Ваш контакт
            </label>
            <input
              type="text"
              id="contact-detail"
              name="contactDetail"
              className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-400 dark:focus:border-lime-400"
              placeholder={contactPlaceholders[selectedContact]}
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full text-white bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-lime-500 dark:hover:bg-lime-600 dark:focus:ring-lime-800">
          Надіслати
        </button>
      </form>
    </div>
  );
}
