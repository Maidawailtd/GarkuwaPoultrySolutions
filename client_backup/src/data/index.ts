// Using icons from Lucide React and actual farm images from assets

// Livestock Categories
export const categories = [
  {
    name: "Sheep & Rams",
    slug: "sheep-rams",
    description: "Premium sheep and rams raised for meat and breeding",
    image: "/images/manager.jpg"
  },
  {
    name: "Cattle",
    slug: "cattle",
    description: "Healthy dairy and beef cattle for high yields",
    image: "/images/cattles.jpg"
  },
  {
    name: "Broiler Chickens",
    slug: "broilers",
    description: "Fast-growing meat birds raised for commercial production",
    image: "/images/broilers.jpg"
  },
  {
    name: "Layer Hens",
    slug: "layers",
    description: "Egg-producing chickens optimized for high yield",
    image: "/images/fresh-eggs.jpg"
  },
  {
    name: "Turkeys",
    slug: "turkeys",
    description: "Farm-raised turkeys for meat production",
    image: "/images/turkeys.jpg"
  },
  {
    name: "Fish Farming",
    slug: "fish",
    description: "Sustainable aquaculture for protein production",
    image: "/images/fishs.jpg"
  },
  {
    name: "Farm Birds",
    slug: "farm-birds",
    description: "Various poultry species for diverse farming operations",
    image: "/images/live-chickens.jpg"
  },
  {
    name: "Egg Production",
    slug: "eggs",
    description: "Fresh eggs from our free-range and cage systems",
    image: "/images/fresh-eggs.jpg"
  }
];

// Training Programs
export const programs = [
  {
    id: 1,
    title: "Sheep & Ram Breeding",
    description: "Learn modern techniques for breeding and raising healthy sheep and rams",
    duration: "5 weeks",
    schedule: "Weekdays",
    price: "₦60,000",
    image: "/images/manager.jpg"
  },
  {
    id: 2,
    title: "Commercial Broiler Production",
    description: "Learn modern techniques for efficient broiler farming at scale",
    duration: "4 weeks",
    schedule: "Weekdays",
    price: "₦50,000",
    image: "/images/live-chickens.jpg"
  },
  {
    id: 3,
    title: "Layer Management",
    description: "Master egg production with optimal hen health and housing",
    duration: "4 weeks",
    schedule: "Weekends",
    price: "₦45,000",
    image: "/images/fresh-eggs.jpg"
  },
  {
    id: 4,
    title: "Cattle Rearing & Management",
    description: "Comprehensive training on raising healthy cattle for meat and dairy",
    duration: "6 weeks",
    schedule: "Weekdays",
    price: "₦75,000",
    image: "/images/owner.jpg"
  },
  {
    id: 5,
    title: "Fish Farming",
    description: "Complete guide to commercial fish farming and aquaculture",
    duration: "4 weeks",
    schedule: "Weekends",
    price: "₦55,000",
    image: "/images/fishs.jpg"
  },
  {
    id: 6,
    title: "Turkey Production",
    description: "Learn specialized techniques for raising healthy turkeys",
    duration: "3 weeks",
    schedule: "Weekdays",
    price: "₦40,000",
    image: "/images/turkeys.jpg"
  }
];

// Gallery Items
export const galleryItems = [
  {
    image: "/images/manager.jpg",
    caption: "Premium quality sheep raised for meat and breeding"
  },
  {
    image: "/images/owner.jpg",
    caption: "Healthy cattle raised with premium care"
  },
  {
    image: "/images/broilers.jpg",
    caption: "Healthy broiler chickens in our free-range area"
  },
  {
    image: "/images/fresh-eggs.jpg",
    caption: "Free-range layer hens producing organic eggs"
  },
  {
    image: "/images/turkeys.jpg",
    caption: "Farm-raised turkeys for quality meat production"
  },
  {
    image: "/images/fishs.jpg",
    caption: "Intensive catfish farming operations"
  },
  {
    image: "/images/hero-farm.jpg",
    caption: "State-of-the-art poultry housing facilities"
  },
  {
    image: "/images/live-chickens.jpg",
    caption: "Layer hens with feeding system for optimal production"
  }
];

