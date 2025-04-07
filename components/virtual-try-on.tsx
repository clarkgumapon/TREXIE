"use client"

import { useState } from "react"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export function VirtualTryOn() {
  const [selfieUploaded, setSelfieUploaded] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full">Try It On</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Virtual Try-On</DialogTitle>
          <DialogDescription>See how our products look on you with AR technology</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="upload" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Selfie</TabsTrigger>
            <TabsTrigger value="try">Try Products</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="py-4">
            {selfieUploaded ? (
              <div className="text-center">
                <div className="mx-auto mb-4 overflow-hidden rounded-full w-40 h-40 border">
                  <Image
                    src="/placeholder.svg?height=160&width=160&text=Selfie"
                    alt="Your selfie"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-4">Your selfie has been uploaded successfully!</p>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" onClick={() => setSelfieUploaded(false)}>
                    Upload New
                  </Button>
                  <Button>Continue to Try-On</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
                <Camera className="mb-4 h-8 w-8 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-medium">Upload a front-facing photo</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  For the best results, use a well-lit photo with a neutral background
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" className="rounded-full">
                    Take Photo
                  </Button>
                  <Button className="rounded-full" onClick={() => setSelfieUploaded(true)}>
                    Upload Photo
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="try" className="py-4">
            {!selfieUploaded ? (
              <div className="text-center py-8">
                <p className="mb-4">Please upload a selfie first to use the virtual try-on feature</p>
                <Button onClick={() => document.getElementById("upload-tab")?.click()}>Upload Selfie</Button>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="aspect-square relative overflow-hidden rounded-lg border">
                    <Image
                      src="/placeholder.svg?height=300&width=300&text=Try-On+Preview"
                      alt="Virtual try-on"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="font-medium">Select an item to try on</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="cursor-pointer rounded-md border p-2 hover:border-primary">
                          <div className="aspect-square relative overflow-hidden rounded-md">
                            <Image
                              src={`/placeholder.svg?height=80&width=80&text=Item${item}`}
                              alt={`Product ${item}`}
                              width={80}
                              height={80}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="mt-auto rounded-full">Save Look</Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

