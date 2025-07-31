import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Edit2, Calendar, Mic, FileText, Bell, Download, Shield, LogOut, Moon, Volume2, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfileProps {
  activeTab: 'home' | 'dashboard' | 'profile';
  onTabChange: (tab: 'home' | 'dashboard' | 'profile') => void;
}

export const Profile = ({ activeTab, onTabChange }: ProfileProps) => {
  const { t, language, setLanguage } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: t('common.user'),
    email: "user@example.com",
    joinedDate: language === 'ko' ? "2024년 1월" : "January 2024"
  });

  const stats = {
    totalEntries: 24,
    voiceEntries: 18,
    textEntries: 6,
    streakDays: 7
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend/Supabase
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader title={t('profile.title')} />
      
      <div className="p-4 space-y-6">
        {/* User Info Card */}
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" />
                <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
                  {userInfo.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">{t('profile.name')}</Label>
                  <Input
                    id="name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t('profile.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="flex-1">
                    {t('profile.save')}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                    {t('profile.cancel')}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <CardTitle className="text-xl">{userInfo.name}</CardTitle>
                <p className="text-muted-foreground">{userInfo.email}</p>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {userInfo.joinedDate} {t('profile.joinedSince')}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="mt-2"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  {t('profile.edit')}
                </Button>
              </div>
            )}
          </CardHeader>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('profile.stats')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-primary/5 rounded-lg">
                <p className="text-2xl font-bold text-primary">{stats.totalEntries}</p>
                <p className="text-sm text-muted-foreground">{t('profile.totalEntries')}</p>
              </div>
              <div className="text-center p-3 bg-secondary/20 rounded-lg">
                <p className="text-2xl font-bold text-secondary-foreground">{stats.streakDays}</p>
                <p className="text-sm text-muted-foreground">{t('profile.streakDays')}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mic className="h-4 w-4 text-primary" />
                  <span className="text-sm">{t('profile.voiceEntries')}</span>
                </div>
                <Badge variant="secondary">{stats.voiceEntries}{t('common.entries')}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm">{t('profile.textEntries')}</span>
                </div>
                <Badge variant="secondary">{stats.textEntries}{t('common.entries')}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('profile.settings')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Bell className="h-4 w-4 mr-3" />
              {t('profile.notifications')}
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Moon className="h-4 w-4 mr-3" />
              {t('profile.darkMode')}
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Volume2 className="h-4 w-4 mr-3" />
              {t('profile.voiceSettings')}
            </Button>
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4" />
                <span className="text-sm">{t('profile.language')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">한글</span>
                <Switch 
                  checked={language === 'en'}
                  onCheckedChange={(checked) => setLanguage(checked ? 'en' : 'ko')}
                />
                <span className="text-sm text-muted-foreground">English</span>
              </div>
            </div>
            <Button variant="ghost" className="w-full justify-start">
              <Download className="h-4 w-4 mr-3" />
              {t('profile.backup')}
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-3" />
              {t('profile.privacy')}
            </Button>
            <Button variant="ghost" className="w-full justify-start text-destructive">
              <LogOut className="h-4 w-4 mr-3" />
              {t('profile.logout')}
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};