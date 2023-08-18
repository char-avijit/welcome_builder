import { PrismaClient } from "@prisma/client";
import * as process from "process";
import { AreaUnit, Currency, PropertyType } from "../src/common/helper/enum";
// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // Testimonial
  await prisma.testimonials.upsert({
    create: {
      message: "sdfsdfsdf",
      designation: "sdfsdfs",
      name: "ishaf",
      avatar: "sdfsdfsd"
    }, update: {}, where: { name: "ishaf" }

  });

  await prisma.testimonials.upsert({
    create: {
      message: "ami shundor comment korsi ekta like diya jan ",
      designation: "ami bekar",
      name: "ami ekta user",
      avatar: "sdfsdfsd"
    }, update: {}, where: { name: "ami ekta user" }
  });

  await prisma.showCaseCategory.upsert({
    create: {
      name: "category one",
      description: "this is a description"
    }, update: {}, where: { id: 1 }
  });
  await prisma.showCaseCategory.upsert({
    create: {
      name: "category 2",
      description: "this is a description"
    }, update: {}, where: { id: 1 }
  });
  await prisma.showCase.upsert({
    create: {
      name: "dsdfsd",
      description: "dfsdfsdf",
      type: PropertyType.ROOM,
      address: "ddd",
      CategoryId: 1,
      slug: "dddddddddd",
      area: 1244,
      price: 144454,
      areaUnit: AreaUnit.SQUARE_METERS,
      currency: Currency.USD
    }, update: {}, where: { id: 1 }
  });

  await prisma.showCaseImages.upsert({
    create: {
      showCaseId: 1,
      key: "test.png"
    }, update: {}, where: { id: 1 }
  });

}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
