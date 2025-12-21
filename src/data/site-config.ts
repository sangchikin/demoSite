import avatar from '../assets/images/avatar.jpg';
import hero from '../assets/images/hero.jpg';
import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://demosite-aw4.pages.dev/',
    avatar: {
        src: avatar,
        alt: 'Ethan Donovan'
    },
    title: 'Dante',
    subtitle: 'Minimal Astro.js theme',
    description: 'Astro.js and Tailwind CSS theme for blog and portfolio by justgoodui.com',
    image: {
        src: '/dante-preview.jpg',
        alt: 'Dante - Astro.js and Tailwind CSS theme'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Blog',
            href: '/blog'
        },
        {
            text: 'Tags',
            href: '/tags'
        }
    ],
    footerNavLinks: [
        {
            text: 'Về tôi',
            href: '/ve-toi'
        },
        {
            text: 'Liên hệ',
            href: '/lien-he'
        },
        {
            text: 'Điều khoản',
            href: '/dieu-khoan-su-dung'
        },
        {
            text: 'Chính sách biên tập',
            href: '/chinh-sach-bien-tap'
        },
        {
            text: 'Chính sách bảo mật',
            href: '/chinh-sach-bao-mat'
        },
        { 
            text: 'Trách nhiệm', 
            href: '/mien-tru-trach-nhiem' 
        }
    ],
    socialLinks: [
        {
            text: 'Dribbble',
            href: 'https://dribbble.com/changiau'
        },
        {
            text: 'Instagram',
            href: 'https://instagram.com/changiau'
        },
        {
            text: 'X/Twitter',
            href: 'https://twitter.com/changiau'
        }
    ],
    hero: {
        title: 'Hi There & Welcome to My Corner of the Web!',
        text: "I'm **Ethan Donovan**, a web developer at Amazing Studio, dedicated to the realms of collaboration and artificial intelligence.\nMy approach involves embracing intuition, conducting just enough research, and leveraging aesthetics as a catalyst for exceptional products.\nI have a profound appreciation for top-notch software, visual design, and the principles of product-led growth.\n\nFeel free to explore some of my coding endeavors on [GitHub](https://github.com/JustGoodUI/dante-astro-theme) or follow me on [Twitter/X](https://twitter.com/justgoodui).",
        image: {
            src: hero,
            alt: 'A person sitting at a desk in front of a computer'
        },
        actions: [
            {
                text: 'Get in Touch',
                href: '/contact'
            }
        ]
    },
    subscribe: {
        enabled: true,
        title: 'Get Weekly Investment Insights',
        text: 'Join 1,000+ readers building wealth through long-term investing.  One thoughtful email every week.',
        form: {
            // Change to your actual endpoint
            action: '#',
            // action: 'https://mailchimp.com/...' // 👈 ENDPOINT THẬT
            // Examples:
            // Mailchimp: 'https://yourname.us1.list-manage.com/subscribe/post?u=xxx&id=xxx'
            // Substack: 'https://buttondown.email/api/emails/embed-subscribe/yourname'
            // Formspree: 'https://formspree.io/f/xxxxx'
            emailFieldName: 'email',
            honeypotFieldName: 'url', // spam protection
            hiddenFields: [
                // Optional: track source
                { name: 'source', value: 'blog' }
            ]
        }
    },
    postsPerPage: 8,
    projectsPerPage: 8
};

export default siteConfig;
