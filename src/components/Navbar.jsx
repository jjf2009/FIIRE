import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Banknote, Menu } from "lucide-react"
import { Link } from "react-router-dom"
import SearchBar from "@/components/SearchBar"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const Navbar = () => { 
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left logo */}
          {/* Mobile Hamburger */}
          <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen} >
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="space-y-4 mt-8 flex items-center flex-col">
                <SearchBar />
                <Link to="/" onClick={() => setOpen(false)} className="block text-sm font-medium">
                  Home
                </Link>
                <Link to="/schemes" onClick={() => setOpen(false)} className="block text-sm font-medium">
                  Schemes
                </Link>
                <Button
                  variant="outline"
                  className="w-full "
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-emerald-500 p-1 rounded">
            <Banknote className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">FundFind</span>
        </Link>

        {/* Search Bar - shown on md+ */}
        <div className="hidden md:block w-full max-w-md mx-4">
          <SearchBar />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium">Home</Link>
          <Link to="/schemes" className="text-sm font-medium">Schemes</Link>
        </nav>

      
      </div>
    </header>
  )
}

export default Navbar
