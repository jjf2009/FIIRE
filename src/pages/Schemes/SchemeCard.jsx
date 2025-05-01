import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SchemeCard = ({ scheme }) => {
  return (
    <Card className="border hover:shadow-md transition-shadow">
      <CardContent className="p-6 space-y-2">
        <h3 className="text-lg font-bold text-emerald-600">{scheme["Program"]}</h3>
        <p className="text-gray-800 font-medium">By: {scheme["Organization"]}</p>
        <p className="text-sm text-gray-700">Focus: {scheme["Focus Area"]}</p>
        <p className="text-sm text-gray-700">Grant: {scheme["Grant/Support"]}</p>
        <p className="text-sm text-gray-600">
          Deadline: {scheme["Deadline"] || "Not specified"}
        </p>
        <Button
          asChild
          className="mt-2 bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          <a
            href={scheme["Link"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SchemeCard;
