import { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';

interface CodePanelProps {
    isOpen: boolean;
    cssCode: string;
    htmlCode: string;
    onClose: () => void;
}

export function CodePanel({ isOpen, cssCode, htmlCode, onClose }: CodePanelProps) {
    const [cssCopied, setCssCopied] = useState(false);
    const [htmlCopied, setHtmlCopied] = useState(false);

    const handleCopyCSS = async () => {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = cssCode;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCssCopied(true);
            setTimeout(() => setCssCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleCopyHTML = async () => {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = htmlCode;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setHtmlCopied(true);
            setTimeout(() => setHtmlCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Side Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-[80%] lg:w-[60%] bg-lime-400 dark:bg-lime-500 transition-transform duration-300 transform z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } shadow-2xl overflow-y-auto`}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 md:top-6 lg:top-8 right-4 md:right-6 lg:right-8 text-slate-900 hover:text-slate-700 transition-colors z-10"
                >
                    <X size={24} className="md:w-8 md:h-8" strokeWidth={2} />
                </button>

                {/* Content */}
                <div className="p-6 md:p-8 lg:p-12 pt-16 md:pt-20">
                    {/* CSS Section */}
                    <div className="mb-8 md:mb-10 lg:mb-12">
                        <h2 className="text-slate-900 text-xl md:text-2xl font-bold mb-3 md:mb-4">CSS</h2>
                        <div className="relative">
                            <pre className="bg-slate-800 p-4 md:p-6 lg:p-8 rounded-lg text-white overflow-x-auto">
                                <code className="text-xs md:text-sm">
                                    {cssCode.split('\n').map((line, i) => (
                                        <div key={i}>
                                            {line.includes('display:') && (
                                                <span className="text-cyan-400">{line}</span>
                                            )}
                                            {line.includes('grid-template-') && (
                                                <span className="text-cyan-400">{line}</span>
                                            )}
                                            {line.includes('grid-column-gap') && (
                                                <span className="text-cyan-400">{line}</span>
                                            )}
                                            {line.includes('grid-row-gap') && (
                                                <span className="text-cyan-400">{line}</span>
                                            )}
                                            {!line.includes('display:') &&
                                                !line.includes('grid-template-') &&
                                                !line.includes('grid-column-gap') &&
                                                !line.includes('grid-row-gap') && line}
                                        </div>
                                    ))}
                                </code>
                            </pre>

                            <button
                                onClick={handleCopyCSS}
                                className="absolute top-2 md:top-4 right-2 md:right-4 px-3 md:px-4 py-1.5 md:py-2 bg-white text-slate-900 rounded-lg flex items-center gap-1.5 md:gap-2 hover:bg-slate-100 transition-colors text-xs md:text-sm font-medium"
                            >
                                {cssCopied ? (
                                    <>
                                        <Check size={14} className="md:w-4 md:h-4" />
                                        <span className="hidden sm:inline">Скопійовано</span>
                                        <span className="sm:hidden">✓</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy size={14} className="md:w-4 md:h-4" />
                                        <span className="hidden sm:inline">Копіювати</span>
                                        <span className="sm:hidden">Copy</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* HTML Section */}
                    <div>
                        <h2 className="text-slate-900 text-xl md:text-2xl font-bold mb-3 md:mb-4">HTML</h2>
                        <div className="relative">
                            <pre className="bg-slate-800 p-4 md:p-6 lg:p-8 rounded-lg text-white overflow-x-auto">
                                <code className="text-xs md:text-sm">
                                    <span className="text-pink-400">&lt;div</span>{' '}
                                    <span className="text-cyan-400">class=</span>
                                    <span className="text-yellow-300">&quot;parent&quot;</span>
                                    <span className="text-pink-400">&gt;</span>
                                    {'\n'}
                                    <span className="text-pink-400">&lt;/div&gt;</span>
                                </code>
                            </pre>

                            <button
                                onClick={handleCopyHTML}
                                className="absolute top-2 md:top-4 right-2 md:right-4 px-3 md:px-4 py-1.5 md:py-2 bg-white text-slate-900 rounded-lg flex items-center gap-1.5 md:gap-2 hover:bg-slate-100 transition-colors text-xs md:text-sm font-medium"
                            >
                                {htmlCopied ? (
                                    <>
                                        <Check size={14} className="md:w-4 md:h-4" />
                                        <span className="hidden sm:inline">Скопійовано</span>
                                        <span className="sm:hidden">✓</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy size={14} className="md:w-4 md:h-4" />
                                        <span className="hidden sm:inline">Копіювати</span>
                                        <span className="sm:hidden">Copy</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
