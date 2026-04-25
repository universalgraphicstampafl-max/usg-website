import { client } from './sanity'

export async function getAllServices() {
  return client.fetch(`*[_type == "service"] | order(title asc) {
    _id,
    title,
    slug,
    eyebrow,
    heroDescription,
    deliverables,
    workflowNote,
    seoTitle,
    seoDescription,
    industriesServed[]->{ _id, title, slug },
    relatedServices[]->{ _id, title, slug }
  }`)
}

export async function getServiceBySlug(slug: string) {
  return client.fetch(`*[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    eyebrow,
    heroDescription,
    deliverables,
    workflowNote,
    seoTitle,
    seoDescription,
    industriesServed[]->{ _id, title, slug },
    relatedServices[]->{ _id, title, slug }
  }`, { slug })
}

export async function getAllIndustries() {
  return client.fetch(`*[_type == "industry"] | order(title asc) {
    _id,
    title,
    slug,
    eyebrow,
    heroDescription,
    heroBg,
    painPoints,
    relevantServices[]->{ _id, title, slug }
  }`)
}

export async function getIndustryBySlug(slug: string) {
  return client.fetch(`*[_type == "industry" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    eyebrow,
    heroDescription,
    heroBg,
    painPoints,
    relevantServices[]->{ _id, title, slug }
  }`, { slug })
}

export async function getTestimonials() {
  return client.fetch(`*[_type == "testimonial"] {
    _id,
    quote,
    name,
    company,
    tenure,
    industry
  }`)
}

export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0] {
    portalUrl,
    bookingUrl,
    phone,
    email,
    address
  }`)
}
