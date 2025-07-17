import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarIcon } from "lucide-react";
import type { BibleEvent } from "@shared/schema";

export default function RecentFulfillments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: events, isLoading, error } = useQuery<BibleEvent[]>({
    queryKey: ["/api/biblical-events"],
  });

  // Filter for only fulfilled events and sort by most recent
  const fulfilledEvents = events?.filter(event => 
    event.status === "fulfilled" &&
    (searchTerm === "" || 
     event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     event.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (categoryFilter === "all" || event.category === categoryFilter)
  ).sort((a, b) => {
    // Sort by fulfillment date, most recent first
    if (!a.fulfillmentDate) return 1;
    if (!b.fulfillmentDate) return -1;
    return new Date(b.fulfillmentDate).getTime() - new Date(a.fulfillmentDate).getTime();
  });

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Failed to load fulfilled prophecies. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border border-slate-200">
      <CardHeader className="border-b border-slate-200">
        <CardTitle className="text-xl font-semibold text-navy">Recent Prophecy Fulfillments</CardTitle>
        <p className="text-slate-600 mt-1">Biblical prophecies that have been fulfilled in modern times</p>
      </CardHeader>
      
      {/* Search and Filter */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search fulfilled prophecies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Israel">Israel</SelectItem>
                <SelectItem value="End Times">End Times</SelectItem>
                <SelectItem value="Messiah">Messiah</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Fulfillments Grid */}
      <div className="p-6">
        <div className="grid gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Skeleton className="h-5 w-64 mb-2" />
                    <Skeleton className="h-4 w-full mb-3" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="ml-6 flex items-center space-x-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </div>
            ))
          ) : fulfilledEvents?.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <div className="text-xl mb-2">✅</div>
              <p>No fulfilled prophecies found matching your criteria.</p>
            </div>
          ) : (
            fulfilledEvents?.map((event, index) => (
              <div key={event.id} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
                          <div className="flex items-center text-sm text-green-700 mt-1">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            <span>Fulfilled: {event.fulfillmentDate}</span>
                          </div>
                        </div>
                      </div>
                      {index === 0 && (
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          MOST RECENT
                        </div>
                      )}
                    </div>
                    <p className="text-slate-600 mb-3 ml-11">{event.description}</p>
                    <div className="flex items-center space-x-4 text-sm ml-11">
                      <span className="font-georgia text-slate-700 bg-white px-3 py-1 rounded-full border border-green-200">
                        {event.scriptureReference}
                      </span>
                      <span className="text-slate-500">Category: {event.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}