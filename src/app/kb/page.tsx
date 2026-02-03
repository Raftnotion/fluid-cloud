"use client";

import React, { useState, useEffect, useRef } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Book, Shield, Zap, CreditCard, ArrowRight, ExternalLink, HelpCircle, FileText, ChevronRight, Mail, Server, Globe, Database, Fingerprint, MessageSquare, TrendingUp, Clock, X } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
    {
        id: "email",
        title: "Email",
        icon: <Mail className="w-5 h-5" />,
        description: "Protocols for migrations, account setup, and client configuration.",
        articleCount: 34,
        color: "#CCFF00"
    },
    {
        id: "hosting",
        title: "Hosting",
        icon: <Server className="w-5 h-5" />,
        description: "Site management, file systems, and backups.",
        articleCount: 16,
        color: "#333"
    },
    {
        id: "domain-names",
        title: "Domains",
        icon: <Globe className="w-5 h-5" />,
        description: "DNS management, nameservers, and propagation.",
        articleCount: 11,
        color: "#CCFF00"
    },
    {
        id: "wordpress",
        title: "WordPress",
        icon: <Zap className="w-5 h-5" />,
        description: "Platform features, CLI tools, and password recovery.",
        articleCount: 11,
        color: "#333"
    },
    {
        id: "databases",
        title: "Databases",
        icon: <Database className="w-5 h-5" />,
        description: "MySQL, MariaDB, and remote connection protocols.",
        articleCount: 8,
        color: "#CCFF00"
    },
    {
        id: "programming",
        title: "Dev",
        icon: <FileText className="w-5 h-5" />,
        description: "PHP versions, functions, and language settings.",
        articleCount: 8,
        color: "#333"
    },
    {
        id: "ssh",
        title: "SSH",
        icon: <Fingerprint className="w-5 h-5" />,
        description: "Command-line operations and secure shell protocols.",
        articleCount: 7,
        color: "#CCFF00"
    },
    {
        id: "ssl",
        title: "SSL",
        icon: <Shield className="w-5 h-5" />,
        description: "Activation, installation, and HTTPS protocols.",
        articleCount: 7,
        color: "#333"
    },
    {
        id: "ftp",
        title: "FTP",
        icon: <ArrowRight className="w-5 h-5" />,
        description: "File transfer protocols and client configurations.",
        articleCount: 6,
        color: "#CCFF00"
    },
    {
        id: "cdn",
        title: "CDN",
        icon: <Zap className="w-5 h-5" />,
        description: "Website acceleration and global edge caching suite.",
        articleCount: 4,
        color: "#333"
    }
];

const RECENT_ARTICLES = [
    { title: "How do I migrate emails?", category: "Email", slug: "how-do-i-migrate-emails" },
    { title: "How do I connect via SSH?", category: "SSH Access", slug: "how-do-i-connect-via-ssh" },
    { title: "How do I use the CDN?", category: "CDN & Edge", slug: "how-do-i-use-the-cdn" },
    { title: "How do I create a MySQL database?", category: "Databases", slug: "how-do-i-create-a-mysql-database" }
];

const TRENDING_TAGS = ["Migration", "SSL Setup", "DNS", "Backup", "Speed"];

