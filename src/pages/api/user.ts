import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface UserApiRequest extends NextApiRequest {
	body: {
		name: string;
		email: string;
		id: string;
	};

	headers: {
		"x-api-key": string;
	};
}

export default async function handler(req: UserApiRequest, res: NextApiResponse) {
	if (req.headers["x-api-key"] !== process.env.API_KEY) {
		res.status(401).json({ error: "Invalid API Key" });
		return;
	}

    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, id } = req.body;

    await prisma.user.create({
        data: {
            id,
            name,
            email,
        }
    });

    res.status(200).json({ message: "User created" });
}
