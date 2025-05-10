import { ExternalLink, Calendar, DollarSign, Tag, AlertCircle, Bell, Building } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Cookies from 'js-cookie';
import { memo } from 'react';

const SchemeCard = memo(({ scheme }) => {
  // Safely handle date parsing
  const parseDeadline = () => {
    try {
      const deadlineDate = new Date(scheme.deadline);

      // Check if date is valid
      if (isNaN(deadlineDate.getTime())) {
        return {
          formattedDeadline: 'Date not specified',
          daysLeft: null
        };
      }

      const today = new Date();
      const timeDiff = deadlineDate - today;
      const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      const formattedDeadline = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(deadlineDate);

      return { formattedDeadline, daysLeft };
    } catch (err) {
      console.error('Date parsing error:', err);
      return {
        formattedDeadline: 'Date not specified',
        daysLeft: null
      };
    }
  };

  const { formattedDeadline, daysLeft } = parseDeadline();

  const handleNotify = async () => {
    try {
      const user = JSON.parse(Cookies.get('user') || '{}');

      if (!user.email || !user.name) {
        alert('Please sign in to get notified.');
        return;
      }

      const sheetURL = 'https://script.google.com/macros/s/AKfycbyuXbixSl4nOE_QAOOyKGZ0oJt3ghptZtcdMz8xyo2U5pytwNNU45fWrT5BCp7CJbN-ZA/exec';
      const body = `Name=${encodeURIComponent(user.name)}&Email=${encodeURIComponent(user.email)}&Program=${encodeURIComponent(scheme.title)}&Organization=${encodeURIComponent(scheme.organization)}`;
      console.log(body)
      const response = await fetch(sheetURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('You will be notified when this scheme reopens.');
    } catch (err) {
      alert('Failed to register notification. Please try again.');
      console.error('Error:', err);
    }
  };

  const isOpen = scheme.status === 'Open';
  const isClosingSoon = daysLeft !== null && daysLeft <= 3 && daysLeft > 0 && isOpen;

  return (
    <Card className="flex flex-col h-full overflow-hidden border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-lg hover:border-emerald-200">
      <div className={`h-1.5 ${isOpen ? 'bg-gradient-to-r from-emerald-500 to-teal-600' : 'bg-gradient-to-r from-amber-400 to-amber-600'}`}></div>

      <CardContent className="p-6 pt-5 flex-1">
        <div className="space-y-3">
          {/* Title and Organization */}
          <div>
            <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
              <Building size={14} className="text-gray-500" />
              <span className="font-semibold">Organization:</span>
            </p>
            <h3 className="text-xl font-bold tracking-tight text-emerald-700 line-clamp-2 group-hover:text-emerald-600">
              {scheme.organization || 'Not specified'}
            </h3>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">
              <span className="font-semibold">Scheme:</span>
            </p>
            <p className="text-lg font-semibold text-gray-900 line-clamp-2">{scheme.title}</p>
          </div>

          {/* Status and Category */}
          <div className="flex flex-wrap gap-2">
            <div>
              <p className="text-sm font-medium text-gray-600">
                <span className="font-semibold">Status:</span>
              </p>
              <Badge className={isOpen
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-red-100 text-red-800 hover:bg-red-200"}>
                {isOpen ? 'Open' : 'Closed'}
              </Badge>
            </div>
            {scheme.category && (
              <div>
                <p className="text-sm font-medium text-gray-600">
                  <span className="font-semibold">Category:</span>
                </p>
                <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                  {scheme.category}
                </Badge>
              </div>
            )}
          </div>

          {/* Focus Areas */}
          {scheme.focusAreas && scheme.focusAreas.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                <Tag size={16} className="text-emerald-600" />
                <span className="font-semibold">Focus Areas:</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {scheme.focusAreas.map((area, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 truncate max-w-full"
                  >
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Support/Grant */}
          {scheme.support && (
            <div>
              <p className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                <DollarSign size={16} className="text-emerald-600" />
                <span className="font-semibold">Support:</span>
              </p>
              <p className="font-medium text-gray-900">{scheme.support}</p>
            </div>
          )}

          {/* Funding Type */}
          {scheme.fundingType && (
            <div>
              <p className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                <Tag size={14} className="text-emerald-600" />
                <span className="font-semibold">Funding Type:</span>
              </p>
              <p className="font-medium text-gray-800">{scheme.fundingType}</p>
            </div>
          )}

          {/* Deadline */}
          <div>
            <p className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
              <Calendar size={16} className="text-emerald-600" />
              <span className="font-semibold">Deadline:</span>
            </p>
            <p className="font-medium text-gray-800">{formattedDeadline}</p>

            {isClosingSoon && (
              <div className="flex items-center gap-1.5 mt-1.5 text-sm font-semibold text-red-600 animate-pulse">
                <AlertCircle size={16} />
                <span>Closing Soon: {daysLeft} day{daysLeft !== 1 ? 's' : ''} left</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 bg-gray-50">
        {!isOpen ? (
          <Button
            onClick={handleNotify}
            className="w-full bg-amber-500 text-white transition-all duration-300 hover:bg-amber-600 active:bg-amber-700 flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Bell size={16} />
            Notify Me When Open
          </Button>
        ) : (
          <Button
            asChild
            className="w-full bg-emerald-600 text-white transition-all duration-300 hover:bg-emerald-700 active:bg-emerald-800 shadow-sm"
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
        )}
      </CardFooter>
    </Card>
  );
});

// Display name for better debugging
SchemeCard.displayName = 'SchemeCard';

export default SchemeCard;