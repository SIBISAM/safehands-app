import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Moon, Sun, Shield, Home, Clock, 
  Phone, Mail, MapPin, User, FileText, Check, 
  Upload, Image as ImageIcon, LogOut, Star, 
  Briefcase, Download, DollarSign, AlertCircle, PenTool,
  Heart
} from 'lucide-react';

// --- BRAND CONSTANTS & MOCK DATA ---

const BRAND = {
  name: "SafeHands",
  tagline: "Live peacefully abroad. Your home is in SafeHands.",
  colors: {
    primary: "from-slate-900 to-slate-800", // Deep Navy
    accent: "text-teal-600", // Teal/Cyan
    bg: "bg-[#FDFBF7]", // Warm Cream
    darkBg: "dark:bg-slate-950"
  },
  contact: {
    phone: "+91 98470 XXXXX",
    email: "care@safehandsnow.com",
    address: "Pathanamthitta, Kerala, India - 689645"
  },
  assets: {
    logo: "/assets/logos/logo.png", // Make sure this file exists in public/assets/logos/
    heroImage: "/assets/images/hero-bg.jpg",
    aboutImage: "/assets/images/about-team.jpg"
  }
};

const SERVICES = [
  {
    id: 'inspection',
    title: "Home Inspection",
    // We can use an image here instead of an icon if you prefer, 
    // but icons often look cleaner on small cards. 
    // Let's keep icons for the main menu but use images for the details page if we expanded it.
    icon: <Home className="w-8 h-8 text-teal-600" />, 
    image: "/assets/images/service-inspection.png",
    desc: "Monthly/weekly checks, photo reports, and safety inspections to ensure your property remains secure.",
    features: ["Interior & Exterior Check", "Moisture & Pest Detection", "Digital Photo Report"]
  },
  {
    id: 'vendor',
    title: "Vendor Coordination",
    icon: <Briefcase className="w-8 h-8 text-teal-600" />,
    image: "/assets/images/service-vendor.jpg",
    desc: "We manage local plumbers, electricians, and cleaners so you don't have to chase them from abroad.",
    features: ["Verified Professionals", "Supervised Work", "Transparent Quotes"]
  },
  {
    id: 'bills',
    title: "Bill & Document Support",
    icon: <FileText className="w-8 h-8 text-teal-600" />,
    desc: "Never miss a utility payment. We handle meter readings, bill payments, and official mail forwarding.",
    features: ["Utility Monitoring", "Payment Reminders", "Document Pickup"]
  },
  {
    id: 'emergency',
    title: "Emergency Support",
    icon: <AlertCircle className="w-8 h-8 text-teal-600" />,
    image: "/assets/images/service-emergency.jpg",
    desc: "Immediate on-site visits during storms, water leaks, or suspicious activity reports.",
    features: ["24/7 Response", "Storm Damage Check", "Security Liaison"]
  }
];

const PRICING = [
  {
    name: "CareLite",
    price: "₹1,499",
    period: "/ month",
    desc: "Essential monthly checks for locked homes.",
    features: ["Monthly Inspection", "Photo/Video Report", "Utility Meter Check", "Mail Collection"],
    highlight: false
  },
  {
    name: "CarePlus",
    price: "₹4,499",
    period: "/ month",
    desc: "Weekly attention for occupied or high-value homes.",
    features: ["Weekly Inspections", "Vendor Coordination", "Priority Support", "Bill Management", "Minor Repair Supervision"],
    highlight: true
  },
  {
    name: "CareElite",
    price: "₹9,999",
    period: "/ month",
    desc: "Complete concierge service for total peace of mind.",
    features: ["Unlimited Visits", "Emergency Response", "Full Concierge", "Deep Cleaning (1x/yr)", "Dedicated Manager"],
    highlight: false
  }
];

