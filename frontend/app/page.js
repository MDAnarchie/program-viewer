"use client";

import { useEffect, useState } from 'react';
import { Container, Typography, Button, Card, CardContent } from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const res = await fetch('http://localhost:1338/api/programs?populate=modules');
      const data = await res.json();
      setPrograms(data.data);
    };
    fetchPrograms();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Programs
      </Typography>
      {programs && programs.map((program) => (
        <Card key={program.id} style={{ marginBottom: '1rem' }}>
          <CardContent>
            <Typography variant="h5">{program.attributes.title}</Typography>
            <Typography variant="body2">
              {program.attributes.description.substring(0, 30)}...
            </Typography>
            <Typography variant="body2">
              Modules: {program.attributes.modules.data.length}
            </Typography>
            <Link href={`/programs/${program.id}`} passHref>
              <Button variant="contained" color="primary">
                View Program
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
