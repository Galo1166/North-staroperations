import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
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
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  containerVariants,
  heroTitleVariants,
  heroImageVariants,
  buttonVariants,
  featureCardVariants,
  statsVariants,
  textVariants,
  headingVariants,
} from '../lib/animations';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Real-time dashboards with comprehensive performance metrics and insights',
    },
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Track stock levels, manage items, and optimize your inventory efficiently',
    },
    {
      icon: Activity,
      title: 'Operations Tracking',
      description: 'Monitor operational efficiency with detailed performance analytics',
    },
    {
      icon: Users,
      title: 'User Management',
      description: 'Control access with role-based permissions and detailed user management',
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Live data synchronization for instant decision-making',
    },
    {
      icon: TrendingUp,
      title: 'Trend Analysis',
      description: 'Identify patterns and trends to drive strategic decisions',
    },
  ];

  const stats = [
    { label: 'User Roles', value: '4' },
    { label: 'Dashboard KPIs', value: '4+' },
    { label: 'Interactive Charts', value: '8+' },
    { label: 'UI Components', value: '40+' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="space-y-4">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
                variants={heroTitleVariants}
              >
                North Star
                <motion.span
                  className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {' '}Operations
                </motion.span>
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 max-w-2xl"
                variants={textVariants}
              >
                Streamline your business operations with real-time dashboards, inventory management, and advanced analytics. Make data-driven decisions with confidence.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={containerVariants}
            >
              <motion.div variants={buttonVariants}>
                <Button
                  size="lg"
                  onClick={() => navigate('/login')}
                  className="gap-2 bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                >
                  Get Started
                  <ArrowRight className="size-5" />
                </Button>
              </motion.div>
              <motion.div variants={buttonVariants}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            variants={heroImageVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl">
              {/* Decorative SVG Illustration */}
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background circle */}
                <circle cx="200" cy="200" r="150" fill="#f0f9ff" opacity="0.5" />
                <circle cx="200" cy="200" r="100" fill="#dbeafe" opacity="0.3" />

                {/* Star in center */}
                <g transform="translate(200, 110)">
                  <polygon
                    points="0,-50 15,-15 52,-15 30,5 40,45 0,25 -40,45 -30,5 -52,-15 -15,-15"
                    fill="#2563eb"
                  />
                </g>

                {/* Dashboard elements */}
                <g transform="translate(100, 200)">
                  <rect x="0" y="0" width="200" height="120" rx="8" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />
                  <rect x="10" y="10" width="80" height="20" rx="4" fill="#dbeafe" />
                  <rect x="100" y="10" width="90" height="20" rx="4" fill="#fbbf24" />
                  <rect x="10" y="40" width="40" height="60" rx="4" fill="#10b981" opacity="0.7" />
                  <rect x="60" y="40" width="40" height="70" rx="4" fill="#3b82f6" opacity="0.7" />
                  <rect x="110" y="40" width="40" height="50" rx="4" fill="#8b5cf6" opacity="0.7" />
                </g>

                {/* Decorative circles */}
                <circle cx="80" cy="100" r="15" fill="#60a5fa" opacity="0.6" />
                <circle cx="320" cy="140" r="20" fill="#a78bfa" opacity="0.4" />
                <circle cx="60" cy="320" r="12" fill="#34d399" opacity="0.5" />
                <circle cx="330" cy="300" r="18" fill="#fbbf24" opacity="0.4" />
              </svg>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={statsVariants}
              >
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {stat.value}
                </div>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="bg-white py-20 sm:py-28 border-t"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold"
              variants={headingVariants}
            >
              Powerful Features
            </motion.h2>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto"
              variants={textVariants}
            >
              Everything you need to manage your operations efficiently
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
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
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Security Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold">Enterprise Security</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Shield className="size-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Role-Based Access Control</h3>
                  <p className="text-gray-600 text-sm">
                    Control who can access what with granular permission management
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Lock className="size-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Secure Authentication</h3>
                  <p className="text-gray-600 text-sm">
                    Enterprise-grade security for user authentication and data protection
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <TrendingUp className="size-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Audit Logging</h3>
                  <p className="text-gray-600 text-sm">
                    Complete audit trails for compliance and security monitoring
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Card className="lg:col-span-1 bg-gradient-to-br from-blue-50 to-purple-50 border-0">
            <CardHeader>
              <CardTitle>4 User Roles</CardTitle>
              <CardDescription>Flexible access management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Super Admin</span>
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Full Access</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Org Admin</span>
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">Admin</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Analyst</span>
                  <span className="text-xs bg-blue-400 text-white px-2 py-1 rounded">Edit</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Viewer</span>
                  <span className="text-xs bg-gray-500 text-white px-2 py-1 rounded">View Only</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-blue-100 text-lg">
            Start using our platform today and gain real-time insights into your business
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/login')}
            variant="secondary"
            className="gap-2"
          >
            Login to Dashboard
            <ArrowRight className="size-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <NorthStarLogo className="h-12 mb-4" />
              <p className="text-sm text-gray-600">
                Enterprise analytics and operations management platform
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm">Services</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => navigate('/services')} className="hover:text-blue-600 text-left">Our Services</button></li>
                <li><button onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-600 text-left">Features</button></li>
                <li><button className="hover:text-blue-600 text-left text-gray-400 cursor-not-allowed">Pricing</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button onClick={() => navigate('/about')} className="hover:text-blue-600 text-left">About</button></li>
                <li><button onClick={() => navigate('/services')} className="hover:text-blue-600 text-left">Services</button></li>
                <li><button onClick={() => navigate('/blog')} className="hover:text-blue-600 text-left">Blog</button></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-blue-600 text-left">Contact</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button className="hover:text-blue-600 text-left text-gray-400 cursor-not-allowed">Documentation</button></li>
                <li><button className="hover:text-blue-600 text-left text-gray-400 cursor-not-allowed">Support</button></li>
                <li><button className="hover:text-blue-600 text-left text-gray-400 cursor-not-allowed">Status</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <p>&copy; 2026 North Star Operations. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <button className="hover:text-blue-600 text-gray-400 cursor-not-allowed">Privacy</button>
              <button className="hover:text-blue-600 text-gray-400 cursor-not-allowed">Terms</button>
              <button className="hover:text-blue-600 text-gray-400 cursor-not-allowed">Cookies</button>
            </div>
          </div>
          <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500">
            <p>Developed by <a href="https://GALOTECH.TECH" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">Galotech</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
