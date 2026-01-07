/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

// Type declarations for vite-imagetools
declare module '*?format=webp' {
  const src: string;
  export default src;
}

// Type declarations for vite-imagetools with width parameter
// Supports patterns like: ?w=400&format=webp, ?w=800&format=webp, etc.
declare module '*?w=*&format=webp' {
  const src: string;
  export default src;
}

// Alternative pattern matching for vite-imagetools width queries
declare module '*?w=400&format=webp' {
  const src: string;
  export default src;
}

declare module '*?w=800&format=webp' {
  const src: string;
  export default src;
}

declare module '*?w=1200&format=webp' {
  const src: string;
  export default src;
}

declare module '*?w=1920&format=webp' {
  const src: string;
  export default src;
}
