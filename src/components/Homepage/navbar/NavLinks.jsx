import { NavLink } from "react-router-dom";

function NavLinks(props) {
  return (
    <>
      <div className="relative group">
        <NavLink
          className="hover:text-indigo-200 px-4 text-sm text-gray-100"
          to={`/category/${props.id}`}
        >
          {props.name}
        </NavLink>

        <div className="absolute w-32 rounded-md shadow-lg   bg-indigo-600 text-gray-100 text-sm px-2 py-2 hidden group-hover:block z-50">
          {props.subCategories.map((subCategory) => {
            if (subCategory.category_id === props.id) {
              return (
                <NavLink
                  key={subCategory.id}
                  to={`/subcategory/${subCategory.id}`}
                  className="px-4 py-2 block w-full text-gray-100 hover:text-gray-300"
                >
                  {subCategory.subcategory_name}
                </NavLink>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default NavLinks;
