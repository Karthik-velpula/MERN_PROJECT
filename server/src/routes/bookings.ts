import express from 'express';
import { body, validationResult } from 'express-validator';
import { createConnection } from '../config/database';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();

// Create booking
router.post('/', authenticateToken, [
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('total_amount').isNumeric().withMessage('Total amount must be a number'),
  body('user_phone').isMobilePhone('any').withMessage('Please provide a valid phone number')
], async (req: any, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { items, total_amount, user_phone } = req.body;
    const user = req.user;

    const connection = await createConnection();

    // Start transaction
    await connection.beginTransaction();

    try {
      // Create booking
      const [bookingResult] = await connection.execute(
        'INSERT INTO bookings (user_id, user_name, user_email, user_phone, total_amount, event_date) VALUES (?, ?, ?, ?, ?, ?)',
        [user.id, user.name, user.email, user_phone, total_amount, req.body.event_date]
      ) as any;

      const bookingId = bookingResult.insertId;

      // Add booking items
      for (const item of items) {
        await connection.execute(
          'INSERT INTO booking_items (booking_id, name, category, price, quantity) VALUES (?, ?, ?, ?, ?)',
          [bookingId, item.name, item.category, item.price, item.quantity]
        );
      }

      await connection.commit();
      await connection.end();

      res.status(201).json({
        message: 'Booking created successfully',
        bookingId
      });
    } catch (error) {
      await connection.rollback();
      await connection.end();
      throw error;
    }
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all bookings (Admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res: express.Response) => {
  try {
    const connection = await createConnection();

    const [bookings] = await connection.execute(`
      SELECT 
        b.id,
        b.user_name,
        b.user_email,
        b.user_phone,
        b.total_amount,
        b.status,
        b.booking_date
      FROM bookings b
      ORDER BY b.booking_date DESC
    `);

    // Get items for each booking
    const bookingsWithItems = await Promise.all(
      (bookings as any[]).map(async (booking) => {
        const [items] = await connection.execute(
          'SELECT name, category, price, quantity FROM booking_items WHERE booking_id = ?',
          [booking.id]
        );
        return { ...booking, items };
      })
    );

    await connection.end();

    res.json(bookingsWithItems);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user's bookings
router.get('/my-bookings', authenticateToken, async (req: any, res: express.Response) => {
  try {
    const connection = await createConnection();

    const [bookings] = await connection.execute(`
      SELECT 
        b.id,
        b.total_amount,
        b.status,
        b.booking_date
      FROM bookings b
      WHERE b.user_id = ?
      ORDER BY b.booking_date DESC
    `, [req.user.id]);

    // Get items for each booking
    const bookingsWithItems = await Promise.all(
      (bookings as any[]).map(async (booking) => {
        const [items] = await connection.execute(
          'SELECT name, category, price, quantity FROM booking_items WHERE booking_id = ?',
          [booking.id]
        );
        return { ...booking, items };
      })
    );

    await connection.end();

    res.json(bookingsWithItems);
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Admin: Accept or reject a booking
router.patch('/:id/status', authenticateToken, requireAdmin, async (req: any, res: express.Response) => {
  const { status } = req.body;
  const validStatuses = ['confirmed', 'rejected'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  try {
    const connection = await createConnection();
    await connection.execute(
      'UPDATE bookings SET status = ? WHERE id = ?',
      [status, req.params.id]
    );
    await connection.end();
    res.json({ message: `Booking ${status}` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update booking status' });
  }
});

export default router;