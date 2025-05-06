import { Link } from "react-scroll";
import { motion } from "framer-motion";
import { sections } from "../data/sections";

export default function SideNav() {
  return (
    <aside className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <nav className="flex flex-col space-y-3">
        {sections.map((s) => (
          <motion.div
            key={s.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={s.id}
              smooth
              offset={-80}
              duration={500}
              className="bg-white/80 backdrop-blur px-3 py-2 rounded-2xl shadow cursor-pointer text-sm font-medium"
            >
              {s.label}
            </Link>
          </motion.div>
        ))}
      </nav>
    </aside>
  );
}