const KBHub = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showStickySearch, setShowStickySearch] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Total articles count
    const totalArticles = CATEGORIES.reduce((acc, cat) => acc + cat.articleCount, 0);

    // Sticky search on scroll
    useEffect(() => {
        const handleScroll = () => {
            setShowStickySearch(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Filter categories based on search
    const filteredCategories = searchQuery
        ? CATEGORIES.filter(cat =>
            cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : CATEGORIES;

    const scrollToCategory = (id: string) => {
        setSelectedCategory(id);
        // For now just highlight, could navigate to category page
    };

    return (
        <div className="relative min-h-screen selection:bg-[#CCFF00] selection:text-black bg-[#050505] text-[#F2F2F2] font-['Satoshi']">
            <Header />

            {/* Sticky Search Bar - Mobile */}
            <AnimatePresence>
                {showStickySearch && (
                    <motion.div
                        initial={{ y: -60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -60, opacity: 0 }}
                        className="lg:hidden fixed top-16 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 px-4 py-3"
                    >
                        <div className="flex items-center gap-3 bg-[#111] border border-white/5 rounded-xl px-3 py-2">
                            <Search className="w-4 h-4 text-[#444]" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-[#444]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="p-1">
                                    <X className="w-4 h-4 text-[#666]" />
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Grid Accent */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
            </div>

            <main className="relative z-10 pt-24 md:pt-40 pb-32 md:pb-32 px-4 md:px-8 max-w-7xl mx-auto">

                {/* Mobile: Compact Header with Stats */}
                <div className="lg:hidden mb-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between mb-4"
                    >
                        <div>
                            <span className="text-[#CCFF00] text-[10px] uppercase tracking-[0.3em] font-bold block mb-1">Knowledge Base</span>
                            <h1 className="text-3xl font-bold font-['Clash_Display']">Help Center</h1>
                        </div>
                        <div className="flex gap-3">
                            <div className="text-center p-3 bg-[#0a0a0a] border border-white/5 rounded-xl">
                                <p className="text-lg font-bold text-[#CCFF00]">{totalArticles}</p>
                                <p className="text-[9px] text-[#666] uppercase">Articles</p>
                            </div>
                            <div className="text-center p-3 bg-[#0a0a0a] border border-white/5 rounded-xl">
                                <p className="text-lg font-bold text-[#F2F2F2]">{CATEGORIES.length}</p>
                                <p className="text-[9px] text-[#666] uppercase">Topics</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Mobile Search */}
                    <div className="relative">
                        <div className={`flex items-center bg-[#0a0a0a] border ${isSearchFocused ? 'border-[#CCFF00]/40' : 'border-white/5'} p-3 rounded-xl transition-colors`}>
                            <Search className="w-5 h-5 text-[#444] mr-3" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search articles..."
                                className="flex-1 bg-transparent text-base focus:outline-none placeholder:text-[#444]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="p-1 active:scale-95">
                                    <X className="w-4 h-4 text-[#666]" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Desktop: Original Hero */}
                <div className="hidden lg:block max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[#CCFF00] text-[11px] uppercase tracking-[0.4em] font-black mb-6 block">Central Intelligence Hub</span>
                        <h1 className="text-8xl font-bold font-['Clash_Display'] leading-none mb-12">
                            Knowledge <br />
                            <span className="text-white/20">Base.</span>
                        </h1>

                        <div className="relative group max-w-2xl mx-auto">
                            <div className="absolute inset-0 bg-[#CCFF00]/5 blur-2xl group-hover:bg-[#CCFF00]/10 transition-all rounded-full" />
                            <div className="relative flex items-center bg-[#0a0a0a] border border-white/5 p-2 rounded-2xl focus-within:border-[#CCFF00]/40 transition-all">
                                <div className="pl-6 pr-4">
                                    <Search className="w-5 h-5 text-[#333] group-focus-within:text-[#CCFF00] transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search protocols..."
                                    className="w-full bg-transparent py-4 text-lg focus:outline-none placeholder:text-[#333]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className="flex items-center gap-2 pr-4 text-[11px] font-mono text-[#333] uppercase">
                                    <span>Press</span>
                                    <kbd className="px-2 py-1 bg-[#111] border border-white/10 rounded">Enter</kbd>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Mobile: Horizontal Category Chips */}
                <div className="lg:hidden mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[#888]">Quick Access</span>
                        <span className="text-[10px] text-[#444] font-mono">{CATEGORIES.length} topics</span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => scrollToCategory(cat.id)}
                                className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all active:scale-95 ${selectedCategory === cat.id
                                    ? 'bg-[#CCFF00] text-black'
                                    : 'bg-[#111] border border-white/5 text-[#888]'
                                    }`}
                            >
                                {cat.icon}
                                <span>{cat.title}</span>
                                <span className={`text-[10px] ${selectedCategory === cat.id ? 'text-black/60' : 'text-[#555]'}`}>
                                    {cat.articleCount}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Trending Tags - Mobile */}
                <div className="lg:hidden mb-8">
                    <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-3 h-3 text-[#CCFF00]" />
                        <span className="text-[10px] font-bold text-[#666] uppercase tracking-wider">Trending</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {TRENDING_TAGS.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSearchQuery(tag)}
                                className="px-3 py-1.5 bg-[#0a0a0a] border border-white/5 rounded-full text-[11px] text-[#888] active:bg-[#CCFF00]/10 active:text-[#CCFF00] transition-colors"
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Empty State for Search */}
                {searchQuery && filteredCategories.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#111] flex items-center justify-center">
                            <Search className="w-8 h-8 text-[#333]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#F2F2F2] mb-2">No results found</h3>
                        <p className="text-sm text-[#666] mb-4">Try searching for "{TRENDING_TAGS[0]}" or "{TRENDING_TAGS[1]}"</p>
                        <button
                            onClick={() => setSearchQuery("")}
                            className="px-4 py-2 bg-[#111] border border-white/10 rounded-lg text-xs font-bold active:scale-95"
                        >
                            Clear Search
                        </button>
                    </motion.div>
                )}

                {/* Categories Grid */}
                {filteredCategories.length > 0 && (
                    <>
                        {/* Mobile: Compact List Cards */}
                        <div className="lg:hidden space-y-3 mb-10">
                            {filteredCategories.map((category, idx) => (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className={`p-4 bg-[#0a0a0a] border rounded-xl active:scale-[0.98] transition-all ${selectedCategory === category.id ? 'border-[#CCFF00]/30' : 'border-white/5'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2.5 rounded-xl ${category.color === "#CCFF00" ? 'bg-[#CCFF00]/10 text-[#CCFF00]' : 'bg-[#111] text-[#666]'}`}>
                                                {category.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-[#F2F2F2]">{category.title}</h3>
                                                <p className="text-[10px] text-[#666]">{category.articleCount} articles</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-[#333]" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Desktop: Original Grid */}
                        <div className="hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                            {filteredCategories.map((category, idx) => (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="group p-8 bg-[#0a0a0a] border border-white/5 rounded-[32px] hover:border-[#CCFF00]/20 transition-all cursor-pointer relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight className="w-5 h-5 text-[#CCFF00]" />
                                    </div>

                                    <div className={`mb-8 p-4 rounded-2xl w-fit transition-colors ${category.color === "#CCFF00" ? 'bg-[#CCFF00]/10 text-[#CCFF00]' : 'bg-[#111] text-[#555] group-hover:text-[#CCFF00] group-hover:bg-[#CCFF00]/10'}`}>
                                        {category.icon}
                                    </div>

                                    <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-[#F2F2F2]">{category.title}</h3>
                                    <p className="text-[#555] text-sm leading-relaxed mb-8 group-hover:text-[#888] transition-colors">
                                        {category.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#333] group-hover:text-[#CCFF00] transition-colors">
                                        <span>{category.articleCount} Protocols</span>
                                        <ChevronRight className="w-3 h-3" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}

                {/* Bottom Sections: Recent & Popular */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-20">

                    {/* Recent Protocols */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6 md:mb-10">
                            <Clock className="w-4 h-4 text-[#CCFF00] lg:hidden" />
                            <div className="hidden lg:block h-[1px] w-12 bg-[#CCFF00]" />
                            <h2 className="text-lg md:text-2xl font-bold font-['Clash_Display'] uppercase">Recent Articles</h2>
                        </div>

                        <div className="space-y-3">
                            {RECENT_ARTICLES.map((article, idx) => (
                                <Link
                                    key={article.slug}
                                    href={`/kb/${article.slug}`}
                                    className="block p-4 bg-[#0a0a0a] border border-white/5 rounded-xl active:bg-[#0c0c0c] active:scale-[0.99] hover:border-[#CCFF00]/20 transition-all group"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-[#111] flex items-center justify-center border border-white/5 group-hover:bg-[#CCFF00]/10 group-hover:border-[#CCFF00]/20 transition-all">
                                                <FileText className="w-4 h-4 text-[#444] group-hover:text-[#CCFF00]" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-[#F2F2F2] group-hover:text-[#CCFF00] transition-colors">{article.title}</h4>
                                                <span className="text-[10px] uppercase font-bold tracking-widest text-[#444]">{article.category}</span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-[#333] group-hover:text-[#CCFF00] group-hover:translate-x-1 transition-all" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Support Sidebar - Mobile Compact */}
                    <div>
                        {/* Mobile: Compact Help Card */}
                        <div className="lg:hidden p-5 bg-[#0a0a0a] border border-white/5 rounded-2xl mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center">
                                    <HelpCircle className="w-6 h-6 text-[#CCFF00]" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-bold text-[#F2F2F2] mb-1">Need Help?</h3>
                                    <p className="text-[11px] text-[#666]">Our engineers are online 24/7</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-[#CCFF00] rounded-full animate-pulse" />
                                    <span className="text-[10px] text-[#666]">30s</span>
                                </div>
                            </div>
                        </div>

                        {/* Desktop: Full Sidebar */}
                        <div className="hidden lg:block p-10 bg-[#0a0a0a] border border-white/5 rounded-[40px] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-5">
                                <HelpCircle className="w-24 h-24" />
                            </div>

                            <h3 className="text-2xl font-bold font-['Clash_Display'] mb-6 relative z-10">Need Live Help?</h3>
                            <p className="text-[#555] text-sm leading-relaxed mb-10 relative z-10">
                                If you can&apos;t find the protocol you&apos;re looking for, our human engineers are available 24/7.
                            </p>

                            <div className="space-y-4 relative z-10">
                                <Link href="/contact" className="flex items-center justify-between w-full p-5 bg-[#CCFF00] text-black rounded-2xl group/btn hover:scale-[1.02] transition-all">
                                    <span className="text-[11px] font-black uppercase tracking-widest">Open Channel</span>
                                    <MessageSquare className="w-4 h-4" />
                                </Link>
                                <button className="flex items-center justify-between w-full p-5 bg-white/5 text-[#F2F2F2] border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                                    <span className="text-[11px] font-black uppercase tracking-widest">Live Chat</span>
                                    <Zap className="w-4 h-4 text-[#CCFF00]" />
                                </button>
                            </div>

                            <div className="mt-12 pt-12 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                                    <span className="text-[11px] uppercase font-bold tracking-widest text-[#333]">Average Response: 30s</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Disclaimer for KB */}
                <div className="mt-20 md:mt-32 p-6 md:p-8 border-t border-white/5 text-center">
                    <p className="text-[#444] text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">
                        &copy; 2026 WPFYE TECHNOLOGY. ALL OPERATIONAL PROTOCOLS ARE SUBJECT TO THE GOVERNING LAW BLOCK.
                    </p>
                </div>


            </main>

            <Footer />
        </div>
    );
};

export default KBHub;
