import React, { useState, useEffect } from 'react';
import VertixLogo from "../assets/svg-components/index"
import { EarlyAccessModal } from './custom/EarlyAccessModal';
import { navLinks, socialLinks } from '../constants';


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar at the top of the page
      if (currentScrollY < 100) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && isVisible) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY && !isVisible) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, lastScrollY]);

  return (
    <nav className={`fixed top-2 left-1/2 -translate-x-1/2 w-[95%] max-w-full z-50 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-between px-6 py-3 transition-transform duration-300 ${
      isVisible ? '-translate-y-0' : '-translate-y-full'
    }`}>
      <div className="flex items-center">
        <a href="/">
          <VertixLogo />
        </a>
      </div>
      <button className="xl:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <ul className="hidden xl:flex gap-8 font-medium text-lg items-center">
        {navLinks.map(link => (
          <li key={link.label}>
            <a href={link.href} className="text-white hover:text-accent transition-colors">{link.label}</a>
          </li>
        ))}
        <li>
          <EarlyAccessModal
            className="ml-4 bg-accent border border-border/20 px-4 py-2 rounded-full text-white font-semibold hover:bg-accent/50 transition-colors"
          />
        </li>
      </ul>
      {menuOpen && (
        <div className="fixed inset-0 -top-5 -left-4 md:-left-5 right-0 bottom-0 translate-x-0 z-50 w-screen h-screen bg-black/90 backdrop-blur-md flex flex-col justify-between p-8 xl:hidden transition-all">
          <div className="w-full h-full">
            <div className="flex justify-between items-center mb-12">
              <span className="font-bold text-2xl tracking-wide text-white">Vertix</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <i className="ri-close-line text-2xl text-white"></i>
              </button>
            </div>
            <ul className="flex flex-col gap-8 text-2xl mb-12">
              {navLinks.map(link => (
                <li key={link.label}>
                    <a href={link.href} className="text-white hover:text-accent transition-colors">{link.label}</a>
                </li>
              ))}
              <li>
                <EarlyAccessModal
                  className="mt-4 bg-accent border border-border/20 px-4 py-2 rounded-full text-white font-semibold hover:bg-accent/50 transition-colors"
                />
              </li>
            </ul>
          </div>
          <div className="flex gap-6 justify-center mt-12">
            {socialLinks.map(link => (
              <a key={link.label} href={link.href} aria-label={link.label}>
                <i className={`${link.icon} text-2xl text-white`}></i>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
} 