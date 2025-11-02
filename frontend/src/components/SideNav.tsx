import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/trials", label: "Trials" },
  { to: "/recruitment", label: "Recruitment" },
  { to: "/costs", label: "Costs" },
  { to: "/forecasts", label: "Forecasts" },
  { to: "/reports", label: "Reports" },
  { to: "/admin", label: "Admin" },
];

export default function SideNav() {
  return (
    <nav className="px-2 py-2">
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          className={({ isActive }) =>
            `block px-3 py-2 rounded-md text-sm ${
              isActive
                ? "bg-[#1A1D24] text-white"
                : "text-[#A3A9B6] hover:bg-[#1A1D24] hover:text-white"
            }`
          }
        >
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}
