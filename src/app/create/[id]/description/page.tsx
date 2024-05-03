import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader } from "@/components/ui/card";
import Counter from "@/components/counter";
import CreationBottomBar from "@/components/creationBottomBar";
import {createDescription} from "@/actions";

export default function Description({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="w-full container md:w-4/5 lg:w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Please describe your home as good as you can!
        </h2>
      </div>
      <form action={createDescription}>
        <input type="hidden" name="homeId" value={params.id} />
        <div className="w-full container md:w-4/5 lg:w-3/5 mx-auto mt-10 mb-36 flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              type="text"
              id="title"
              required
              placeholder="Short and simple"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              name="description"
              type="text"
              id="description"
              required
              placeholder="Please describe your home..."
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              name="price"
              type="number"
              id="price"
              required
              placeholder="Price per Night in USD"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="image">Image</Label>
            <Input
              name="image"
              type="file"
              id="image"
              required
              placeholder="Price per Night in USD"
            />
          </div>
          <Card>
            <CardHeader className="flex flex-col gap-y-5">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Guests</h3>
                  <p className="text-muted-foreground text-sm">
                    How many guests do you want?
                  </p>
                </div>
                <Counter name="guest" />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Rooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many rooms do you have?
                  </p>
                </div>
                <Counter name="room" />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Bathrooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many bathrooms do you have?
                  </p>
                </div>
                <Counter name="bathroom" />
              </div>
            </CardHeader>
          </Card>
        </div>
        <CreationBottomBar />
      </form>
    </>
  );
}
