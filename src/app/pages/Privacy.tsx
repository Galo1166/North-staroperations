import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: February 18, 2026</p>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 leading-relaxed">
                North Star Operations collects information you provide directly, such as your name, email address, and organization details when you create an account. We also automatically collect usage data, including page views, feature usage, and device information, to improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-600 leading-relaxed">
                We use the information we collect to provide, maintain, and improve our platform, communicate with you about your account, send service updates, and ensure the security of our systems. We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement industry-standard security measures to protect your data, including encryption in transit and at rest, role-based access controls, and regular security audits. Our platform uses Firebase Authentication for secure identity management.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Retention</h2>
              <p className="text-gray-600 leading-relaxed">
                We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your data at any time by contacting our support team.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
              <p className="text-gray-600 leading-relaxed">
                You have the right to access, correct, or delete your personal information. You may also request a copy of your data or opt out of certain communications. To exercise these rights, please contact us at info@north-staroperations.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                We use essential cookies to maintain your session and preferences. We do not use third-party advertising cookies. You can manage cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:info@north-staroperations.com" className="text-blue-600 hover:underline">
                  info@north-staroperations.com
                </a>
                .
              </p>
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
