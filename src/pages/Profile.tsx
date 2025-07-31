import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Edit2, Calendar, Mic, FileText } from "lucide-react";

interface ProfileProps {
  activeTab: 'home' | 'dashboard' | 'profile';
  onTabChange: (tab: 'home' | 'dashboard' | 'profile') => void;
}

export const Profile = ({ activeTab, onTabChange }: ProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "사용자",
    email: "user@example.com",
    joinedDate: "2024년 1월"
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
      <AppHeader title="프로필" />
      
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
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave} className="flex-1">
                    저장
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                    취소
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <CardTitle className="text-xl">{userInfo.name}</CardTitle>
                <p className="text-muted-foreground">{userInfo.email}</p>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {userInfo.joinedDate}부터 시작
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="mt-2"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  편집
                </Button>
              </div>
            )}
          </CardHeader>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">저널 통계</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-primary/5 rounded-lg">
                <p className="text-2xl font-bold text-primary">{stats.totalEntries}</p>
                <p className="text-sm text-muted-foreground">총 기록</p>
              </div>
              <div className="text-center p-3 bg-secondary/20 rounded-lg">
                <p className="text-2xl font-bold text-secondary-foreground">{stats.streakDays}</p>
                <p className="text-sm text-muted-foreground">연속 기록</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mic className="h-4 w-4 text-primary" />
                  <span className="text-sm">음성 기록</span>
                </div>
                <Badge variant="secondary">{stats.voiceEntries}개</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm">텍스트 기록</span>
                </div>
                <Badge variant="secondary">{stats.textEntries}개</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">설정</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              알림 설정
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              백업 및 동기화
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              개인정보 처리방침
            </Button>
            <Button variant="ghost" className="w-full justify-start text-destructive">
              로그아웃
            </Button>
          </CardContent>
        </Card>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};