import { redirect } from "next/navigation"

export default function AdminPage() {
  // Redirect to the products page as it's the main admin functionality
  redirect("/admin/products")
} 