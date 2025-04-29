import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the general-physician-internal-medicine specialty page
  redirect('/specialties/general-physician-internal-medicine');
}
