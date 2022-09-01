import { prisma } from "./db";

import resources from "./dummyData/resourceDummies";
import tracks from "./dummyData/trackDummies";
import users from "./dummyData/userDummies";

const exampleUser = users[0];

async function insertData() {
    const user = await prisma.user.create({
        data: {
            ...exampleUser,
        },
    });

    const trackCreates = tracks.map((track) => {
        return prisma.track.create({
            data: {
                ...track,
                user: {
                    connect: {
                        id: user.id,
                    },
                },
                topics: {
                    create: {
                        ...track.topics[0],
                        tasks: {
                            createMany: {
                                data: track.topics[0].tasks,
                            },
                        },
                    },
                },
            },
        });
    });

    await Promise.all(trackCreates);
}

insertData()
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        prisma.$disconnect();
    });
