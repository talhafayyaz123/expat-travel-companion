import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function SearchFilters() {
  return (
    <div className="w-64 space-y-6">
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 font-medium">FILTER BY :</h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Travel Type</Label>
            <RadioGroup defaultValue="scouting">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="scouting" id="scouting" />
                <Label htmlFor="scouting">Scouting Trip (1-8 wks)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="slow" id="slow" />
                <Label htmlFor="slow">Slow Travel (2 mon - 6 mon)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="long" id="long" />
                <Label htmlFor="long">Long Term (6 mos - 1 yr)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Members arriving between</Label>
            <div className="grid grid-cols-2 gap-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jan">January</SelectItem>
                  <SelectItem value="feb">February</SelectItem>
                  {/* Add other months */}
                </SelectContent>
              </Select>
              <Input type="text" placeholder="Year" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jan">January</SelectItem>
                  <SelectItem value="feb">February</SelectItem>
                  {/* Add other months */}
                </SelectContent>
              </Select>
              <Input type="text" placeholder="Year" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Max monthly rent</Label>
            <Slider
              defaultValue={[3000]}
              max={10000}
              step={100}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Age</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input type="number" placeholder="From" />
              <Input type="number" placeholder="To" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Member has accommodations</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch id="has-accommodation" />
                <Label htmlFor="has-accommodation">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="no-accommodation" />
                <Label htmlFor="no-accommodation">No</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Group membership</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="ExodUS Summit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exodus">ExodUS</SelectItem>
                <SelectItem value="summit">Summit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
