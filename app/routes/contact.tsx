import { useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const contactPlaceholders: { [key: string]: string } = {
  viber: 'Ваш номер у Viber',
  whatsapp: 'Ваш номер у WhatsApp',
  telegram: 'Ваш @username або номер у Telegram',
  facebook: 'Посилання на ваш профіль Facebook',
};

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  contactMethod?: string;
  contactDetail?: string;
}

export default function ContactPage() {
  const [selectedContact, setSelectedContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const inputClasses = "bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-lime-400 dark:focus:border-lime-400";
  const inputErrorClasses = "bg-slate-50 border-2 border-red-500 text-slate-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-slate-800 dark:border-red-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-400 dark:focus:border-red-400";
  const errorTextClasses = "text-red-500 text-xs mt-1 flex items-center gap-1";

  const validateForm = (formData: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    const name = (formData.get('name') as string)?.trim() || '';
    if (!name) {
      newErrors.name = 'Вкажіть ваше ім\'я';
    } else if (name.length < 2) {
      newErrors.name = 'Мінімум 2 символи';
    }

    const email = (formData.get('_replyto') as string)?.trim() || '';
    if (!email) {
      newErrors.email = 'Вкажіть email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Невірний формат email';
    }

    const message = (formData.get('message') as string)?.trim() || '';
    if (!message) {
      newErrors.message = 'Напишіть повідомлення';
    } else if (message.length < 10) {
      newErrors.message = 'Мінімум 10 символів';
    }

    const contactMethod = formData.get('contactMethod') as string;
    if (!contactMethod) {
      newErrors.contactMethod = 'Оберіть спосіб зв\'язку';
    } else {
      const contactDetail = (formData.get('contactDetail') as string)?.trim() || '';
      if (!contactDetail) {
        newErrors.contactDetail = 'Вкажіть контактні дані';
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setErrors({});
    setSubmitError('');

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xpwoqwop', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitSuccess(true);
        form.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Помилка відправки');
      }
    } catch {
      setSubmitError('Не вдалося надіслати форму. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null;
    return (
      <p className={errorTextClasses}>
        <AlertCircle className="w-3 h-3" />
        {error}
      </p>
    );
  };

  if (submitSuccess) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="bg-white dark:bg-slate-900 p-12 rounded-lg border border-slate-200 dark:border-slate-800 text-center">
          <CheckCircle2 className="w-16 h-16 text-lime-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Дякуємо за звернення! 🎉
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Ваше повідомлення успішно надіслано. Я зв'яжуся з вами найближчим часом!
          </p>
          <a
            href="/"
            className="inline-block bg-lime-600 hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600 text-white dark:text-slate-900 font-bold py-3 px-6 rounded-lg transition"
          >
            На головну
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Маєте питання щодо курсів?
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
        Заповніть форму нижче, і я зв'яжуся з вами найближчим часом.
      </p>

      {submitError && (
        <div className="max-w-xl mx-auto mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {submitError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-lg border border-slate-200 dark:border-slate-800">
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Ім'я <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={errors.name ? inputErrorClasses : inputClasses}
            placeholder="Ваше ім'я"
          />
          <ErrorMessage error={errors.name} />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="_replyto"
            className={errors.email ? inputErrorClasses : inputClasses}
            placeholder="Ваш email"
          />
          <ErrorMessage error={errors.email} />
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Повідомлення <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={errors.message ? inputErrorClasses : inputClasses}
            placeholder="Ваше повідомлення"></textarea>
          <ErrorMessage error={errors.message} />
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

        <fieldset className="mb-6" id="contactMethod">
          <legend className="block mb-2 text-sm font-medium text-slate-900 dark:text-white">
            Оберіть спосіб зв'язку з Вами: <span className="text-red-500">*</span>
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
          <ErrorMessage error={errors.contactMethod} />
        </fieldset>

        {selectedContact && (
          <div className="mb-6">
            <label
              htmlFor="contactDetail"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Ваш контакт <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="contactDetail"
              name="contactDetail"
              className={errors.contactDetail ? inputErrorClasses : inputClasses}
              placeholder={contactPlaceholders[selectedContact]}
            />
            <ErrorMessage error={errors.contactDetail} />
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-white bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-lime-500 dark:hover:bg-lime-600 dark:focus:ring-lime-800 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? 'Надсилання...' : 'Надіслати'}
        </button>
      </form>
    </div>
  );
}
