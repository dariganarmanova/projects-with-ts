interface Weather {
  city: {
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
  };
  list: Array<{
    temp: {
      day: number;
      min: number;
      max: number;
    };
  }>;
}
