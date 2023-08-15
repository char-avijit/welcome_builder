import {PrismaClient} from '@prisma/client';
import * as process from "process";
// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    // Testimonial
    await prisma.testimonials.upsert({
        create: {
            message: 'sdfsdfsdf',
            designation: 'sdfsdfs',
            name: 'ishaf'
        }, update: {}, where: {name: 'ishaf'}

    });

    await prisma.testimonials.upsert({
        create: {
            message: 'ami shundor comment korsi ekta like diya jan ',
            designation: 'ami bekar',
            name: 'ami ekta user'
        }, update: {}, where: {name: 'ami ekta user'}
    });

    await prisma.showCaseCategory.upsert({
        create: {
            name: "category one",
            description: 'this is a description',
        }, update: {}, where: {id: 1}
    });
    await prisma.showCaseCategory.upsert({
        create: {
            name: "category 2",
            description: 'this is a description',
        }, update: {}, where: {id: 2}
    });

    await prisma.showCase.upsert({
        create: {
            name: 'dsdfsd',
            description: 'dfsdfsdf',
            type: 'dd',
            address: 'ddd',
            CategoryId: 1,
            slug: 'dddddddddd'
        }, update: {}, where: {id: 1}
    });

    await prisma.showCaseImages.upsert({
        create: {
            showCaseId: 1,
            key: 'test.png'
        }, update: {}, where: {id: 1}
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
