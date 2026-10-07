"use client";
  import React, { useState, useEffect } from 'react';
  import { Sparkles, Copy, ArrowRight, CheckCircle, Info, Zap, Target, Search } from 'lucide-react';

  export default function SEOGenerator() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<{title: string, description: string}[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [currentYear, setCurrentYear] = useState('');

    useEffect(() => {
      // ব্রাউজা লোডহওয়ারপর বর্তমানবছর সেটহবে
      setCurrentYear(new Date().getFullYear().toString());
    }, []);

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
        if (Array.isArray(data)) setResults(data);
        else if (data && typeof data === 'object') {
          const arrayValue = Object.values(data).find(val => Array.isArray(val));
          if (arrayValue) setResults(arrayValue);
          else throw new Error("Invalid data format");
        }
      } catch (error) {
        alert("AI জেনা করতেসমস্যা হয়েছেআবারচেষ্টাকরুন।");
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
            <span className="tracking-tight">SEO-Genie</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-indigo-600 transition">How it Works</a>
            <a href="#benefits" className="hover:text-indigo-60ed transition">Benefits</a>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold
  uppercase">Free Forever</span>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Generate High-Converting <span className="text-indigo-600">SEO Meta Tags</span> in Seconds
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Stop wasting hours on guesswork. Use our AI-powered <b className="text-indigo-600">Free Meta
  Tag Generator</b> to create the perfect titles and descriptions in any language.
          </p>

          <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-200 flex flex-col
  md:flex-row gap-2 mb-16">
            <input
              type="text"
              placeholder="e.g. Best Digital Marketing Agency or আপনারব্যবসারনাম..."
              className="flex-1 p-4 outline-none text-lg text-black"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold flex items-center
  justify-center gap-2 hover:bg-indigo-700 transition disabled:opacity-70"
            >
              {loading ? "Generating..." : (<>Generate <ArrowRight className="w-5 h-5" /></>)}
            </button>
          </div>

          <div className="grid gap-6 text-left mb-24">
            {results.map((res, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm
  hover:border-indigo-300 transition group">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full
  uppercase">Option {index + 1}</span>
                  <button onClick={() => copyToClipboard(`${res.title}\n\n${res.description}`, index)}
  className="p-2 text-slate-400 hover:text-indigo-600 transition">
                    {copiedIndex === index ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy
  className="w-5 h-5" />}
                  </button>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-800">{res.title}</h3>
                <p className="text-slate-600 leading-relaxed">{res.description}</p>
              </div>
            ))}
          </div>

          <section id="how-it-works" className="text-left py-12 border-t border-slate-200">
            <h2 className="text-3xl font-bold mb-8 text-center">How the AI Meta Tag Generator Works?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <Search className="w-10 h-10 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">1. Enter Keyword</h3>
                <p className="text-slate-600">Simply type your main target keyword in any language
  (English, Bengali, etc.).</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <Zap className="w-10 h-10 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">2. AI Processing</h3>
                <p className="text-slate-600">Our AI detects the language and generates professional SEO
  tags in that same language.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <Target className="w-10 h-10 text-indigo-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">3. Boost Ranking</h3>
                <p className="text-slate-600">Copy the results and use them to increase your organic
  traffic from Google.</p>
              </div>
            </div>
          </section>

          <section id="benefits" className="py-12 border-t border-slate-200 mt-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Meta Tags are Important for SEO?</h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">Higher Click-Through Rate (CTR)</h4>
                  <p className="text-slate-600">A compelling meta description encourages users to click
  your link over others in search results.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">Better Google Indexing</h4>
                  <p className="text-slate-600">Properly optimized titles help search engines understand
  what your page is about.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">User Experience</h4>
                  <p className="text-slate-600">Clear meta tags give users a quick summary of your content,
  reducing bounce rates.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">Competitive Edge</h4>
                  <p className="text-slate-600">Standing out in the SERPs means more traffic and more
  customers for your business.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 border-t border-slate-200 mt-12 mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions (FAQ)</h2>
            <div className="space-y-6 text-left max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-lg mb-2">What is the ideal length for a meta title?</h4>
                <p className="text-slate-600">Ideally, a meta title should be between 50-60 characters to
  avoid being cut off by Google.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-lg mb-2">Does AI-generated SEO content work?</h4>
                <p className="text-slate-600">Yes, AI can generate highly optimized patterns, but it's
  always good to tweak them for your specific brand voice.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-lg mb-2">Is this SEO Meta Tag Generator free?</h4>
                <p className="text-slate-600">Yes, SEO-Genie is 100% free for everyone to use without any
  hidden charges.</p>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-slate-900 text-slate-400 py-12 text-center">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-center gap-2 font-bold text-2xl text-white mb-4">
              <Sparkles className="w-6 h-6" />
              <span>SEO-Genie</span>
            </div>
            <p className="text-sm">© {currentYear} SEO-Genie. All rights reserved. Built for the SEO
  community.</p>
          </div>
        </footer>
      </div>
    );
  }