
export enum TabType {
  BASICS = 'basics',
  LIFECYCLE = 'lifecycle',
  TIERS = 'tiers',
  SCALING = 'scaling',
  PROS_CONS = 'pros_cons',
  EXAMPLES = 'examples'
}

export interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ReactNode;
}

export type TierType = '1-Tier' | '2-Tier' | '3-Tier' | 'N-Tier';

export interface ScalingState {
  trafficLevel: 'low' | 'high';
  hasLoadBalancer: boolean;
  isCachingEnabled: boolean;
}
