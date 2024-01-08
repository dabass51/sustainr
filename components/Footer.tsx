import React from 'react';
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col items-center justify-center py-6">
      
      <div className="flex justify-center space-x-4 mb-6">
        {/* 
        <a target="_blank" href="https://www.instagram.com/bikefittr/"><InstagramLogoIcon/></a>
        <a target="_blank" href="https://www.linkedin.com/company/26515445/admin/feed/posts/"><LinkedInLogoIcon /></a>
        
        <a href="#"><i className="fab fa-facebook-square fa-2x"></i></a>
        <a href="#"><i className="fab fa-twitter-square fa-2x"></i></a>
        
        
        */}
      </div>
      
      <nav className="mb-6">
        <ul className="flex justify-center space-x-6">
          <li className="">
            <Link href="/imprint" className="text-muted-foreground hover:text-gray-300 transition-colors duration-200 transform px-6 py-3 rounded-md">Impressum</Link>
          </li>
          <li className="">
            <Link href="/privacy" className="text-muted-foreground hover:text-gray-300 transition-colors duration-200 transform px-6 py-3 rounded-md">Datenschutz</Link>
          </li>
          
        </ul>
      </nav>
      <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Sustainr. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
