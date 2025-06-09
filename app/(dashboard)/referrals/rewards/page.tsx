import React from 'react';
import EnterprisePageHeader from '@/components/core/layout/EnterprisePageHeader';
import QualityMetricCard from '@/components/ui/quality-metric-card';
import { Gift, DollarSign, HelpCircle, ListChecks, Users } from 'lucide-react';

interface RewardTier {
  id: string;
  name: string;
  description: string;
  rewardForReferrer: string;
  rewardForReferee: string;
  conditions: string[];
}

interface FAQItem {
  question: string;
  answer: string;
}

interface RewardsProgramDetails {
  programName: string;
  howItWorksSummary: string;
  rewardTiers: RewardTier[];
  eligibilityNotes: string[];
  claimProcessInfo: string;
  faq: FAQItem[];
}

const ReferralRewardsPage = () => {
  const rewardsProgram: RewardsProgramDetails = {
    programName: "Our Awesome Referral Program",
    howItWorksSummary: "Invite your friends to join us! When they sign up and make their first qualifying action (like a purchase or subscription), you both get rewarded. It's a win-win!",
    rewardTiers: [
      {
        id: 'tier_standard_cash',
        name: 'Standard Cash Reward',
        description: 'For each friend who signs up for a paid plan and remains a customer for 30 days.',
        rewardForReferrer: '$50 USD Credit',
        rewardForReferee: '$25 USD Discount on first order',
        conditions: [
          "Referred friend must be a new customer.",
          "Referred friend must subscribe to any paid plan.",
          "Referred friend must complete their first billing cycle (if applicable).",
          "Referral link must be used for signup."
        ]
      },
      {
        id: 'tier_enterprise_bonus',
        name: 'Enterprise Client Bonus',
        description: 'If your referred friend signs up for an Enterprise level plan.',
        rewardForReferrer: '$200 USD Bonus Credit',
        rewardForReferee: '10% off first year of Enterprise plan',
        conditions: [
          "All Standard Reward conditions apply.",
          "Referred friend must sign an annual Enterprise contract.",
        ]
      }
    ],
    eligibilityNotes: [
      "This program is open to all registered users.",
      "Rewards are subject to verification and may be adjusted or revoked if fraudulent activity is detected.",
      "Self-referrals are not permitted.",
      "The terms of this program may be updated at any time."
    ],
    claimProcessInfo: "Referrer rewards (account credits) are typically applied to your account within 7-10 business days after your referred friend meets all eligibility criteria. Referee discounts are applied automatically at their first checkout when using the referral link.",
    faq: [
      { question: "How many friends can I refer?", answer: "There's no limit! The more friends you successfully refer, the more rewards you can earn." },
      { question: "When will I see my reward credit?", answer: "Usually within 7-10 business days after your friend meets the conditions, like completing their first billing cycle." },
      { question: "Can I refer someone who has used our service before?", answer: "No, the referral program is designed for new customers only." },
      { question: "What happens if my friend forgets to use my link?", answer: "Unfortunately, the referral must be tracked through your unique link to qualify for rewards." }
    ]
  };

  return (
    <div className="bg-gray-50/50 min-h-screen">
      <EnterprisePageHeader title={rewardsProgram.programName} subtitle="Learn about the rewards you can earn by referring friends." />

      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <QualityMetricCard
            title="Referrer Reward (Standard)"
            value={rewardsProgram.rewardTiers[0]?.rewardForReferrer || 'N/A'}
            icon={<Gift size={24} className="text-indigo-500" />}
          />
          <QualityMetricCard
            title="Referee Reward (Standard)"
            value={rewardsProgram.rewardTiers[0]?.rewardForReferee || 'N/A'}
            icon={<DollarSign size={24} className="text-green-500" />}
          />
           <QualityMetricCard
            title="Friends To Invite"
            value="Unlimited"
            icon={<Users size={24} className="text-blue-500" />}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold mb-3 text-[#1B1F3B]">How It Works</h2>
          <p className="text-gray-700 leading-relaxed">{rewardsProgram.howItWorksSummary}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-[#1B1F3B]">Reward Details</h2>
          {rewardsProgram.rewardTiers.map(tier => (
            <div key={tier.id} className="mb-6 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">{tier.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{tier.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-gray-500 mb-1">You Get:</p>
                    <p className="font-semibold text-gray-800">{tier.rewardForReferrer}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-gray-500 mb-1">Your Friend Gets:</p>
                    <p className="font-semibold text-gray-800">{tier.rewardForReferee}</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Conditions:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 pl-4">
                  {tier.conditions.map((condition, index) => <li key={index}>{condition}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-3 text-[#1B1F3B] flex items-center"><ListChecks size={20} className="mr-2 text-gray-400"/>Eligibility Criteria</h2>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-4 leading-relaxed">
                    {rewardsProgram.eligibilityNotes.map((note, index) => <li key={index}>{note}</li>)}
                </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-3 text-[#1B1F3B]">Claiming Your Rewards</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{rewardsProgram.claimProcessInfo}</p>
            </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-[#1B1F3B] flex items-center"><HelpCircle size={20} className="mr-2 text-gray-400"/>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {rewardsProgram.faq.map((item, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                <h3 className="font-semibold text-gray-800">{item.question}</h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralRewardsPage;
