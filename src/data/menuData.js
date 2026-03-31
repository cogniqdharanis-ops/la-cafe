export const menuCategories = ['All', 'Breakfast', 'Burgers', 'Sandwiches', 'Vegan', 'Drinks']

const menuImageBase = '/images/menu'
const galleryImageBase = '/images/gallery'

export const menuItems = [
  // Breakfast
  {
    id: 1,
    category: 'Breakfast',
    name: 'Classic LA Plate',
    description: 'Two eggs any style, crispy hash browns, house bacon, and buttered toast. The ultimate morning fuel.',
    price: 14,
    popular: true,
    image: `${menuImageBase}/classic-la-plate.jpg`,
    badge: 'Best Seller',
  },
  {
    id: 2,
    category: 'Breakfast',
    name: 'Belgian Waffle Stack',
    description: 'Golden Belgian waffles stacked high with fresh berries, whipped cream, and warm maple syrup.',
    price: 13,
    popular: true,
    image: `${menuImageBase}/belgian-waffle-stack.jpg`,
    badge: 'Fan Fave',
  },
  {
    id: 3,
    category: 'Breakfast',
    name: 'Avocado Smash Toast',
    description: 'Sourdough loaded with smashed avocado, poached eggs, microgreens, and chili flakes.',
    price: 12,
    popular: false,
    image: `${menuImageBase}/avocado-smash-toast.jpg`,
  },
  {
    id: 4,
    category: 'Breakfast',
    name: 'French Toast Royale',
    description: 'Thick-cut brioche, caramelized bananas, powdered sugar, and housemade berry compote.',
    price: 13,
    popular: false,
    image: `${menuImageBase}/french-toast-royale.jpg`,
  },
  // Burgers
  {
    id: 5,
    category: 'Burgers',
    name: 'The DTLA Smash',
    description: 'Double smash patty, American cheese, caramelized onions, special sauce, brioche bun.',
    price: 16,
    popular: true,
    image: `${menuImageBase}/the-dtla-smash.jpg`,
    badge: '#1 Burger',
  },
  {
    id: 6,
    category: 'Burgers',
    name: 'Mushroom Swiss Melt',
    description: 'Beef patty, sautéed wild mushrooms, Swiss cheese, garlic aioli, toasted pretzel bun.',
    price: 17,
    popular: false,
    image: `${menuImageBase}/mushroom-swiss-melt.jpg`,
  },
  {
    id: 7,
    category: 'Burgers',
    name: 'Crispy Chicken Crunch',
    description: 'Hand-battered chicken thigh, jalapeño slaw, honey mustard, pickles, potato bun.',
    price: 15,
    popular: true,
    image: `${menuImageBase}/crispy-chicken-crunch.jpg`,
    badge: 'Hot Pick',
  },
  // Sandwiches
  {
    id: 8,
    category: 'Sandwiches',
    name: 'Prime Club Stack',
    description: 'Turkey, bacon, ham, cheddar, lettuce, tomato, avocado on toasted sourdough.',
    price: 14,
    popular: false,
    image: `${menuImageBase}/prime-club-stack.jpg`,
  },
  {
    id: 9,
    category: 'Sandwiches',
    name: 'Philly Cheesesteak',
    description: 'Shaved ribeye, sautéed peppers and onions, provolone, hoagie roll.',
    price: 16,
    popular: true,
    image: `${menuImageBase}/philly-cheesesteak.jpg`,
    badge: 'New',
  },
  // Vegan
  {
    id: 10,
    category: 'Vegan',
    name: 'Plant Smash Burger',
    description: 'Beyond beef smash patty, vegan cheese, caramelized onions, special plant sauce, brioche-style bun.',
    price: 16,
    popular: true,
    image: `${menuImageBase}/plant-smash-burger.jpg`,
    badge: '🌿 Plant-Based',
  },
  {
    id: 11,
    category: 'Vegan',
    name: 'Açaí Power Bowl',
    description: 'Organic açaí blend, granola, fresh mango, blueberries, chia seeds, agave drizzle.',
    price: 13,
    popular: false,
    image: `${menuImageBase}/acai-power-bowl.jpg`,
    badge: '🌿 Plant-Based',
  },
  {
    id: 12,
    category: 'Vegan',
    name: 'Vegan Avocado Melt',
    description: 'Sourdough, smashed avocado, roasted tomatoes, vegan mozzarella, fresh basil.',
    price: 12,
    popular: false,
    image: `${menuImageBase}/vegan-avocado-melt.jpg`,
    badge: '🌿 Plant-Based',
  },
  // Drinks
  {
    id: 13,
    category: 'Drinks',
    name: 'Signature Cold Brew',
    description: 'Slow-steeped 20hrs, served over ice with house-made oat milk.',
    price: 7,
    popular: true,
    image: `${menuImageBase}/signature-cold-brew.jpg`,
    badge: 'Staff Pick',
  },
  {
    id: 14,
    category: 'Drinks',
    name: 'Mango Sunrise Smoothie',
    description: 'Fresh mango, passionfruit, orange juice, turmeric, ginger. Pure sunshine in a glass.',
    price: 9,
    popular: false,
    image: `${menuImageBase}/mango-sunrise-smoothie.jpg`,
  },
  {
    id: 15,
    category: 'Drinks',
    name: 'Lavender Latte',
    description: 'Double espresso, house lavender syrup, oat milk, served hot or iced.',
    price: 8,
    popular: true,
    image: `${menuImageBase}/lavender-latte.jpg`,
    badge: 'Fan Fave',
  },
]

