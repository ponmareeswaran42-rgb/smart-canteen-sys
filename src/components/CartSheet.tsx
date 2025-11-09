import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { CartItem } from "@/pages/StudentMenu";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  total: number;
  walletBalance: number;
}

const CartSheet = ({ open, onOpenChange, cart, onUpdateQuantity, total, walletBalance }: CartSheetProps) => {
  const { toast } = useToast();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("wallet");

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to cart before checkout",
        variant: "destructive",
      });
      return;
    }
    setCheckoutOpen(true);
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "wallet" && total > walletBalance) {
      toast({
        title: "Insufficient balance",
        description: "Please add money to your wallet or choose another payment method",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Order placed successfully!",
      description: `Your order of ₹${total} has been placed. You'll be notified when it's ready.`,
    });
    
    setCheckoutOpen(false);
    onOpenChange(false);
    // Clear cart would happen here
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Your Cart
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-full py-6">
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
                <ShoppingBag className="w-16 h-16 text-muted-foreground/50" />
                <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">Add items from the menu to get started</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-lg bg-muted/50">
                      <div className="text-4xl">{item.image}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-card-foreground">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 ml-auto text-destructive"
                            onClick={() => onUpdateQuantity(item.id, 0)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="font-semibold text-primary">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-4">
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">₹{total}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">GST (5%)</span>
                      <span className="font-medium">₹{Math.round(total * 0.05)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">₹{Math.round(total * 1.05)}</span>
                    </div>
                  </div>

                  <Button 
                    variant="hero" 
                    className="w-full h-12 text-base"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Checkout Dialog */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
              Choose your payment method to complete the order
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="p-4 rounded-lg bg-muted space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Order Total</span>
                <span className="font-bold text-lg text-primary">₹{Math.round(total * 1.05)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Wallet Balance</span>
                <span className={walletBalance >= total ? "text-success" : "text-destructive"}>
                  ₹{walletBalance}
                </span>
              </div>
            </div>

            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="wallet" id="wallet" />
                <Label htmlFor="wallet" className="flex-1 cursor-pointer">
                  <div className="font-medium">Wallet</div>
                  <div className="text-sm text-muted-foreground">Pay using wallet balance</div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex-1 cursor-pointer">
                  <div className="font-medium">UPI / GPay</div>
                  <div className="text-sm text-muted-foreground">Pay via UPI apps</div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary transition-colors cursor-pointer">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex-1 cursor-pointer">
                  <div className="font-medium">Cash</div>
                  <div className="text-sm text-muted-foreground">Pay at counter</div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCheckoutOpen(false)}>
              Cancel
            </Button>
            <Button variant="hero" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartSheet;
