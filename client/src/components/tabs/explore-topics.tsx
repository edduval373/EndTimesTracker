import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircleIcon, ClockIcon, TrendingUpIcon, BookOpenIcon, HeartIcon, ZapIcon } from "lucide-react";
import type { PropheticTopic } from "@shared/schema";

export default function ExploreTopics() {
  const { data: topics, isLoading, error } = useQuery<PropheticTopic[]>({
    queryKey: ["/api/prophetic-topics"],
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
      case "trending":
        return <Badge className="bg-orange-100 text-orange-800">Trending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getIcon = (title: string) => {
    if (title.includes("Peace")) return CheckCircleIcon;
    if (title.includes("Temple")) return BookOpenIcon;
    if (title.includes("End Times")) return ClockIcon;
    if (title.includes("Antichrist")) return TrendingUpIcon;
    if (title.includes("Revival")) return HeartIcon;
    if (title.includes("Disasters")) return ZapIcon;
    return CheckCircleIcon;
  };

  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Last updated just now";
    if (diffInHours < 24) return `Last updated ${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Last updated 1 day ago";
    if (diffInDays < 7) return `Last updated ${diffInDays} days ago`;
    
    return `Last updated ${date.toLocaleDateString()}`;
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Failed to load prophetic topics. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-navy mb-4">Explore Key Prophetic Topics</h2>
        <p className="text-slate-600">Dive deeper into specific prophetic questions and their implications</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="shadow-sm border border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Skeleton className="w-12 h-12 rounded-lg" />
                  <Skeleton className="h-6 w-16 rounded" />
                </div>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : topics?.length === 0 ? (
          <div className="col-span-full text-center py-8 text-slate-500">
            No prophetic topics available.
          </div>
        ) : (
          topics?.map((topic) => {
            const Icon = getIcon(topic.title);
            return (
              <Card key={topic.id} className="shadow-sm border border-slate-200 hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${topic.iconColor} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {getStatusBadge(topic.status)}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-navy transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {topic.description}
                  </p>
                  <div className="flex items-center text-sm text-slate-500">
                    <span>{topic.prophecyCount} prophecies</span>
                    <span className="mx-2">•</span>
                    <span>{formatLastUpdated(topic.lastUpdated?.toString() || new Date().toISOString())}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
