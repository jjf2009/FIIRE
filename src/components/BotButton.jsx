import { useNavigate } from "react-router-dom"
import { Bot } from "lucide-react"
import { Button } from "@/components/ui/button"

const BotButton = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/chat")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleClick}
        className="rounded-full p-6 bg-emerald-500 hover:bg-emerald-600 shadow-xl"
        style={{ height: "72px", width: "72px" }}
      >
        <Bot className="h-7 w-7 text-white" />
      </Button>
    </div>
  )
}

export default BotButton