const TESTIMONIALS = [
  { name: "Mathew Thomas", location: "Dubai, UAE", text: "SafeHands has been a blessing. I used to worry about my parents' house in Ranni every monsoon. Now I get a full report on WhatsApp." },
  { name: "Sarah George", location: "London, UK", text: "Professional and transparent. The photos they send are detailed, and they handled my plumbing repairs perfectly." }
];

// --- COMPONENTS ---

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm";
  const variants = {
    primary: "bg-slate-900 dark:bg-teal-600 text-white hover:bg-slate-800 dark:hover:bg-teal-700",
    outline: "border-2 border-slate-900 dark:border-teal-500 text-slate-900 dark:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800",
    ghost: "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Section = ({ children, className = "", id = "" }) => (
  <section id={id} className={`py-20 px-4 md:px-8 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 transition-colors ${className}`}>
    {children}
  </div>
);

// --- PAGES ---

const HomePage = ({ navigate }) => (
  <>
    {/* Hero */}
    <div className="relative overflow-hidden bg-[#FDFBF7] dark:bg-slate-950 pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in-up z-10 relative">
          <div className="inline-flex items-center space-x-2 bg-teal-50 dark:bg-teal-900/30 px-3 py-1 rounded-full">
            <Shield className="w-4 h-4 text-teal-600" />
            <span className="text-teal-700 dark:text-teal-400 text-sm font-semibold tracking-wide">TRUSTED IN PATHANAMTHITTA</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
            Live peacefully abroad. <br/>
            <span className="text-teal-600">Your home is in SafeHands.</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
            We act as your local representative in Kerala, managing your property, coordinating repairs, and caring for your loved ones so you never have to worry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button onClick={() => navigate('services')}>View Services</Button>
            <Button variant="outline" onClick={() => navigate('contact')}>Contact Us</Button>
          </div>
        </div>
        
        {/* Visual Side - Using one of your provided posters/images here would be great */}
        <div className="relative z-10">
           {/* Fallback to code visual if image missing, else show image */}
           <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src={BRAND.assets.heroImage} 
                alt="Happy family backed by SafeHands" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.style.display = 'none'; // Hide if missing
                  e.target.nextSibling.style.display = 'block'; // Show fallback
                }}
              />
              {/* Fallback Visual (Hidden by default if image loads) */}
              <div className="hidden bg-white dark:bg-slate-800 p-6">
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-xl">
                      <Check className="w-8 h-8 text-teal-500 mb-2" />
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">100%</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Verified Visits</div>
                   </div>
                   <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-xl">
                      <Clock className="w-8 h-8 text-teal-500 mb-2" />
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">24/7</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Support</div>
                   </div>
                </div>
              </div>
           </div>
           
           {/* Decorative blobs behind image */}
           <div className="absolute top-0 right-0 w-72 h-72 bg-teal-200 dark:bg-teal-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob -z-10"></div>
           <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 -z-10"></div>
        </div>
      </div>
    </div>

    {/* Features */}
    <Section className="bg-white dark:bg-slate-900">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Why Choose SafeHands?</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-4">We combine corporate professionalism with family-like care.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: Camera, title: "Transparent Reporting", text: "Every visit is documented with photos and videos uploaded to your dashboard." },
          { icon: Heart, title: "Emotional Care", text: "We don't just fix taps. We spend time with your elderly parents." },
          { icon: Shield, title: "Zero Hidden Costs", text: "No commission on vendor bills. You pay exactly what the vendor charges." }
        ].map((f, i) => (
          <Card key={i} className="hover:border-teal-500 transition-all cursor-default">
            <f.icon className="w-10 h-10 text-teal-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">{f.title}</h3>
            <p className="text-slate-600 dark:text-slate-400">{f.text}</p>
          </Card>
        ))}
      </div>
    </Section>

    {/* CTA */}
    <Section>
      <div className="bg-slate-900 dark:bg-teal-900 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
        {/* Background texture from image if available */}
        <div className="absolute inset-0 opacity-10 bg-[url('/assets/images/service-inspection.jpg')] bg-cover bg-center"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-6">Ready to secure your home?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">Join 200+ families in Pathanamthitta who trust SafeHands. Get your free assessment today.</p>
          <Button variant="primary" className="bg-white text-slate-900 hover:bg-teal-50 dark:bg-white dark:text-teal-900" onClick={() => navigate('contact')}>
            Get Free Quote
          </Button>
        </div>
      </div>
    </Section>
  </>
);

