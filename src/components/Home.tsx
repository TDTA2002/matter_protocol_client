import { useState } from "react";
import "./home.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from '@/assets/z4787944792026_b3b2b8ef0f17a15a59306b4383b0ac2c_transparent.png'

const Sidebar = () => {
  const navigate = useNavigate();
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);

  const [activeMenuItem, setActiveMenuItem] = useState<number | null>(0);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [searchFormVisible, setSearchFormVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleMenuItemClick = (index: number) => {
    setActiveMenuItem(index);
  };

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  const toggleSearchForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (window.innerWidth < 576) {
      e.preventDefault();
      setSearchFormVisible(!searchFormVisible);
    }
  };

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  return (
    <>
      <section id="sidebar" className={sidebarHidden ? 'hide' : ''}>
        <a href="#" className="brand">
          <i className="bx bxs-smile" />
          <span className="text">Admin</span>
        </a>
        <ul className="side-menu top">
          <li className={activeMenuItem === 0 ? 'active' : ''}>
            <Link to={""} onClick={() => handleMenuItemClick(0)}>
              <i className="bx bxs-dashboard" />
              <Link to={"/"} className="text">Dashboard</Link>
            </Link>
          </li>
          <li className={activeMenuItem === 1 ? 'active' : ''}>
            <Link to={"add_product"} onClick={() => handleMenuItemClick(1)}>
              <i className="bx bxs-shopping-bag-alt" />
              <Link to={"device"} className="text">Device</Link>
            </Link>
          </li>
          <li className={activeMenuItem === 2 ? 'active' : ''}>
            <Link to={"add_category"} onClick={() => handleMenuItemClick(2)}>
              <i className="bx bxs-doughnut-chart" />
              <Link to={"add_category"} className="text">Category</Link>
            </Link>
          </li>

          <li className={activeMenuItem === 3 ? 'active' : ''}>
            <Link to={"list_user"} onClick={() => handleMenuItemClick(3)}>
              <i className="bx bxs-group" />
              <Link to={"Userbill"} className="text">Users</Link>
            </Link>
          </li>
          <li className={activeMenuItem === 4 ? 'active' : ''}>
            <Link to={"order"} onClick={() => handleMenuItemClick(4)}>
              <i className="bx bxs-dashboard" />
              <Link to={"order"} className="text">Bill</Link>
            </Link>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a href="#" className="logout">
              <i className="bx bxs-log-out-circle" />
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>

      <section id="content">
        {/* NAVBAR */}
        <nav>
          <i className="bx bx-menu" onClick={toggleSidebar} />

          <form action="#">
            <div className={`form-input${searchFormVisible ? ' show' : ''}`}>

            </div>
          </form>
          <input type="checkbox" id="switch-mode" onChange={handleDarkModeChange} checked={darkMode} hidden />
          <label htmlFor="switch-mode" className="switch-mode" />

        </nav>
        {/* NAVBAR */}
        {/* MAIN */}
        <Outlet />
        {/* MAIN */}
      </section>
    </>
  );
};



export default Sidebar;