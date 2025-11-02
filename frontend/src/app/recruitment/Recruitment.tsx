import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type RecruitmentStage = "Screening" | "Enrolled" | "Completed" | "Withdrawn";

interface Participant {
  id: string;
  name: string;
  age: number;
  stage: RecruitmentStage;
  dateEnrolled: string;
}

const mockParticipants: Participant[] = [
  { id: "P001", name: "John Smith", age: 45, stage: "Enrolled", dateEnrolled: "2024-09-12" },
  { id: "P002", name: "Anna Johnson", age: 38, stage: "Screening", dateEnrolled: "2024-09-18" },
  { id: "P003", name: "David Brown", age: 52, stage: "Completed", dateEnrolled: "2024-08-20" },
  { id: "P004", name: "Sarah Williams", age: 29, stage: "Withdrawn", dateEnrolled: "2024-09-05" },
];

export default function Recruitment() {
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants);
  const [filter, setFilter] = useState<RecruitmentStage | "all">("all");
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");

  const filtered = participants.filter((p) => (filter === "all" ? true : p.stage === filter));

  const handleAddParticipant = () => {
    if (!newName || !newAge) return;

    const newParticipant: Participant = {
      id: `P${(participants.length + 1).toString().padStart(3, "0")}`,
      name: newName,
      age: parseInt(newAge),
      stage: "Screening",
      dateEnrolled: new Date().toISOString().split("T")[0],
    };

    setParticipants([...participants, newParticipant]);
    setNewName("");
    setNewAge("");
  };

  return (
    <div className="p-8 grid gap-6">
      <div>
        <h2 className="text-gray-900 mb-2">Recruitment</h2>
        <p className="text-gray-600">
          Track participant progress and manage recruitment workflow.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Participant</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="grid gap-2">
            <Label>Full Name</Label>
            <Input
              placeholder="e.g. Jane Doe"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Age</Label>
            <Input
              type="number"
              placeholder="e.g. 35"
              value={newAge}
              onChange={(e) => setNewAge(e.target.value)}
            />
          </div>
          <div className="grid items-end">
            <Button onClick={handleAddParticipant}>Add Participant</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value="all" className="mt-4">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setFilter("all")}>
            All
          </TabsTrigger>
          <TabsTrigger value="Screening" onClick={() => setFilter("Screening")}>
            Screening
          </TabsTrigger>
          <TabsTrigger value="Enrolled" onClick={() => setFilter("Enrolled")}>
            Enrolled
          </TabsTrigger>
          <TabsTrigger value="Completed" onClick={() => setFilter("Completed")}>
            Completed
          </TabsTrigger>
          <TabsTrigger value="Withdrawn" onClick={() => setFilter("Withdrawn")}>
            Withdrawn
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Participants</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Date Enrolled</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No participants found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>{p.id}</TableCell>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.age}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              p.stage === "Completed"
                                ? "bg-green-100 text-green-800"
                                : p.stage === "Withdrawn"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }
                          >
                            {p.stage}
                          </Badge>
                        </TableCell>
                        <TableCell>{p.dateEnrolled}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
