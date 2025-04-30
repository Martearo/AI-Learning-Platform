'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/solid';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Monthly',
      originalPrice: 29,
      price: isAnnual ? 19 : 29,
      period: '/month',
      description: 'Perfect for individual learners',
      features: [
        'Access to all basic AI tools',
        'Community support',
        '5 projects per month',
        'Basic tutorials',
        'Email support'
      ],
      buttonText: 'Start Monthly Plan',
      popular: false
    },
    {
      name: 'Yearly',
      originalPrice: 25,
      price: isAnnual ? 15 : 25,
      period: '/month',
      description: 'Best value for committed learners',
      features: [
        'All Monthly features',
        'Priority support',
        'Unlimited projects',
        'Advanced tutorials',
        'Monthly live workshops',
        '2 months free annually'
      ],
      buttonText: 'Start Yearly Plan',
      popular: true
    },
    {
      name: 'Business',
      originalPrice: 59,
      price: isAnnual ? 49 : 59,
      period: '/month',
      description: 'For teams and organizations',
      features: [
        'All Yearly features',
        'Team collaboration tools',
        'Custom AI model training',
        'Dedicated support',
        'API access',
        'Custom integrations',
        'Team onboarding'
      ],
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-5xl font-bold text-white text-center mb-4">
            Pricing Plans
          </h1>
          <p className="text-xl text-slate-300 text-center mb-12">
            Choose the perfect plan for your AI learning journey
          </p>

          {/* Billing toggle */}
          <div className="relative self-center mt-6 bg-slate-800 rounded-lg p-0.5 flex sm:mt-8 mb-12">
            <button
              type="button"
              className={`${
                !isAnnual ? 'bg-slate-700 border-slate-600 shadow-sm text-white' : 'border border-transparent text-slate-300'
              } relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10 sm:w-auto sm:px-8`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly billing
            </button>
            <button
              type="button"
              className={`${
                isAnnual ? 'bg-slate-700 border-slate-600 shadow-sm text-white' : 'border border-transparent text-slate-300'
              } ml-0.5 relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:z-10 sm:w-auto sm:px-8`}
              onClick={() => setIsAnnual(true)}
            >
              Annual billing
              {isAnnual && <span className="ml-2 text-green-400">(Save up to 34%)</span>}
            </button>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg shadow-lg divide-y divide-slate-700 bg-slate-800 ${
                  plan.popular ? 'border-2 border-blue-500' : ''
                }`}
              >
                <div className="p-6">
                  {plan.popular && (
                    <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-blue-100 text-blue-600 mb-4">
                      Most Popular
                    </span>
                  )}
                  <h2 className="text-2xl font-semibold text-white">{plan.name}</h2>
                  <p className="mt-4 text-sm text-slate-300">{plan.description}</p>
                  <p className="mt-8 flex items-baseline">
                    {isAnnual && (
                      <span className="text-2xl line-through text-red-400 mr-2">
                        ${plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-extrabold text-white">
                      ${plan.price}
                    </span>
                    <span className="text-base font-medium text-slate-300">{plan.period}</span>
                    {isAnnual && (
                      <span className="ml-2 text-sm text-green-400">
                        Save ${plan.originalPrice - plan.price}/mo
                      </span>
                    )}
                  </p>
                  <Link
                    href="/auth"
                    className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                      plan.popular
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-slate-700 text-white hover:bg-slate-600'
                    }`}
                  >
                    {plan.buttonText}
                  </Link>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h3 className="text-xs font-medium text-white tracking-wide uppercase">
                    What's included
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex space-x-3">
                        <CheckIcon
                          className="flex-shrink-0 h-5 w-5 text-green-400"
                          aria-hidden="true"
                        />
                        <span className="text-sm text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 