import { BASE_URL } from "../constants";

export interface ComparisonFaq {
  question: string;
  answer: string;
}

interface ComparisonSchemaInput {
  slug: string;
  competitorName: string;
  headline: string;
  description: string;
  faqs: ComparisonFaq[];
}

/** Single source for vs-page JSON-LD: breadcrumb + FAQ + article schemas. */
export function comparisonSchemas({
  slug,
  competitorName,
  headline,
  description,
  faqs,
}: ComparisonSchemaInput) {
  const url = `${BASE_URL}/vs/${slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: `ALYA vs ${competitorName}`, item: url },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    author: { "@type": "Organization", name: "alya", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "alya",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo/icon.png`, width: 1024, height: 1024 },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return { articleSchema, breadcrumbSchema, faqSchema };
}
