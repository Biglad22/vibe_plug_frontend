/** `TIER_1` is the default tier and is for unverified users.\n
    `TIER_2` tier for users who have verified their email alone.\n
    `TIER_3` tier for users who have verified their email and identity.\n

    TIER_1 = "unverified"
    TIER_2 = "email_verified"
    TIER_3 = "identity_verified" # FOR STUDENTS THAT REQUIRE SCHOOL VERIFICATION
*/
export type AccountVerificationTiers =
    | "unverified"
    | "email_verified"
    | "identity_verified";

export interface BasicUser {
    id: number;
    email: string;
    verification_tier: AccountVerificationTiers;
}

interface Basic_institution {
    id: number;
    slug: string;
    name: string;
    abbreviation?: string;
    state?: string;
    location?: string;
}

export interface UserProfile {
    id: number;
    user_id: number;
    user_name: string;
    institution_id?: number;
    bio?: string;
    full_name: string;
    user: BasicUser;
    institution: Basic_institution;
}
