import { Op } from "@sequelize/core";
import db from "../db.js";
import cron from "node-cron";

export const Activity = db.define("Activity");

const deleteOldRecords = async () => {
	const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);

	try {
		await Activity.destroy({
			where: {
				createdAt: {
					[Op.lt]: threeDaysAgo,
				},
			},
		});
	} catch (error) {
		console.error("Error deleting old records:", error);
	}
};

cron.schedule("0 0 * * *", () => {
	deleteOldRecords();
});
