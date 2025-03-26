"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export default function NewProgramPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modules, setModules] = useState([]);
  const [selectedModules, setSelectedModules] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const fetchModules = async () => {
      const res = await fetch("http://localhost:1338/api/modules");
      const data = await res.json();
      setModules(data.data);
    };
    fetchModules();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:1338/api/programs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          title,
          description,
          modules: selectedModules,
        },
      }),
    });

    if (res.ok) {
      router.push("/");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create New Program
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "white" },
          }}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          InputProps={{
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "white" },
          }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel sx={{ color: "white" }}>Modules</InputLabel>
          <Select
            multiple
            value={selectedModules}
            onChange={(e) => {
              const value = e.target.value;
              if (value.includes("")) {
                setSelectedModules([]);
              } else {
                setSelectedModules(value);
              }
            }}
            MenuProps={{
              PaperProps: {
                style: {},
              },
            }}
            sx={{
              color: "white", 
              ".MuiSelect-icon": {
                color: "white", 
              },
            }}
          >
            <MenuItem value="">
              <em>none</em>
            </MenuItem>
            {modules && modules.map((module) => (
              <MenuItem key={module.id} value={module.id}>
                {module.attributes.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
}
