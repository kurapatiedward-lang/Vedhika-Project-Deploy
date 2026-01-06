import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AdminDashboard.css";

import logoImage from "../../../assets/vedhika.jpeg";

import {
  HouseFill,
  PeopleFill,
  GeoAlt,
  Bank,
  PersonBadge,
  Building,
  CashStack,
  Book,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  List,
  BuildingFill,
  Map,
  PinMap,
  Postage,
  Buildings,
  GeoAltFill,
  CreditCard,
  People,
  PersonLinesFill,
  Award,
  Wallet,
  Type,
  CurrencyExchange,
  Laptop
} from 'react-bootstrap-icons';

function Sidebar() {
  const [expandedMenus, setExpandedMenus] = useState(["Dashboard"]);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const navigate = useNavigate();

  const toggleMenu = (menuName) => {
    if (expandedMenus.includes(menuName)) {
      setExpandedMenus(expandedMenus.filter(item => item !== menuName));
    } else {
      setExpandedMenus([...expandedMenus, menuName]);
    }
  };

  // Sidebar menu items with nested structure
  const menuItems = [
    {
      id: 1,
      name: 'Dashboard',
      icon: <HouseFill />,
      path: '/admin-dashboard',
      children: []
    },
    {
      id: 2,
      name: 'Emp Master',
      icon: <PeopleFill />,
      children: [
        { id: 21, name: 'Add employee', icon: <PlusCircle />, path: '/admin-dashboard/emp/add' },
        { id: 22, name: 'Active emp list', icon: <List />, path: '/admin-dashboard/emp/active' },
        { id: 23, name: 'In active emp list', icon: <List />, path: '/admin-dashboard/emp/inactive' },
        { id: 24, name: 'Emp Department', icon: <BuildingFill />, path: '/admin-dashboard/emp/department' },
        { id: 25, name: 'Emp Designation', icon: <Award />, path: '/admin-dashboard/emp/designation' },
        { id: 26, name: 'Emp work icons', icon: <Laptop />, path: '/admin-dashboard/emp/work-icons' },
      ]
    },
    {
      id: 3,
      name: 'Location Master',
      icon: <GeoAlt />,
      children: [
        { id: 31, name: 'State', icon: <Map />, path: '/admin-dashboard/location/state' },
        { id: 32, name: 'Location', icon: <GeoAltFill />, path: '/admin-dashboard/location/location' },
        { id: 33, name: 'Sub Location', icon: <PinMap />, path: '/admin-dashboard/location/sublocation' },
        { id: 34, name: 'Pincode', icon: <Postage />, path: '/admin-dashboard/location/pincode' },
        { id: 35, name: 'Branch State', icon: <Buildings />, path: '/admin-dashboard/location/branch-state' },
        { id: 36, name: 'Branch Location', icon: <Building />, path: '/admin-dashboard/location/branch-location' },
      ]
    },
    {
      id: 4,
      name: 'Bank Master',
      icon: <Bank />,
      children: [
        { id: 41, name: 'Bank', icon: <CreditCard />, path: '/admin-dashboard/bank/bank' },
        { id: 42, name: 'Vendor Banks', icon: <People />, path: '/admin-dashboard/bank/vendor' },
        { id: 43, name: 'Type of Account', icon: <Type />, path: '/admin-dashboard/bank/account-type' },
        { id: 44, name: 'Bankers designations', icon: <PersonLinesFill />, path: '/admin-dashboard/bank/designations' },
      ]
    },
    {
      id: 5,
      name: 'DSA-Code Master',
      icon: <PersonBadge />,
      children: [
        { id: 51, name: 'Add Dsa', icon: <PlusCircle />, path: '/admin-dashboard/dsa/add' },
        { id: 52, name: 'DSA List', icon: <List />, path: '/admin-dashboard/dsa/list' },
        { id: 53, name: 'DSA Name', icon: <PersonBadge />, path: '/admin-dashboard/dsa/name' },
      ]
    },
    {
      id: 6,
      name: 'Bankers',
      icon: <Building />,
      children: [
        { id: 61, name: 'Add', icon: <PlusCircle />, path: '/admin-dashboard/bankers/add' },
        { id: 62, name: 'List', icon: <List />, path: '/admin-dashboard/bankers/list' },
      ]
    },
    {
      id: 7,
      name: 'Payout Master',
      icon: <CashStack />,
      children: [
        { id: 71, name: 'category', icon: <Wallet />, path: '/admin-dashboard/payout/category' },
        { id: 72, name: 'Payout type', icon: <Type />, path: '/admin-dashboard/payout/type' },
        { id: 73, name: 'payout', icon: <CurrencyExchange />, path: '/admin-dashboard/payout/payout' },
      ]
    },
    {
      id: 8,
      name: 'Training',
      icon: <Book />,
      path: '/admin-dashboard/training',
      children: []
    }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <a href="/admin-dashboard"><img src={logoImage} alt="Company Logo" className="logo-image" /></a>
        </div>
      </div>

      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-section">
            <div
              className={`menu-item ${activeMenu === item.name ? 'active' : ''}`}
              onClick={() => {
                if (item.children.length > 0) {
                  toggleMenu(item.name);
                } else {
                  setActiveMenu(item.name);
                  navigate(item.path || '#');
                }
              }}
              title={item.name}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-text">{item.name}</span>
              {item.children.length > 0 && (
                <span className="menu-arrow">
                  {expandedMenus.includes(item.name) ? <ChevronDown /> : <ChevronRight />}
                </span>
              )}
            </div>

            {item.children.length > 0 && expandedMenus.includes(item.name) && (
              <div className="submenu">
                {item.children.map((child) => (
                  <div
                    key={child.id}
                    className={`submenu-item ${activeMenu === child.name ? 'active' : ''}`}
                    onClick={() => {
                      setActiveMenu(child.name);
                      navigate(child.path || '#');
                    }}
                    title={child.name}
                  >
                    <span className="submenu-icon">{child.icon}</span>
                    <span className="submenu-text">{child.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div
          className="menu-item logout-item"
          title="Logout"
          onClick={() => {
            localStorage.clear();
            navigate('/');
          }}
        >
          <span className="menu-icon"><ChevronRight /></span>
          <span className="menu-text">Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