export const galleryImages = [
  { id: 1, src: '/images/site/hero-cafe-ambiance.jpg', alt: 'Cafe ambiance', size: 'large' },
  { id: 2, src: `${galleryImageBase}/food-plating.jpg`, alt: 'Food plating', size: 'small' },
  { id: 3, src: `${galleryImageBase}/coffee-art.jpg`, alt: 'Coffee art', size: 'small' },
  { id: 4, src: `${galleryImageBase}/brunch-spread.jpg`, alt: 'Brunch spread', size: 'small' },
  { id: 5, src: '/images/site/restaurant-interior.jpg', alt: 'Restaurant interior', size: 'large' },
  { id: 6, src: `${galleryImageBase}/cocktails.jpg`, alt: 'Cocktails', size: 'small' },
  { id: 7, src: `${galleryImageBase}/burger-close-up.jpg`, alt: 'Burger close-up', size: 'small' },
  { id: 8, src: `${galleryImageBase}/cafe-vibe.jpg`, alt: 'Cafe vibe', size: 'small' },
]

export const faqs = [
  {
    question: 'Do you have vegan options?',
    answer: 'Absolutely! We have an entire dedicated vegan menu featuring plant-based burgers, breakfast bowls, smoothies, and more. Every vegan item is clearly labeled and prepared with care to avoid cross-contamination.',
  },
  {
    question: 'Is parking available nearby?',
    answer: 'Yes! We\'re located in DTLA with several parking options nearby including the 6th Street Garage (2 min walk), metered street parking on 7th St, and multiple private lots within a block. We validate parking for orders over $20.',
  },
  {
    question: 'How long are wait times during peak hours?',
    answer: 'Weekend brunch (10am–2pm) typically sees 15–25 min waits for dine-in. You can skip the wait entirely by ordering online for curbside pickup — usually ready in 12–18 minutes.',
  },
  {
    question: 'Are you open late night?',
    answer: 'Yes! We\'re open until 2 AM every day. Our full menu is available all night — including our full breakfast lineup. Late-night kitchen orders stop at 1:30 AM.',
  },
  {
    question: 'Do you take reservations?',
    answer: 'We\'re a fast-casual walk-in spot, so no reservations needed! Large groups of 8+ can call ahead to arrange seating. For events or private dining, contact us directly.',
  },
  {
    question: 'Can I customize my order for dietary restrictions?',
    answer: 'Of course! Our team is happy to accommodate gluten-free, dairy-free, nut-free, and other dietary needs. Just mention your requirements when ordering and we\'ll do our best.',
  },
]
