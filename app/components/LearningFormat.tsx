import { Check } from 'lucide-react';

type Price = {
  course: string;
  price?: string;
  oldPrice?: string;
  newPrice?: string;
  promoUntil?: string;
};

export type LearningFormatData = {
  title: string;
  subtitle: string;
  features: string[];
  prices: Price[];
};

type LearningFormatProps = {
  format: LearningFormatData;
};

export const LearningFormat = ({ format }: { format: LearningFormatData }) => {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col">
      <h3 className="text-2xl font-bold text-lime-600 dark:text-lime-400 mb-2">{format.title}</h3>
      <p className="text-slate-500 dark:text-gray-400 mb-4 grow">{format.subtitle}</p>
      <ul className="space-y-2">
        {format.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-lime-600 dark:text-lime-400 mr-3 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Ціни:</h4>
        <div className="space-y-4">
          {format.prices.map((price, index) => (
            <div key={index}>
              <p className="text-xl"><strong className="text-lime-600 dark:text-lime-400">{price.course}:</strong></p>
              {price.price && <p className="text-lg">{price.price}</p>}
              {price.newPrice && (
                <div className="flex items-baseline gap-2">
                  <p className="text-lg text-lime-600 dark:text-lime-400">{price.newPrice}</p>
                  {price.oldPrice && <p className="text-sm text-slate-500 line-through">{price.oldPrice}</p>}
                </div>
              )}
              {price.promoUntil && <p className="text-xs text-slate-500 mt-1">{price.promoUntil}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
