export interface socialLinks {
  name: string;
  url: string;
  icon: string;
}

export interface OpenCageResponse {
  results: Array<{
    components: {
      city?: string;
      country?: string;
      [key: string]: any;
    };
    [key: string]: any;
  }>;
  [key: string]: any;
}
