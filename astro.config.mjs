import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import siteConfig from './src/data/site-config';

// https://astro.build/config
export default defineConfig({
    site: siteConfig. website,
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [
        mdx(), 
        sitemap({
            // Loại trừ những route không muốn trong sitemap
            filter: (page) => !page.startsWith('https://demosite-aw4.pages.dev/blog/')
        })
    ]
});
