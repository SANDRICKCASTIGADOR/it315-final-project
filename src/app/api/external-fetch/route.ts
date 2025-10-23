import { NextResponse } from 'next/server';

const motorcycles = [
  {
    id: "MTR-001",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    brandname: "HONDA PCX 150",
    processor: "150cc Single Cylinder",
    graphic: "12.31 HP",
    display: "Scooter",
    ram: "13.5 Nm",
    storage: "5.5L",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MTR-002",
    imageUrl: "https://images.unsplash.com/photo-1599819177626-32b1d5e4d041?w=800",
    brandname: "HONDA CL500",
    processor: "471cc Parallel-Twin",
    graphic: "46 HP",
    display: "Scrambler",
    ram: "43.4 Nm",
    storage: "12L",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MTR-003",
    imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
    brandname: "Yamaha YZF-R15",
    processor: "155cc Liquid-Cooled",
    graphic: "18.6 HP",
    display: "Sport",
    ram: "14.1 Nm",
    storage: "11L",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MTR-004",
    imageUrl: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800",
    brandname: "Suzuki GSX-R150",
    processor: "147cc DOHC",
    graphic: "19.2 HP",
    display: "Sport",
    ram: "14 Nm",
    storage: "11L",
    createdAt: new Date().toISOString(),
  },
  {
    id: "MTR-005",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    brandname: "Kawasaki Ninja 400",
    processor: "399cc Parallel-Twin",
    graphic: "45 HP",
    display: "Sport",
    ram: "38 Nm",
    storage: "14L",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(motorcycles, {
    status: 200,
  });
}