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
          <div className="md:col-span-2 ">
            <h3 className="font-bold text-lg mb-5">Quick Links</h3>
            <ul className="flex flex-row flex-wrap gap-6 ml-4">
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
                <Link to="/categories" className="text-gray-600 hover:text-emerald-500">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-600 hover:text-emerald-500">
                  Bot
                </Link>
              </li>
            </ul>
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
