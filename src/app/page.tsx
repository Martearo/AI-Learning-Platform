'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlayIcon } from '@heroicons/react/24/solid';
import { UserIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import ParticlesBackground from './components/ParticlesBackground';
import { getCookie, eraseCookie } from './utils/cookies';

export default function Home() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user is logged in
    const userNameFromCookie = getCookie('userName');
    const userEmailFromCookie = getCookie('userEmail');
    setUserName(userNameFromCookie);
    setUserEmail(userEmailFromCookie);

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    eraseCookie('userName');
    eraseCookie('userEmail');
    setUserName(null);
    setUserEmail(null);
    setIsProfileOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <ParticlesBackground />
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 relative">
        <div className="flex space-x-8">
          <Link href="/" className="text-white font-medium">Home</Link>
          <Link href="/tools" className="text-slate-300 hover:text-white">Tools</Link>
          <Link href="/tutorials" className="text-slate-300 hover:text-white">Tutorials</Link>
          <Link href="/pricing" className="text-slate-300 hover:text-white">Pricing</Link>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`p-2 pl-3 rounded-full bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center space-x-3 transition-all duration-500 ease-in-out ${
              isHovered ? 'pr-6' : 'pr-4'
            }`}
            style={{
              width: isHovered ? 'auto' : 'min-content'
            }}
          >
            {userName && (
              <div 
                className="flex flex-col items-start transition-all duration-500 ease-in-out overflow-hidden"
                style={{
                  width: isHovered ? 'auto' : '0',
                  opacity: 1
                }}
              >
                <span className="text-slate-300 text-sm capitalize whitespace-nowrap overflow-hidden">
                  {userName}
                </span>
                <span 
                  className="text-slate-400 text-xs whitespace-nowrap overflow-hidden transition-all duration-500 ease-in-out"
                  style={{
                    maxHeight: isHovered ? '20px' : '0',
                    opacity: isHovered ? 1 : 0
                  }}
                >
                  {userEmail}
                </span>
              </div>
            )}
            <EnvelopeIcon 
              className={`w-6 h-6 text-slate-300 transition-transform duration-500 ease-in-out ${
                isHovered ? 'rotate-360' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-slate-800 ring-1 ring-black ring-opacity-5">
              {userName ? (
                <>
                  <a href="/profile" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">
                    Your Profile
                  </a>
                  <a href="/settings" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">
                    Settings
                  </a>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">
                    Sign in
                  </Link>
                  <Link href="/auth" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">
                    Create account
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Scale Your Life &<br />Work with AI
          </h1>
          <p className="text-xl text-slate-300 mb-12">
            Learn the tools that will transform<br />your productivity and lifestyle
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Get Started
            </Link>
            <button className="px-8 py-3 bg-slate-800 text-slate-300 border border-slate-700 rounded-lg hover:bg-slate-700">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Featured Tutorial */}
        <section className="mt-24">
          <h2 className="text-2xl font-bold text-white mb-8">Featured Tutorial</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative bg-slate-800 rounded-xl overflow-hidden">
              <div className="aspect-video relative">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  poster="/thumbnail.jpg"
                >
                  <source src="/0713.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-4">Introduction to AI Tools</h3>
              <p className="text-slate-300">
                Get an overview of essential AI Tools and how they can enhance your work and daily routine
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-24">
          <h2 className="text-2xl font-bold text-white mb-8">Trusted by Learners and Business Owners</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Thisa Platsom",
                quote: "This platform made it easy to integrate AI into my business!",
                image: "/testimonial1.jpg"
              },
              {
                name: "Eric Serber",
                quote: "AI Tools helped me achieve new levels of efficiency.",
                image: "/testimonial2.jpg"
              },
              {
                name: "Andrea Sauger",
                quote: "I've learned so much and grown my skills quickly.",
                image: "/testimonial3.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-slate-800/50 p-6 rounded-xl shadow-lg backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-700 mr-4" />
                  <div>
                    <p className="text-white font-medium">{testimonial.name}</p>
                  </div>
                </div>
                <p className="text-slate-300">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 