import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* Profile Header Skeleton */}
      <div className="space-y-4">
        <div className="h-8 bg-muted/50 rounded-md w-1/3 animate-pulse" />
        <div className="h-4 bg-muted/50 rounded-md w-1/2 animate-pulse" />
      </div>

      {/* Profile Card Skeleton */}
      <Card className="p-6">
        <CardHeader className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-muted/50 rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="h-6 bg-muted/50 rounded-md w-32 animate-pulse" />
              <div className="h-4 bg-muted/50 rounded-md w-48 animate-pulse" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-4 bg-muted/50 rounded-md w-full animate-pulse" />
          <div className="h-4 bg-muted/50 rounded-md w-3/4 animate-pulse" />
        </CardContent>
      </Card>

      {/* Accounts Section Skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-muted/50 rounded-md w-24 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="p-4">
              <div className="space-y-3">
                <div className="h-4 bg-muted/50 rounded-md w-full animate-pulse" />
                <div className="h-3 bg-muted/50 rounded-md w-2/3 animate-pulse" />
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, j) => (
                    <div
                      key={j}
                      className="h-6 bg-muted/50 rounded-full w-16 animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
