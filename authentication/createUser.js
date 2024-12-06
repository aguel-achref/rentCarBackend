import { db } from '../app.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

// Ensure environment variables are loaded
import dotenv from 'dotenv';
dotenv.config();

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use true for port 465
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to create a user
export async function createUser(req, res) {
  const { first_name, last_name, email, password, status } = req.body;
  const id = uuidv4();

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (!first_name || !last_name) {
      return res.status(400).json({ message: 'First name and last name are required' });
    }

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long',
      });
    }

    const validStatuses = ['ADMIN', 'CLIENT'];
    const userStatus = status && validStatuses.includes(status.toUpperCase()) ? status.toUpperCase() : 'CLIENT';

    const [existingUser] = await db.promise().query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    await db.promise().query(
      `INSERT INTO users (id, first_name, last_name, email, password, status) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, first_name, last_name, email, hashedPassword, userStatus]
    );

    const [getUser] = await db.promise().query(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );

    const user = getUser[0];
    console.log('EMAIL:', process.env.EMAIL);
    console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);

    // Send email notification
    await transporter.sendMail({
      from: `"rent car" <${process.env.EMAIL}>`,
      to: email,
      subject: 'Welcome to Our Platform!',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #007bff; color: #ffffff; text-align: center; padding: 20px;">
              <h1 style="margin: 0; font-size: 24px;">Welcome, ${first_name}!</h1>
            </div>
            <div style="padding: 20px;">
              <p style="font-size: 16px;">Thank you for creating an account with <strong>Rent Car</strong>. Your account has been successfully created!</p>
              <p style="font-size: 16px;">We're thrilled to have you on board. If you have any questions or need assistance, feel free to reach out to our support team.</p>
              <p style="text-align: center; margin: 20px 0;">
                <a href="#" style="display: inline-block; text-decoration: none; background-color: #007bff; color: #ffffff; padding: 10px 20px; border-radius: 5px; font-weight: bold;">Explore Now</a>
              </p>
              <p style="font-size: 14px; color: #555;">Thank you, <br>The Rent Car Team</p>
            </div>
            <div style="background-color: #f1f1f1; text-align: center; padding: 10px; font-size: 12px; color: #777;">
              <p style="margin: 0;">This is an automated message, please do not reply.</p>
              <p style="margin: 0;">&copy; ${new Date().getFullYear()} Rent Car. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
    });
    

    transporter.verify(function (error, success) {
      if (error) {
        console.error('SMTP connection error:', error);
      } else {
        console.log('SMTP server is ready to send messages');
      }
    });
    
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'User created successfully and notification email sent',
      data: user,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
}
