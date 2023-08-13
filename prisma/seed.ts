import {PrismaClient} from '@prisma/client';

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
