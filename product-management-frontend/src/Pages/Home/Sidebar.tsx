import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { Category } from "../../types";

interface SidebarProps {
  categories: Category[];
  selectedCategories: string[];
  onSelectCategory: (categoryId: string, isSelected: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategories,
  onSelectCategory,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "laptop",
  ]);

  const toggleCategory = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(
        expandedCategories.filter((_id) => _id !== categoryId)
      );
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const mainCategories = categories.filter(
    (category) => category.category !== null
  );

  return (
    <aside className='w-full md:w-64 bg-white p-4 border-r border-gray-200'>
      <h2 className='text-lg font-semibold mb-4'>Categories</h2>
      <ul className='space-y-2'>
        {mainCategories.map((category) => {
          const isExpanded = expandedCategories.includes(category._id);
          const hasBrands =
            category.subcategory && category.subcategory.length > 0;

          return (
            <li key={category._id} className='pb-1'>
              {category._id === "all" ? (
                <div
                  className='flex items-center cursor-pointer py-1 font-medium'
                  onClick={() =>
                    onSelectCategory(
                      category._id,
                      !selectedCategories.includes(category._id)
                    )
                  }
                >
                  <span>{category.category}</span>
                </div>
              ) : (
                <>
                  <div
                    className='flex items-center justify-between cursor-pointer py-1 hover:text-blue-600'
                    onClick={() => toggleCategory(category._id)}
                  >
                    <span>{category.category}</span>
                    {hasBrands &&
                      (isExpanded ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
                      ))}
                  </div>

                  {isExpanded && hasBrands && (
                    <ul className='pl-4 pt-1 space-y-1'>
                      {category.subcategory?.map((brand) => (
                        <li
                          key={`${category._id}-${brand}`}
                          className='flex items-center'
                        >
                          <input
                            type='checkbox'
                            id={`brand-${brand}`}
                            checked={selectedCategories.includes(brand)}
                            onChange={(e) =>
                              onSelectCategory(brand, e.target.checked)
                            }
                            className='mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                          />
                          <label
                            htmlFor={`brand-${brand}`}
                            className='capitalize cursor-pointer text-sm'
                          >
                            {brand}
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
