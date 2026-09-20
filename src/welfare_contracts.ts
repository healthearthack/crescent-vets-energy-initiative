/**
 * Crescent Vets Energy Initiative
 * Strict TypeScript interfaces for Veterans Workforce Pipeline & Islamic Waqf Trust Ledgers.
 */

export interface MOSCrosswalkItem {
  branch: string;
  service_rating: string;
  target_industrial_role: string;
  median_military_exit_wage_usd: number;
  certified_industrial_wage_usd: number;
  primary_certification: string;
  training_bridge_weeks: number;
}

export interface VeteransWorkforceImpact {
  annual_veterans_trained: number;
  average_salary_uplift_usd: number;
  total_annual_community_wealth_generated_usd: number;
  career_pathways: MOSCrosswalkItem[];
}

export interface WaqfTrustLedger {
  governance_model: string;
  jurisprudence_alignment: string;
  annual_gross_facility_revenue_usd: number;
  annual_waqf_treasury_allocation_usd: number;
  distribution_breakdown: {
    clean_water_filtration_and_distribution_usd: number;
    stem_higher_education_scholarships_usd: number;
  };
  geothermal_freshwater_co_generation: {
    daily_distilled_drinking_water_gallons: number;
    annual_distilled_drinking_water_gallons: number;
    target_communities: string;
  };
}
