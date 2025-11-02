import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { category: "Personnel", cost: 480000 },
  { category: "Supplies", cost: 220000 },
  { category: "Facilities", cost: 180000 },
  { category: "Travel", cost: 95000 },
  { category: "Other", cost: 125000 },
];

export default function Costs() {
  return (
    <div className="p-8">
      <h2 className="text-gray-900 mb-4">Cost Overview</h2>
      <p className="text-gray-600 mb-8">Summary of clinical trial costs by category</p>

      <Card>
        <CardHeader>
          <CardTitle>Costs by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                <Bar dataKey="cost" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
