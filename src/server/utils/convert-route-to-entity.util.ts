const mapping: Record<string, string> = {
  'gps-tracker-managers': 'gps_tracker_manager',
  organizations: 'organization',
  'payment-managers': 'payment_manager',
  'ride-bookers': 'ride_booker',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
