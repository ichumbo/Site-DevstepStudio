/** @type {import('next').NextConfig} */
const nextConfig = { 
    output: 'export',
    
  images: { unoptimized: true }, 
  basePath: "" // se estiver em subpasta, ex: "/devstep"
};

export default nextConfig;
