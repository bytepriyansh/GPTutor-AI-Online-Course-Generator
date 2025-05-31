import React, { useState } from 'react';
import { YoutubeEmbed } from './youtube-embed';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChapterContent = ({ content }) => {
    if (!content || !content.content) return null;

    const parsedContent = content.content;


// Replace inside bulletPoints:
const bulletPoints = parsedContent.description?.map((point, index) => (
    <li key={index}><ReactMarkdown>{point}</ReactMarkdown></li>
));


    const cleanCode = parsedContent.codeExample
        ?.replace(/```python|```/g, '')
        .trim();

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!cleanCode) return;
        navigator.clipboard.writeText(cleanCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4 space-y-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-400 text-center">
                {parsedContent.title}
            </h1>

            {content.videoId && (
                <div className="rounded-lg overflow-hidden shadow-lg">
                    <YoutubeEmbed videoId={content.videoId} />
                </div>
            )}

            <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl shadow-inner shadow-black">
                <h2 className="text-xl font-semibold text-amber-400 mb-3">Key Takeaways</h2>
                <ul className="list-disc list-inside space-y-2 text-zinc-200 text-md pl-4">
                    {bulletPoints}
                </ul>
            </div>

            {cleanCode && (
                <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-semibold text-pink-400">Code Example</h2>
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 text-sm px-3 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 transition text-white"
                        >
                            <Copy size={16} />
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <SyntaxHighlighter
                        language="python"
                        style={oneDark}
                        customStyle={{
                            backgroundColor: '#282c34',
                            padding: '1rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.95rem',
                            margin: 0,
                            lineHeight: 1.5,
                        }}
                    >
                        {cleanCode}
                    </SyntaxHighlighter>
                </div>
            )}
        </div>
    );
};

export default ChapterContent;
