import { Lord } from "../models/Lord.js";

// CREATE Lord
export default class LordControllers {
	// GET
	static GetLord = async (req, res) => {
		try {
			const existLord = await Lord.findByPk(req.query.id);
			const { Author_LordName, Author_Password, ...other } = existLord.dataValues;

			if (existLord) {
				res.status(200).json({
					success: true,
					body: other,
					message: "this Lord is exist!",
				});
			} else {
				res.status(404).json({
					success: false,
					message: "this Lord not exist!",
				});
			}
		} catch (error) {
			res.status(404).json({
				success: false,
				message: error,
			});
		}
	};
	// UPDATE
	static UpdateLord = async (req, res) => {};
}
