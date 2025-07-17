import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, AlertTriangle } from "lucide-react";
import type { BibleEvent } from "@shared/schema";

export default function SoonToCome() {
  const { data: biblicalEvents, isLoading } = useQuery<BibleEvent[]>({
    queryKey: ['/api/biblical-events'],
  });

  const upcomingEvents = biblicalEvents?.filter((event: BibleEvent) => 
    event.status === 'unfulfilled'
  ) || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Soon to Come</h2>
        <p className="text-gray-600">Biblical prophecies expected to unfold in the near future</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event: BibleEvent) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow border-orange-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-800 leading-tight">
                    {event.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 ml-2">
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      <Clock className="w-3 h-3 mr-1" />
                      Imminent
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Category: {event.category}</span>
                  </div>
                  {event.scriptureReference && (
                    <div className="flex items-center gap-1">
                      <span>📖 {event.scriptureReference}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <AlertTriangle className="w-3 h-3 text-orange-500" />
                  <span className="text-orange-600 font-medium">
                    Watch for signs of fulfillment
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="mb-4">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No Imminent Events Found
              </h3>
              <p className="text-gray-500">
                All near-term prophecies are currently fulfilled or the timeline is uncertain.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Prophetic timing is in God's hands. 
                Continue watching and being ready for His return.
              </p>
            </div>
          </div>
        )}
      </div>

      {upcomingEvents.length > 0 && (
        <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-1">Prophetic Watch</h4>
              <p className="text-sm text-amber-700">
                These events are considered imminent based on current world conditions and biblical indicators. 
                Stay alert and prepared as we watch for God's prophetic timeline to unfold.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}