import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SchemeCard = ({ scheme }) => {
  if (scheme.status === "closed") return null;

  return (
    <Card className="border hover:shadow-md transition-shadow">
      <CardContent className="p-6 space-y-2">
        <h3 className="text-lg font-bold text-emerald-600">{scheme.name}</h3>
        <p className="text-gray-800 font-medium">By: {scheme.organization}</p>
        <p className="text-sm text-gray-600">
          Deadline: {scheme.deadline ? scheme.deadline : "Not given"}
        </p>
        <Button
          asChild
          className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          <a href={scheme.link} target="_blank" rel="noopener noreferrer">
            Apply
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SchemeCard;