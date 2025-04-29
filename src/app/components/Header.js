'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // Get current URL path

export default function Header() {
  const [showHeader, setShowHeader] = useState(true); // Control header visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
  const pathname = usePathname(); // Get the current route path

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // If scrolling down, hide header
        setShowHeader(false);
      } else {
        // If scrolling up, show header
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY); // Update last scroll position
    };

    window.addEventListener('scroll', handleScroll); // Attach scroll listener
    return () => window.removeEventListener('scroll', handleScroll); // Clean up listener on unmount
  }, [lastScrollY]);

  return (
    <header
      className={`bg-white fixed w-full top-0 z-50 shadow-md transition-transform duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo Link to Home */}
        <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
          Resumend
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-8">
          <NavLink href="/resume/upload" label="Upload Resume" pathname={pathname} />
          <NavLink href="/jobs" label="Browse Jobs" pathname={pathname} />
          <NavLink href="/profile" label="Your Profile" pathname={pathname} />
        </nav>
      </div>
    </header>
  );
}

// Custom NavLink component to handle active underline
function NavLink({ href, label, pathname }) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative text-gray-600 hover:text-blue-600 transition font-medium ${
        isActive ? 'text-blue-700' : ''
      }`}
    >
      {label}
      {/* Underline that expands if active */}
      <span
        className={`absolute left-0 -bottom-1 h-0.5 bg-blue-600 transition-all ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      ></span>
    </Link>
  );
}
