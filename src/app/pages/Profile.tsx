import { useState } from 'react';
import { User, Mail, Phone, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { usersService } from '../services/users.service';

export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initialName =
    user ? [user.firstName, user.lastName].filter(Boolean).join(' ') : '';

  const [formData, setFormData] = useState({
    name: initialName,
    email: user?.email || '',
    phone: user?.phone || '',
    address: '123 Allen Avenue, Ikeja, Lagos',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const [firstName, ...rest] = formData.name.trim().split(' ');
      const lastName = rest.join(' ');

      await usersService.updateProfile({
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phone: formData.phone || undefined,
      });

      toast.success('Profile updated successfully!');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary mb-2">My Profile</h1>
        <p className="text-muted-foreground mb-8">
          Manage your account information and preferences
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Summary */}
          <Card className="p-6 border-border">
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-accent" />
              </div>
              <h3 className="font-semibold text-primary mb-1">
                {formData.name || initialName || 'Guest'}
              </h3>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </div>
          </Card>

          {/* Profile Form */}
          <Card className="p-6 border-border md:col-span-2">
            <h3 className="font-semibold text-primary mb-6">Account Information</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-1.5">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="pl-10 bg-input-background"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-10 bg-input-background"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative mt-1.5">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="pl-10 bg-input-background"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Default Address</Label>
                <div className="relative mt-1.5">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="pl-10 bg-input-background"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Save Changes
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
