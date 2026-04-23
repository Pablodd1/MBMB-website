import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Medical Billing Insights | MBMB Blog',
  description: 'Expert medical billing tips, compliance updates, and revenue cycle insights for Miami healthcare practices.',
};

const posts = [
  {
    slug: 'medical-billing-101',
    title: 'Medical Billing 101: Everything Miami Doctors Need to Know',
    description: 'The complete guide to medical billing for Miami doctors. Learn what medical billing is, why Miami practices struggle, common mistakes, and how to optimize revenue.',
    image: '/raster/Medical-Billing-and-Coding-Specialists.webp',
    date: '2026-04-12',
  },
  {
    slug: 'denial-management-guide',
    title: 'Denial Management: A Complete Guide for Miami Practices',
    description: 'Every denied claim is lost revenue—unless you have a system to fight back. Learn how top Miami practices are recovering thousands in denied claims.',
    image: '/raster/medical-billing-and-medical-coding-services-healthcare-revenue-management-1.2.avif',
    date: '2026-04-14',
  },
  {
    slug: 'miami-medicaid-billing',
    title: 'Florida Medicaid Billing for Miami Healthcare Providers',
    description: 'Everything Miami doctors need to know about Florida Medicaid billing. Coverage requirements, common denials, AHCA compliance, and how to maximize reimbursements.',
    image: '/raster/medical-coding-icd.webp',
    date: '2026-04-15',
  },
];

export default function BlogIndex() {
  return (
    <main className="bg-primary text-white min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-block mb-8">
          <Image
            className="h-fit w-36"
            src="/mbmb-white.png"
            width={250}
            height={180}
            alt="Medical Billing Miami Beach"
          />
        </Link>
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-12">
          Medical Billing Insights
          <span className="text-pink2 block mt-2 text-xl md:text-2xl">Expert Tips for Miami Healthcare Practices</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-colors">
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-400 mb-2">{post.date}</p>
                  <h2 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">{post.title}</h2>
                  <p className="text-gray-300 text-sm line-clamp-3">{post.description}</p>
                  <span className="inline-block mt-4 text-blue-400 text-sm font-medium">Read More →</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