const ServicesPage = ({ navigate }) => (
  <Section>
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Services</h1>
      <p className="text-slate-600 dark:text-slate-300">Detailed care plans tailored for vacant homes and elderly parents.</p>
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      {SERVICES.map((service) => (
        <Card key={service.id} className="flex flex-col overflow-hidden p-0">
          {/* Service Image Header */}
          {service.image && (
            <div className="h-48 w-full overflow-hidden">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                   onError={(e) => e.target.style.display = 'none'} />
            </div>
          )}
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                {service.icon}
              </div>
              <Button variant="ghost" className="text-sm" onClick={() => navigate('contact')}>Inquire</Button>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{service.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">{service.desc}</p>
            <ul className="space-y-3 mt-auto">
              {service.features.map((f, i) => (
                <li key={i} className="flex items-center text-slate-700 dark:text-slate-300">
                  <Check className="w-5 h-5 text-teal-500 mr-3" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </div>
  </Section>
);

// ... (PricingPage, AboutPage, ContactPage, Dashboard, LoginPage logic remains largely same, just imported below for completeness)

const PricingPage = ({ navigate }) => (
  <Section>
    <div className="text-center mb-16">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Simple, Transparent Pricing</h1>
      <p className="text-slate-600 dark:text-slate-400 mt-4">Choose a plan that fits your needs. No hidden fees.</p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {PRICING.map((plan, i) => (
        <div key={i} className={`relative p-8 rounded-2xl border ${plan.highlight ? 'border-teal-500 ring-2 ring-teal-500/20 bg-white dark:bg-slate-800' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50'}`}>
          {plan.highlight && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
              MOST POPULAR
            </div>
          )}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
          <div className="mt-4 mb-2 flex items-baseline">
            <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
            <span className="text-slate-500 ml-2">{plan.period}</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 min-h-[40px]">{plan.desc}</p>
          <Button variant={plan.highlight ? 'primary' : 'outline'} className="w-full mb-8" onClick={() => navigate('contact')}>
            Choose {plan.name}
          </Button>
          <ul className="space-y-4">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm text-slate-700 dark:text-slate-300">
                <Check className="w-4 h-4 text-teal-500 mr-3 mt-0.5 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </Section>
);

const AboutPage = () => {
  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
           <div>
             <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">About SafeHands</h1>
             <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
               SafeHands was born from a simple realization: Distance creates anxiety. Whether it's an aging parent living alone in Ranni or a locked house in Kozhencherry, NRIs constantly worry about the "what ifs."
             </p>
             <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
               We are not just a maintenance company. We are your proxy family. Our team of uniformed, vetted Field Managers brings corporate professionalism to domestic care.
             </p>
           </div>
           <div className="rounded-2xl overflow-hidden shadow-lg rotate-3 hover:rotate-0 transition-transform duration-500">
             <img src={BRAND.assets.aboutImage} alt="Our Team" className="w-full h-auto" onError={(e) => e.target.style.display = 'none'} />
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-teal-50 dark:bg-slate-800 border-none">
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Our Mission</h3>
            <p className="text-slate-600 dark:text-slate-300">To deliver unwavering support to NRI families by delivering trusted home maintenance and compassionate elder assistance.</p>
          </Card>
          <Card className="bg-slate-50 dark:bg-slate-800 border-none">
             <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Our Vision</h3>
             <p className="text-slate-600 dark:text-slate-300">To become Kerala’s most trusted family support partner, recognized for restoring the traditional warmth of home care through reliability.</p>
          </Card>
        </div>
      </div>
    </Section>
  );
};

// ... (ContactPage, Dashboard, LoginPage, Camera Icon helper remain same as previous version)
const ContactPage = () => {
  const [formState, setFormState] = useState('idle'); 
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500); 
  };
  return (
    <Section>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Get in Touch</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Whether you need a one-time repair or a yearly care plan, we are here to help.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center text-teal-600">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">Phone</div>
                <div className="text-slate-600 dark:text-slate-400">{BRAND.contact.phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center text-teal-600">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">Email</div>
                <div className="text-slate-600 dark:text-slate-400">{BRAND.contact.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center text-teal-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">Office</div>
                <div className="text-slate-600 dark:text-slate-400">{BRAND.contact.address}</div>
              </div>
            </div>
          </div>
        </div>
        <Card>
          {formState === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-2">We will get back to you within 24 hours.</p>
              <Button variant="outline" className="mt-6" onClick={() => setFormState('idle')}>Send Another</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                <input required type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <input required type="email" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Service Interest</label>
                <select className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none">
                  <option>General Inquiry</option>
                  <option>CareLite Plan</option>
                  <option>CarePlus Plan</option>
                  <option>CareElite Plan</option>
                  <option>Emergency Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                <textarea required rows="4" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none" placeholder="Tell us about your property..."></textarea>
              </div>
              <Button type="submit" className="w-full" disabled={formState === 'submitting'}>
                {formState === 'submitting' ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </Section>
  );
};

const Dashboard = ({ user, logout }) => (
  <div className="p-4 md:p-8 max-w-7xl mx-auto">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome, {user.name}</h1>
      <Button variant="outline" onClick={logout} className="flex items-center gap-2">
        <LogOut className="w-4 h-4" /> Logout
      </Button>
    </div>
    {user.role === 'client' ? (
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Recent Activity</h3>
            <div className="space-y-4">
              {[{ date: "Oct 24", action: "Weekly Inspection Completed", status: "Report Ready" }, { date: "Oct 20", action: "Electricity Bill Paid (₹1,240)", status: "Success" }, { date: "Oct 15", action: "Garden Cleaning", status: "Completed" }].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-teal-100 dark:bg-teal-900 text-teal-600 p-2 rounded-full"><Check className="w-4 h-4" /></div>
                    <div><div className="font-medium text-slate-900 dark:text-white">{item.action}</div><div className="text-xs text-slate-500">{item.date}</div></div>
                  </div>
                  <span className="text-xs font-bold text-teal-600 bg-teal-50 dark:bg-teal-900/50 px-2 py-1 rounded">{item.status}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-6">
           <Card className="bg-slate-900 text-white">
             <h3 className="font-bold mb-2">My Plan: CarePlus</h3>
             <p className="text-sm text-slate-400 mb-4">Renewal due: Nov 01, 2025</p>
             <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden"><div className="bg-teal-500 w-3/4 h-full"></div></div>
             <p className="text-xs mt-2 text-right">2 visits left this month</p>
           </Card>
        </div>
      </div>
    ) : (
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900 dark:text-white"><Upload className="w-5 h-5" /> Upload Assets</h3>
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center"><ImageIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" /><p className="text-slate-600 dark:text-slate-300 font-medium">Drag & Drop Logos</p></div>
        </Card>
      </div>
    )}
  </div>
);

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e) => { e.preventDefault(); if (email === 'admin@safehands.com' && password === 'admin123') onLogin({ name: 'Admin User', role: 'admin' }); else onLogin({ name: 'Mathew Thomas', role: 'client' }); };
  return (
    <Section>
      <div className="max-w-md mx-auto">
        <Card>
          <h2 className="text-2xl font-bold text-center mb-6 text-slate-900 dark:text-white">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div><label className="block text-sm mb-1 text-slate-700 dark:text-slate-300">Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700" placeholder="admin@safehands.com" /></div>
            <div><label className="block text-sm mb-1 text-slate-700 dark:text-slate-300">Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700" placeholder="••••••" /></div>
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
        </Card>
      </div>
    </Section>
  );
};

const Camera = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>);

export default function SafeHandsApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add('dark');
    
    // Dynamically set Favicon
    const link = document.querySelector("link[rel~='icon']");
    if (!link) {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = '/favicon.ico'; // Ensure favicon.ico is in public/
      document.head.appendChild(newLink);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) { document.documentElement.classList.add('dark'); localStorage.setItem('theme', 'dark'); } 
    else { document.documentElement.classList.remove('dark'); localStorage.setItem('theme', 'light'); }
  };

  const navigate = (page) => { setCurrentPage(page); setMenuOpen(false); window.scrollTo(0,0); };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-950' : 'bg-[#FDFBF7]'}`}>
      <div className="font-sans text-slate-900 dark:text-slate-100">
        <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center cursor-pointer gap-3" onClick={() => navigate('home')}>
                {/* Logo Image */}
                <div className="w-10 h-10 rounded-lg overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
                   <img src={BRAND.assets.logo} alt="SafeHands Logo" className="w-full h-full object-cover" 
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                   {/* Fallback to Icon if logo missing */}
                   <div className="hidden w-full h-full bg-slate-900 dark:bg-white items-center justify-center">
                      <Home className="text-white dark:text-slate-900 w-6 h-6" />
                   </div>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">SafeHands</h1>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                {['Home', 'Services', 'Pricing', 'About', 'Contact'].map((item) => (
                  <button key={item} onClick={() => navigate(item.toLowerCase())} className={`text-sm font-medium hover:text-teal-600 transition-colors ${currentPage === item.toLowerCase() ? 'text-teal-600 font-bold' : 'text-slate-600 dark:text-slate-300'}`}>{item}</button>
                ))}
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">{darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
                {user ? <Button variant="primary" onClick={() => navigate('dashboard')}>Dashboard</Button> : <Button variant="outline" className="px-4 py-2" onClick={() => navigate('login')}>Login</Button>}
              </div>
              <div className="md:hidden flex items-center gap-4">
                <button onClick={toggleTheme} className="p-2">{darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
                <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">{menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
              </div>
            </div>
          </div>
          {menuOpen && (
            <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 absolute w-full">
              <div className="px-4 pt-2 pb-4 space-y-1">
                {['Home', 'Services', 'Pricing', 'About', 'Contact'].map((item) => (
                  <button key={item} onClick={() => navigate(item.toLowerCase())} className="block w-full text-left px-3 py-4 text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">{item}</button>
                ))}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  {user ? <Button className="w-full" onClick={() => navigate('dashboard')}>Go to Dashboard</Button> : <Button className="w-full" onClick={() => navigate('login')}>Client Login</Button>}
                </div>
              </div>
            </div>
          )}
        </nav>
        <main className="pt-20">
          {currentPage === 'home' && <HomePage navigate={navigate} />}
          {currentPage === 'services' && <ServicesPage navigate={navigate} />}
          {currentPage === 'pricing' && <PricingPage navigate={navigate} />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'contact' && <ContactPage />}
          {currentPage === 'login' && <LoginPage onLogin={(u) => { setUser(u); navigate('dashboard'); }} />}
          {currentPage === 'dashboard' && <Dashboard user={user} logout={() => { setUser(null); navigate('home'); }} />}
        </main>
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
               <div className="flex items-center gap-2 mb-4 text-white"><Home className="w-6 h-6" /><span className="text-xl font-bold">SafeHands</span></div>
               <p className="max-w-xs text-slate-400 mb-6">{BRAND.tagline}</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-teal-400 cursor-pointer" onClick={() => navigate('services')}>Home Inspection</li>
                <li className="hover:text-teal-400 cursor-pointer" onClick={() => navigate('services')}>Vendor Management</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4"/> {BRAND.contact.phone}</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4"/> care@safehandsnow.com</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 md:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            © 2025 SafeHands Property Care. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}