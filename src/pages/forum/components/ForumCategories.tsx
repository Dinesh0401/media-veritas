
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DiscussionProps } from "../types";

interface ForumCategoriesProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  sortedDiscussions: DiscussionProps[];
  setActiveTab: (tab: string) => void;
}

export default function ForumCategories({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  sortedDiscussions,
  setActiveTab
}: ForumCategoriesProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search discussions..."
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="reporting">Reporting</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="guides">Guides</SelectItem>
              <SelectItem value="stories">Stories</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
              <SelectItem value="tools">Tools</SelectItem>
              <SelectItem value="discussion">Discussion</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
