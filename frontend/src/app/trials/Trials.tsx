import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Trial {
  id: string;
  name: string;
  phase: string;
  status: "Recruiting" | "Completed" | "Pending" | "Terminated";
  sites: number;
  participants: number;
}

const mockTrials: Trial[] = [
  {
    id: "CT-001",
    name: "COVID-19 Vaccine Study",
    phase: "Phase 3",
    status: "Recruiting",
    sites: 25,
    participants: 1200,
  },
  {
    id: "CT-002",
    name: "Diabetes Medication Efficacy",
    phase: "Phase 2",
    status: "Completed",
    sites: 12,
    participants: 350,
  },
  {
    id: "CT-003",
    name: "Hypertension Drug Study",
    phase: "Phase 1",
    status: "Pending",
    sites: 8,
    participants: 50,
  },
  {
    id: "CT-004",
    name: "Cancer Immunotherapy Trial",
    phase: "Phase 3",
    status: "Recruiting",
    sites: 15,
    participants: 560,
  },
];

export default function Trials() {
  const [trials, setTrials] = useState<Trial[]>(mockTrials);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [phaseFilter, setPhaseFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTrials = trials.filter((trial) => {
    const matchesStatus = statusFilter === "all" || trial.status === statusFilter;
    const matchesPhase = phaseFilter === "all" || trial.phase === phaseFilter;
    const matchesSearch = trial.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPhase && matchesSearch;
  });

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "Recruiting":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Terminated":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8 grid gap-6">
      <div>
        <h2 className="text-gray-900 mb-2">Trials</h2>
        <p className="text-gray-600">View and manage all clinical trials.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Recruiting">Recruiting</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Terminated">Terminated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Phase</Label>
            <Select value={phaseFilter} onValueChange={setPhaseFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Phases" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Phase 1">Phase 1</SelectItem>
                <SelectItem value="Phase 2">Phase 2</SelectItem>
                <SelectItem value="Phase 3">Phase 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Search</Label>
            <Input
              placeholder="Search by trial name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Trials</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phase</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Sites</TableHead>
                <TableHead>Participants</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrials.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No trials found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTrials.map((trial) => (
                  <TableRow key={trial.id}>
                    <TableCell>{trial.id}</TableCell>
                    <TableCell>{trial.name}</TableCell>
                    <TableCell>{trial.phase}</TableCell>
                    <TableCell>
                      <Badge className={getBadgeColor(trial.status)}>
                        {trial.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{trial.sites}</TableCell>
                    <TableCell>{trial.participants}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
