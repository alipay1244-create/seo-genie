  "use client";
  import React, { useState } from 'react';
  import { Sparkles, Copy, ArrowRight, CheckCircle } from 'lucide-react';

  export default function SEOGenerator() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<{title: string, description: string}[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleGenerate = async () => {
      if (!input) return;
      setLoading(true);
      setResults([]);

      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: input }),
        });

        if (!response.ok) throw new Error("Server error");

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setResults(data);
        } else if (data && typeof data === 'object') {
          const arrayValue = Object.values(data).find(val => Array.isArray(val));
          if (arrayValue) {
            setResults(arrayValue);
          } else {
            throw new Error("Invalid data format from AI");
          }
        } else {
          throw new Error("No results found");
        }
      } catch (error) {
        console.error("Error generating SEO tags:", error);
        alert("AI জেনা করতেসমস্যা হয়েছেদয়াকরেআবারচেষ্টাকরুন।");
      } finally {
        setLoading(false);
      }
    };

    const copyToClipboard = (text: string, index: number) => {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <nav className="p-6 max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-2xl text-indigo-600">
            <Sparkles className="w-8 h-8" />
            <span>SEO-Genie</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition">How it works</a>
            <a href="#" className="hover:text-indigo-600 transition">Pricing</a>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700
  transition">Sign Up</button>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Generate High-Converting <span className="text-indigo-600">SEO Meta Tags</span> in Seconds
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Stop guessing your meta descriptions. Enter your keyword or page content, and let AI create the
  perfect tags to rank higher on Google.
          </p>

          <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-200 flex flex-col
  md:flex-row gap-2 mb-16">
            <input
              type="text"
              placeholder="e.g. Digital Marketing for Small Business..."
              className="flex-1 p-4 outline-none text-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold flex items-center
  justify-center gap-2 hover:bg-indigo-700 transition disabled:opacity-70"
            >
              {loading ? "Generating..." : (
                <>Generate <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </div>

          <div className="grid gap-6 text-left">
            {results.map((res, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm
  hover:border-indigo-300 transition group">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full
  uppercase">Option {index + 1}</span>
                  <button
                    onClick={() => copyToClipboard(`${res.title}\n\n${res.description}`, index)}
                    className="p-2 text-slate-400 hover:text-indigo-600 transition"
                  >
                    {copiedIndex === index ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy
  className="w-5 h-5" />}
                  </button>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-800">{res.title}</h3>
                <p className="text-slate-600 leading-relaxed">{res.description}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }