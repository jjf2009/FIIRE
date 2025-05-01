import { ExternalLink } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const SchemeCard = ({ scheme }) => {
  return (
    <Card className="flex flex-col justify-between h-full overflow-hidden border transition-all hover:shadow-md">
      <CardContent className="p-6 pt-6 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Title */}
          <h3 className="text-xl font-semibold tracking-tight text-emerald-600">{scheme.title}</h3>

          {/* Organization */}
          <p className="text-sm font-medium text-gray-700">
            <span className="text-gray-500">By </span>
            {scheme.organization}
          </p>

          {/* Focus Areas */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {scheme.focusAreas.map((area, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              >
                {area}
              </Badge>
            ))}
          </div>

          {/* Support */}
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Support</p>
            <p className="font-medium text-gray-900">{scheme.support}</p>
          </div>

          {/* Deadline */}
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Deadline</p>
            <p className="text-sm text-gray-700">{scheme.deadline}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          asChild
          className="w-full bg-emerald-500 text-white transition-colors hover:bg-emerald-600"
        >
          <a
            href={scheme.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5"
          >
            Apply Now
            <ExternalLink size={16} />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default SchemeCard
