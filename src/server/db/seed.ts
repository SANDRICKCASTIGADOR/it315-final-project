import { db } from "./index";
import { apiKeys, hardwareSpecs } from "./schema";

async function seed() {
  try {
    console.log("Seeding database...");

    // Create a test API key
    const apiKey = await db
      .insert(apiKeys)
      .values({
        id: "test-api-key-1",
        name: "Test Store",
        hashedKey: "hashed_key_placeholder",
        last4: "test",
        revoked: false,
      })
      .returning();

    console.log("API Key created:", apiKey);

    // Add test motorcycles
    const motorcycles = await db
      .insert(hardwareSpecs)
      .values([
        {
          id: "moto-1",
          apiKeyId: "test-api-key-1",
          description: "High-performance sport bike with advanced features",
          monthlyPrice: "299",
          fullyPaidPrice: "15000",
          frontView:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop",
          sideView:
            "https://images.unsplash.com/photo-1521384201368-0db25d77dc0e?w=500&h=400&fit=crop",
          backView:
            "https://images.unsplash.com/photo-1549399542-7e3f8b83ad1e?w=500&h=400&fit=crop",
        },
        {
          id: "moto-2",
          apiKeyId: "test-api-key-1",
          description: "Classic cruiser with timeless design and comfort",
          monthlyPrice: "249",
          fullyPaidPrice: "12000",
          frontView:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop",
          sideView:
            "https://images.unsplash.com/photo-1521384201368-0db25d77dc0e?w=500&h=400&fit=crop",
          backView:
            "https://images.unsplash.com/photo-1549399542-7e3f8b83ad1e?w=500&h=400&fit=crop",
        },
        {
          id: "moto-3",
          apiKeyId: "test-api-key-1",
          description: "Adventure bike perfect for touring and off-road",
          monthlyPrice: "349",
          fullyPaidPrice: "18000",
          frontView:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop",
          sideView:
            "https://images.unsplash.com/photo-1521384201368-0db25d77dc0e?w=500&h=400&fit=crop",
          backView:
            "https://images.unsplash.com/photo-1549399542-7e3f8b83ad1e?w=500&h=400&fit=crop",
        },
      ])
      .returning();

    console.log("Motorcycles created:", motorcycles);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();