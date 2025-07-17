import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCwIcon } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { NewsEvent } from "@shared/schema";

export default function CurrentNews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: events, isLoading, error } = useQuery<NewsEvent[]>({
    queryKey: ["/api/news-events"],
  });

  const fetchNewsMutation = useMutation({
    mutationFn: () => apiRequest("GET", "/api/news/fetch"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/news-events"] });
      toast({
        title: "News Updated",
        description: "Latest news events have been fetched successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to fetch latest news. Please try again.",
        variant: "destructive",
      });
    },
  });

  const filteredEvents = events?.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = sourceFilter === "all" || event.source === sourceFilter;
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    
    return matchesSearch && matchesSource && matchesCategory;
  });

  const uniqueSources = events ? [...new Set(events.map(event => event.source))] : [];
  const uniqueCategories = events ? [...new Set(events.map(event => event.category))] : [];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Israel/Palestine":
        return "bg-blue-100 text-blue-800";
      case "Religious Freedom":
        return "bg-red-100 text-red-800";
      case "Archaeology":
        return "bg-purple-100 text-purple-800";
      case "Natural Disasters":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Less than 1 hour ago";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Failed to load news events. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border border-slate-200">
      <CardHeader className="border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-navy">Current News Events</CardTitle>
            <p className="text-slate-600 mt-1">Recent news that may relate to biblical prophecy</p>
          </div>
          <Button
            onClick={() => fetchNewsMutation.mutate()}
            disabled={fetchNewsMutation.isPending}
            variant="outline"
            size="sm"
          >
            <RefreshCwIcon className={`w-4 h-4 mr-2 ${fetchNewsMutation.isPending ? 'animate-spin' : ''}`} />
            Refresh News
          </Button>
        </div>
      </CardHeader>
      
      {/* News Filter */}
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {uniqueSources.map(source => (
                  <SelectItem key={source} value={source}>{source}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <CardContent className="p-6">
        <div className="grid gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-3" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
            ))
          ) : filteredEvents?.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              {events?.length === 0 ? (
                <div>
                  <p>No news events available.</p>
                  <Button
                    onClick={() => fetchNewsMutation.mutate()}
                    disabled={fetchNewsMutation.isPending}
                    className="mt-4"
                  >
                    <RefreshCwIcon className={`w-4 h-4 mr-2 ${fetchNewsMutation.isPending ? 'animate-spin' : ''}`} />
                    Fetch Latest News
                  </Button>
                </div>
              ) : (
                "No news events found matching your criteria."
              )}
            </div>
          ) : (
            filteredEvents?.map((news) => (
              <article key={news.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {news.title}
                    </h3>
                    <p className="text-slate-600 mb-3">
                      {news.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>{news.source}</span>
                      <span>{formatTimeAgo(news.publishedAt)}</span>
                      <Badge className={getCategoryColor(news.category)}>
                        {news.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {news.url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={news.url} target="_blank" rel="noopener noreferrer">
                          View Details
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
