"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  ContactDropdown, // Add this import
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

export default function NavbarDemo({ children }) {
  const navItems = [
    {
      name: "About Me",
      link: "#AboutMe",
    },
    {
      name: "Skills",
      link: "#Skills",
    },
    {
      name: "Projects",
      link: "#Projects",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Your contact information - update with your actual details
  const contactInfo = {
    email: "yogeshrane019@gmail.com",
    phone: "+91 8779269045",
    linkedin: "https://linkedin.com/in/yogesh-rane-503226345/",
    github: "https://github.com/yogu-code",
    location: "Mumbai, India"
  };

  // Smooth scroll function
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId.replace('#', ''));
    if (element) {
      const navbarHeight = 100; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle nav item click
  const handleNavItemClick = (e, link) => {
    e.preventDefault();
    smoothScrollTo(link);
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems 
            items={navItems} 
            onItemClick={(e) => {
              const link = e.currentTarget.getAttribute('href');
              handleNavItemClick(e, link);
            }}
          />
          <div className="flex items-center gap-4">
            {/* Replace NavbarButton with ContactDropdown for desktop */}
            <ContactDropdown contactInfo={contactInfo} />
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => handleNavItemClick(e, item.link)}
                className="relative text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors duration-200"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {/* For mobile, you can either use ContactDropdown or keep the simple button */}
              {/* Option 1: Use ContactDropdown on mobile too */}
              <ContactDropdown 
                contactInfo={contactInfo} 
                className="w-full"
              />
              
              {/* Option 2: Keep simple button for mobile (comment out the above and uncomment below) */}
              
              {/* <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Contact Me
              </NavbarButton> */}
             
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {children}
    </div>
  );
}