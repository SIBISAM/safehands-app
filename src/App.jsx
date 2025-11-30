import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react'; 

// --- CONFIGURATION DATA ---
// For your local VS Code setup, you can move these objects into 
// separate files (e.g., content/brand.json) and import them.

const brandData = {
  name: "SafeHands",
  tagline: "Live peacefully abroad. Your home is in SafeHands.",
  colors: {
    primary: "from-slate-900 to-slate-800",
    accent: "text-teal-600",
    bg: "bg-[#FDFBF7]",
    darkBg: "dark:bg-slate-950"
  },
  contact: {
    phone: "+91 90486 22682",
    email: "hellosafehands@gmail.com",
    address: "Pathanamthitta, Kerala, India - 689645"
  },
  assets: {
    logo: "../assets/logos/logo.png",
    footlogo: "../assets/logos/foot_logo.png",
    heroImage: "/..assets/images/hero-bg.png",
    aboutImage: "../assets/images/about-team.png"
  },
  socials: [
    { platform: "Facebook", label: "FB" },
    { platform: "Instagram", label: "IG" },
    { platform: "WhatsApp", label: "WA" }
  ],
  footerText: "© 2025 SafeHands Property Care. All rights reserved."
};

const servicesData = [
  {
    id: "inspection",
    title: "Home Inspection",
    iconName: "Home",
    image: "/assets/images/service-inspection.jpg",
    desc: "Monthly/weekly checks, photo reports, and safety inspections to ensure your property remains secure.",
    features: ["Interior & Exterior Check", "Moisture & Pest Detection", "Digital Photo Report"]
  },
  {
    id: "vendor",
    title: "Vendor Coordination",
    iconName: "Briefcase",
    image: "/assets/images/service-vendor.jpg",
    desc: "We manage local plumbers, electricians, and cleaners so you don't have to chase them from abroad.",
    features: ["Verified Professionals", "Supervised Work", "Transparent Quotes"]
  },
  {
    id: "bills",
    title: "Bill & Document Support",
    iconName: "FileText",
    desc: "Never miss a utility payment. We handle meter readings, bill payments, and official mail forwarding.",
    features: ["Utility Monitoring", "Payment Reminders", "Document Pickup"]
  },
  {
    id: "emergency",
    title: "Emergency Support",
    iconName: "AlertCircle",
    image: "/assets/images/service-emergency.jpg",
    desc: "Immediate on-site visits during storms, water leaks, or suspicious activity reports.",
    features: ["24/7 Response", "Storm Damage Check", "Security Liaison"]
  }
];

const pricingData = [
  {
    name: "CareLite",
    price: "₹1,999",
    period: "/ month",
    desc: "Essential monthly checks for locked homes.",
    features: ["Monthly Inspection", "Photo/Video Report", "Utility Meter Check", "Mail Collection"],
    highlight: false
  },
  {
    name: "CarePlus",
    price: "₹4,999",
    period: "/ month",
    desc: "Weekly attention for occupied or high-value homes.",
    features: ["Weekly Inspections", "Vendor Coordination", "Priority Support", "Bill Management", "Minor Repair Supervision"],
    highlight: true
  },
  {
    name: "CareElite",
    price: "₹6,999",
    period: "/ month",
    desc: "Complete concierge service for total peace of mind.",
    features: ["Unlimited Visits", "Emergency Response", "Full Concierge", "Deep Cleaning (1x/yr)", "Dedicated Manager"],
    highlight: false
  }
];

const testimonialsData = [
  {
    name: "Mathew Thomas",
    location: "Dubai, UAE",
    text: "SafeHands has been a blessing. I used to worry about my parents' house in Ranni every monsoon. Now I get a full report on WhatsApp."
  },
  {
    name: "Sarah George",
    location: "London, UK",
    text: "Professional and transparent. The photos they send are detailed, and they handled my plumbing repairs perfectly."
  }
];

const teamData = [
  {
    id: "t1",
    name: "Rahul Mathew",
    role: "Head of Operations",
    image: "/assets/images/team-1.jpg",
    bio: "Former civil engineer with 10 years of experience in facility management. He ensures every inspection checklist is followed rigorously."
  },
  {
    id: "t2",
    name: "Anjali Nair",
    role: "Client Relations Lead",
    image: "/assets/images/team-2.jpg",
    bio: "The friendly voice on the other end of the phone. Anjali coordinates between NRI families and our field staff to ensure smooth communication."
  },
  {
    id: "t3",
    name: "Thomas John",
    "role": "Senior Field Manager",
    image: "/assets/images/team-3.jpg",
    bio: "A trusted local presence in Pathanamthitta for over 20 years. Thomas handles emergency visits and complex vendor negotiations."
  }
];

