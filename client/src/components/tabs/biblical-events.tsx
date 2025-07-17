import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { BibleEvent } from "@shared/schema";

export default function BiblicalEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: events, isLoading, error } = useQuery<BibleEvent[]>({
    queryKey: ["/api/biblical-events"],
  });

  const filteredEvents = events?.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || event.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Failed to load biblical events. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border border-slate-200">
      <CardHeader className="border-b border-slate-200">
        <CardTitle className="text-xl font-semibold text-navy">Biblical Prophecy Events</CardTitle>
        <p className="text-slate-600 mt-1">Track the fulfillment of biblical prophecies throughout history</p>
      </CardHeader>
      
      {/* Search and Filter */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search prophecies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="fulfilled">Fulfilled</SelectItem>
                <SelectItem value="unfulfilled">Unfulfilled</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
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

      {/* Events Grid */}
      <div className="p-6">
        <div className="grid gap-4">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
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
          ) : filteredEvents?.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <div className="text-xl mb-2">📜</div>
              <p>No biblical events found matching your criteria.</p>
            </div>
          ) : (
            filteredEvents?.map((event) => (
              <div key={event.id} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
                      <div className="ml-4 flex items-center space-x-3">
                        <span className="text-sm text-slate-500">{event.fulfillmentDate || "Pending"}</span>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full">
                          {event.status === "fulfilled" ? (
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                          ) : event.status === "unfulfilled" ? (
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            </div>
                          ) : (
                            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-3">{event.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="font-georgia text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
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
