import { mainMenu } from '../config';
import { Link } from 'gatsby';
import logo from '../assets/images/logo.svg';

export default function Header() {
  return (
    <div className="container py-3">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="mr-8">
            <Link className="block" to="/">
              <img className="w-[130px]" src={logo} alt="logo of mohib.me" />
            </Link>
          </div>
          <nav className="hidden sm:block">
            {mainMenu.map(menu => (
              <Link className="p-1 mx-1" to={menu.path} key={menu.label}>
                {menu.label}
              </Link>
            ))}
          </nav>
        </div>
        <a href="/#contact" className="btn btn-primary btn-sm">
          contact me
        </a>
      </div>
    </div>
  );
}
