import { NextResponse } from 'next/server';

interface ReferralTrackRecord {
  referral_id: string;
  date_initiated: string; // ISO date string
  referrer_user_id: string;
  referrer_name: string;
  referee_email: string;
  referee_name?: string; // Populated if the referee signs up
  referee_user_id?: string; // Populated if the referee signs up
  status: 'Invited' | 'Signed Up' | 'Pending Criteria' | 'Converted' | 'Reward Paid' | 'Expired' | 'Failed';
  conversion_date?: string; // ISO date string, when criteria met
  reward_id?: string; // ID of the reward type/tier
  reward_amount_usd?: number;
  notes?: string;
  last_updated_at: string; // ISO date string
}

// Mock data store for all referrals
let mockAllReferralRecords: ReferralTrackRecord[] = [
  { referral_id: 'trk_001', date_initiated: '2023-10-01T10:00:00Z', referrer_user_id: 'user_alice', referrer_name: 'Alice Wonderland', referee_email: 'friend1@example.com', referee_name: 'Friend One', referee_user_id: 'user_friend1', status: 'Reward Paid', conversion_date: '2023-10-05T14:00:00Z', reward_id: 'rew_standard_50', reward_amount_usd: 50, last_updated_at: '2023-10-05T14:00:00Z' },
  { referral_id: 'trk_002', date_initiated: '2023-10-05T11:00:00Z', referrer_user_id: 'user_bob', referrer_name: 'Bob The Builder', referee_email: 'friend2@example.com', referee_name: 'Friend Two', referee_user_id: 'user_friend2', status: 'Signed Up', last_updated_at: '2023-10-06T09:00:00Z' },
  { referral_id: 'trk_003', date_initiated: '2023-10-10T12:00:00Z', referrer_user_id: 'user_charlie', referrer_name: 'Charlie Brown', referee_email: 'friend3@example.com', referee_name: 'Friend Three', referee_user_id: 'user_friend3', status: 'Pending Criteria', notes: 'Awaiting first purchase over $20.', last_updated_at: '2023-10-11T10:00:00Z' },
  { referral_id: 'trk_004', date_initiated: '2023-10-15T13:00:00Z', referrer_user_id: 'user_diana', referrer_name: 'Diana Prince', referee_email: 'friend4@example.com', status: 'Invited', last_updated_at: '2023-10-15T13:00:00Z' },
  { referral_id: 'trk_005', date_initiated: '2023-09-20T14:00:00Z', referrer_user_id: 'user_edward', referrer_name: 'Edward Scissorhands', referee_email: 'friend5@example.com', status: 'Failed', notes: 'Referee marked as existing customer.', last_updated_at: '2023-09-25T10:00:00Z' },
  { referral_id: 'trk_006', date_initiated: '2023-11-01T09:00:00Z', referrer_user_id: 'user_alice', referrer_name: 'Alice Wonderland', referee_email: 'friend6@example.com', referee_name: 'Friend Six', referee_user_id: 'user_friend6', status: 'Converted', conversion_date: '2023-11-05T16:00:00Z', reward_id: 'rew_standard_50', reward_amount_usd: 50, notes: 'Eligible for payout.', last_updated_at: '2023-11-05T16:00:00Z' },
];

export async function GET(request: Request) {
  // In a real app, implement pagination (e.g., ?page=1&limit=20)
  // and filtering (e.g., ?status=Pending&referrerId=user_alice)
  try {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay
    return NextResponse.json(mockAllReferralRecords);
  } catch (error) {
    console.error("Error fetching referral tracking data:", error);
    return NextResponse.json({ message: "Error fetching referral tracking data" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  // Endpoint to update a referral record, e.g., manually change status or add notes
  try {
    const { searchParams } = new URL(request.url);
    const referralId = searchParams.get('referralId');
    if (!referralId) {
      return NextResponse.json({ message: "Referral ID is required for update" }, { status: 400 });
    }

    const updates = await request.json() as Partial<Omit<ReferralTrackRecord, 'referral_id' | 'date_initiated' | 'referrer_user_id' | 'referrer_name' | 'referee_email'>>;
    const recordIndex = mockAllReferralRecords.findIndex(r => r.referral_id === referralId);

    if (recordIndex === -1) {
      return NextResponse.json({ message: "Referral record not found" }, { status: 404 });
    }

    mockAllReferralRecords[recordIndex] = {
      ...mockAllReferralRecords[recordIndex],
      ...updates,
      last_updated_at: new Date().toISOString(),
    };

    return NextResponse.json(mockAllReferralRecords[recordIndex]);
  } catch (error) {
    console.error("Error updating referral record:", error);
    return NextResponse.json({ message: "Error updating referral record" }, { status: 500 });
  }
}

// Could also add a POST endpoint if referrals can be manually created by an admin,
// though typically they are user-initiated.
