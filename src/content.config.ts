import { glob } from 'astro/loaders';
import { defineCollection, z, type ImageFunction } from 'astro:content';

const imageSchema = (image: ImageFunction) =>
    z.object({
        src: image(),
        alt: z.string().optional()
    });

const seoSchema = (image: ImageFunction) =>
    z.object({
        title: z.string().min(5).max(120).optional(),
        description: z.string().min(15).max(160).optional(),
        image: imageSchema(image).optional(),
        pageType: z.enum(['website', 'article']).default('website')
    });

const blog = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            slug: z.string().optional(),
            excerpt: z.string().optional(),
            publishDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            isFeatured: z.boolean().default(false),
            tags: z.array(z.string()).default([]),
            seo: seoSchema(image).optional()
        })
});

const pages = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            // About page specific fields
            author: z.string().optional(),
            bio: z.string().optional(),
            expertise: z.array(z.string()).default([]),
            qualifications: z.array(z.string()).default([]),
            socialLinks: z.array(z.object({
                platform: z.string(),
                url: z.string().url()
            })).optional(),
            avatar: image().optional(),
            seo: seoSchema(image).optional()
        })
});

const projects = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            publishDate: z.coerce.date(),
            isFeatured: z.boolean().default(false),
            seo: seoSchema(image).optional()
        })
});

const courses = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/courses' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']).default('Beginner'),
            duration: z.string().optional(),
            category: z.string().optional(),
            author: z.string().optional(),
            publishDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            tags: z.array(z.string()).default([]),
            isFeatured: z.boolean().default(false),
            seo: seoSchema(image).optional()
        })
});

const resources = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/resources' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            resourceType: z.enum(['Guide', 'Template', 'Tool', 'Article', 'Video']).default('Guide'),
            category: z.string().optional(),
            tags: z.array(z.string()).default([]),
            publishDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            downloadUrl: z.string().url().optional(),
            seo: seoSchema(image).optional()
        })
});

const newsletter = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/newsletter' }),
    schema: ({ image }) =>
        z.object({
            title: z.string(),
            description: z.string().optional(),
            publishDate: z.coerce.date(),
            isFeatured: z.boolean().default(false),
            seo: seoSchema(image).optional()
        })
});

export const collections = { blog, pages, projects, courses, resources, newsletter };
