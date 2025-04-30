import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="border-t py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">FundFind</h3>
            <p className="text-gray-600">
              Helping you discover and access the right funding opportunities for your needs.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-emerald-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="text-gray-600 hover:text-emerald-500">
                  All Schemes
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-emerald-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-emerald-500">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <address className="not-italic text-gray-600">
              <p>Email: info@fundfind.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} FundFind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
