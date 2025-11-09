import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Users, Shield, ChefHat } from "lucide-react";
import heroImage from "@/assets/canteen-hero.jpg";

type PortalType = "student" | "admin" | "canteen" | null;

const Login = () => {
  const [selectedPortal, setSelectedPortal] = useState<PortalType>(null);
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const portals = [
    {
      type: "student" as PortalType,
      title: "Student Portal",
      icon: Users,
      description: "Order food from canteen",
      color: "from-primary to-orange-500",
    },
    {
      type: "admin" as PortalType,
      title: "Admin Portal",
      icon: Shield,
      description: "Manage canteen operations",
      color: "from-blue-500 to-blue-600",
    },
    {
      type: "canteen" as PortalType,
      title: "Canteen Staff",
      icon: ChefHat,
      description: "Process & deliver orders",
      color: "from-secondary to-green-600",
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idNumber || !password) {
      toast({
        title: "Error",
        description: "Please enter both ID and password",
        variant: "destructive",
      });
      return;
    }

    // Simulate login - in production, validate against backend
    if (selectedPortal === "student") {
      toast({
        title: "Login Successful",
        description: "Welcome to the canteen!",
      });
      navigate("/menu");
    } else {
      toast({
        title: "Coming Soon",
        description: `${selectedPortal} portal will be available soon!`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <img
          src={heroImage}
          alt="College Canteen"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background flex items-center justify-center">
          <div className="text-center text-white space-y-2">
            <h1 className="text-5xl font-bold tracking-tight">Campus Canteen</h1>
            <p className="text-xl text-white/90">Digital Food Ordering Made Simple</p>
          </div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 -mt-20 pb-20">
        {!selectedPortal ? (
          <div>
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
              Select Your Portal
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {portals.map((portal) => {
                const Icon = portal.icon;
                return (
                  <Card
                    key={portal.type}
                    className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card border-2 hover:border-primary"
                    onClick={() => setSelectedPortal(portal.type)}
                  >
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${portal.color} flex items-center justify-center mb-4 mx-auto`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-center mb-2 text-card-foreground">
                      {portal.title}
                    </h3>
                    <p className="text-sm text-center text-muted-foreground">
                      {portal.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <Card className="p-8 shadow-2xl bg-card">
              <div className="text-center mb-6">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${portals.find(p => p.type === selectedPortal)?.color} flex items-center justify-center mb-4 mx-auto`}>
                  {portals.find(p => p.type === selectedPortal)?.icon && (
                    <div className="text-white">
                      {(() => {
                        const Icon = portals.find(p => p.type === selectedPortal)!.icon;
                        return <Icon className="w-10 h-10" />;
                      })()}
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-card-foreground">
                  {portals.find(p => p.type === selectedPortal)?.title}
                </h2>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input
                    id="idNumber"
                    type="text"
                    placeholder="Enter your ID"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedPortal(null)}
                  >
                    Back
                  </Button>
                  <Button type="submit" variant="hero" className="flex-1">
                    Login
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <Button variant="link" className="text-sm">
                  Forgot Password?
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
