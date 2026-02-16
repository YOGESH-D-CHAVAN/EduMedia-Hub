// Pricing.jsx - Earthy Theme
import React, { useState } from "react";
import { Check } from "lucide-react";

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "Student",
      price: { monthly: 0, yearly: 0 },
      description: "Start your learning journey.",
      features: [
        "1 GB Project Storage",
        "Secure User Auth",
        "Student Community",
        "Basic Resources",
      ],
      cta: "Join For Free",
      popular: false,
    },
    {
      name: "Creator",
      price: { monthly: 12, yearly: 8 },
      description: "Publish & monetize content.",
      features: [
        "25 GB Project Storage",
        "Unlimited Uploads",
        "Detailed Analytics",
        "Priority Support",
        "Custom Branding",
      ],
      cta: "Start 14-day Trial",
      popular: true,
    },
    {
      name: "Campus",
      price: { monthly: 39, yearly: 200 },
      description: "Scale across departments.",
      features: [
        "100 GB Project Storage",
        "Admin Dashboard",
        "SSO Integration",
        "24/7 Dedicated Support",
        "Bulk User Management",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="bg-[#F0F9FF] py-24 font-sans selection:bg-[#2563EB] selection:text-[#F0F9FF] relative overflow-hidden">
      
       {/* Ambient Backgound */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
         <div className="absolute top-[-10%] left-1/2 w-[40rem] h-[40rem] bg-[#2563EB]/5 rounded-full blur-[100px] -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#E2E8F0] bg-[#FFFFFF] text-[#475569] font-bold text-xs uppercase tracking-widest mb-6 shadow-md">
             Transparent Pricing
          </div>
          <h2 className="text-5xl font-black text-[#1E3A8A] tracking-tighter mb-6 relative inline-block">
            Invest in your <span className="text-[#2563EB]">future</span>.
          </h2>
          <p className="mt-4 text-[#475569] max-w-2xl mx-auto text-xl font-medium">
            Plans designed for every stage of your educational journey.
          </p>

          {/* Toggle */}
          <div className="mt-10 inline-flex items-center gap-1 bg-[#FFFFFF] rounded-full p-2 border border-[#E2E8F0] shadow-lg">
            <button
              onClick={() => setAnnual(false)}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                !annual ? "bg-[#2563EB] text-[#F0F9FF] shadow-md" : "text-[#475569] hover:text-[#1E3A8A]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                annual ? "bg-[#2563EB] text-[#F0F9FF] shadow-md" : "text-[#475569] hover:text-[#1E3A8A]"
              }`}
            >
              Yearly
              <span className="ml-2 px-2 py-0.5 text-[10px] bg-[#475569] text-[#F0F9FF] rounded-full font-bold">
                -33%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-[2.5rem] p-8 flex flex-col transition-all duration-300 ${
                p.popular 
                ? "bg-[#FFFFFF] border-2 border-[#2563EB] shadow-2xl shadow-blue-500/10 scale-105 z-10" 
                : "bg-[#F0F9FF] border border-[#E2E8F0] hover:border-[#475569] hover:bg-[#FFFFFF]"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-[#2563EB] text-[#F0F9FF] text-xs font-black uppercase tracking-widest rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="mb-8 text-center pb-8 border-b border-[#E2E8F0]">
                <h3 className="text-2xl font-black text-[#1E3A8A] mb-2 tracking-tight">{p.name}</h3>
                <p className="text-[#475569] text-sm font-medium mb-6">{p.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-6xl font-black text-[#1E3A8A] tracking-tighter">
                    ${annual ? p.price.yearly : p.price.monthly}
                  </span>
                  <span className="text-[#64748B] font-bold text-lg uppercase tracking-wide">/ {annual ? "yr" : "mo"}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10 flex-grow">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-4 text-[#475569] font-medium text-sm">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${p.popular ? "bg-[#2563EB]" : "bg-[#FFFFFF] border border-[#E2E8F0]"}`}>
                        <Check className={`w-3 h-3 ${p.popular ? "text-[#F0F9FF]" : "text-[#475569]"}`} strokeWidth={4} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={p.name === "Campus" ? "/contact" : "/register"}
                className={`w-full text-center rounded-2xl py-4 font-black text-sm uppercase tracking-widest transition-all shadow-lg hover:-translate-y-1 ${
                  p.popular
                    ? "bg-[#2563EB] text-[#F0F9FF] hover:bg-[#1D4ED8]"
                    : "bg-[#FFFFFF] text-[#1E3A8A] border border-[#E2E8F0] hover:bg-[#1E3A8A] hover:text-[#F0F9FF]"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-16 text-center text-xs font-bold uppercase tracking-widest text-[#64748B]">
          Secure payments via Stripe • Cancel anytime • 14-day money-back guarantee
        </p>
      </div>
    </section>
  );
}