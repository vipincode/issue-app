import AuthenticationFeature from '@/components/features/issues/authentication-feature';
import HeroSection from '@/components/features/issues/hero-section';
import IssueFeatureManagement from '@/components/features/issues/issue-management-feature';
import KeyFeature from '@/components/features/issues/key-feature';
import QuickStartGuide from '@/components/features/issues/quick-start-guide';

export default async function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Authentication Features Section */}
      <AuthenticationFeature />

      {/* Issue Management Features Section */}
      <IssueFeatureManagement />

      {/* Key Features Highlight */}
      <KeyFeature />

      {/* Quick Start Guide */}
      <QuickStartGuide />
    </>
  );
}
