import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { NorthStarLogo } from '../components/NorthStarLogo';
import { Navbar } from '../components/Navbar';
import {
  BarChart3,
  Package,
  Activity,
  Users,
  Shield,
  Zap,
  TrendingUp,
  Lock,
  LineChart,
  Database,
  Smartphone,
  Headphones,
  ArrowRight,
  Check,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  containerVariants,
  featureCardVariants,
  headingVariants,
  textVariants,
  buttonVariants,
  cardVariants,
} from '../lib/animations';

export default function Services() {
  const navigate = useNavigate();

  const mainServices = [
    {
      icon: BarChart3,
      title: 'Real-time Analytics & Dashboards',
      description: 'Visualize your business data with interactive dashboards that update in real-time. Make data-driven decisions with comprehensive metrics and KPIs at your fingertips.',
      features: ['Live data updates', 'Customizable dashboards', 'Multiple chart types', 'Export reports'],
    },
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Track and manage your inventory efficiently. Monitor stock levels, optimize supply chains, and reduce waste with intelligent inventory tracking and alerts.',
      features: ['Stock tracking', 'Automated alerts', 'Multi-warehouse support', 'Inventory optimization'],
    },
    {
      icon: Activity,
      title: 'Operations Monitoring',
      description: 'Monitor your operations in real-time. Track performance metrics, identify bottlenecks, and optimize workflow efficiency with detailed operational insights.',
      features: ['Performance tracking', 'Efficiency metrics', 'Workflow analysis', 'Trend detection'],
    },
    {
      icon: Users,
      title: 'User Management & Access Control',
      description: 'Manage team access with granular role-based permissions. Control who can see what data and ensure security with role-based access control (RBAC).',
      features: ['4 role levels', 'Custom permissions', 'Activity logs', 'User provisioning'],
    },
    {
      icon: TrendingUp,
      title: 'Trend Analysis & Forecasting',
      description: 'Identify patterns and trends in your data. Use historical data to forecast future trends and make proactive business decisions.',
      features: ['Pattern detection', 'Trend analysis', 'Forecasting', 'Predictive insights'],
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Enterprise-grade security to protect your sensitive business data. Multi-layer security with encryption, audit logs, and compliance features.',
      features: ['Data encryption', 'Audit trails', 'Compliance ready', 'Regular backups'],
    },
  ];

  const additionalServices = [
    {
      icon: Database,
      title: 'Data Integration',
      description: 'Seamlessly integrate data from multiple sources',
    },
    {
      icon: Smartphone,
      title: 'Mobile Access',
      description: 'Access your dashboards and reports on any device',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Dedicated support team available round the clock',
    },
    {
      icon: Zap,
      title: 'API Access',
      description: 'Build custom integrations with our robust API',
    },
    {
      icon: LineChart,
      title: 'Custom Reports',
      description: 'Create and schedule custom reports tailored to your needs',
    },
    {
      icon: Lock,
      title: 'Data Privacy',
      description: 'GDPR and CCPA compliant data handling',
    },
  ];

  const benefits = [
    'Increased operational efficiency by up to 40%',
    'Reduced decision-making time with real-time data',
    'Better inventory management and cost reduction',
    'Enhanced team collaboration and visibility',
    'Improved data security and compliance',
    'Scalable solution that grows with your business',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <motion.div
          className="text-center space-y-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold"
            variants={headingVariants}
          >
            What We
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Offer
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            variants={textVariants}
          >
            Comprehensive enterprise solutions for operations management, inventory tracking, and real-time analytics. Everything you need to run your business efficiently.
          </motion.p>
          <motion.div variants={buttonVariants}>
            <Button
              size="lg"
              onClick={() => navigate('/login')}
              className="gap-2 bg-blue-600 hover:bg-blue-700 mx-auto"
            >
              Get Started Today
              <ArrowRight className="size-5" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Main Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            variants={headingVariants}
          >
            Core Services
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            variants={textVariants}
          >
            Powerful tools designed to streamline your operations
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {mainServices.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={featureCardVariants}
                whileHover={{ y: -8 }}
              >
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="size-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="size-6 text-blue-600" />
                      </motion.div>
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <Check className="size-4 text-green-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-20 border-t border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold">Why Choose North Star Operations?</h2>
              <p className="text-gray-600">
                Our platform is built for modern businesses that demand efficiency, security, and reliability.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Check className="size-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 pl-4">
                  <div className="text-3xl font-bold text-blue-600">500+</div>
                  <div className="text-gray-600">Active Users</div>
                </div>
                <div className="border-l-4 border-purple-600 pl-4">
                  <div className="text-3xl font-bold text-purple-600">50+</div>
                  <div className="text-gray-600">Enterprise Clients</div>
                </div>
                <div className="border-l-4 border-green-600 pl-4">
                  <div className="text-3xl font-bold text-green-600">99.9%</div>
                  <div className="text-gray-600">Uptime Guarantee</div>
                </div>
                <div className="border-l-4 border-orange-600 pl-4">
                  <div className="text-3xl font-bold text-orange-600">24/7</div>
                  <div className="text-gray-600">Customer Support</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            variants={headingVariants}
          >
            Additional Features
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            variants={textVariants}
          >
            Advanced capabilities to enhance your business operations
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {additionalServices.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                whileHover={{ y: -4 }}
              >
                <Card>
                  <CardHeader>
                    <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="size-5 text-blue-600" />
                      </motion.div>
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

   

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            variants={headingVariants}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            variants={textVariants}
          >
            Get started in just a few simple steps
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {[
            { step: 1, title: 'Sign Up', description: 'Create your account in minutes' },
            { step: 2, title: 'Configure', description: 'Set up dashboards and integrations' },
            { step: 3, title: 'Connect', description: 'Link your data sources' },
            { step: 4, title: 'Monitor', description: 'Start tracking and analyzing' },
          ].map((item) => (
            <motion.div key={item.step} className="relative" variants={cardVariants}>
              <Card>
                <CardContent className="pt-8 text-center space-y-3">
                  <div className="size-10 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto font-bold text-lg">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
              {item.step < 4 && (
                <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <ArrowRight className="size-5 text-blue-600" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 sm:py-20 border-t">
        <motion.div
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-white"
            variants={headingVariants}
          >
            Ready to Transform Your Operations?
          </motion.h2>
          <motion.p
            className="text-blue-100 text-lg"
            variants={textVariants}
          >
            Start your free trial today. No credit card required.
          </motion.p>
          <motion.div variants={buttonVariants}>
            <Button
              size="lg"
              onClick={() => navigate('/login')}
              variant="secondary"
              className="gap-2"
            >
              Start Free Trial
              <ArrowRight className="size-5" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <NorthStarLogo className="h-12" />
            <p className="text-sm text-gray-600">&copy; 2026 North Star Operations. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
