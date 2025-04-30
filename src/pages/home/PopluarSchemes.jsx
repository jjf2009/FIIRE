import { Button } from "@/components/ui/button"

const schemes = [
  {
    name: "Scheme Name",
    description: "A brief description of funding scheme goes here",
  },
  {
    name: "Scheme Name",
    description: "A brief description of funding scheme goes here",
  },
  {
    name: "Scheme Name",
    description: "A brief description of funding scheme goes here",
  },
]

const PopularSchemes = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">Popular Schemes</h2>
      <div className="space-y-4">
        {schemes.map((scheme, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{scheme.name}</h3>
              <p className="text-gray-600">{scheme.description}</p>
            </div>
            <Button className="bg-emerald-500 hover:bg-emerald-600">View details</Button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PopularSchemes
