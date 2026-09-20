export const WHATSAPP = "2349137897889";
export const LAUNCH = new Date("2026-09-26T11:00:00+01:00");

// key must match the URL: /shop/shoes
export const CATEGORIES = [
  { key: "designs", label: "Creamic Designs" },
  { key: "women", label: "Women" },
  { key: "men", label: "Men" },
  { key: "shoes", label: "Shoes" },
  { key: "bags", label: "Bags" },
  { key: "jewellery", label: "Jewellery" },
];

// sizes: [{ label, stock }] — stock 0 renders the size as sold out
// images: array, so the product page can show a gallery
// price: required. Set `enquire: true` for anything not yet priced,
//        and it shows "Price on request" instead of a buy button.
export const PRODUCTS = [
  {
    id: "ca-01", name: "Satin kaftan dress, orange", category: "designs",
    price: 45000, images: ["/images/shirt1.jpg"],
    sizes: [{ label: "S", stock: 3 }, { label: "M", stock: 3 }, { label: "L", stock: 3 }, { label: "XL", stock: 2 }],
    colors: ["Orange", "Wine"], badge: "New line",
    desc: "From the Creamic Apparel Designs line. Flowing satin with wide sleeves.",
    madeToMeasure: true, featured: true,
  },
  {
    id: "ca-02", name: "Beaded evening gown, royal blue", category: "designs",
    price: 85000, images: ["/images/slipperF.jpg"],
    sizes: [{ label: "S", stock: 1 }, { label: "M", stock: 2 }, { label: "L", stock: 1 }],
    colors: ["Royal blue"], badge: "New line",
    desc: "From the Creamic Apparel Designs line. Embellished long sleeves, floor length.",
    madeToMeasure: true, featured: true,
  },
  {
    id: "sh-01", name: "Y-3 platform slides", category: "shoes",
    price: 40000, images: ["/images/shoe4.jpg"],
    sizes: [{ label: "40", stock: 2 }, { label: "41", stock: 2 }, { label: "42", stock: 3 }, { label: "43", stock: 2 }, { label: "44", stock: 1 }],
    colors: ["Black/Red"], badge: "Shoes",
    desc: "Platform sole slides with padded strap.", featured: true,
  },
  {
    id: "sh-02", name: "Dune cross-strap flat slides", category: "shoes",
    price: 14000, images: ["/images/shoe3.jpg"],
    sizes: [{ label: "37", stock: 2 }, { label: "38", stock: 3 }, { label: "39", stock: 3 }, { label: "40", stock: 2 }, { label: "41", stock: 1 }],
    colors: ["Tan", "Black"], badge: "Shoes",
    desc: "Leather-look cross straps on a flat sole.", featured: true,
  },
  {
    id: "sh-03", name: "New Balance 1000 sneakers", category: "shoes",
    price: 35000, images: ["/images/shoe5.jpg"], // was shirt2.jpg — wrong image
    sizes: [{ label: "40", stock: 1 }, { label: "41", stock: 2 }, { label: "42", stock: 2 }, { label: "43", stock: 2 }, { label: "44", stock: 1 }, { label: "45", stock: 0 }],
    colors: ["Grey/Beige"], badge: "Shoes",
    desc: "Chunky runner silhouette in layered mesh and suede.",
  },
  {
    id: "sh-04", name: "Suede low-top, black", category: "shoes", // was "Shoe 1"
    price: 25000, images: ["/images/shoe1.jpg"],
    sizes: [{ label: "38", stock: 2 }, { label: "39", stock: 2 }, { label: "40", stock: 3 }, { label: "41", stock: 3 }, { label: "42", stock: 2 }, { label: "43", stock: 1 }, { label: "44", stock: 1 }],
    colors: ["Black", "Grey"], badge: "Shoes",
    desc: "Suede low-top with contrast stripes.",
  },
  {
    id: "sh-05", name: "Suede low-top, grey", category: "shoes", // was "Shoe 2"
    price: 30000, images: ["/images/shoe2.jpg"],
    sizes: [{ label: "38", stock: 1 }, { label: "39", stock: 2 }, { label: "40", stock: 2 }, { label: "41", stock: 2 }, { label: "42", stock: 1 }, { label: "43", stock: 1 }, { label: "44", stock: 0 }],
    colors: ["Black"], badge: "Shoes",
    desc: "Suede low-top with contrast stripes.",
  },
  {
    id: "sh-06", name: "Nike chunky sneakers, white/black", category: "shoes",
    price: 35000, images: ["/images/shoe6.jpg"],
    sizes: [{ label: "40", stock: 2 }, { label: "41", stock: 2 }, { label: "42", stock: 2 }, { label: "43", stock: 1 }, { label: "44", stock: 1 }],
    colors: ["White/Black"], badge: "Shoes",
    desc: "Layered upper on a lugged sole.",
  },
  {
    id: "bg-01", name: "Buckle top-handle bag, lime", category: "bags",
    price: 32000, images: ["/images/bag1.jpg"],
    sizes: [], colors: ["Lime", "Tan"], badge: "Bags",
    desc: "Structured handbag with oversized gold buckle.", featured: true,
  },
  {
    id: "bg-02", name: "Buckle bag, tan", category: "bags",
    price: 30000, images: ["/images/bag2.jpg"],
    sizes: [], colors: ["Tan"], badge: "Bags",
    desc: "Structured handbag with an oversized gold buckle.", featured: true,
  },
  {
    id: "mn-01", name: "Polo shirt, white", category: "men",
    price: 18000, images: ["/images/shirt2.jpg"],
    sizes: [{ label: "M", stock: 3 }, { label: "L", stock: 4 }, { label: "XL", stock: 3 }, { label: "XXL", stock: 1 }],
    colors: ["White"], badge: "Men",
    desc: "Classic fit polo with embroidered chest detail.",
  },
  {
    id: "wm-01", name: "Satin wrap robe dress, wine", category: "women",
    price: 38000, images: ["/images/shirt3.jpg"], // was slipper2F.jpg — wrong image
    sizes: [{ label: "S", stock: 2 }, { label: "M", stock: 3 }, { label: "L", stock: 2 }, { label: "XL", stock: 1 }],
    colors: ["Wine"], badge: "Women",
    desc: "Soft satin with a relaxed wrap front.",
  },
];

export const byId = (id) => PRODUCTS.find((p) => p.id === id);

export const inCategory = (key) =>
  !key || key === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === key);

export const featured = () => PRODUCTS.filter((p) => p.featured);

export const totalStock = (p) =>
  p.sizes?.length ? p.sizes.reduce((n, s) => n + s.stock, 0) : null;