import { MdCategory, MdDashboard, MdOutlineShoppingBag } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaProductHunt } from "react-icons/fa";
const routes = [
    {
        url: '/admin/dashboard',
        label: "Dashboard",
        icon: <MdDashboard size={22} />,
        hasChild:false,
    },
    {
        url: '/admin/users',
        label: "Users",
        icon: <FaUsers size={22} />,
        hasChild:false
    },
    {
        url: '/admin/products',
        label: "Products",
        icon: <FaProductHunt size={22} />,
        hasChild:false
    },
    {
        url: '/admin/categories',
        label: "Categories",
        icon: <MdCategory size={22} />,
        hasChild:false,
        // children:[
        //     {
        //         url: '/admin/addcategory',
        //         label: "Add Category",
        //     },
        //     {
        //         url: '/admin/categories',
        //         label: "Category List",
        //     }
        // ]
    },
    {
        url: '/admin/orders',
        label: "Orders",
        icon: <MdOutlineShoppingBag  size={22} />
    }

]

export default routes