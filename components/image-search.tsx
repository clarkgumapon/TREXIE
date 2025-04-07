"use client"

import type React from "react"

import { useState } from "react"
import { Camera, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function ImageSearch() {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full">
          <Camera className="mr-2 h-4 w-4" />
          Search by Image
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Image Search</DialogTitle>
          <DialogDescription>Upload an image to find similar products in our store</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {preview ? (
            <div className="mx-auto max-w-sm overflow-hidden rounded-lg">
              <img src={preview || "/placeholder.svg"} alt="Preview" className="h-auto w-full" />
              <div className="mt-4 flex justify-between">
                <Button variant="outline" onClick={() => setPreview(null)}>
                  Remove
                </Button>
                <Button>Search Now</Button>
              </div>
            </div>
          ) : (
            <div
              className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center ${
                isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="mb-4 h-8 w-8 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-medium">Drag and drop an image</h3>
              <p className="mb-4 text-sm text-muted-foreground">or click to browse from your device</p>
              <label htmlFor="image-upload" className="cursor-pointer">
                <Button variant="outline" size="sm" className="rounded-full">
                  Choose File
                </Button>
                <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

