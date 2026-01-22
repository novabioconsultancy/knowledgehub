import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, PenLine, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Articles', href: '/articles' },
  { label: 'Events', href: '/events' },
  { label: 'Contributors', href: '/contributors' },
  { label: 'About', href: '/about' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-fluid ${
          isScrolled
            ? 'py-3'
            : 'py-4'
        }`}
      >
        <div className={`mx-auto transition-all duration-500 ease-fluid ${
          isScrolled
            ? 'max-w-3xl px-6'
            : 'max-w-7xl px-4 sm:px-6 lg:px-8'
        }`}>
          <div
            className={`flex items-center justify-between transition-all duration-500 ease-fluid ${
              isScrolled
                ? 'glass rounded-full px-6 py-3 shadow-lg border border-white/20'
                : 'bg-transparent px-0 py-0'
            }`}
          >
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-8 h-8 rounded-lg bg-novabio-deep-teal flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className={`font-serif font-bold text-lg transition-colors ${
                isScrolled ? 'text-novabio-deep-teal' : 'text-novabio-deep-teal'
              }`}>
                NovaBio
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center gap-1 ${isScrolled ? '' : 'gap-2'}`}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full group ${
                    isScrolled
                      ? location.pathname === link.href
                        ? 'text-novabio-deep-teal'
                        : 'text-novabio-charcoal/70 hover:text-novabio-deep-teal'
                      : location.pathname === link.href
                      ? 'text-novabio-deep-teal'
                      : 'text-novabio-charcoal/70 hover:text-novabio-deep-teal'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-novabio-amber transition-all duration-300 ${
                    location.pathname === link.href ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Desktop CTA & Auth */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Link to="/submit">
                    <Button 
                      size="sm" 
                      className="bg-novabio-amber hover:bg-novabio-terracotta text-white rounded-full gap-2"
                    >
                      <PenLine className="w-4 h-4" />
                      Write Article
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-novabio-deep-teal/5 transition-colors">
                        <img 
                          src={user?.contributorProfile?.avatar} 
                          alt={user?.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-novabio-charcoal hidden lg:block">
                          {user?.name}
                        </span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem asChild>
                        <Link to={`/contributors/${user?.contributorProfile?.slug}`} className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-novabio-charcoal/70 hover:text-novabio-deep-teal"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button 
                      size="sm"
                      className="bg-novabio-deep-teal hover:bg-novabio-teal text-white rounded-full"
                    >
                      Join as Contributor
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-novabio-deep-teal/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-novabio-deep-teal" />
              ) : (
                <Menu className="w-6 h-6 text-novabio-deep-teal" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-novabio-charcoal/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-xl p-6 transition-all duration-500 ease-fluid ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  location.pathname === link.href
                    ? 'bg-novabio-deep-teal/5 text-novabio-deep-teal'
                    : 'text-novabio-charcoal/70 hover:bg-novabio-deep-teal/5 hover:text-novabio-deep-teal'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-novabio-deep-teal/10">
            {isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 px-4 py-3">
                  <img 
                    src={user?.contributorProfile?.avatar} 
                    alt={user?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-novabio-charcoal">{user?.name}</p>
                    <p className="text-sm text-novabio-charcoal/60">{user?.contributorProfile?.role}</p>
                  </div>
                </div>
                <Link to="/submit" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-novabio-amber hover:bg-novabio-terracotta text-white rounded-xl gap-2">
                    <PenLine className="w-4 h-4" />
                    Write Article
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="w-full rounded-xl border-novabio-deep-teal/20"
                >
                  Log out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full rounded-xl border-novabio-deep-teal/20">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-novabio-deep-teal hover:bg-novabio-teal text-white rounded-xl">
                    Join as Contributor
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
