
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface NewDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
}

export default function NewDiscussionModal({ isOpen, onClose, categories }: NewDiscussionModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("discussion");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a discussion",
        variant: "destructive",
      });
      return;
    }
    
    if (!title.trim() || !content.trim() || !category) {
      toast({
        title: "Invalid submission",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert tags string to array
      const tagsArray = tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
      
      // Create a new discussion
      const { error } = await supabase
        .from('discussions')
        .insert({
          title,
          content,
          category,
          tags: tagsArray,
          user_id: user.id,
          author: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous',
          author_avatar: user.user_metadata?.avatar_url || '',
          pinned: false,
          views: 0,
          replies: 0,
          created_at: new Date().toISOString()
        });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Discussion created",
        description: "Your discussion has been posted successfully.",
      });
      
      // Reset form
      setTitle("");
      setContent("");
      setCategory("discussion");
      setTags("");
      
      // Close modal
      onClose();
    } catch (error: any) {
      console.error('Error creating discussion:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create New Discussion</DialogTitle>
          <DialogDescription>
            Start a new discussion topic with the community. Be clear and respectful.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <Input
              id="title"
              placeholder="Discussion title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="capitalize">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">Content</label>
            <Textarea
              id="content"
              placeholder="Write your discussion here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm font-medium">Tags (comma separated)</label>
            <Input
              id="tags"
              placeholder="deepfake, technology, ai, ethics"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Discussion"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
