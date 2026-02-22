import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { NorthStarLogo } from '../components/NorthStarLogo';
import { Navbar } from '../components/Navbar';
import { Mail, Phone, MapPin, Clock, MessageSquare, Users } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Send us an email anytime',
      value: 'info@north-staroperations.com',
      href: 'mailto:info@north-staroperations.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      description: 'Call us during business hours',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Office',
      description: 'Visit us in person',
      value: '123 Operations Ave, Suite 100, Tech City, TC 12345',
      href: 'https://www.google.com/maps/search/?api=1&query=123+Operations+Ave+Suite+100+Tech+City+TC+12345',
    },
    {
      icon: Clock,
      title: 'Hours',
      description: 'Available when you need us',
      value: 'Mon-Fri: 9AM-6PM EST',
      href: null,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            Get in
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Touch
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <Card key={method.title}>
                <CardHeader>
                  <div className="size-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <Icon className="size-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-600">{method.description}</p>
                  {method.href ? (
                    <a
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="font-medium text-blue-600 hover:text-blue-800 hover:underline inline-block transition-colors"
                    >
                      {method.value}
                    </a>
                  ) : (
                    <p className="font-medium text-blue-600">{method.value}</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
            <p className="text-gray-600 mb-6">
              Fill out the form and our team will get back to you within 24 hours.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MessageSquare className="size-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Quick Responses</h3>
                  <p className="text-sm text-gray-600">We respond to inquiries promptly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="size-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium">Expert Team</h3>
                  <p className="text-sm text-gray-600">Speak with knowledgeable professionals</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                placeholder="Your name"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none resize-none"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 h-10 text-base"
            >
              Send Message
            </Button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'How quickly do you respond to inquiries?',
                a: 'We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.',
              },
              {
                q: 'Do you offer a free trial?',
                a: 'Yes! We offer a 14-day free trial for new users. No credit card required to get started.',
              },
              {
                q: 'What payment options do you accept?',
                a: 'We accept all major credit cards, wire transfers, and various payment plans to suit your needs.',
              },
              {
                q: 'Do you provide customer support?',
                a: 'Yes, we offer 24/7 customer support via email, phone, and chat for all our customers.',
              },
            ].map((faq, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <NorthStarLogo className="h-12" />
            <p className="text-sm text-gray-600">&copy; 2026 North Star Operations. All rights reserved.</p>
          </div>
          <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500">
            <p>Developed by <a href="https://GALOTECH.TECH" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">Galotech</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
