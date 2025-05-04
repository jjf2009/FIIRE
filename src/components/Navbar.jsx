import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Banknote, Menu, Home, FileText, X } from "lucide-react"
import { Link } from "react-router-dom"
import SearchBar from "@/components/SearchBar"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  
  return (
    <header className="border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left logo section for mobile (hamburger menu) */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-emerald-50">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 border-r border-emerald-100">
              <SheetHeader className="border-b pb-4 mb-6">
                <SheetTitle className="flex items-center gap-2 text-emerald-600">
                  <div className="bg-emerald-500 p-1 rounded-md">
                    <Banknote className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">FundFind</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="space-y-1">
                <SheetClose asChild>
                  <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 transition-colors">
                    <Home className="h-5 w-5" />
                    <span className="font-medium">Home</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/schemes" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 transition-colors">
                    <FileText className="h-5 w-5" />
                    <span className="font-medium">Schemes</span>
                  </Link>
                </SheetClose>
              </nav>
              
              <SheetFooter className="absolute bottom-6 left-0 right-0 px-6">
                <div className="text-xs text-center text-gray-500">
                  Find funding schemes that work for you
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Center logo for mobile, left aligned for desktop */}
        <div className="flex-1 flex md:justify-start justify-center">
          <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
            <div className="bg-emerald-500 p-1.5 rounded-md shadow-sm">
              <Banknote className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">FundFind</span>
          </Link>
        </div>

        {/* Search Bar - shown on md+ only */}
        <div className="hidden md:block w-full max-w-md mx-4">
          <SearchBar />
        </div>

        {/* Desktop nav - hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">Home</Link>
          <Link to="/schemes" className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">Schemes</Link>
        </nav>
        
        {/* Empty div for mobile to balance the hamburger menu */}
        <div className="md:hidden w-10"></div>
      </div>
    </header>
  )
}

export default Navbar