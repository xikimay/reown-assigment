import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ProfileSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const ProfileSearch = ({
  searchTerm,
  onSearchChange,
}: ProfileSearchProps) => {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search by username, email, address, or network..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 bg-background border-border/50 focus:border-primary/50"
      />
    </div>
  );
};
