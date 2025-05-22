import React from "react";
import { ChevronRight, Home } from "lucide-react";
import type{ BreadcrumbItem } from "../types";

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items = [{ id: "home", name: "Home", href: "/" }],
}) => {
  return (
    <nav className='flex' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-2'>
        {items.map((item, index) => (
          <li key={item.id} className='inline-flex items-center'>
            {index > 0 && (
              <ChevronRight className='mx-1 h-4 w-4 text-gray-400' />
            )}

            <a
              href={item.href}
              className={`inline-flex items-center text-sm font-medium ${
                index === items.length - 1
                  ? "text-gray-700 cursor-default"
                  : "text-blue-600 hover:text-blue-800"
              }`}
              aria-current={index === items.length - 1 ? "page" : undefined}
            >
              {index === 0 && <Home className='mr-1 h-4 w-4' />}
              {item.name}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
