import { Button } from "@/components/ui/button"
import { Banknote } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-emerald-500 p-1 rounded">
            <Banknote className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">FundFind</span>
        </Link>

        <nav className="flex items-center gap-8">
          <Link to="/" className="text-sm font-medium">
            Home
          </Link>
          <Link to="/schemes" className="text-sm font-medium">
            Schemes
          </Link>
          <Link to="/about" className="text-sm font-medium">
            About
          </Link>
          <Button variant="outline" className="rounded-full">
            Sign in
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
