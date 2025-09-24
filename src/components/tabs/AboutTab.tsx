import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Code, Heart, User } from "lucide-react";

export const AboutTab = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8 glass text-center">
        <div className="mb-6">
          <Clock className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Professional Alarm Clock</h2>
          <p className="text-muted-foreground text-lg">
            A modern, feature-rich alarm application designed for productivity
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="text-left">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Code className="w-4 h-4 text-accent" />
              Features
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Real-time clock display</li>
              <li>• Multiple alarm management</li>
              <li>• Customizable alarm tones</li>
              <li>• Snooze & dismiss functionality</li>
              <li>• Professional interface design</li>
              <li>• Local storage persistence</li>
            </ul>
          </div>

          <div className="text-left">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-destructive" />
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Tailwind CSS</Badge>
              <Badge variant="secondary">Vite</Badge>
              <Badge variant="secondary">Shadcn/ui</Badge>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <User className="w-4 h-4 text-primary" />
            <span className="font-medium">Made by:</span>
          </div>
          <p className="text-xl font-bold text-primary">Ishpreet Singh</p>
          <p className="text-sm text-muted-foreground mt-1">
            Software Developer & UI/UX Enthusiast
          </p>
        </div>

        <div className="mt-6 p-4 bg-background-secondary rounded-lg">
          <p className="text-xs text-muted-foreground">
            Version 1.0.0 | Built with ❤️ for productivity and modern design
          </p>
        </div>
      </Card>
    </div>
  );
};