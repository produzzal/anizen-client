import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center  p-10">
      <aside>
        <img
          className="h-32 w-32"
          src="https://i.ibb.co.com/CKQfh3SY/Anizen-Logo.png"
          alt=""
        />
        <p className="text-md font-semibold">
          Welcome to <span className="text-blue-500 font-serif">ANIZEN</span> –
          Your Premier Anime & Movie Hub
          <br />
          Discover, Stream, and Immerse Yourself in the World of Anime & Movies
        </p>
        <p className="text-sm text-gray-500">
          Copyright © {new Date().getFullYear()} - All Rights Reserved |
          Designed for the Ultimate Fan Experience
        </p>
      </aside>
      <nav>
        <div id="footer" className="grid grid-flow-col gap-4">
          <a href="https://www.linkedin.com/in/produzzal/" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M20 0h-16c-1.104 0-2 .896-2 2v20c0 1.104.896 2 2 2h16c1.104 0 2-.896 2-2v-20c0-1.104-.896-2-2-2zm-13 20h-3v-10h3v10zm-1.5-11.5c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75c.966 0 1.75.784 1.75 1.75s-.784 1.75-1.75 1.75zm12.5 11.5h-3v-5.5c0-1.366-.607-2.5-2-2.5-1.086 0-1.5.768-1.5 1.5v6.5h-3v-10h3v1.4c1.198-1.8 4.2-2.3 5.6-.3 2.5 3.3-.1 7.4-4.1 7.4v2z"></path>
            </svg>
          </a>

          <a href="https://www.instagram.com/pro_d_uzzal/" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M12 2.163c3.313 0 3.75 0 5.068.073 1.362.076 2.513.499 3.452 1.448 1.018.924 1.389 2.046 1.451 3.39.048 1.302.048 1.747.048 5.016s0 3.713-.048 5.016c-.062 1.344-.433 2.466-1.451 3.39-1.06.949-2.09 1.372-3.452 1.448-1.318.073-1.755.073-5.068.073-3.313 0-3.75 0-5.068-.073-1.362-.076-2.513-.499-3.452-1.448-1.018-.924-1.389-2.046-1.451-3.39-.048-1.302-.048-1.747-.048-5.016s0-3.713.048-5.016c.062-1.344.433-2.466 1.451-3.39 1.06-.949 2.09-1.372 3.452-1.448 1.318-.073 1.755-.073 5.068-.073zm0-2.163c-3.372 0-3.75 0-5.068.073-1.558.085-3.004.464-4.172 1.313-1.273.851-2.188 2.027-2.547 3.364-.142.563-.219 1.266-.219 1.987 0 1.312.077 2.431.219 3.017.359 1.337 1.274 2.513 2.547 3.364 1.168.85 2.614 1.228 4.172 1.313 1.318.073 1.746.073 5.068.073 3.372 0 3.75 0 5.068-.073 1.558-.085 3.004-.464 4.172-1.313 1.273-.851 2.188-2.027 2.547-3.364.142-.586.219-1.705.219-3.017 0-.721-.077-1.424-.219-1.987-.359-1.337-1.274-2.513-2.547-3.364-1.168-.849-2.614-1.228-4.172-1.313-1.318-.073-1.746-.073-5.068-.073zm0 9.837a4.163 4.163 0 1 0 0 8.327 4.163 4.163 0 0 0 0-8.327zm0 6.324a2.161 2.161 0 1 1 0-4.322 2.161 2.161 0 0 1 0 4.322zm6.406-7.054c-.507 0-.921-.413-.921-.921s.413-.921.921-.921c.507 0 .921.413.921.921s-.413.921-.921.921z"></path>
            </svg>
          </a>

          <a href="https://www.facebook.com/produzzal/" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
