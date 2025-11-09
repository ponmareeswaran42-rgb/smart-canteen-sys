import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Wallet, User, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import MenuItemCard from "@/components/MenuItemCard";
import CartSheet from "@/components/CartSheet";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  available: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

const StudentMenu = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [walletBalance] = useState(500);
  const [cartOpen, setCartOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    // Breakfast
    { id: "1", name: "Masala Dosa", price: 50, category: "breakfast", image: "🌮", description: "Crispy dosa with potato filling", available: true },
    { id: "2", name: "Idli Sambar", price: 40, category: "breakfast", image: "🍚", description: "Steamed rice cakes with sambar", available: true },
    { id: "3", name: "Poha", price: 30, category: "breakfast", image: "🍛", description: "Flattened rice with spices", available: true },
    
    // Lunch
    { id: "4", name: "Thali", price: 80, category: "lunch", image: "🍱", description: "Complete meal with rice, dal, sabzi", available: true },
    { id: "5", name: "Biryani", price: 100, category: "lunch", image: "🍚", description: "Aromatic rice with vegetables", available: true },
    { id: "6", name: "Chole Bhature", price: 70, category: "lunch", image: "🫓", description: "Chickpea curry with fried bread", available: true },
    
    // Snacks
    { id: "7", name: "Samosa", price: 20, category: "snacks", image: "🥟", description: "Crispy pastry with potato filling", available: true },
    { id: "8", name: "Sandwich", price: 40, category: "snacks", image: "🥪", description: "Grilled vegetable sandwich", available: true },
    { id: "9", name: "French Fries", price: 50, category: "snacks", image: "🍟", description: "Crispy golden fries", available: true },
    
    // Beverages
    { id: "10", name: "Masala Chai", price: 15, category: "beverages", image: "☕", description: "Hot spiced tea", available: true },
    { id: "11", name: "Coffee", price: 20, category: "beverages", image: "☕", description: "Fresh brewed coffee", available: true },
    { id: "12", name: "Cold Coffee", price: 50, category: "beverages", image: "🥤", description: "Chilled coffee shake", available: true },
    { id: "13", name: "Fresh Juice", price: 40, category: "beverages", image: "🧃", description: "Seasonal fruit juice", available: true },
    
    // Desserts
    { id: "14", name: "Gulab Jamun", price: 30, category: "desserts", image: "🍡", description: "Sweet milk dumplings", available: true },
    { id: "15", name: "Ice Cream", price: 40, category: "desserts", image: "🍨", description: "Various flavors available", available: true },
  ];

  const categories = [
    { value: "all", label: "All Items" },
    { value: "breakfast", label: "Breakfast" },
    { value: "lunch", label: "Lunch" },
    { value: "snacks", label: "Snacks" },
    { value: "beverages", label: "Beverages" },
    { value: "desserts", label: "Desserts" },
  ];

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} added successfully`,
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Campus Canteen</h1>
              <p className="text-sm text-muted-foreground">Order your favorite food</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
                <Wallet className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">₹{walletBalance}</span>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-primary">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>

              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>

              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            {categories.map(category => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map(category => (
            <TabsContent key={category.value} value={category.value}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {menuItems
                  .filter(item => category.value === "all" || item.category === category.value)
                  .map(item => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      onAddToCart={addToCart}
                    />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* Cart Sheet */}
      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        total={cartTotal}
        walletBalance={walletBalance}
      />
    </div>
  );
};

export default StudentMenu;
