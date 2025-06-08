import { NextResponse } from 'next/server';

interface UserReferralDashboardData {
  user_referral_code: string;
  user_referral_link: string;
  stats: {
    invites_sent_or_clicks: number;
    successful_referrals: number; // e.g., signed up and met criteria
    pending_referrals: number;   // e.g., signed up but haven't met criteria
    earned_rewards_usd: number;
  };
  referred_users_details: Array<{
    referral_id: string;
    name_or_email_preview: string; // e.g., "John D." or "jo***@example.com"
    date_referred: string; // ISO date string
    status: 'Joined' | 'Pending Reward Criteria' | 'Reward Earned' | 'Inactive';
    reward_amount_usd_earned?: number; // Only if reward earned
  }>;
}

// Mock data for a specific user (in a real app, this would be fetched based on authenticated user)
const mockUserDashboardData: UserReferralDashboardData = {
  user_referral_code: 'USER123XYZ',
  user_referral_link: 'https://yourapp.com/signup?ref=USER123XYZ',
  stats: {
    invites_sent_or_clicks: 75,
    successful_referrals: 8,
    pending_referrals: 3,
    earned_rewards_usd: 400,
  },
  referred_users_details: [
    { referral_id: 'ref_friend_alice', name_or_email_preview: 'Alice B.', date_referred: '2023-09-15T10:00:00Z', status: 'Reward Earned', reward_amount_usd_earned: 50 },
    { referral_id: 'ref_friend_bob', name_or_email_preview: 'bob****@example.com', date_referred: '2023-10-02T11:30:00Z', status: 'Joined', reward_amount_usd_earned: 0 },
    { referral_id: 'ref_friend_charlie', name_or_email_preview: 'Charlie D.', date_referred: '2023-10-20T14:15:00Z', status: 'Pending Reward Criteria', reward_amount_usd_earned: 0 },
    { referral_id: 'ref_friend_diana', name_or_email_preview: 'diana****@example.com', date_referred: '2023-08-01T09:00:00Z', status: 'Inactive', reward_amount_usd_earned: 0 },
    { referral_id: 'ref_friend_edward', name_or_email_preview: 'Edward F.', date_referred: '2023-07-10T16:45:00Z', status: 'Reward Earned', reward_amount_usd_earned: 50 },
  ],
};

export async function GET(request: Request) {
  // Here, you would typically identify the authenticated user from the request (e.g., session, token)
  // and fetch their specific referral data from the database.
  // For now, we return the same mock data for any request.
  try {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay
    return NextResponse.json(mockUserDashboardData);
  } catch (error) {
    console.error("Error fetching user referral dashboard data:", error);
    return NextResponse.json({ message: "Error fetching user referral dashboard data" }, { status: 500 });
  }
}

// POST/PUT might not be directly relevant here unless users can update some part of their referral settings,
// which is not in scope for this specific dashboard view.
