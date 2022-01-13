import { mainMenu } from '../config';
import { Link } from 'gatsby';

export default function Header() {
  return (
    <div className="container p-2">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="mr-8">
            <p>mohib</p>
          </div>
          <nav>
            {mainMenu.map(menu => (
              <Link className="p-1 mx-1" to={menu.path} key={menu.label}>
                {menu.label}
              </Link>
            ))}
          </nav>
        </div>
        <a href="" className="btn btn-primary">
          contact me
        </a>
      </div>
    </div>
  );
}
