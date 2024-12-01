import { db } from "../app.js";

export async function searchCar(req, res) {
    try {
        const { localisation, brand } = req.body;        
        const [result] = await db.promise().query("SELECT * FROM cars WHERE localisation LIKE ? OR brand LIKE ?", [`%${localisation}%` , `%${brand}%`]);
        if (result.length === 0) {
            return res.status(404).json({ message: "Car not found" });
        }

        return res.status(200).json({
            success: true,
            status: 200,
            message: "cars returned successfully",
            data: result,
        });

    } catch (error) {
        console.error("Error returned cars:", error);
        res.status(500).json({ message: "Error returned cars" });
    }
}

