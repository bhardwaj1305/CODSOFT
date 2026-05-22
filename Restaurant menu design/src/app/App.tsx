import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Dialog from '@radix-ui/react-dialog';
import { ChefHat, Utensils, Coffee, Cake, X, Star, Clock, Flame } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  ingredients: string[];
  calories: string;
  prepTime: string;
  spiceLevel?: number;
  allergens?: string[];
  chef?: string;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Pan-Seared Scallops',
    description: 'Delicate scallops with citrus beurre blanc and microgreens',
    price: '$18',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'appetizers',
    ingredients: ['Fresh scallops', 'Lemon', 'White wine', 'Butter', 'Microgreens', 'Sea salt'],
    calories: '220 cal',
    prepTime: '15 min',
    allergens: ['Shellfish', 'Dairy'],
    chef: 'Chef Marcel'
  },
  {
    id: '2',
    name: 'Truffle Mushroom Bruschetta',
    description: 'Wild mushrooms on artisan bread with truffle oil and parmesan',
    price: '$14',
    image: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'appetizers',
    ingredients: ['Mixed wild mushrooms', 'Truffle oil', 'Parmesan', 'Artisan bread', 'Garlic', 'Fresh thyme'],
    calories: '280 cal',
    prepTime: '12 min',
    allergens: ['Gluten', 'Dairy'],
    chef: 'Chef Isabella'
  },
  {
    id: '3',
    name: 'Crispy Calamari',
    description: 'Tender squid rings with aioli and lemon wedge',
    price: '$16',
    image: 'https://images.unsplash.com/photo-1600663791817-d74f5196ba29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'appetizers',
    ingredients: ['Fresh squid', 'Semolina flour', 'Garlic aioli', 'Lemon', 'Sea salt', 'Black pepper'],
    calories: '340 cal',
    prepTime: '18 min',
    spiceLevel: 1,
    allergens: ['Seafood', 'Eggs'],
    chef: 'Chef Marco'
  },
  {
    id: '4',
    name: 'Wagyu Beef Steak',
    description: 'Premium grade wagyu with seasonal vegetables and red wine reduction',
    price: '$68',
    image: 'https://images.unsplash.com/photo-1663530761401-15eefb544889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'mains',
    ingredients: ['Wagyu beef', 'Red wine', 'Seasonal vegetables', 'Garlic', 'Rosemary', 'Butter'],
    calories: '580 cal',
    prepTime: '25 min',
    allergens: ['Dairy'],
    chef: 'Head Chef Pierre'
  },
  {
    id: '5',
    name: 'Herb-Crusted Lamb Rack',
    description: 'New Zealand lamb with rosemary jus and roasted potatoes',
    price: '$54',
    image: 'https://images.unsplash.com/photo-1579712267685-42da80f60aa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'mains',
    ingredients: ['Lamb rack', 'Fresh rosemary', 'Thyme', 'Garlic', 'Potatoes', 'Olive oil'],
    calories: '620 cal',
    prepTime: '30 min',
    allergens: [],
    chef: 'Chef Marcus'
  },
  {
    id: '6',
    name: 'Asparagus Risotto',
    description: 'Creamy arborio rice with fresh asparagus and parmesan',
    price: '$32',
    image: 'https://images.unsplash.com/photo-1777897466887-9533bf582828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'mains',
    ingredients: ['Arborio rice', 'Fresh asparagus', 'Parmesan', 'White wine', 'Vegetable stock', 'Butter'],
    calories: '450 cal',
    prepTime: '28 min',
    allergens: ['Dairy', 'Gluten'],
    chef: 'Chef Sofia'
  },
  {
    id: '7',
    name: 'Wild Salmon Fillet',
    description: 'Pan-roasted salmon with lemon butter and seasonal greens',
    price: '$42',
    image: 'https://images.unsplash.com/photo-1675729378170-dff874aaaa24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'mains',
    ingredients: ['Wild salmon', 'Lemon', 'Butter', 'Dill', 'Seasonal greens', 'Olive oil'],
    calories: '420 cal',
    prepTime: '20 min',
    allergens: ['Fish', 'Dairy'],
    chef: 'Chef Antoine'
  },
  {
    id: '8',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: '$12',
    image: 'https://images.unsplash.com/photo-1577969181928-69c4e557c99a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'desserts',
    ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Sugar', 'Flour', 'Vanilla ice cream'],
    calories: '480 cal',
    prepTime: '22 min',
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    chef: 'Pastry Chef Marie'
  },
  {
    id: '9',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with espresso-soaked ladyfingers',
    price: '$10',
    image: 'https://images.unsplash.com/photo-1673912402587-57ac40f1b4a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'desserts',
    ingredients: ['Mascarpone', 'Ladyfingers', 'Espresso', 'Cocoa powder', 'Eggs', 'Sugar'],
    calories: '380 cal',
    prepTime: '30 min',
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    chef: 'Pastry Chef Giovanni'
  },
  {
    id: '10',
    name: 'Pistachio Cheesecake',
    description: 'Creamy cheesecake with crushed pistachios and honey drizzle',
    price: '$11',
    image: 'https://images.unsplash.com/photo-1768341857441-9084cfd8676e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'desserts',
    ingredients: ['Cream cheese', 'Pistachios', 'Honey', 'Graham crackers', 'Butter', 'Sugar'],
    calories: '420 cal',
    prepTime: '35 min',
    allergens: ['Dairy', 'Nuts', 'Gluten'],
    chef: 'Pastry Chef Marie'
  },
  {
    id: '11',
    name: 'Lemon Tart',
    description: 'Zesty lemon custard in buttery pastry with fresh berries',
    price: '$10',
    image: 'https://images.unsplash.com/photo-1741244133042-970251e76066?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    category: 'desserts',
    ingredients: ['Lemons', 'Eggs', 'Sugar', 'Butter', 'Pastry flour', 'Fresh berries'],
    calories: '360 cal',
    prepTime: '25 min',
    allergens: ['Gluten', 'Dairy', 'Eggs'],
    chef: 'Pastry Chef Amelie'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('appetizers');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const categories = [
    { id: 'appetizers', label: 'Appetizers', icon: ChefHat },
    { id: 'mains', label: 'Main Courses', icon: Utensils },
    { id: 'desserts', label: 'Desserts', icon: Cake },
  ];

  const filteredItems = menuItems.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="w-10 h-10 text-amber-600" />
            <h1 className="text-4xl md:text-5xl text-gray-900">La Cuisine</h1>
          </div>
          <p className="text-lg text-gray-600">Fine Dining Experience</p>
        </header>

        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 bg-white rounded-full shadow-lg p-2 max-w-2xl mx-auto">
            {categories.map(({ id, label, icon: Icon }) => (
              <Tabs.Trigger
                key={id}
                value={id}
                className="flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 data-[state=active]:bg-amber-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-gray-100"
              >
                <Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{label}</span>
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {categories.map(({ id }) => (
            <Tabs.Content key={id} value={id} className="focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-amber-600 text-white px-4 py-2 rounded-full shadow-lg">
                        {item.price}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl mb-2 text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>

        <Dialog.Root open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
              {selectedItem && (
                <div>
                  <div className="relative h-80 overflow-hidden rounded-t-3xl">
                    <ImageWithFallback
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover"
                    />
                    <Dialog.Close className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
                      <X className="w-6 h-6 text-gray-900" />
                    </Dialog.Close>
                    <div className="absolute bottom-4 left-4 bg-amber-600 text-white px-6 py-3 rounded-full shadow-lg text-2xl">
                      {selectedItem.price}
                    </div>
                  </div>

                  <div className="p-8">
                    <Dialog.Title className="text-3xl mb-2 text-gray-900">
                      {selectedItem.name}
                    </Dialog.Title>

                    <Dialog.Description className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {selectedItem.description}
                    </Dialog.Description>

                    <div className="grid grid-cols-3 gap-4 mb-6 bg-amber-50 rounded-2xl p-4">
                      <div className="text-center">
                        <div className="flex justify-center mb-2">
                          <Clock className="w-6 h-6 text-amber-600" />
                        </div>
                        <p className="text-sm text-gray-600">Prep Time</p>
                        <p className="text-gray-900">{selectedItem.prepTime}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex justify-center mb-2">
                          <Flame className="w-6 h-6 text-amber-600" />
                        </div>
                        <p className="text-sm text-gray-600">Calories</p>
                        <p className="text-gray-900">{selectedItem.calories}</p>
                      </div>
                      {selectedItem.spiceLevel && (
                        <div className="text-center">
                          <div className="flex justify-center mb-2 gap-1">
                            {[...Array(3)].map((_, i) => (
                              <Flame
                                key={i}
                                className={`w-5 h-5 ${i < selectedItem.spiceLevel! ? 'text-red-500' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">Spice Level</p>
                        </div>
                      )}
                      {selectedItem.chef && !selectedItem.spiceLevel && (
                        <div className="text-center">
                          <div className="flex justify-center mb-2">
                            <ChefHat className="w-6 h-6 text-amber-600" />
                          </div>
                          <p className="text-sm text-gray-600">Prepared by</p>
                          <p className="text-gray-900">{selectedItem.chef}</p>
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <h4 className="text-xl mb-3 text-gray-900 flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-600" />
                        Ingredients
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.ingredients.map((ingredient, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedItem.allergens && selectedItem.allergens.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-xl mb-3 text-gray-900">Allergen Information</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.allergens.map((allergen, index) => (
                            <span
                              key={index}
                              className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm"
                            >
                              {allergen}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedItem.chef && (
                      <div className="text-center pt-4 border-t border-gray-200">
                        <p className="text-gray-600">Prepared by</p>
                        <p className="text-xl text-gray-900">{selectedItem.chef}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}