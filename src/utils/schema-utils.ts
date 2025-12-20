// src/utils/schema-utils.ts
import type { CollectionEntry } from 'astro:content';
import siteConfig from '../data/site-config';

/**
 * Generate Organization Schema for financial website
 */
export function generateOrganizationSchema(siteUrl: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.title,
        description: siteConfig.description,
        url: siteUrl,
        logo: siteConfig.image?.src ? new URL(siteConfig.image.src, siteUrl).toString() : undefined,
        sameAs: siteConfig.socialLinks?.map(link => link.href).filter(Boolean) || [],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            availableLanguage: ['English', 'Vietnamese']
        }
    };
}

/**
 * Generate Website Schema
 */
export function generateWebsiteSchema(siteUrl: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.title,
        description: siteConfig.description,
        url: siteUrl,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteUrl}/search?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
        }
    };
}

/**
 * Generate Article Schema for blog posts (Financial content)
 */
export function generateArticleSchema(
    post: CollectionEntry<'blog'>,
    siteUrl: string,
    authorName: string = 'Ethan Donovan'
) {
    const { title, publishDate, updatedDate, excerpt, tags = [] } = post.data;
    const articleUrl = new URL(`/blog/${post.id}/`, siteUrl).toString();
    
    // Get image from SEO or use default
    let imageUrl = siteConfig.image?.src 
        ? new URL(siteConfig.image.src, siteUrl).toString() 
        : undefined;
    
    if (post.data.seo?.image?.src) {
        imageUrl = typeof post.data.seo.image.src === 'string'
            ? new URL(post.data.seo.image.src, siteUrl).toString()
            : new URL(post.data.seo.image.src.src, siteUrl).toString();
    }

    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': articleUrl,
        headline: title,
        description: excerpt || '',
        image: imageUrl,
        datePublished: publishDate.toISOString(),
        dateModified: updatedDate ? updatedDate.toISOString() : publishDate.toISOString(),
        author: {
            '@type': 'Person',
            name: authorName,
            url: siteUrl
        },
        publisher: {
            '@type': 'Organization',
            name: siteConfig.title,
            logo: {
                '@type': 'ImageObject',
                url: siteConfig.image?.src ? new URL(siteConfig.image.src, siteUrl).toString() : undefined
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articleUrl
        },
        keywords: tags.join(', '),
        articleSection: 'Finance',
        inLanguage: 'en-US'
    };
}

/**
 * Generate BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(
    breadcrumbs: { name: string; url: string }[],
    siteUrl: string,
    authorName: string = 'Ethan Donovan'
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        author: {
            '@type': 'Person',
            name: authorName
        },
        itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: new URL(crumb.url, siteUrl).toString()
        }))
    };
}

/**
 * Generate FAQPage Schema - useful for finance guides
 */
export function generateFAQSchema(
    faqs: { question: string; answer: string }[],
    authorName: string = 'Ethan Donovan'
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        author: {
            '@type': 'Person',
            name: authorName
        },
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };
}

/**
 * Generate Person/Author Schema
 */
export function generatePersonSchema(
    name: string,
    bio: string,
    siteUrl: string,
    imageUrl?: string
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: name,
        description: bio,
        url: siteUrl,
        image: imageUrl,
        sameAs: siteConfig.socialLinks?.map(link => link.href).filter(Boolean) || [],
        jobTitle: 'Financial Content Creator',
        knowsAbout: ['Finance', 'Investment', 'Personal Finance', 'Money Management']
    };
}

/**
 * Generate FinancialService Schema (if you offer services)
 */
export function generateFinancialServiceSchema(
    serviceName: string,
    description: string,
    siteUrl: string,
    authorName: string = 'Ethan Donovan'
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        name: serviceName,
        description: description,
        url: siteUrl,
        author: {
            '@type': 'Person',
            name: authorName
        },
        provider: {
            '@type': 'Organization',
            name: siteConfig.title
        },
        areaServed: {
            '@type': 'Country',
            name: 'Vietnam'
        },
        serviceType: 'Financial Planning'
    };
}

/**
 * Generate Tag Schema for tag pages
 */
export function generateTagSchema(
    tagName: string,
    tagDescription: string,
    tagUrl: string,
    itemCount: number,
    authorName: string = 'Ethan Donovan'
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: tagName,
        description: tagDescription,
        url: tagUrl,
        numberOfItems: itemCount,
        author: {
            '@type': 'Person',
            name: authorName
        },
        mainEntity: {
            '@type': 'Thing',
            name: tagName,
            description: tagDescription
        }
    };
}

/**
 * Generate CollectionPage Schema for blog/projects listing
 */
export function generateCollectionPageSchema(
    pageTitle: string,
    pageDescription: string,
    pageUrl: string,
    items: any[],
    authorName: string = 'Ethan Donovan'
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: pageTitle,
        description: pageDescription,
        url: pageUrl,
        numberOfItems: items.length,
        author: {
            '@type': 'Person',
            name: authorName
        },
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: items.map((item, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: new URL(item.url, pageUrl).toString()
            }))
        }
    };
}

/**
 * Helper to convert schema object to JSON-LD script tag
 */
export function schemaToJsonLd(schema: any): string {
    return JSON.stringify(schema, null, 0);
}
