import Navbar from "@/components/nav/NavigationBar";
import Footer from "@/components/nav/Footer";
import LeadForm from "@/components/forms/LeadForm";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16">
        <section className="max-w-xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600 mb-8">
            Reach out with any questions or interest — we are here to help you find your next car.
          </p>

          <LeadForm />
        </section>
      </main>

      <Footer />
    </div>
  );
}
