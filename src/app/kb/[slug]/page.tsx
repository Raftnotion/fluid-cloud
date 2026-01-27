"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Share2, MessageSquare, ChevronRight, FileText, Info } from 'lucide-react';
import Link from 'next/link';

const KBArticle = ({ params }: { params: { slug: string } }) => {
    // Dummy content map for demonstration
    const contentMap: Record<string, any> = {
        "how-do-i-migrate-emails": {
            title: "How do I migrate emails?",
            category: "Email",
            updated: "Jan 27, 2026",
            readTime: "4 min read",
            content: `
                <p>To migrate your emails and mailboxes to <strong>WPFYE</strong>, you can use our in-house <strong>Email Migrations tool</strong>. This will let you migrate your <strong>IMAP mailboxes</strong>, your <strong>Gmail mailboxes</strong>, and your <strong>Outlook mailboxes</strong> into <strong>WPFYE</strong>.</p>
                
                <h3>To do this:</h3>
                <ul>
                    <li>Login to <strong>cp.wpfye.in</strong></li>
                    <li>Select which package you want to migrate emails in to via <strong>Manage Hosting</strong>.</li>
                    <li>Select the <strong>Email Migrations tool</strong> that is within the emails section.</li>
                    <li>Enter the relevant credentials and then select <strong>Sync</strong>.</li>
                </ul>

                <div class="p-6 bg-[#CCFF00]/5 border border-[#CCFF00]/20 rounded-2xl my-8">
                    <p class="text-[#CCFF00] text-sm font-bold flex items-center gap-2 mb-2">
                        <Info class="w-4 h-4" /> Technical Insight
                    </p>
                    <p class="text-sm text-[#888] italic"><strong>Hostname:</strong> This will be the hostname of the mailserver that you are syncing your emails from. If you're not sure what this is, it may be worth asking your previous hosting provider.</p>
                </div>
            `
        },
        "how-do-i-view-the-most-recent-backups": {
            title: "How do I view the most recent backups?",
            category: "Hosting",
            updated: "Jan 27, 2026",
            readTime: "3 min read",
            content: `
                <p><strong>Timeline Backups</strong> take an automatic daily backup of all your websites and databases and store them for 30 days. If you have the Timeline Backups product, you may want to view the most recent backups of your site.</p>
                
                <h3>To do this:</h3>
                <ul>
                    <li>Log in to <strong>cp.wpfye.in</strong></li>
                    <li>Select which package that you want to view.</li>
                    <li>Select the <strong>'Timeline Backups'</strong> option from the <strong>File</strong> section.</li>
                    <li>Select <strong>'View Snapshots'</strong>.</li>
                </ul>
            `
        },
        "where-can-i-view-the-nameservers-of-a-domain": {
            title: "Where can I view the nameservers of a domain?",
            category: "Domain Names",
            updated: "Jan 27, 2026",
            readTime: "2 min read",
            content: `
                <p>If you manage your domain name with <strong>WPFYE</strong> and have access to it via <strong>cp.wpfye.in</strong>, you can view the nameservers the domain is using by following the steps below:</p>
                
                <h3>To do this:</h3>
                <ul>
                    <li>Log in to <strong>cp.wpfye.in</strong></li>
                    <li>Select <strong>Manage Domains</strong> and locate the domain you’d like to check, then select <strong>Manage</strong>.</li>
                    <li>Select the <strong>Nameservers</strong> icon to view what nameservers the domain is pointing to.</li>
                </ul>

                <div class="p-6 bg-[#CCFF00]/5 border border-[#CCFF00]/20 rounded-2xl my-8">
                    <p class="text-[#CCFF00] text-sm font-bold flex items-center gap-2 mb-2">
                        <Info class="w-4 h-4" /> Usage Notes
                    </p>
                    <ul class="text-sm text-[#888] space-y-2">
                        <li>You can edit and update them here.</li>
                        <li>Please note that nameserver changes usually take between <strong>6-8 hours</strong> but can take up to <strong>24 hours</strong> to fully propagate.</li>
                    </ul>
                </div>
            `
        },
        "how-do-i-activate-my-free-ssl": {
            title: "How do I activate my free SSL?",
            category: "SSL Certificates",
            updated: "Jan 27, 2026",
            readTime: "5 min read",
            content: `
                <p><strong>Activating Your Free Wildcard SSL Certificate</strong></p>
                <p>Every <strong>WPFYE</strong> hosting package includes a complimentary wildcard SSL certificate, allowing you to secure your site with the 'HTTPS' protocol. To activate the SSL certificate, ensure that your domain name is pointed to our nameservers.</p>
                
                <h3>Steps to activate:</h3>
                <ol>
                    <li><strong>Verify Domain Name Configuration:</strong> Confirm that your domain name is correctly pointed to our nameservers. This is a prerequisite for SSL activation.</li>
                    <li><strong>Access Control Panel:</strong> Login to your <strong>WPFYE</strong> control panel (<strong>cp.wpfye.in</strong>).</li>
                    <li><strong>Manage Hosting:</strong> Navigate to the <strong>Manage Hosting</strong> section and select the domain for which you want to activate SSL.</li>
                    <li><strong>SSL/TLS Tool:</strong> Look for the <strong>SSL/TLS</strong> icon in the <strong>Security</strong> section.</li>
                    <li><strong>Activate Free SSL:</strong> Click on the <strong>Activate Free SSL</strong> button. The system will then process the request and install the certificate.</li>
                </ol>
            `
        },
        "how-do-i-use-the-cdn": {
            title: "How do I use the CDN?",
            category: "CDN & Edge",
            updated: "Jan 27, 2026",
            readTime: "4 min read",
            content: `
                <p>The <strong>WPFYE CDN</strong> is a global network of servers that cache your website's content to improve loading speeds for visitors worldwide.</p>
                
                <h3>To use the CDN:</h3>
                <ul>
                    <li>Login to <strong>cp.wpfye.in</strong></li>
                    <li>Select the package you wish to manage.</li>
                    <li>Navigate to the <strong>Website Extras</strong> section and select the <strong>Edge Caching (CDN)</strong> tool.</li>
                    <li>From here, you can enable or disable the CDN and configure specific caching rules.</li>
                </ul>

                <h3>Purging the Cache:</h3>
                <p>If you make changes to your site and they are not appearing, you may need to purge the CDN cache.</p>
                <ul>
                    <li>Within the CDN tool, select <strong>Purge Cache</strong>.</li>
                    <li>You can choose to <strong>Purge All</strong> or specify individual files/paths to clear.</li>
                </ul>
            `
        },
        "how-do-i-connect-via-ftp": {
            title: "How do I connect via FTP?",
            category: "FTP Access",
            updated: "Jan 27, 2026",
            readTime: "3 min read",
            content: `
                <p>Connecting via FTP to your web hosting is quick and easy. Ensure you have an FTP client available. We recommend <strong>FileZilla</strong>.</p>
                
                <h3>To do this:</h3>
                <ul>
                    <li><strong>Login to Control Panel:</strong> Access <strong>cp.wpfye.in</strong>.</li>
                    <li><strong>Unlock FTP:</strong> On the right-hand side, locate the <strong>FTP panel</strong>. Unlock FTP by time or IP address.</li>
                    <li><strong>Gather Details:</strong> In the <strong>FTP Details</strong> section, find your <strong>FTP Server</strong> (<code>ftp.gb.stackcp.com</code> for UK or <code>ftp.us.stackcp.com</code>), <strong>Username</strong>, and <strong>Password</strong>.</li>
                    <li><strong>Connect:</strong> Enter these into FileZilla and select <strong>Quick connect</strong>.</li>
                </ul>
            `
        },
        "how-do-i-change-php-version": {
            title: "How do I change PHP version?",
            category: "Development",
            updated: "Jan 27, 2026",
            readTime: "2 min read",
            content: `
                <p>As a standard, we run PHP 7+. If you wish to switch the version, head to <strong>cp.wpfye.in > Manage Hosting > [Select Package] > “Switch PHP Version”</strong>.</p>
                <p>Our platform supports multiple versions: <strong>5.3, 5.4, 5.5, 5.6, 7.0, 7.1, 7.2, 7.3, and 7.4.</strong></p>
                
                <div class="p-6 bg-[#CCFF00]/5 border border-[#CCFF00]/20 rounded-2xl my-8">
                    <p class="text-[#CCFF00] text-sm font-bold flex items-center gap-2 mb-2">
                        <Info class="w-4 h-4" /> Protocol Note
                    </p>
                    <p class="text-sm text-[#888] italic">Version changes may take up to 60 seconds but are usually instant. On Managed WordPress, we run PHP 7.0+ as standard.</p>
                </div>
            `
        },
        "how-do-i-connect-via-ssh": {
            title: "How do I connect via SSH?",
            category: "SSH Access",
            updated: "Jan 27, 2026",
            readTime: "8 min read",
            content: `
                <p>Connect to your <strong>WPFYE</strong> hosting package via SSH for advanced command-line operations. We recommend using <strong>PuTTY</strong>.</p>
                
                <h3>Connection Protocol:</h3>
                <ol>
                    <li>Generate a key pair using <strong>PuTTYgen</strong>.</li>
                    <li>Save your private key and copy the public key.</li>
                    <li>Login to <strong>cp.wpfye.in</strong>, navigate to <strong>SSH Access</strong>, and add your public key.</li>
                    <li>In PuTTY, under <strong>SSH > Auth</strong>, browse for your private key.</li>
                    <li>Set Host Name to <code>ssh.gb.stackcp.com</code> and click <strong>Open</strong>.</li>
                </ol>
            `
        },
        "how-do-i-create-a-mysql-database": {
            title: "How do I create a MySQL database?",
            category: "Databases",
            updated: "Jan 27, 2026",
            readTime: "3 min read",
            content: `
                <p>You can create MySQL databases in seconds directly from the <strong>WPFYE</strong> control panel.</p>
                
                <h3>Creation Protocol:</h3>
                <ol>
                    <li>Log in to <strong>cp.wpfye.in</strong> and select <strong>Manage Hosting</strong>.</li>
                    <li>Choose <strong>Manage</strong> next to your hosting package.</li>
                    <li>Under <strong>Web Tools</strong>, select <strong>MySQL Databases</strong>.</li>
                    <li>Define your database name and credentials to initialize.</li>
                </ol>

                <p class="text-[#333] text-sm italic mt-8">Note: Maximum database size is 1024MB/1GB. Use phpMyAdmin for data management.</p>
            `
        },
        "do-you-offer-wordpress-cli": {
            title: "Do you offer WordPress CLI?",
            category: "WordPress",
            updated: "Jan 27, 2026",
            readTime: "2 min read",
            content: `
                <p>Yes. The <strong>WP Command Line Interface (CLI)</strong> is included by default with all WordPress installations on the <strong>WPFYE</strong> platform.</p>
                <p>You can execute WP-CLI commands directly via your SSH terminal once connected to your package.</p>
            `
        }
    };

    const article = contentMap[params.slug] || {
        title: "Protocol Documentation",
        category: "General",
        updated: "Jan 20, 2026",
        readTime: "5 min read",
        content: "<p>This protocol documentation is being synchronized from our core intelligence hub. Please check back shortly for full details.</p>"
    };

    return (
        <div className="relative min-h-screen selection:bg-[#CCFF00] selection:text-black bg-[#050505] text-[#F2F2F2] font-['Satoshi']">
            <Header />

            <main className="relative z-10 pt-40 pb-32 px-8 max-w-5xl mx-auto">

                {/* Back to Hub */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link href="/kb" className="inline-flex items-center gap-2 text-[#555] hover:text-[#CCFF00] transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-inherit">Back to Intelligence Hub</span>
                    </Link>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-20">

                    {/* Article Content */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-[#CCFF00]">
                                    {article.category}
                                </span>
                                <div className="flex items-center gap-2 text-[10px] text-[#333] font-bold uppercase tracking-widest">
                                    <Clock className="w-3 h-3" />
                                    {article.readTime}
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold font-['Clash_Display'] leading-[1.1] mb-8">
                                {article.title}
                            </h1>

                            <div className="flex items-center gap-6 mb-16 pb-8 border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#111] to-[#222] border border-white/10" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#F2F2F2]">Engineering Team</p>
                                        <p className="text-[9px] text-[#333] uppercase">Last Updated {article.updated}</p>
                                    </div>
                                </div>
                                <button className="ml-auto p-2 hover:bg-white/5 rounded-full transition-all text-[#333] hover:text-[#CCFF00]">
                                    <Share2 className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Main Body */}
                            <div
                                className="prose prose-invert prose-headings:font-['Clash_Display'] prose-headings:font-bold prose-p:text-[#888] prose-p:leading-relaxed prose-li:text-[#888] max-w-none
                                           prose-h3:text-2xl prose-h3:text-[#F2F2F2] prose-h3:mt-12 prose-h3:mb-6
                                           prose-strong:text-[#F2F2F2]"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />

                            <div className="mt-20 p-10 bg-[#080808] border border-white/5 rounded-3xl text-center">
                                <h4 className="text-xl font-bold mb-4">Did this resolve your inquiry?</h4>
                                <div className="flex items-center justify-center gap-4">
                                    <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Yes</button>
                                    <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">No</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar: Related & Actions */}
                    <aside className="lg:w-1/4 space-y-12">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#333] mb-8">Related Protocols</h3>
                            <div className="space-y-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <h4 className="text-sm font-bold text-[#F2F2F2] group-hover:text-[#CCFF00] transition-colors mb-2">Protocol ADM-Sync-{i}04</h4>
                                        <p className="text-[10px] text-[#555] uppercase tracking-widest">Infrastructure / Cache</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-3xl">
                            <h4 className="text-[#F2F2F2] font-bold text-lg mb-4">Unresolved?</h4>
                            <p className="text-[#555] text-xs leading-relaxed mb-8">
                                If the technical documentation is insufficient, contact our core team.
                            </p>
                            <Link href="/contact" className="flex items-center justify-between w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-[#CCFF00] transition-all group">
                                <span>Support Channel</span>
                                <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </Link>
                        </div>
                    </aside>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default KBArticle;
