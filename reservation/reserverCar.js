import { db } from "../app.js";

export async function reserverCar(req, res) {
    try {
        console.log("req", req.params);
        console.log("req1", req.user.id);
        
        const {date_prise, date_retour, heure_prise, heure_retour }= req.body;
        const { id } = req.params;
        const userId = req.user.id;
        if (!userId){
            return res.status(401).json({ message: "Unauthorized" });
        }
        const [car] = await db.promise().query("SELECT * FROM cars WHERE id = ? and disponibility = 1", [id]);
        if (car.length === 0) {
            return res.status(404).json({ message: "Car not found" });
        }
        const [user] = await db.promise().query("SELECT * FROM users WHERE id = ?", [userId]);
        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        const [reservation] = await db.promise().query("INSERT INTO user_Cars (car_id, user_id) VALUES (?, ?)", [id, userId]);
        if (reservation.affectedRows === 0) {
            return res.status(500).json({ message: "An error occurred while reserving the car" });
        }
        const [carReservation] = await db.promise().query("INSERT INTO car_reserved (car_id, date_prise, date_retour, heure_prise, heure_retour) VALUES (?,?,?,?,?) ", [id, date_prise, date_retour, heure_prise, heure_retour]);
        if (carReservation.affectedRows === 0) {
            return res.status(500).json({ message: "An error occurred while reserving the car" });
        }
        const [carUpdated] = await db.promise().query("UPDATE cars SET disponibility = 0 WHERE id = ?", [id]);
        if (carUpdated.affectedRows === 0) {
            return res.status(500).json({ message: "An error occurred while reserving the car" });
        }
        const [getCarReserved] = await db.promise().query("SELECT * FROM car_reserved WHERE car_id = ?", [id]);
        if (getCarReserved.length === 0) {
            return res.status(500).json({ message: "An error occurred while reserving the car" });
        }
        return res.status(200).json({
            success: true,
            status: 200,
            message: "Car reserved successfully",
            data: getCarReserved,
        });
    } catch (error) {
        console.error("Error reserving car:", error);
        res.status(500).json({ message: "Error reserving car" });
    }
}