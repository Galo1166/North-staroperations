import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last updated: February 18, 2026</p>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using the North Star Operations platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
              <p className="text-gray-600 leading-relaxed">
                North Star Operations provides an enterprise analytics and operations management platform. You agree to use the service only for lawful purposes and in accordance with these terms. You are responsible for maintaining the confidentiality of your account credentials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <p className="text-gray-600 leading-relaxed">
                You must provide accurate and complete information when creating an account. You are responsible for all activity that occurs under your account. Notify us immediately if you suspect unauthorized access to your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed">
                The North Star Operations platform, including its design, features, and content, is the property of North Star Operations and is protected by intellectual property laws. You may not copy, modify, or distribute any part of the platform without our express written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Data Ownership</h2>
              <p className="text-gray-600 leading-relaxed">
                You retain ownership of all data you upload to the platform. We do not claim any intellectual property rights over your data. We will process your data only as described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                To the maximum extent permitted by law, North Star Operations shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform. Our total liability shall not exceed the amount you paid for the service in the preceding twelve months.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                We may suspend or terminate your access to the platform at any time for violation of these terms. You may terminate your account at any time by contacting our support team.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify you of significant changes via email or through the platform. Continued use of the service constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
              <p className="text-gray-600 leading-relaxed">
                For questions about these Terms of Service, contact us at{' '}
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