// --- HELPER: Icon Mapper ---
const getIcon = (iconName, className) => {
  const IconComponent = Icons[iconName];
  return IconComponent ? <IconComponent className={className} /> : <Icons.HelpCircle className={className} />;
};

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
    {/* Hero Section */}
    <div className="relative overflow-hidden bg-[#FDFBF7] dark:bg-slate-950 pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in-up z-10 relative">
          <div className="inline-flex items-center space-x-2 bg-teal-50 dark:bg-teal-900/30 px-3 py-1 rounded-full">
            <Icons.Shield className="w-4 h-4 text-teal-600" />
            <span className="text-teal-700 dark:text-teal-400 text-sm font-semibold tracking-wide">TRUSTED IN PATHANAMTHITTA</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
            Live peacefully abroad. <br/>
            <span className="text-teal-600">Your home is in {brandData.name}.</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
            {brandData.tagline} We act as your local representative in Kerala, managing your property, coordinating repairs, and caring for your loved ones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button onClick={() => navigate('services')}>View Services</Button>
            <Button variant="outline" onClick={() => navigate('contact')}>Contact Us</Button>
          </div>
        </div>
        
        {/* Visual Side */}
        <div className="relative z-10">
           <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src={brandData.assets.heroImage} 
                alt="SafeHands Hero" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'; 
                  e.target.nextSibling.style.display = 'block'; 
                }}
              />
              {/* Fallback Visual (shown if image fails to load) */}
              <div className="hidden bg-white dark:bg-slate-800 p-6">
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-xl">
                      <Icons.Check className="w-8 h-8 text-teal-500 mb-2" />
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">100%</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Verified</div>
                   </div>
                   <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-xl">
                      <Icons.Clock className="w-8 h-8 text-teal-500 mb-2" />
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">24/7</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">Support</div>
                   </div>
                </div>
              </div>
           </div>
           
           {/* Decorative blobs */}
           <div className="absolute top-0 right-0 w-72 h-72 bg-teal-200 dark:bg-teal-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob -z-10"></div>
           <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 -z-10"></div>
        </div>
      </div>
    </div>

    {/* Features Section */}
    <Section className="bg-white dark:bg-slate-900">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Why Choose {brandData.name}?</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-4">We combine corporate professionalism with family-like care.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: "Camera", title: "Transparent Reporting", text: "Every visit is documented with photos and videos uploaded to your dashboard." },
          { icon: "Heart", title: "Emotional Care", text: "We don't just fix taps. We spend time with your elderly parents." },
          { icon: "Shield", title: "Zero Hidden Costs", text: "No commission on vendor bills. You pay exactly what the vendor charges." }
        ].map((f, i) => (
          <Card key={i} className="hover:border-teal-500 transition-all cursor-default">
            {getIcon(f.icon, "w-10 h-10 text-teal-600 mb-4")}
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">{f.title}</h3>
            <p className="text-slate-600 dark:text-slate-400">{f.text}</p>
          </Card>
        ))}
      </div>
    </Section>

    {/* Testimonials Section */}
    <Section className="bg-teal-50 dark:bg-slate-800/50">
       <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Trusted by Global Malayalis</h2>
       <div className="grid md:grid-cols-2 gap-6">
         {testimonialsData.map((t, i) => (
           <Card key={i} className="flex flex-col gap-4">
             <div className="flex text-yellow-400">
               {[...Array(5)].map((_, i) => <Icons.Star key={i} className="w-4 h-4 fill-current" />)}
             </div>
             <p className="text-slate-700 dark:text-slate-300 italic">"{t.text}"</p>
             <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
               <div className="font-bold text-slate-900 dark:text-white">{t.name}</div>
               <div className="text-sm text-teal-600">{t.location}</div>
             </div>
           </Card>
         ))}
       </div>
    </Section>

    {/* CTA Section */}
    <Section>
      <div className="bg-slate-900 dark:bg-teal-900 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/assets/images/service-inspection.jpg')] bg-cover bg-center"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-6">Ready to secure your home?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">Join 200+ families in Pathanamthitta who trust {brandData.name}. Get your free assessment today.</p>
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
      {servicesData.map((service) => (
        <Card key={service.id} className="flex flex-col overflow-hidden p-0">
          {service.image && (
            <div className="h-48 w-full overflow-hidden">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                   onError={(e) => e.target.style.display = 'none'} />
            </div>
          )}
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                {/* Dynamically render icon from JSON string name */}
                {getIcon(service.iconName, "w-8 h-8 text-teal-600")}
              </div>
              <Button variant="ghost" className="text-sm" onClick={() => navigate('contact')}>Inquire</Button>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{service.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">{service.desc}</p>
            <ul className="space-y-3 mt-auto">
              {service.features.map((f, i) => (
                <li key={i} className="flex items-center text-slate-700 dark:text-slate-300">
                  <Icons.Check className="w-5 h-5 text-teal-500 mr-3" />
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

const PricingPage = ({ navigate }) => (
  <Section>
    <div className="text-center mb-16">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Simple, Transparent Pricing</h1>
      <p className="text-slate-600 dark:text-slate-400 mt-4">Choose a plan that fits your needs. No hidden fees.</p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {pricingData.map((plan, i) => (
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
                <Icons.Check className="w-4 h-4 text-teal-500 mr-3 mt-0.5 shrink-0" />
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
             <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">About {brandData.name}</h1>
             <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
               {brandData.name} was born from a simple realization: Distance creates anxiety. Whether it's an aging parent living alone in Ranni or a locked house in Kozhencherry, NRIs constantly worry about the "what ifs."
             </p>
             <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
               We are not just a maintenance company. We are your proxy family. Our team of uniformed, vetted Field Managers brings corporate professionalism to domestic care.
             </p>
           </div>
           <div className="rounded-2xl overflow-hidden shadow-lg rotate-3 hover:rotate-0 transition-transform duration-500">
             <img src={brandData.assets.aboutImage} alt="Our Team" className="w-full h-auto" onError={(e) => e.target.style.display = 'none'} />
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <Card className="bg-teal-50 dark:bg-slate-800 border-none">
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Our Mission</h3>
            <p className="text-slate-600 dark:text-slate-300">To deliver unwavering support to NRI families by delivering trusted home maintenance and compassionate elder assistance.</p>
          </Card>
          <Card className="bg-slate-50 dark:bg-slate-800 border-none">
             <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Our Vision</h3>
             <p className="text-slate-600 dark:text-slate-300">To become Kerala’s most trusted family support partner, recognized for restoring the traditional warmth of home care through reliability.</p>
          </Card>
        </div>

        {/* --- TEAM SECTION --- */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamData.map((member) => (
              <div key={member.id} className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-teal-500 shadow-lg mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://ui-avatars.com/api/?name=" + member.name + "&background=0D9488&color=fff";
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
                <div className="text-teal-600 font-medium mb-3">{member.role}</div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

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
                <Icons.Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">Phone</div>
                <div className="text-slate-600 dark:text-slate-400">{brandData.contact.phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center text-teal-600">
                <Icons.Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">Email</div>
                <div className="text-slate-600 dark:text-slate-400">{brandData.contact.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center text-teal-600">
                <Icons.MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">Office</div>
                <div className="text-slate-600 dark:text-slate-400">{brandData.contact.address}</div>
              </div>
            </div>
          </div>
        </div>
        <Card>
          {formState === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icons.Check className="w-8 h-8" />
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
        <Icons.LogOut className="w-4 h-4" /> Logout
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
                    <div className="bg-teal-100 dark:bg-teal-900 text-teal-600 p-2 rounded-full"><Icons.Check className="w-4 h-4" /></div>
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
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900 dark:text-white"><Icons.Upload className="w-5 h-5" /> Upload Assets</h3>
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center"><Icons.Image className="w-12 h-12 mx-auto text-slate-400 mb-4" /><p className="text-slate-600 dark:text-slate-300 font-medium">Drag & Drop Logos</p></div>
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

export default function SafeHandsApp() {
  const [currentPage, setCurrentPage] = useState('home');
  // Initialize darkMode to true by default
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user has explicitly set a preference, otherwise default to dark
    const storedTheme = localStorage.getItem('theme');
    const isDark = storedTheme ? storedTheme === 'dark' : true; 
    
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
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
    if (!darkMode) { 
      document.documentElement.classList.add('dark'); 
      localStorage.setItem('theme', 'dark'); 
    } else { 
      document.documentElement.classList.remove('dark'); 
      localStorage.setItem('theme', 'light'); 
    }
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
                   <img src={brandData.assets.logo} alt="SafeHands Logo" className="w-full h-full object-cover" 
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                   {/* Fallback to Icon if logo missing */}
                   <div className="hidden w-full h-full bg-slate-900 dark:bg-white items-center justify-center">
                      <Icons.Home className="text-white dark:text-slate-900 w-6 h-6" />
                   </div>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{brandData.name}</h1>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                {['Home', 'Services', 'Pricing', 'About', 'Contact'].map((item) => (
                  <button key={item} onClick={() => navigate(item.toLowerCase())} className={`text-sm font-medium hover:text-teal-600 transition-colors ${currentPage === item.toLowerCase() ? 'text-teal-600 font-bold' : 'text-slate-600 dark:text-slate-300'}`}>{item}</button>
                ))}
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">{darkMode ? <Icons.Sun className="w-5 h-5" /> : <Icons.Moon className="w-5 h-5" />}</button>
                {user ? <Button variant="primary" onClick={() => navigate('dashboard')}>Dashboard</Button> : <Button variant="outline" className="px-4 py-2" onClick={() => navigate('login')}>Login</Button>}
              </div>
              <div className="md:hidden flex items-center gap-4">
                <button onClick={toggleTheme} className="p-2">{darkMode ? <Icons.Sun className="w-5 h-5" /> : <Icons.Moon className="w-5 h-5" />}</button>
                <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">{menuOpen ? <Icons.X className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}</button>
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
               {/* --- ENLARGED LOGO IN FOOTER --- */}
               {/* Maximized to show logo contents fully */}
               <div className="flex flex-col items-start gap-4 mb-6 w-full">
                 <div className="w-full max-w-[280px] aspect-square rounded-xl overflow-hidden shadow-lg border-2 border-slate-700 bg-white relative">
                    <img 
                      src={brandData.assets.footlogo} 
                      alt="SafeHands Logo" 
                      className="w-full h-full object-contain p-4" 
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} 
                    />
                    <div className="hidden w-full h-full items-center justify-center">
                       <Icons.Home className="text-slate-900 w-20 h-20" />
                    </div>
                 </div>
                 <div>
                   <span className="text-3xl font-bold text-white block mt-2">{brandData.name}</span>
                   <span className="text-sm text-slate-400 uppercase tracking-wider block mt-1">Trusted Property Care</span>
                 </div>
               </div>
               
               <p className="max-w-md text-slate-400 mb-6 leading-relaxed text-lg">{brandData.tagline}</p>
               <div className="flex gap-4">
                 {brandData.socials.map((social, i) => (
                   <div key={i} className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer text-sm font-bold shadow-sm hover:shadow-md" title={social.platform}>{social.label}</div>
                 ))}
               </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-xl">Services</h4>
              <ul className="space-y-4 text-slate-400 text-lg">
                <li className="hover:text-teal-400 cursor-pointer transition-colors flex items-center gap-2" onClick={() => navigate('services')}><span className="w-2 h-2 bg-teal-500 rounded-full"></span> Home Inspection</li>
                <li className="hover:text-teal-400 cursor-pointer transition-colors flex items-center gap-2" onClick={() => navigate('services')}><span className="w-2 h-2 bg-teal-500 rounded-full"></span> Vendor Management</li>
                <li className="hover:text-teal-400 cursor-pointer transition-colors flex items-center gap-2" onClick={() => navigate('services')}><span className="w-2 h-2 bg-teal-500 rounded-full"></span> Elderly Support</li>
                <li className="hover:text-teal-400 cursor-pointer transition-colors flex items-center gap-2" onClick={() => navigate('services')}><span className="w-2 h-2 bg-teal-500 rounded-full"></span> Emergency Visits</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 text-xl">Contact</h4>
              <ul className="space-y-5 text-slate-400 text-lg">
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-teal-900 transition-colors">
                    <Icons.Phone className="w-5 h-5 text-teal-500"/>
                  </div>
                  {brandData.contact.phone}
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-teal-900 transition-colors">
                    <Icons.Mail className="w-5 h-5 text-teal-500"/> 
                  </div>
                  {brandData.contact.email}
                </li>
                <li className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-teal-900 transition-colors shrink-0 mt-1">
                    <Icons.MapPin className="w-5 h-5 text-teal-500"/> 
                  </div>
                  <span className="max-w-[240px] leading-snug">{brandData.contact.address}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            {brandData.footerText}
          </div>
        </footer>
      </div>
    </div>
  );
}