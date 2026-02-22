import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { NorthStarLogo } from '../components/NorthStarLogo';
import { Navbar } from '../components/Navbar';
import { Users, Star, Target, Zap, ArrowRight } from 'lucide-react';

export default function About() {
  const navigate = useNavigate();

  const team = [
    {
      name: 'Leadership Team',
      role: 'Guiding innovation and excellence',
      description: 'Our executive team brings decades of experience in enterprise software and operations management.',
    },
    {
      name: 'Engineering Team',
      role: 'Building robust solutions',
      description: 'Expert developers creating scalable, secure, and performant technology platforms.',
    },
    {
      name: 'Support Team',
      role: 'Your success is our priority',
      description: 'Dedicated professionals ensuring you get the most value from our platform.',
    },
  ];

  const values = [
    {
      icon: Star,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from product to service.',
    },
    {
      icon: Target,
      title: 'Customer Focus',
      description: 'Your success is our success. We build what you need, not what we think you need.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Continuous improvement and innovation drive us forward every day.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            About North Star
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Operations
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're building the future of enterprise operations management with innovative technology and customer-first approach.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-20 sm:py-28 border-t border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">Our Mission</h2>
            <p className="text-lg text-gray-600">
              To empower businesses with real-time insights and intelligent operations management tools that drive efficiency, growth, and competitive advantage.
            </p>
            <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
              <p className="text-gray-700 leading-relaxed">
                At North Star Operations, we believe that every business deserves access to enterprise-grade analytics and operations management tools. Our platform combines cutting-edge technology with intuitive design to help you make better decisions faster. We're committed to your success and continuously innovate to meet your evolving needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Core Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These principles guide every decision we make
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <Card key={value.title} className="text-center">
                <CardHeader>
                  <div className="size-12 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Icon className="size-6 text-blue-600" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-20 sm:py-28 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Talented individuals dedicated to your success
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.name}>
                <CardHeader>
                  <div className="size-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4 mx-auto">
                    <Users className="size-8 text-white" />
                  </div>
                  <CardTitle className="text-center">{member.name}</CardTitle>
                  <p className="text-center text-sm text-blue-600 font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { number: '500+', label: 'Active Users' },
            { number: '50+', label: 'Enterprise Clients' },
            { number: '99.9%', label: 'Uptime' },
            { number: '24/7', label: 'Support' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to join our customers?
          </h2>
          <p className="text-blue-100 text-lg">
            Start your journey with North Star Operations today
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/login')}
            variant="secondary"
            className="gap-2"
          >
            Get Started
            <ArrowRight className="size-5" />
          </Button>
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
