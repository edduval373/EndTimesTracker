import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SoonToCome from "@/components/tabs/soon-to-come";
import RecentFulfillments from "@/components/tabs/recent-fulfillments";
import BiblicalEvents from "@/components/tabs/biblical-events";
import CurrentNews from "@/components/tabs/current-news";
import ExploreTopics from "@/components/tabs/explore-topics";
import { EmailDialog } from "@/components/EmailDialog";
import { useUserCookie } from "@/hooks/useUserCookie";
import logoPath from "@assets/fulllogo_transparent_nobuffer_1751729917299.png";
import jerusalemImage from "@assets/Jerusalem_1751729573155.jpeg";

export default function Home() {
  const { hasUserCookie, isLoading } = useUserCookie();
  const [showEmailDialog, setShowEmailDialog] = useState(false);

  // Show email dialog when user doesn't have a cookie and loading is complete
  useEffect(() => {
    if (!isLoading && !hasUserCookie) {
      setShowEmailDialog(true);
    }
  }, [isLoading, hasUserCookie]);

  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      {/* Header with Jerusalem backdrop */}
      <header className="relative shadow-lg border-b border-slate-200 overflow-hidden" style={{
        backgroundImage: `url(${jerusalemImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        
        {/* Light overlay for text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        <div className="relative container mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h1 className="text-5xl font-bold text-white drop-shadow-lg">End Times Tracker</h1>
              <p className="text-xl text-blue-100 mt-3">Biblical Prophecy & Current Events</p>
            </div>
            <img 
              src={logoPath} 
              alt="End Times Tracker Logo" 
              className="w-auto object-contain"
              style={{ 
                filter: 'brightness(0) invert(1) drop-shadow(2px 2px 4px rgba(0,0,0,0.8))',
                height: '70%',
                maxHeight: '84px'
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <Tabs defaultValue="soon-to-come" className="w-full">
          <TabsList className="flex justify-center items-center gap-2 mb-12 h-20 bg-white shadow-lg rounded-2xl border border-slate-200 p-2">
            <TabsTrigger 
              value="soon-to-come" 
              className="flex-1 max-w-[200px] text-base font-semibold h-full rounded-xl px-6 py-4 data-[state=active]:bg-navy data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 hover:bg-slate-100 data-[state=active]:hover:bg-navy"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">⏳</div>
                <div className="text-sm font-medium">Soon to Come</div>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="recent-fulfillments" 
              className="flex-1 max-w-[200px] text-base font-semibold h-full rounded-xl px-6 py-4 data-[state=active]:bg-navy data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 hover:bg-slate-100 data-[state=active]:hover:bg-navy"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">✅</div>
                <div className="text-sm font-medium">Recent Fulfillments</div>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="biblical-events" 
              className="flex-1 max-w-[200px] text-base font-semibold h-full rounded-xl px-6 py-4 data-[state=active]:bg-navy data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 hover:bg-slate-100 data-[state=active]:hover:bg-navy"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">📜</div>
                <div className="text-sm font-medium">Biblical Events</div>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="current-news" 
              className="flex-1 max-w-[200px] text-base font-semibold h-full rounded-xl px-6 py-4 data-[state=active]:bg-navy data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 hover:bg-slate-100 data-[state=active]:hover:bg-navy"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">📰</div>
                <div className="text-sm font-medium">Current News</div>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="explore-topics" 
              className="flex-1 max-w-[200px] text-base font-semibold h-full rounded-xl px-6 py-4 data-[state=active]:bg-navy data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 hover:bg-slate-100 data-[state=active]:hover:bg-navy"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">🔍</div>
                <div className="text-sm font-medium">Explore Topics</div>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="soon-to-come">
            <SoonToCome />
          </TabsContent>

          <TabsContent value="recent-fulfillments">
            <RecentFulfillments />
          </TabsContent>

          <TabsContent value="biblical-events">
            <BiblicalEvents />
          </TabsContent>

          <TabsContent value="current-news">
            <CurrentNews />
          </TabsContent>

          <TabsContent value="explore-topics">
            <ExploreTopics />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-navy text-white mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <img 
                    src={logoPath} 
                    alt="End Times Tracker Logo" 
                    className="w-6 h-6 object-contain opacity-80"
                  />
                </div>
                <span className="font-semibold">End Times Tracker</span>
              </div>
              <p className="text-slate-300 text-sm">
                Tracking biblical prophecy fulfillment and connecting it with current world events.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">Biblical Prophecies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">News Sources</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Study Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Commentary</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Topics</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">End Times</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Israel</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Second Coming</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Revelation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-300">
            <p>&copy; 2024 End Times Tracker. All rights reserved. | Scripture quotations are from the ESV Bible.</p>
          </div>
        </div>
      </footer>

      {/* Email Collection Dialog */}
      <EmailDialog 
        isOpen={showEmailDialog} 
        onClose={() => setShowEmailDialog(false)} 
      />
    </div>
  );
}
