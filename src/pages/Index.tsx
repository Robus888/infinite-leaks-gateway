
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const folders = [
  {
    id: 1,
    title: "Pro Package 1",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    time: "13 minutes ago",
    link: "https://crazy.com"
  },
  {
    id: 2,
    title: "Pro Package 2",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    time: "28 minutes ago",
    link: "https://lol.com"
  },
  {
    id: 3,
    title: "Pro Package 3",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    time: "45 minutes ago",
    link: "https://example.com/folder3"
  },
  {
    id: 4,
    title: "Pro Package 4",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    time: "1 hour ago",
    link: "https://example.com/folder4"
  },
  {
    id: 5,
    title: "Pro Package 5",
    imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    time: "2 hours ago",
    link: "https://example.com/folder5"
  },
  {
    id: 6,
    title: "Pro Package 6",
    imageUrl: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc",
    time: "3 hours ago",
    link: "https://example.com/folder6"
  },
  {
    id: 7,
    title: "Pro Package 7",
    imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
    time: "4 hours ago",
    link: "https://example.com/folder7"
  },
  {
    id: 8,
    title: "Pro Package 8",
    imageUrl: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2",
    time: "5 hours ago",
    link: "https://example.com/folder8"
  },
  {
    id: 9,
    title: "Pro Package 9",
    imageUrl: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e",
    time: "6 hours ago",
    link: "https://example.com/folder9"
  },
  {
    id: 10,
    title: "Pro Package 10",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    time: "7 hours ago",
    link: "https://example.com/folder10"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuth, setShowAuth] = useState(true);
  const [keyInput, setKeyInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredFolders = folders.filter(folder => 
    folder.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const storedKey = localStorage.getItem('accessKey');
    if (storedKey) {
      validateKey(storedKey);
    }
  }, []);

  const validateKey = async (keyValue: string) => {
    try {
      setLoading(true);
      setError("");
      
      const { data, error } = await supabase
        .from('access_keys')
        .select('*')
        .eq('key_value', keyValue)
        .eq('is_valid', true)
        .single();

      if (error) throw error;

      if (data) {
        // Update the key's used_at and used_by_ip
        const { error: updateError } = await supabase
          .from('access_keys')
          .update({ 
            used_at: new Date().toISOString(),
          })
          .eq('id', data.id);

        if (updateError) console.error('Error updating key usage:', updateError);

        localStorage.setItem('accessKey', keyValue);
        setShowAuth(false);
      } else {
        setError('Invalid access key');
      }
    } catch (error) {
      console.error('Error validating key:', error);
      setError('Invalid access key');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput.trim()) {
      setError('Please enter an access key');
      return;
    }
    validateKey(keyInput.trim());
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 relative">
      {showAuth && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-card p-8 rounded-lg max-w-md w-[90%]">
            <h2 className="text-2xl font-bold text-center mb-4">Access Required</h2>
            <p className="text-gray-400 text-center mb-6">
              Please enter your access key to continue
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Enter your access key"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="w-full"
              />
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Validating...' : 'Submit'}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={showAuth ? 'hidden' : ''}>
        {/* Hero Section */}
        <div className="text-center mb-12 animate-float">
          <h1 className="text-5xl font-bold mb-4">Welcome to Infinite Leaks</h1>
          <p className="text-xl text-gray-400">Your top source for pro content</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search folders..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-card text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredFolders.map((folder) => (
            <div
              key={folder.id}
              className="bg-card rounded-lg overflow-hidden card-hover"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={folder.imageUrl}
                  alt={folder.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{folder.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{folder.time}</p>
                <a
                  href={folder.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full bg-primary text-primary-foreground text-center py-2 rounded-md transition-all hover:bg-primary/90"
                >
                  View Folder
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
