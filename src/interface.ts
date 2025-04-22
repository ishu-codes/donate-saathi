export type NGOsInterface = {
  id: number;
  name: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  tags: string[];
};

export interface Tag {
  id: number;
  name: string;
}

export interface NGOData {
  name: string;
  description: string;
  location: string;
  phone: string;
  website?: string;
  tags: number[];
}

export type CampaignInterface = {
  id: number;
  name: string;
  description: string;
  target: string;
  completed: string;
  tag: {
    name: string;
  }[];
  ngo: {
    name: string;
    location: string;
  }[];
  image: string;
};