// Testimonials
export const testimonials = [
  {
    name: "Aisha Mohammed",
    role: "Sheep Farmer",
    avatar: "/images/customer-1.jpg",
    quote: "The sheep breeding training at Garkuwa Livestock Farm transformed my small operation into a profitable business. Their practical approach and ongoing support have been invaluable.",
    rating: 5
  },
  {
    name: "Emmanuel Okonkwo",
    role: "Commercial Poultry Farmer",
    avatar: "/images/customer-2.jpg",
    quote: "I've attended many agricultural workshops, but none as comprehensive as Garkuwa's. Their broiler production program helped me increase my flock efficiency by over 30%.",
    rating: 5
  },
  {
    name: "Fatima Ibrahim",
    role: "Cattle Rancher",
    avatar: "/images/customer-1.jpg",
    quote: "The cattle management program at Garkuwa gave me practical skills that I immediately applied to my ranch. My cattle are healthier and more productive than ever before.",
    rating: 4
  }
];

// Farm Facilities
export const facilities = [
  {
    name: "Sheep & Ram Housing",
    description: "Spacious, well-ventilated housing with modern feeding systems for optimal sheep and ram growth.",
    icon: "🐑",
    image: "/images/manager.jpg"
  },
  {
    name: "Cattle Ranch",
    description: "Extensive grazing areas and modern cattle handling facilities for healthy beef and dairy cattle.",
    icon: "🐄",
    image: "/images/owner.jpg"
  },
  {
    name: "Modern Broiler Houses",
    description: "Climate-controlled housing with automated feeding and watering systems for optimal broiler growth conditions.",
    icon: "🐔",
    image: "/images/hero-farm.jpg"
  },
  {
    name: "Layer Battery Cages",
    description: "Advanced cage systems designed for maximum egg production and efficient management of layer hens.",
    icon: "🥚",
    image: "/images/fresh-eggs.jpg"
  },
  {
    name: "Aquaculture Ponds",
    description: "State-of-the-art fish farming facilities with water quality monitoring and control systems.",
    icon: "🐟",
    image: "/images/fishs.jpg"
  },
  {
    name: "Training Center",
    description: "Fully equipped learning environment with modern audiovisual technology for comprehensive livestock training.",
    icon: "📚",
    image: "/images/live-chickens.jpg"
  }
];

// Products
export const products = [
  {
    id: 1,
    name: "Premium Ram",
    description: "Healthy, well-bred ram for breeding or meat production",
    price: 75000,
    image: "/images/manager.jpg",
    category: "livestock"
  },
  {
    id: 2,
    name: "Healthy Sheep",
    description: "Quality sheep for breeding or meat production",
    price: 65000,
    image: "/images/manager.jpg",
    category: "livestock"
  },
  {
    id: 3,
    name: "Dairy Cow",
    description: "High-yield dairy cow from premium breeding stock",
    price: 250000,
    image: "/images/owner.jpg",
    category: "livestock"
  },
  {
    id: 4,
    name: "Farm Fresh Eggs (Crate)",
    description: "30 large fresh eggs from our free-range chickens",
    price: 2500,
    image: "/images/fresh-eggs.jpg",
    category: "eggs"
  },
  {
    id: 5,
    name: "Broiler Chicken (Live)",
    description: "Healthy, well-fed broiler chicken weighing 2-2.5kg",
    price: 3500,
    image: "/images/broilers.jpg",
    category: "meat"
  },
  {
    id: 6,
    name: "Fresh Catfish (Per Kg)",
    description: "Farm-raised catfish from our aquaculture ponds",
    price: 1500,
    image: "/images/fishs.jpg",
    category: "fish"
  },
  {
    id: 7,
    name: "Turkey (Live)",
    description: "Farm-raised turkey for premium meat production",
    price: 15000,
    image: "/images/turkeys.jpg",
    category: "livestock"
  },
  {
    id: 8,
    name: "Livestock Feed (25kg)",
    description: "Premium balanced feed for optimal livestock health and growth",
    price: 7500,
    image: "/images/product-placeholder.jpg",
    category: "feed"
  }
];