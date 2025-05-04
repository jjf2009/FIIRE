import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-10 mt-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h3 className="font-bold text-lg mb-5 text-gray-800">Quick Links</h3>
          <ul className="flex flex-wrap justify-center gap-6">
            <li>
              <Link 
                to="/" 
                className="text-gray-600 hover:text-emerald-500 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/schemes" 
                className="text-gray-600 hover:text-emerald-500 transition-colors duration-200"
              >
                All Schemes
              </Link>
            </li>
            <li>
              <Link 
                to="/categories" 
                className="text-gray-600 hover:text-emerald-500 transition-colors duration-200"
              >
                Categories
              </Link>
            </li>
          </ul>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} FundFind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
