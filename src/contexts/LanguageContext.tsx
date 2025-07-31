import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ko: {
    // Navigation
    'nav.record': '기록',
    'nav.journal': '저널',
    'nav.profile': '프로필',
    
    // Recording Page
    'recording.title': '음성 저널',
    'recording.voiceMode': '음성 모드',
    'recording.textMode': '텍스트 모드',
    'recording.startRecording': '기록 시작',
    'recording.stopRecording': '기록 중지',
    'recording.textPlaceholder': '오늘의 생각을 적어보세요...',
    'recording.saveEntry': '저널 저장',
    'recording.timer': '기록 시간',
    'recording.recording': '녹음 중...',
    'recording.startRecordingAria': '기록 시작',
    'recording.stopRecordingAria': '기록 중지',
    
    // Dashboard Page
    'dashboard.title': '저널 타임라인',
    'dashboard.list': '목록',
    'dashboard.calendar': '달력',
    'dashboard.calendarSoon': '달력 보기 준비 중',
    'dashboard.noEntries': '저널 기록이 없습니다',
    'dashboard.createFirst': '첫 번째 기록 만들기',
    
    // Profile Page
    'profile.title': '프로필',
    'profile.edit': '편집',
    'profile.save': '저장',
    'profile.cancel': '취소',
    'profile.name': '이름',
    'profile.email': '이메일',
    'profile.joinedSince': '부터 시작',
    'profile.stats': '저널 통계',
    'profile.totalEntries': '총 기록',
    'profile.streakDays': '연속 기록',
    'profile.voiceEntries': '음성 기록',
    'profile.textEntries': '텍스트 기록',
    'profile.settings': '설정',
    'profile.notifications': '알림 설정',
    'profile.darkMode': '다크 모드',
    'profile.voiceSettings': '음성 설정',
    'profile.language': '언어 설정',
    'profile.backup': '백업 및 동기화',
    'profile.privacy': '개인정보 처리방침',
    'profile.logout': '로그아웃',
    
    // Journal Card
    'journal.wellDone': '잘한 일',
    'journal.regrets': '아쉬운 점',
    'journal.tomorrow': '내일 할 일',
    'journal.duration': '분',
    'journal.summary': '요약',
    
    // Common
    'common.user': '사용자',
    'common.entries': '개',
    'common.days': '일',
    'common.minutes': '분',
    'common.openMenu': '메뉴 열기',
    'common.voiceJournal': '음성 저널',
  },
  en: {
    // Navigation
    'nav.record': 'Record',
    'nav.journal': 'Journal',
    'nav.profile': 'Profile',
    
    // Recording Page
    'recording.title': 'Voice Journal',
    'recording.voiceMode': 'Voice Mode',
    'recording.textMode': 'Text Mode',
    'recording.startRecording': 'Start Recording',
    'recording.stopRecording': 'Stop Recording',
    'recording.textPlaceholder': 'Write your thoughts for today...',
    'recording.saveEntry': 'Save Journal Entry',
    'recording.timer': 'Recording Time',
    'recording.recording': 'Recording...',
    'recording.startRecordingAria': 'Start recording',
    'recording.stopRecordingAria': 'Stop recording',
    
    // Dashboard Page
    'dashboard.title': 'Journal Timeline',
    'dashboard.list': 'List',
    'dashboard.calendar': 'Calendar',
    'dashboard.calendarSoon': 'Calendar view coming soon',
    'dashboard.noEntries': 'No journal entries found',
    'dashboard.createFirst': 'Create your first entry',
    
    // Profile Page
    'profile.title': 'Profile',
    'profile.edit': 'Edit',
    'profile.save': 'Save',
    'profile.cancel': 'Cancel',
    'profile.name': 'Name',
    'profile.email': 'Email',
    'profile.joinedSince': 'Joined since',
    'profile.stats': 'Journal Statistics',
    'profile.totalEntries': 'Total Entries',
    'profile.streakDays': 'Day Streak',
    'profile.voiceEntries': 'Voice Entries',
    'profile.textEntries': 'Text Entries',
    'profile.settings': 'Settings',
    'profile.notifications': 'Notifications',
    'profile.darkMode': 'Dark Mode',
    'profile.voiceSettings': 'Voice Settings',
    'profile.language': 'Language',
    'profile.backup': 'Backup & Sync',
    'profile.privacy': 'Privacy Policy',
    'profile.logout': 'Logout',
    
    // Journal Card
    'journal.wellDone': 'Things I Did Well',
    'journal.regrets': 'Things I Regret',
    'journal.tomorrow': 'Tomorrow\'s Tasks',
    'journal.duration': 'min',
    'journal.summary': 'Summary',
    
    // Common
    'common.user': 'User',
    'common.entries': 'entries',
    'common.days': 'days',
    'common.minutes': 'min',
    'common.openMenu': 'Open menu',
    'common.voiceJournal': 'Voice Journal',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ko');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('voice-journal-language') as Language;
    if (savedLanguage && (savedLanguage === 'ko' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('voice-journal-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};