import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

type Horizon = "3m" | "6m" | "12m";
type Model = "arima" | "prophet" | "xgboost";

export default function Forecasts() {
  const [horizon, setHorizon] = useState<Horizon>("6m");
  const [model, setModel] = useState<Model>("prophet");
  const [trialId, setTrialId] = useState<string>("TRIAL-001");

  const rows = [
    { metric: "Enrollment (next 30d)", base: 42, p50: 46, p90: 52 },
    { metric: "Enrollment (next 90d)", base: 120, p50: 135, p90: 160 },
    { metric: "Spend (next 30d)", base: "$210k", p50: "$230k", p90: "$255k" },
    { metric: "Spend (next 90d)", base: "$620k", p50: "$700k", p90: "$810k" },
  ];

  return (
    <div className="p-8 grid gap-6">
      <div>
        <h2 className="text-gray-900 mb-2">Forecasts</h2>
        <p className="text-gray-600">
          Run predictive scenarios for enrollment and costs.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div className="grid gap-2">
            <Label>Trial ID</Label>
            <Input
              placeholder="e.g. TRIAL-001"
              value={trialId}
              onChange={(e) => setTrialId(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Time Horizon</Label>
            <Select value={horizon} onValueChange={(v) => setHorizon(v as Horizon)}>
              <SelectTrigger>
                <SelectValue placeholder="Select horizon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3m">3 months</SelectItem>
                <SelectItem value="6m">6 months</SelectItem>
                <SelectItem value="12m">12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Model</Label>
            <Select value={model} onValueChange={(v) => setModel(v as Model)}>
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arima">ARIMA</SelectItem>
                <SelectItem value="prophet">Prophet</SelectItem>
                <SelectItem value="xgboost">XGBoost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid items-end">
            <Button onClick={() => console.log({ trialId, horizon, model })}>
              Run Forecast
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Baseline</TableHead>
                <TableHead>P50</TableHead>
                <TableHead>P90</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.metric}>
                  <TableCell className="font-medium">{r.metric}</TableCell>
                  <TableCell>{r.base}</TableCell>
                  <TableCell>{r.p50}</TableCell>
                  <TableCell>{r.p90}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Tabs value="explain">
        <TabsList>
          <TabsTrigger value="explain">Methodology</TabsTrigger>
        </TabsList>
        <TabsContent value="explain" className="mt-4">
          <div className="bg-card border border-border rounded-xl p-6 text-sm text-gray-600">
            Forecasts are illustrative. Connect real data later to replace the
            mock series. Tune horizon and model to compare scenarios.
          </div>
        </TabsContent>
      </Tabs>

      <Separator />
      <div className="text-xs text-muted">
        Config: {trialId} • {horizon} • {model}
      </div>
    </div>
  );
}
