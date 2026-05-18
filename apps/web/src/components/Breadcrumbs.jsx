
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

function Breadcrumbs({ customTitle }) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex items-center gap-2 text-sm mb-4 overflow-x-auto whitespace-nowrap pb-2">
      <Link to="/" className="flex items-center text-accent hover:text-white transition-colors duration-200 font-medium">
        <Home className="w-4 h-4 mr-1" />
        Home
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const title = last && customTitle ? customTitle : value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, ' ');

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-4 h-4 text-muted/50 flex-shrink-0" />
            {last ? (
              <span className="text-white font-semibold truncate max-w-[200px]">{title}</span>
            ) : (
              <Link to={to} className="text-accent hover:text-white transition-colors duration-200 truncate max-w-[150px] font-medium">
                {title}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
