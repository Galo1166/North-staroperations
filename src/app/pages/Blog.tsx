import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { NorthStarLogo } from '../components/NorthStarLogo';
import { Navbar } from '../components/Navbar';
import { Calendar } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: 'How to Optimize Your Inventory Management',
      description: 'Learn best practices for inventory management and discover how to reduce waste while improving efficiency.',
      date: 'Feb 18, 2026',
      author: 'Sarah Analyst',
      category: 'Operations',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'Real-time Analytics: Making Better Decisions Faster',
      description: 'Explore how real-time dashboards can transform your business decision-making process and drive better outcomes.',
      date: 'Feb 15, 2026',
      author: 'John Manager',
      category: 'Analytics',
      readTime: '7 min read',
    },
    {
      id: 3,
      title: 'Enterprise Security Best Practices',
      description: 'Understand the importance of role-based access control and how to implement security best practices in your organization.',
      date: 'Feb 12, 2026',
      author: 'Mike Viewer',
      category: 'Security',
      readTime: '6 min read',
    },
    {
      id: 4,
      title: 'Scaling Your Operations with North Star',
      description: 'See how other businesses successfully scaled their operations using our platform and tools.',
      date: 'Feb 10, 2026',
      author: 'Sarah Analyst',
      category: 'Case Studies',
      readTime: '8 min read',
    },
    {
      id: 5,
      title: 'The Future of Operations Management',
      description: 'Insights into emerging trends and technologies that will shape the future of operations management.',
      date: 'Feb 8, 2026',
      author: 'John Manager',
      category: 'Insights',
      readTime: '9 min read',
    },
    {
      id: 6,
      title: 'Getting Started with Real-time Dashboards',
      description: 'A comprehensive guide to setting up your first dashboard and start tracking metrics that matter.',
      date: 'Feb 5, 2026',
      author: 'Mike Viewer',
      category: 'Tutorials',
      readTime: '10 min read',
    },
  ];

  const categories = [
    'All Posts',
    'Operations',
    'Analytics',
    'Security',
    'Case Studies',
    'Insights',
    'Tutorials',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            North Star
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}Blog
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights, tips, and best practices for operations management and business intelligence.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={cat === 'All Posts' ? 'default' : 'outline'}
              size="sm"
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">{post.description}</p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-xs text-gray-500">
                    <Calendar className="size-3 inline mr-1" />
                    {post.date}
                  </div>
                  <span className="text-xs font-medium text-gray-600">{post.author}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16 sm:py-20 border-t">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Stay Updated
          </h2>
          <p className="text-gray-600">
            Get the latest insights and tips delivered to your inbox
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">
              Subscribe
            </Button>
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
        </div>
      </footer>
    </div>
  );
}
