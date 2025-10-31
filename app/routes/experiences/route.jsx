// portofoliov2-main/app/routes/experiences/route.jsx

import { json } from '@remix-run/cloudflare';
import { Outlet, useLoaderData } from '@remix-run/react';
import { MDXProvider } from '@mdx-js/react';
import { Post, postMarkdown } from '~/layouts/post';
import { baseMeta } from '~/utils/meta';
import { readingTime, formatTimecode } from '~/utils/timecode';

// --- PERBAIKAN UTAMA DAN FINAL ADA DI SINI ---
// Kita gunakan 'eager: true' untuk memaksa semua modul dimuat di awal.
// Ini adalah cara paling stabil untuk dynamic import di lingkungan Vite/Remix ini.
const modules = import.meta.glob('../experiences.*.mdx', { eager: true });
const rawModules = import.meta.glob('../experiences.*.mdx', { as: 'raw', eager: true });

export async function loader({ request }) {
  const url = new URL(request.url);
  const slug = url.pathname.split('/').pop();

  try {
    const modulePath = `../experiences.${slug}.mdx`;

    // Ambil modul dan konten mentah dari objek yang sudah dimuat
    const module = modules[modulePath];
    const rawContent = rawModules[modulePath];

    // Jika path modul tidak ada di objek, berarti file tidak ada.
    if (!module) {
      throw new Response('Not Found', { status: 404 });
    }

    const { frontmatter } = module;

    if (!frontmatter) {
      throw new Error(`Frontmatter tidak ditemukan di ${slug}.mdx`);
    }

    const readTime = readingTime(rawContent);
    const timecode = formatTimecode(readTime);

    return json({
      frontmatter,
      timecode,
    });
  } catch (error) {
    console.error(`Gagal memuat modul untuk slug: ${slug}`, error);
    throw new Response('Not Found', { status: 404 });
  }
}

export function meta({ data }) {
  if (!data || !data.frontmatter) return [{ title: 'Experience Not Found' }];

  const { title, abstract, banner } = data.frontmatter;
  return baseMeta({ title, description: abstract, prefix: 'Experience', ogImage: banner });
}

export default function ExperienceLayout() {
  const { frontmatter, timecode } = useLoaderData();

  return (
    <MDXProvider components={postMarkdown}>
      <Post {...frontmatter} timecode={timecode}>
        <Outlet />
      </Post>
    </MDXProvider>
  );
}