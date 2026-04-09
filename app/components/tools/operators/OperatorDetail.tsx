import { useState } from 'react';
import { Search, X, ExternalLink, Copy, Check } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';
import { operators } from './data';

interface OperatorDetailProps {
    operator: string;
    onClose: () => void;
}

export function OperatorDetail({ operator, onClose }: OperatorDetailProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const operatorData = operators.find(op => op.symbol === operator);
    const displayName = operatorData?.name || "Невідомий оператор";

    const handleCopy = async (code: string, index: number) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
            console.error('Failed to copy code: ', err);
        }
    };

    return (
        <div className="px-4 sm:px-8 py-6 sm:py-8 bg-white dark:bg-transparent min-h-full transition-colors font-sans">
            <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
                {/* Header with search */}
                <div className="flex items-center gap-3 sm:gap-4">
                    <Search aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 dark:text-slate-500 shrink-0" />
                    <div className="flex-1 border-b-2 border-gray-100 dark:border-slate-700 pb-2">
                        <span className="text-2xl sm:text-3xl text-gray-900 dark:text-white font-mono">{operator}</span>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Закрити"
                        className="p-2 min-h-11 min-w-11 flex items-center justify-center bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 active:bg-gray-200 dark:active:bg-slate-600 rounded-xl text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-all shrink-0 touch-manipulation focus-visible:outline-2 focus-visible:outline-lime-400 focus-visible:outline-offset-2 hover:rotate-90 group"
                    >
                        <X aria-hidden="true" className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110" />
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    {!operatorData ? (
                        <div className="space-y-3">
                            <p className="text-xl sm:text-2xl text-gray-800 dark:text-slate-300">
                                На жаль, ми не знайшли інформації про{" "}
                                <span className="text-lime-600 dark:text-lime-400 font-mono font-bold">{operator}</span>
                            </p>
                            <p className="text-base text-gray-500 dark:text-slate-500">Спробуйте інший оператор або перевірте правильність написання.</p>
                        </div>
                    ) : (
                        <>
                            {/* Title */}
                            <p className="text-xl sm:text-2xl text-gray-700 dark:text-slate-300 text-balance leading-relaxed">
                                Це оператор <span className="text-lime-600 dark:text-lime-400 font-bold decoration-lime-500/30 underline decoration-4 underline-offset-4">{displayName}</span>
                            </p>

                            {/* Syntax section */}
                            {operatorData?.syntax && operatorData.syntax.length > 0 && (
                                <div className="space-y-4">
                                    <h2 className="text-lg sm:text-xl text-gray-900 dark:text-white font-bold tracking-tight uppercase text-[10px] tracking-[0.2em] opacity-50">Синтаксис</h2>
                                    <div className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-4 sm:p-6 overflow-x-auto shadow-sm dark:shadow-inner">
                                        {operatorData.syntax.map((syntax, index) => (
                                            <div key={index} className="font-mono text-sm sm:text-base text-gray-800 dark:text-slate-300">
                                                {syntax}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Description */}
                            {operatorData?.details && (
                                <div className="space-y-4 text-lg text-gray-600 dark:text-slate-400 leading-relaxed font-normal">
                                    {operatorData.details.paragraphs.map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            )}

                            {/* Code examples */}
                            {operatorData?.details && operatorData.details.codeExamples.length > 0 && (
                                <div className="space-y-8 pt-4">
                                    <h2 className="text-lg sm:text-xl text-gray-900 dark:text-white font-bold tracking-tight border-l-4 border-lime-500 pl-4">Приклади</h2>
                                    {operatorData.details.codeExamples.map((example, index) => (
                                        <div key={index} className="space-y-4 group/example">
                                            <div className="flex items-center justify-between gap-4">
                                                <h3 className="text-base sm:text-lg text-gray-900 dark:text-slate-200 font-semibold group-hover/example:text-lime-600 dark:group-hover/example:text-lime-400 transition-colors">{example.title}</h3>
                                                <button
                                                    onClick={() => handleCopy(example.code, index)}
                                                    className={`p-2 px-3 rounded-xl transition-all duration-300 flex items-center gap-2 text-xs font-bold border tracking-wide
                                                        ${copiedIndex === index
                                                            ? 'bg-lime-500 text-white border-lime-500 shadow-lg shadow-lime-500/30'
                                                            : 'bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-lime-500 hover:text-lime-600 shadow-sm'}`}
                                                    title="Копіювати код"
                                                >
                                                    {copiedIndex === index ? (
                                                        <>
                                                            <Check className="w-4 h-4" />
                                                            <span>Скопійовано</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="w-4 h-4" />
                                                            <span>Копіювати</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                            <div className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all group-hover/example:border-lime-500/50">
                                                <Highlight
                                                    theme={themes.vsDark}
                                                    code={example.code}
                                                    language="javascript"
                                                >
                                                    {({ style, tokens, getLineProps, getTokenProps }) => (
                                                        <pre
                                                            className="text-xs sm:text-sm font-mono overflow-x-auto p-5 sm:p-7 leading-relaxed dark:text-slate-300"
                                                            style={{ ...style, background: 'transparent', margin: 0 }}
                                                        >
                                                            {tokens.map((line, i) => (
                                                                <div key={i} {...getLineProps({ line })}>
                                                                    {line.map((token, key) => (
                                                                        <span key={key} {...getTokenProps({ token })} />
                                                                    ))}
                                                                </div>
                                                            ))}
                                                        </pre>
                                                    )}
                                                </Highlight>
                                            </div>
                                            {example.explanation && (
                                                <div className="bg-gray-50 dark:bg-slate-800/50 border-l-2 border-gray-200 dark:border-slate-700 p-4 rounded-r-xl transition-colors">
                                                    <p className="text-gray-600 dark:text-slate-400 text-sm italic leading-relaxed">{example.explanation}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* MDN Link */}
                            <div className="text-center pt-10 sm:pt-14 pb-6">
                                <p className="text-base sm:text-lg text-gray-500">
                                    Більше про цей оператор{" "}
                                    <a
                                        href={operatorData?.mdnUrl || `https://developer.mozilla.org/uk/docs/Web/JavaScript/Reference/Operators`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center text-lime-600 dark:text-lime-400 font-bold hover:text-lime-500 transition-colors"
                                    >
                                        <span className="underline decoration-lime-500/30 group-hover:decoration-lime-500">читайте на MDN</span>
                                        <ExternalLink aria-hidden="true" className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        <span className="sr-only"> (відкриється в новій вкладці)</span>
                                    </a>
                                    .
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
