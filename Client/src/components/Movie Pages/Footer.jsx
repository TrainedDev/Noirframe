import { Facebook, Instagram, InstagramIcon, TwitterIcon } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-neutral-950 text-gray-300">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <img src="/movie_logo.png" alt="logo" className="w-36" />
          <p className="text-sm text-gray-400 leading-6">
            Watch movies, TV shows, and exclusive content anytime, anywhere.
            Streaming without unnecessary buffering-induced rage.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-4">Explore</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Movies</li>
            <li className="hover:text-white cursor-pointer">TV Shows</li>
            <li className="hover:text-white cursor-pointer">Trending</li>
          </ul>
        </div>

        {/* Genres */}
        <div>
          <h3 className="text-white font-semibold mb-4">Genres</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="hover:text-white cursor-pointer">Action</li>
            <li className="hover:text-white cursor-pointer">Drama</li>
            <li className="hover:text-white cursor-pointer">Comedy</li>
            <li className="hover:text-white cursor-pointer">Thriller</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-red-600 transition">
              {/* <img src="/icons/facebook.svg" className="w-4" /> */}
              <Facebook />
            </a>
            <a className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-red-600 transition">
              {/* <img src="/icons/twitter.svg" className="w-4" /> */}
              <TwitterIcon />
            </a>
            <a className="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-red-600 transition">
              {/* <img src="/icons/instagram.svg" className="w-4" /> */}
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row gap-3 justify-between items-center text-xs text-gray-500">
          <p>© 2026 StreamIt Clone. No lawyers were consulted.</p>
          <ul className="flex gap-5">
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
