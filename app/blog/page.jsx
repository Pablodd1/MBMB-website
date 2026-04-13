import Image from 'next/image'
import Link from 'next/link'
import Button from '@UTILS/button'

export const metadata = {
  title: 'Medical Billing Blog | Insights for Miami Healthcare Providers',
  description: 'Expert insights on medical billing, coding, credentialing, and revenue cycle management for Miami and South Florida healthcare practices.',
  keywords: 'medical billing blog, medical billing miami, medical coding blog, healthcare revenue management, medical billing insights',
  openGraph: {
    title: 'Medical Billing Blog | MBMB Insights',
    description: 'Expert insights on medical billing, coding, credentialing, and revenue cycle management for Miami healthcare providers.',
    url: 'https://medicalbillingmb.com/blog',
    type: 'website',
    images: [
      {
        url: 'https://medicalbillingmb.com/mbmb-white.png',
        width: 1200,
        height: 630,
        alt: 'MBMB Medical Billing Blog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medical Billing Blog | MBMB Insights',
    description: 'Expert insights on medical billing for Miami healthcare providers.',
  },
  alternates: {
    canonical: 'https://medicalbillingmb.com/blog'
  }
}

const blogPosts = [
  {
    slug: 'medical-billing-101',
    title: 'Medical Billing 101: Everything Miami Doctors Need to Know',
    excerpt: 'The complete guide to understanding medical billing in Miami. From claim submission to revenue optimization, learn how to maximize your practice\'s financial health.',
    date: 'April 12, 2026',
    category: 'Medical Billing Guide',
    readTime: '12 min read',
    image: '/raster/Medical-Billing-and-Coding-Specialists.webp',
    featured: true
  }
]

export default function Blog() {
  return (
    <>
      {/* Hero Section - Dark Gradient */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-pink2 to-purple-600"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block px-4 py-1 bg-pink2/20 border border-pink2/40 rounded-full text-pink2 text-sm font-medium mb-6">
              Medical Billing Insights
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              MBMB <span className="text-pink2">Blog</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Expert insights on medical billing, coding, credentialing, and revenue cycle management for Miami healthcare providers.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-gray-900 text-gray-400 py-4" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" className="hover:text-white" itemProp="item">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li><span className="mx-2">/</span></li>
            <li className="text-white font-medium" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name">Blog</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <main className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Featured Post */}
          {blogPosts.filter(p => p.featured).map((post) => (
            <article key={post.slug} className="mb-16">
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-pink2/10 text-pink2 text-sm font-medium rounded-full">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm">{post.readTime}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      <Link href={`/blog/${post.slug}`} className="hover:text-pink2 transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">{post.date}</span>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 bg-pink2 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink2/80 transition-colors"
                      >
                        Read Article
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* All Posts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">All Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.slug} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-2 py-1 bg-pink2/10 text-pink2 text-xs font-medium rounded">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-xs">{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-pink2 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-gray-500 text-xs">{post.date}</span>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-pink2 font-semibold text-sm hover:text-pink2/80"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white text-center mt-16">
            <h2 className="text-3xl font-bold mb-4">Need Help With Your Medical Billing?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're struggling with claim denials, credentialing, or want to outsource your entire revenue cycle, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="/consultation" 
                text="Schedule Free Consultation" 
                colors="bg-pink2 text-white hover:bg-pink2/80" 
                className="max-w-xs mx-auto sm:mx-0"
              />
              <a href="tel:+1-786-643-2099" className="inline-flex items-center justify-center gap-2 text-sm lg:text-lg px-6 py-3 rounded-lg font-semibold shadow-md bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 w-full md:w-auto max-w-xs mx-auto sm:mx-0">
                <span>Call (786) 643-2099</span>
              </a>
            </div>
          </section>

        </div>
      </main>
    </>
  )
}
