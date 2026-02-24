import { useNavigate } from 'react-router';
import { NorthStarLogo } from './NorthStarLogo';

interface FooterProps {
  /** Show full 4-column footer (Home page) or compact footer */
  variant?: 'full' | 'compact';
}

export function Footer({ variant = 'compact' }: FooterProps) {
  const navigate = useNavigate();

  if (variant === 'compact') {
    return (
      <footer className="border-t bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <NorthStarLogo className="h-12" />
            <div className="flex gap-6 text-sm text-gray-600">
              <button onClick={() => navigate('/privacy')} className="hover:text-blue-600 transition-colors">Privacy</button>
              <button onClick={() => navigate('/terms')} className="hover:text-blue-600 transition-colors">Terms</button>
              <button onClick={() => navigate('/contact')} className="hover:text-blue-600 transition-colors">Contact</button>
            </div>
            <p className="text-sm text-gray-600">&copy; 2026 North Star Operations. All rights reserved.</p>
          </div>
          <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500">
            <p>Developed by <a href="https://GALOTECH.TECH" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">Galotech</a></p>
          </div>
        </div>
      </footer>
    );
  }

  return (
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
              <li><button onClick={() => navigate('/contact')} className="hover:text-blue-600 text-left">Pricing Inquiry</button></li>
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
            <h3 className="font-semibold mb-3 text-sm">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><button onClick={() => navigate('/privacy')} className="hover:text-blue-600 text-left">Privacy Policy</button></li>
              <li><button onClick={() => navigate('/terms')} className="hover:text-blue-600 text-left">Terms of Service</button></li>
              <li><button onClick={() => navigate('/contact')} className="hover:text-blue-600 text-left">Support</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <p>&copy; 2026 North Star Operations. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <button onClick={() => navigate('/privacy')} className="hover:text-blue-600 transition-colors">Privacy</button>
            <button onClick={() => navigate('/terms')} className="hover:text-blue-600 transition-colors">Terms</button>
          </div>
        </div>
        <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500">
          <p>Developed by <a href="https://GALOTECH.TECH" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium">Galotech</a></p>
        </div>
      </div>
    </footer>
  );
}
