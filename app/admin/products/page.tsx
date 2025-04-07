"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductsTable } from "@/components/admin/products-table"
import { ProductForm } from "@/components/admin/product-form"
import { 
  ContextDialog, 
  ContextDialogContent, 
  ContextDialogHeader, 
  ContextDialogTitle 
} from "@/components/admin/context-dialog"

export default function ProductsPage() {
  const [showNewProductDialog, setShowNewProductDialog] = useState(false)
  const [dialogPosition, setDialogPosition] = useState<{ x: number; y: number } | undefined>(undefined)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">
            Manage your product inventory here.
          </p>
        </div>
        <Button 
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setDialogPosition({ 
              x: rect.right, 
              y: rect.bottom 
            });
            setShowNewProductDialog(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <ProductsTable />

      <ContextDialog 
        open={showNewProductDialog} 
        onOpenChange={(open) => {
          if (!open) {
            setShowNewProductDialog(false);
            setDialogPosition(undefined);
          }
        }}
      >
        <ContextDialogContent position={dialogPosition} className="max-w-2xl">
          <ContextDialogHeader>
            <ContextDialogTitle>Add New Product</ContextDialogTitle>
          </ContextDialogHeader>
          <ProductForm
            onSuccess={() => {
              setShowNewProductDialog(false);
              setDialogPosition(undefined);
              // The table will automatically refresh due to its useEffect
            }}
          />
        </ContextDialogContent>
      </ContextDialog>
    </div>
  )
} 