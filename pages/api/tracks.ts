// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import trackDummies from "../../data/trackDummies";

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	res.status(200).json(trackDummies);
}
