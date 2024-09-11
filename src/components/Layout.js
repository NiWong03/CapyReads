import React from 'react';
import Navbar from './Navbar';

function Layout({ children }) {
  const [search, setSearch] = React.useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement your search logic here
  };

  return (
    <div>
      <Navbar HandleSearch={handleSearch} search={search} SetSearch={setSearch} />
      <main>{children}</main>
    </div>
  );
}

export default Layout;  // Make sure this line is present and correct