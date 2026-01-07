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

// Type declarations for vite-imagetools with width and height parameters
// Supports patterns like: ?w=800&h=600&format=webp, ?w=800&h=600, etc.
declare module '*?w=*&h=*&format=webp' {
  const src: string;
  export default src;
}

declare module '*?w=*&h=*' {
  const src: string;
  export default src;
}

// More specific declarations for common sizes with height
declare module '*?w=800&h=600&format=webp' {
  const src: string;
  export default src;
}

declare module '*?w=800&h=600' {
  const src: string;
  export default src;
}

// General catch-all for any vite-imagetools query parameters (handles spaces in filenames)
declare module '*?*' {
  const src: string;
  export default src;
}
