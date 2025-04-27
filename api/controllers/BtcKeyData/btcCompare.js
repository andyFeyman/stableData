import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addLatestKeyData = async (req, res) => {
    //process unAuth User
    const isAdmin = req.isSuperAdmin;
    if (isAdmin === false) {
        res.status(401).json({ message: "you are not admin,please don't try" });
    }

    const addData = req.body;
    //console.log(addData);

    try {
        if (addData && addData !== null) {
            const saveData = await prisma.latestKeyData.create({
                data: {
                    ...addData
                }
            });
            res.status(200).json({ saveDB: saveData });
        } else {
            res.status(403).json({ message: "Invalid input Data!" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    };
};


export const getLatestKeyData = async (req, res) => {
    //process unAuth User
    const userAuth = req.userId;
    if (!userAuth) {
        res.status(401).json({ message: "you need login to get data!" });
    }
    try {
        const dbData = await prisma.latestKeyData.findFirst({
            orderBy: {
                updateTime: "desc"
            },

        });

        res.status(200).json({ dbData });

    } catch (error) {
        res.status(404).json({ message: error });
    }
};


