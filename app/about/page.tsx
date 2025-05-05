// app/about/page.tsx
import Navbar from "@/components/nav/NavigationBar";
import Footer from "@/components/nav/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-gray-700 text-lg">
            At CarDealership, we are passionate about helping people find their perfect vehicle.
            With years of experience in the automotive industry, our mission is to offer a wide range
            of high-quality cars and unmatched customer service.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Customer Satisfaction First</li>
            <li>Transparency and Honesty</li>
            <li>Wide Selection of Quality Vehicles</li>
            <li>Competitive Pricing</li>
            <li>Commitment to Excellence</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-gray-700 text-lg">
            Our dedicated team of automotive experts, sales professionals, and service specialists
            work together to provide a seamless car buying experience. We believe in building lasting
            relationships with our customers.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
